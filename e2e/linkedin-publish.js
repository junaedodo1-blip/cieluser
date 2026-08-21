import fs from 'fs';
import path from 'path';

// Load credentials from app data directory
const credsPath = 'C:/Users/High Tech/.gemini/antigravity/linkedin_credentials.json';
let accessToken = '';

if (fs.existsSync(credsPath)) {
  try {
    const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
    accessToken = creds.access_token;
    console.log('Loaded access token from config.');
  } catch (e) {
    console.error('Failed to parse credentials file:', e.message);
  }
} else {
  console.warn('Credentials file not found, using fallback.');
}

if (!accessToken || !accessToken.startsWith('AQ')) {
  console.error('\n❌ ERROR: LinkedIn Access Token is missing or invalid.');
  console.error('The credentials file only contains the Client Secret ("WPL_AP1...").');
  console.error('To obtain a valid Access Token (which starts with "AQ..."), please use the Developer Token Generator in the LinkedIn Developer Portal.');
  process.exit(1);
}

const version = '202607'; // Version of LinkedIn API

async function getPersonId() {
  console.log('Fetching user profile URN...');
  
  // Try OpenID Connect userinfo first
  try {
    const res = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.sub) {
        console.log(`Found OIDC user sub: ${data.sub}`);
        return `urn:li:person:${data.sub}`;
      }
    }
  } catch (e) {
    console.warn('OIDC userinfo fetch failed, trying /v2/me:', e.message);
  }

  // Fallback to v2/me
  const res = await fetch('https://api.linkedin.com/v2/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch user URN from LinkedIn. Status: ${res.status}. Response: ${errText}`);
  }
  const data = await res.json();
  console.log(`Found user ID via /v2/me: ${data.id}`);
  return `urn:li:person:${data.id}`;
}

async function uploadDocument(personUrn) {
  const filePath = 'C:/Users/High Tech/.gemini/antigravity/brain/dac44a01-79a1-4369-a8c8-fa7c1379dd8d/veo_prompting_glossary.pdf';
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found at path: ${filePath}`);
  }

  console.log('Initializing document upload on LinkedIn...');
  const initRes = await fetch('https://api.linkedin.com/rest/documents?action=initializeUpload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'LinkedIn-Version': version,
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      initializeUploadRequest: {
        owner: personUrn
      }
    })
  });

  if (!initRes.ok) {
    const errText = await initRes.text();
    throw new Error(`Failed to initialize document upload. Status: ${initRes.status}. Response: ${errText}`);
  }

  const initData = await initRes.json();
  const uploadUrl = initData.value.uploadUrl;
  const documentUrn = initData.value.document;
  console.log(`Document URN: ${documentUrn}`);
  console.log(`Upload URL acquired.`);

  console.log('Uploading PDF binary file to LinkedIn cloud storage...');
  const fileBuffer = fs.readFileSync(filePath);
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/pdf'
    },
    body: fileBuffer
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`Failed to upload document binary. Status: ${uploadRes.status}. Response: ${errText}`);
  }
  console.log('Document upload completed successfully!');
  return documentUrn;
}

async function createLinkedInPost(personUrn, documentUrn) {
  const caption = `Google Veo is set to redefine AI video creation. But to get high-end, consistent visual outputs, you need to speak the language of a cinematographer. 🎬\n\nMost people use vague descriptions like "cinematic video" or "epic camera angle". The result? A visual lottery.\n\nIf you want absolute control over Veo's camera work, focus dynamics, lighting setups, and even its native sound design output, you must use technical filmmaking terminology.\n\nI've compiled the ultimate cheat sheet of production terms for Google Veo. Here's a quick look at what's inside the PDF document below:\n\n🎥 12 Shot Types (from Extreme Close-up to Establishing Shots)\n📐 7 Camera Angles & their psychological impact\n🎬 12 Dynamic Camera Movements (from tracking shots to dolly zooms)\n💡 Professional Lighting styles (Chiaroscuro, rim light, silhouettes)\n🔍 Focus & Lens controls (Anamorphic lens effects, macro focus)\n🔊 Native Audio & sound design prompts\n🏃‍♂️ Handheld Action & Paparazzi Flash formulas\n\nCheck out the full 5-page PDF guide below to level up your video prompting! 🎬\n\n👇 I'm curious: Which camera movement or lighting style do you find hardest to get right with AI? Let me know in the comments!\n\n#GoogleVeo #AIVideo #PromptEngineering #GenerativeAI #Cinematography #DesignSystem`;

  console.log('Creating LinkedIn post with document attachment...');
  const postRes = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'LinkedIn-Version': version,
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      author: personUrn,
      commentary: caption,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
      content: {
        media: {
          id: documentUrn,
          title: 'Google Veo AI Video Prompting Guide'
        }
      }
    })
  });

  if (!postRes.ok) {
    const errText = await postRes.text();
    throw new Error(`Failed to create post. Status: ${postRes.status}. Response: ${errText}`);
  }

  // Get post ID from headers
  const locationHeader = postRes.headers.get('x-restli-id') || postRes.headers.get('Location');
  console.log(`Post created successfully! x-restli-id / Location: ${locationHeader}`);
  return locationHeader;
}

async function main() {
  try {
    const personUrn = await getPersonId();
    console.log(`Resolved Author URN: ${personUrn}`);
    const documentUrn = await uploadDocument(personUrn);
    const postLocation = await createLinkedInPost(personUrn, documentUrn);
    console.log('\n--- SUCCESS ---');
    console.log(`LinkedIn post has been published! Reference ID: ${postLocation}`);
  } catch (error) {
    console.error('Error during publishing process:', error);
    process.exit(1);
  }
}

main();
