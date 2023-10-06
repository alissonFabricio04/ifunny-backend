import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Meme } from '../../entities/meme/model/meme'
import { UseCase, InDTO, OutDTO } from '../user-case'

interface InputDTO {
  page: number
}

interface OutputDTO {
  memes: Array<Meme>
}

export class CollectiveMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    let page = Number(inputDTO.data.page)
    isNaN(page) ? page = 1 : null

    const memes = await this.gateway.collective(page)

    return {
      status: 'SUCCESS',
      data: {
        memes,
      },
    }
  }
}

