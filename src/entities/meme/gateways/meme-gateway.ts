import { Id } from "../../id/model/id-value-object";
import { Comment } from "../model/comment";
import { Meme } from "../model/meme";

export interface MemeGateway {
  publish: (meme: Meme) => Promise<void>
  addComment: (memeId: Id, comment: Comment) => Promise<void>
  find: (memeId: Id) => Promise<Meme | null>
  feed: (pagination: number = 1) => Promise<Array<Meme>>
}