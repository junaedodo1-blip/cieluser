import fs from 'node:fs';
import path from 'node:path';

export interface PendingNotificationPost {
  postId: string;
  channelId: string;
  createdAt: string;
  fallbackDueAt: string; // 2 hours after creation
  caption: string;
  imageUrls: string[];
  topic: string;
}

const PENDING_POSTS_FILE = 'pending_notification_posts.json';

export function recordPendingNotification(post: PendingNotificationPost, filePath = PENDING_POSTS_FILE): void {
  const resolved = path.resolve(process.cwd(), filePath);
  let list: PendingNotificationPost[] = [];
  if (fs.existsSync(resolved)) {
    try {
      list = JSON.parse(fs.readFileSync(resolved, 'utf8'));
    } catch {
      list = [];
    }
  }
  list.push(post);
  fs.writeFileSync(resolved, JSON.stringify(list, null, 2), 'utf8');
}

export function getPendingNotifications(filePath = PENDING_POSTS_FILE): PendingNotificationPost[] {
  const resolved = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolved)) return [];
  try {
    return JSON.parse(fs.readFileSync(resolved, 'utf8'));
  } catch {
    return [];
  }
}

export function removePendingNotification(postId: string, filePath = PENDING_POSTS_FILE): void {
  const resolved = path.resolve(process.cwd(), filePath);
  const list = getPendingNotifications(filePath).filter((p) => p.postId !== postId);
  fs.writeFileSync(resolved, JSON.stringify(list, null, 2), 'utf8');
}
