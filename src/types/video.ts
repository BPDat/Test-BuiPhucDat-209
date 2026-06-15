export interface Author {
  username: string;
  avatarUrl?: string;
}

export interface VideoItem {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}
