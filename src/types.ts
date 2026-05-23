export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  isPrivate?: boolean;
}
