import { Id } from '../../domain/value-objects/id'
import { Comment } from '../../domain/entities/comment'

export interface CommentRepository {
  save: (comment: Comment) => Promise<void>
  get: (commentId: Id) => Promise<Comment | null>
  getAll: (memeId: Id, page: number) => Promise<Comment[]>
  update: (comment: Comment) => Promise<void>
  memeIsActive: (memeId: Id) => Promise<boolean>
}
