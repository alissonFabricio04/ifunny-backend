import Id from '../../domain/Id'

export type Meme = {
  memeId: string
  authorId: string
  content: string
  tags: { name: string }[]
  upvotes: number
}

export default interface MemeQuery {
  recentMemesNotLiked: (userId: Id, qty?: number) => Promise<Meme[]>
  lastLikes: (userId: Id, qty?: number) => Promise<Meme[]>
  highlights: (page?: number) => Promise<Meme[]>
  collective: (page?: number) => Promise<Meme[]>
}
