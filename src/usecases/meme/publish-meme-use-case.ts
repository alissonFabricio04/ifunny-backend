/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../entities/id/model/id-value-object'
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Meme } from '../../entities/meme/model/meme'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  authorId: string
  content: string
  tags: Array<{ name: string; weight: number }>
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
    const meme = new Meme(
      new Id(),
      new Id(inputDTO.data.authorId),
      { uri: inputDTO.data.content },
      inputDTO.data.tags,
    )

    await this.gateway.publish(meme)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
