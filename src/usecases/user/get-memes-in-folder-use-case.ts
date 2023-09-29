/* eslint-disable @typescript-eslint/ban-types */

import { Id } from "../../entities/id/model/id-value-object"
import { Meme } from "../../entities/meme/model/meme"
import { UserGateway } from "../../entities/user/gateways/user-gateway"
import { UseCase, InDTO, OutDTO } from "../user-case"

interface InputDTO {
  folderId: string
}

interface OutputDTO {
  memes: Array<Meme>
}

export class GetMemesInFolderUseCase
  implements UseCase<UserGateway, InputDTO, OutputDTO>
{
  readonly gateway: UserGateway

  constructor(gateway: UserGateway) {
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
