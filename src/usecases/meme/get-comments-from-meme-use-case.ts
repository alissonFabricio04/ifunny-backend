/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../entities/id/model/id-value-object'
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Comment } from '../../entities/meme/model/comment'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  memeId: string
  page: number
}

interface OutputDTO {
  comments: Array<Comment>
}

export class GetCommentsFromMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
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
