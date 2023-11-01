import { Id } from '../../domain/value-objects/id'
import { CommentRepository } from '../repositories/comment-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  commentId: string
  userId: string
}

export class UpvoteCommentUseCase {
  readonly commentRepository: CommentRepository

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository
  }

  async handle(input: Input): Promise<void> {
    const commentId = new Id(input.commentId)
    const comment = await this.commentRepository.get(commentId)

    if (!comment) {
      throw new UseCaseError('Não foi possivel encontrar o comentario')
    }

    comment.upvote()

    await this.commentRepository.update(comment)
  }
}
