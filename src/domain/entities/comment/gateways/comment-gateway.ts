import { Id } from '../../../value-objects/id/model/id-value-object'
import { Comment } from '../model/comment'

export interface CommentGateway {
  addComment: (commentId: Id, comment: Comment) => Promise<void>
  postExists: (memeId: Id) => Promise<boolean>
  getComments: (memeId: Id, page: number) => Promise<Comment[]>
  find: (commentId: Id) => Promise<Comment | null>
  upvoteComment: (commenId: Id, userId: Id) => Promise<void>
  downvoteComment: (commenId: Id, userId: Id) => Promise<void>
}
