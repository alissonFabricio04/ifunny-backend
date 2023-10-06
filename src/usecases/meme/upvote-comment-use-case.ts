/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../entities/id/model/id-value-object'
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  commentId: string
  userId: string
}

interface OutputDTO {}

export class UpvoteCommentUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const commentId = new Id(inputDTO.data.commentId ?? 'failed')
    const userId = new Id(inputDTO.data.userId ?? 'failed')

    await this.gateway.upvoteComment(commentId, userId)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
