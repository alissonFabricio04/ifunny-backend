import Id from '../../domain/Id'
import Comment from '../../domain/Comment'

export default interface CommentRepository {
  save: (comment: Comment) => Promise<void>
  get: (commentId: Id) => Promise<Comment | null>
  update: (comment: Comment) => Promise<void>
  updateVotes: (userId: Id, comment: Comment) => Promise<void>
}
