/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { MemeGateway } from '../../domain/entities/meme/gateways/meme-gateway'
import { Meme } from '../../domain/entities/meme/model/meme'
import { InDTO, OutDTO, UseCase } from '../user-case'
import { Midia } from '../../domain/value-objects/midia/model/midia-value-object'

interface InputDTO {
  authorId: string
  content: string
  tags: Array<{ name: string }>
}

interface OutputDTO {}

export class PublishMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const tags: Array<{ name: string, weight: number }> = []
    inputDTO.data.tags.forEach(tag => tags.push({ ...tag, weight: 1 }))

    const meme = new Meme(
      new Id(),
      new Id(inputDTO.data.authorId),
      new Midia(inputDTO.data.content),
      tags,
    )
    
    const contentURIAlreadyRegistered = await this.gateway.find(meme.id)

    if(contentURIAlreadyRegistered) {
      throw new Error('URI já está em uso')
    }

    await this.gateway.publish(meme)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
