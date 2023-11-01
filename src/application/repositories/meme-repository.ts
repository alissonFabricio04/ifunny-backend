import { Id } from '../../domain/value-objects/id'
import { Meme } from '../../domain/entities/meme'

type React = {
  type: 'LIKE' | 'DESLIKE'
}

export interface MemeRepository {
  save: (meme: Meme) => Promise<void>
  get: (memeId: Id) => Promise<Meme | null>
  update: (meme: Meme) => Promise<void>
  recentMemesNotLiked: (userId: Id, qty?: number) => Promise<Meme[]>
  lastLikes: (userId: Id, qty?: number) => Promise<Meme[]>
  alreadyReactMeme: (userId: Id, memeId: Id, react: React) => Promise<boolean>
  highlights: (page?: number) => Promise<Meme[]>
  collective: (page?: number) => Promise<Meme[]>
  getMemeInFolder: (folderId: Id) => Promise<Meme[]>
}
