import { TechnicalError } from "src/app/core/models/Error";
import { PostInterface } from "./post.interface";

export interface PostStateInterface {
  isLoading: boolean;
  posts: PostInterface[];
  error: TechnicalError | null;
}
