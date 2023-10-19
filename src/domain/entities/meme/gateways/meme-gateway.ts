import { Id } from '../../../value-objects/id/model/id-value-object'
import { Meme } from '../model/meme'

export interface MemeGateway {
  publish: (meme: Meme) => Promise<void>
  find: (memeId: Id) => Promise<Meme | null>
  recentMemesNotLikedByUser: (userId: Id, qty: number) => Promise<Meme[]>
  lastLikes: (userId: Id, qty: number) => Promise<Meme[]>
  like: (memeId: Id, userId: Id) => Promise<void>
  alreadyLikedMeme: (memeId: Id, userId: Id) => Promise<boolean>
  highlights: (page: number) => Promise<Meme[]>
  collective: (page: number) => Promise<Meme[]>
  getMemeInFolder: (folderId: Id) => Promise<Meme[]>
}
