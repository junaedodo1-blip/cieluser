import fs from 'node:fs';
import path from 'node:path';

const BUFFER_ACCESS_TOKEN = process.env.BUFFER_ACCESS_TOKEN;
const LINKEDIN_CHANNEL_ID = '6a88672fccaf649a67ec3385';
const TWITTER_CHANNEL_ID = '6a8866c5ccaf649a67ec320e';
const INSTAGRAM_CHANNEL_ID = '6a74577299afb4434910ba18';

async function makeGraphQLRequest(query: string, variables: any) {
  const res = await fetch('https://api.buffer.com/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BUFFER_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json() as any;
  if (json.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

function getLatestFile(dir: string, pattern: string): string {
  const files = fs.readdirSync(dir)
    .filter(f => f.includes(pattern) && f.endsWith('.md'))
    .map(f => ({ name: f, time: fs.statSync(path.join(dir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);
  if (files.length === 0) throw new Error(`No files matching "${pattern}" in ${dir}`);
  return path.join(dir, files[0].name);
}

const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on PostActionSuccess {
        post {
          id
        }
      }
      ... on MutationError {
        message
      }
    }
  }
`;

async function main() {
  if (!BUFFER_ACCESS_TOKEN) {
    console.error('❌ BUFFER_ACCESS_TOKEN environment variable not set.');
    process.exit(1);
  }

  // 1. Resolve latest files
  const linkedinPostPath = getLatestFile('out/repurposed/linkedin', 'linkedin-post-');
  const twitterThreadPath = getLatestFile('out/repurposed/twitter', 'twitter-thread-');

  console.log(`📄 Latest LinkedIn Post file: ${linkedinPostPath}`);
  console.log(`📄 Latest Twitter Thread file: ${twitterThreadPath}`);

  const linkedinText = fs.readFileSync(linkedinPostPath, 'utf8').trim();
  const twitterRaw = fs.readFileSync(twitterThreadPath, 'utf8').trim();

  // 1.5 Parse and resolve LinkedIn hook options
  let finalLinkedInText = linkedinText;
  if (linkedinText.includes('[A/B HOOK OPTIONS]')) {
    const endOptionsIdx = linkedinText.indexOf('[END HOOK OPTIONS]');
    const postBody = linkedinText.slice(endOptionsIdx + '[END HOOK OPTIONS]'.length).trim();
    
    // Extract Option 2 (Bold Claim) hook
    const opt2Match = linkedinText.match(/\* Option 2 \(Bold Claim - RECOMMENDED\):\s*(.*)/i);
    const boldClaimHook = opt2Match ? opt2Match[1]!.trim() : null;
    
    if (boldClaimHook) {
      // The default first paragraph is the hookStory. We replace it.
      const paragraphs = postBody.split('\n\n');
      paragraphs[0] = boldClaimHook;
      finalLinkedInText = paragraphs.join('\n\n');
    } else {
      finalLinkedInText = postBody;
    }
  }

  // 2. Parse Twitter thread
  const sections = twitterRaw.split(/\n---\n|\r\n---\r\n/);
  const tweets: string[] = [];

  for (const sec of sections) {
    const lines = sec.split('\n').map(l => l.trim());
    // Filter out title, tweet indicators
    const contentLines = lines.filter(l => {
      if (l.startsWith('#')) return false;
      if (l.startsWith('### Tweet')) return false;
      return true;
    });
    const tweetText = contentLines.join('\n').trim();
    if (tweetText) {
      tweets.push(tweetText);
    }
  }

  if (tweets.length === 0) {
    throw new Error('Parsed 0 tweets from the thread file.');
  }

  const mainTweet = tweets[0]!;
  const threadTweets = tweets.slice(1).map(t => ({ text: t }));

  // 3. Schedule LinkedIn
  console.log(`📤 Scheduling LinkedIn post...`);
  try {
    const pdfPath = linkedinPostPath.replace('linkedin-post-', 'linkedin-carousel-').replace('.md', '.pdf');
    const hasPdf = fs.existsSync(pdfPath);
    
    let assetsInput: any[] | undefined = undefined;
    if (hasPdf) {
      const runsDir = 'out/carousel_runs';
      const subdirs = fs.readdirSync(runsDir)
        .filter(f => f.startsWith('run_'))
        .map(f => ({ name: f, time: fs.statSync(path.join(runsDir, f)).mtime.getTime() }))
        .sort((a, b) => b.time - a.time);
      
      if (subdirs.length > 0) {
        const coverPath = path.join(runsDir, subdirs[0].name, 'slide_01.jpg');
        if (fs.existsSync(coverPath)) {
          const pdfUrl = `https://junaedodo1-blip.github.io/cieluser/${pdfPath.replace(/\\/g, '/')}`;
          const coverUrl = `https://junaedodo1-blip.github.io/cieluser/${coverPath.replace(/\\/g, '/')}`;
          console.log(`📎 Attaching document carousel: ${pdfUrl}`);
          console.log(`🖼️ Document cover thumbnail: ${coverUrl}`);
          
          assetsInput = [{
            document: {
              url: pdfUrl,
              title: path.basename(pdfPath, '.pdf').replace('linkedin-carousel-', '').replace(/-/g, ' '),
              thumbnailUrl: coverUrl
            }
          }];
        }
      }
    }

    const res = await makeGraphQLRequest(CREATE_POST_MUTATION, {
      input: {
        channelId: LINKEDIN_CHANNEL_ID,
        text: finalLinkedInText,
        mode: 'addToQueue',
        schedulingType: 'automatic',
        assets: assetsInput,
      }
    });
    console.log(`✅ LinkedIn post scheduled!`);
  } catch (e) {
    console.error(`❌ Failed to schedule LinkedIn post:`, e);
  }

  // 4. Schedule Twitter Thread
  console.log(`📤 Scheduling Twitter thread...`);
  try {
    const res = await makeGraphQLRequest(CREATE_POST_MUTATION, {
      input: {
        channelId: TWITTER_CHANNEL_ID,
        text: mainTweet,
        mode: 'addToQueue',
        schedulingType: 'automatic',
        metadata: {
          twitter: {
            thread: threadTweets.length > 0 ? threadTweets : undefined
          }
        }
      }
    });
    console.log(`✅ Twitter thread scheduled!`);
  } catch (e) {
    console.error(`❌ Failed to schedule Twitter thread:`, e);
  }

  // 5. Schedule Instagram Post
  console.log(`📤 Scheduling Instagram carousel post...`);
  try {
    const instagramPostPath = getLatestFile('out/repurposed/instagram', 'instagram-post-');
    const instagramText = fs.readFileSync(instagramPostPath, 'utf8').trim();

    const runsDir = 'out/carousel_runs';
    const subdirs = fs.readdirSync(runsDir)
      .filter(f => f.startsWith('run_'))
      .map(f => ({ name: f, time: fs.statSync(path.join(runsDir, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    let assetsInput: any[] | undefined = undefined;
    if (subdirs.length > 0) {
      const latestRun = path.join(runsDir, subdirs[0].name);
      const slideFiles = fs.readdirSync(latestRun)
        .filter(f => f.startsWith('slide_') && (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')))
        .sort();

      if (slideFiles.length > 0) {
        assetsInput = slideFiles.map(slide => ({
          image: {
            url: `https://junaedodo1-blip.github.io/cieluser/${path.join(latestRun, slide).replace(/\\/g, '/')}`
          }
        }));
        console.log(`🖼️ Attaching ${assetsInput.length} image slides for Instagram carousel.`);
      }
    }

    const res = await makeGraphQLRequest(CREATE_POST_MUTATION, {
      input: {
        channelId: INSTAGRAM_CHANNEL_ID,
        text: instagramText,
        mode: 'addToQueue',
        schedulingType: 'automatic',
        assets: assetsInput,
      }
    });
    console.log(`✅ Instagram post scheduled!`);
  } catch (e) {
    console.error(`❌ Failed to schedule Instagram post:`, e);
  }
}

main().catch(console.error);
