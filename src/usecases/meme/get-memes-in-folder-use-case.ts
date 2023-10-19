/* eslint-disable @typescript-eslint/ban-types */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { Meme } from '../../domain/entities/meme/model/meme'
import { MemeGateway } from '../../domain/entities/meme/gateways/meme-gateway'
import { UseCase, InDTO, OutDTO } from '../user-case'

interface InputDTO {
  folderId: string
}

interface OutputDTO {
  memes: Array<Meme>
}

export class GetMemesInFolderUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const folderId = new Id(inputDTO.data.folderId ?? 'failed')

    const memes = await this.gateway.getMemeInFolder(folderId)

    return {
      status: 'SUCCESS',
      data: {
        memes
      },
    }
  }
}
