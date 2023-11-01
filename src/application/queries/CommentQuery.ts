import Id from '../../domain/Id'

type Comment = {
  commentId: string
  authorId: string
  content: {
    body: string
    midiaId: string
  }
  upvotes: number
}

export interface CommentQuery {
  getAll: (memeId: Id, page?: number) => Promise<Comment[]>
}
