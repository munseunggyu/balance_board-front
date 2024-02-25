import { IComment } from "./Comment";

export interface IPost {
  postId: number;
  imageUrl: string;
  nickname: string;
  title: string;
  created: string;
  category: string;
  voteCount: number;
  tags: string;
  option1: string;
  option2: string;
  option1Count: number;
  option2Count: number;
  comments: IComment[];
  content: string;
}
