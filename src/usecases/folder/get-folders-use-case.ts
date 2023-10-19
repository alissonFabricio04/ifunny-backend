/* eslint-disable @typescript-eslint/ban-types */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { FolderGateway } from '../../domain/entities/folder/gateways/folder-gateway'
import { UseCase, InDTO, OutDTO } from '../user-case'
import { Folder } from '../../domain/entities/folder/model/folder'

interface InputDTO {
  userId: string
}

interface OutputDTO {
  folders: Folder[]
}

export class GetFoldersUseCase
  implements UseCase<FolderGateway, InputDTO, OutputDTO>
{
  readonly gateway: FolderGateway

  constructor(gateway: FolderGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const userId = new Id(inputDTO.data.userId ?? 'failed')

    const foldersUser = await this.gateway.findAll(userId)

    return {
      status: 'SUCCESS',
      data: {
        folders: foldersUser
      },
    }
  }
}
