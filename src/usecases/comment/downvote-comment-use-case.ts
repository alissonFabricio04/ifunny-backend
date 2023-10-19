/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { CommentGateway } from '../../domain/entities/comment/gateways/comment-gateway'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  commentId: string
  userId: string
}

interface OutputDTO {}

export class DownvoteCommentUseCase
  implements UseCase<CommentGateway, InputDTO, OutputDTO>
{
  readonly gateway: CommentGateway

  constructor(gateway: CommentGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const memeId = new Id(inputDTO.data.commentId ?? 'failed')
    const userId = new Id(inputDTO.data.userId ?? 'failed')

    await this.gateway.downvoteComment(memeId, userId)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
