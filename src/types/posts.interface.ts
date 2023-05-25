import { User } from "./users.interface";

export interface Post {
  author?: User;
  content: string;
  title: string;
  tags: string[];
}

export interface PagedPosts {
  result: Post[];
  total: number;
  size: number;
  page: number;
}
