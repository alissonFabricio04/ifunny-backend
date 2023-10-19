/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { MemeGateway } from '../../domain/entities/meme/gateways/meme-gateway'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  userId: string
  memeId: string
}

interface OutputDTO {}

export class LikeMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const memeExists = await this.gateway.find(new Id(inputDTO.data.memeId))

    if(!memeExists) {
      throw new Error('Conteúdo não encontrado')
    }

    const userAlreadyLikedMeme = await this.gateway.alreadyLikedMeme(new Id(inputDTO.data.memeId ?? 'failed'), new Id(inputDTO.data.userId ?? 'failed'))

    if(userAlreadyLikedMeme) {
      throw new Error('Você já deu like neste meme')
    }

    await this.gateway.like(new Id(inputDTO.data.memeId ?? 'failed'), new Id(inputDTO.data.userId ?? 'failed'))

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
