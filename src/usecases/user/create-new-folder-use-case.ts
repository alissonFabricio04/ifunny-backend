/* eslint-disable @typescript-eslint/ban-types */

import { Id } from "../../entities/id/model/id-value-object"
import { UserGateway } from "../../entities/user/gateways/user-gateway"
import { UseCase, InDTO, OutDTO } from "../user-case"

interface InputDTO {
  userId: string
  folderId?: string
  folderName: string
}

interface OutputDTO {}

export class CreateNewFolderUseCase
  implements UseCase<UserGateway, InputDTO, OutputDTO>
{
  readonly gateway: UserGateway

  constructor(gateway: UserGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const userId = new Id(inputDTO.data.userId ?? 'failed')

    if(!inputDTO.data.folderName || inputDTO.data.folderName.length <= 0) {
      throw new Error('O nome da pasta é obrigatório')
    }

    const alreadyFolderWithThisName = await this.gateway.alreadyFolderWithThisName(userId, inputDTO.data.folderName)

    if(alreadyFolderWithThisName) {
      throw new Error('Você já possui uma pasta com esse nome')
    }

    const folderId = inputDTO.data.folderId ? new Id(inputDTO.data.folderId) : new Id()

    await this.gateway.createFolder(userId, folderId, inputDTO.data.folderName)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
