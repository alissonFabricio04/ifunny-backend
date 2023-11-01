import Id from '../../domain/Id'

type Meme = {
  memeId: string
  authorId: string
  content: string
  tags: { name: string }[]
  upvotes: number
}

type Folder = {
  folderId: string
  name: string
  ownerId: string
  thumbnail: string
}

export interface FolderQuery {
  getAll: (userId: Id, page?: number) => Promise<Folder[]>
  getMemeInFolder: (folderId: Id, page?: number) => Promise<Meme[]>
}
