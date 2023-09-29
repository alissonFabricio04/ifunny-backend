/* eslint-disable @typescript-eslint/ban-types */

import { Id } from "../../entities/id/model/id-value-object"
import { Meme } from "../../entities/meme/model/meme"
import { UserGateway } from "../../entities/user/gateways/user-gateway"
import { UseCase, InDTO, OutDTO } from "../user-case"

interface InputDTO {
  userId: string
}

interface OutputDTO {
  folders: Array<{ id: Id, folderName: string }>
}

export class GetFoldersUseCase
  implements UseCase<UserGateway, InputDTO, OutputDTO>
{
  readonly gateway: UserGateway

  constructor(gateway: UserGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const userId = new Id(inputDTO.data.userId ?? 'failed')

    const foldersUser = await this.gateway.getFolders(userId)

    return {
      status: 'SUCCESS',
      data: {
        folders: foldersUser
      },
    }
  }
}
