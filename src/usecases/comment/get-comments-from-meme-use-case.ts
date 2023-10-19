/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { CommentGateway } from '../../domain/entities/comment/gateways/comment-gateway'
import { Comment } from '../../domain/entities/comment/model/comment'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  memeId: string
  page: number
}

interface OutputDTO {
  comments: Array<Comment>
}

export class GetCommentsFromMemeUseCase
  implements UseCase<CommentGateway, InputDTO, OutputDTO>
{
  readonly gateway: CommentGateway

  constructor(gateway: CommentGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const memeId = new Id(inputDTO.data.memeId ?? 'failed')

    const memeExists = await this.gateway.find(memeId)

    if(!memeExists) {
      throw new Error('Conteúdo não encontrado')
    }

    let page = Number(inputDTO.data.page)
    isNaN(page) ? page = 1 : null

    const comments = await this.gateway.getComments(memeId, page)

    return {
      status: 'SUCCESS',
      data: {
        comments
      },
    }
  }
}
