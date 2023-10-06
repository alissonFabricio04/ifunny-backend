import { Id } from '../../id/model/id-value-object'
import { Comment } from '../model/comment'
import { Meme } from '../model/meme'

export interface MemeGateway {
  publish: (meme: Meme) => Promise<void>
  addComment: (memeId: Id, comment: Comment) => Promise<void>
  getComments: (memeId: Id, page: number) => Promise<Comment[]>
  find: (memeId: Id) => Promise<Meme | null>
  recentMemesNotLikedByUser: (userId: Id, qty: number) => Promise<Meme[]>
  lastLikes: (userId: Id, qty: number) => Promise<Meme[]>
  like: (memeId: Id, userId: Id) => Promise<void>
  alreadyLikedMeme: (memeId: Id, userId: Id) => Promise<boolean>
  upvoteComment: (memeId: Id, userId: Id) => Promise<void>
  downvoteComment: (memeId: Id, userId: Id) => Promise<void>
  highlights: (page: number) => Promise<Meme[]>
  collective: (page: number) => Promise<Meme[]>
}
