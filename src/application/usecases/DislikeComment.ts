/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import CommentRepository from '../repositories/CommentRepository'

type Input = {
  commentId: string
  userId: string
}

export class DislikeComment {
  constructor(readonly commentRepository: CommentRepository) {}

  async handle(input: Input): Promise<void> {
    const comment = await this.commentRepository.get(new Id(input.commentId))
    if (!comment) throw new Error('Não foi possivel encontrar o comentario')
    comment.downvote()
    await this.commentRepository.updateVotes(new Id(input.userId), comment)
  }
}
