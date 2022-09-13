import { TechnicalError } from "src/app/core/models/Error";
import { PostInterface } from "./post.interface";

export interface PostStateInterface {
  loadStatus: "NOT_LOADED" | "LOADING" | "LOADED";
  updatedAt: number,
  posts: PostInterface[];
  error: TechnicalError | null;
}
