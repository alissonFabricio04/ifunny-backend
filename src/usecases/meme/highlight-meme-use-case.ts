import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Meme } from '../../entities/meme/model/meme'
import { UseCase, InDTO, OutDTO } from '../user-case'

interface InputDTO {
  page: number
}

interface OutputDTO {
  highlights: Array<Meme>
}

export class HighlightsMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    let page = Number(inputDTO.data.page)
    isNaN(page) ? page = 1 : null

    const highlights = await this.gateway.highlights(page)

    return {
      status: 'SUCCESS',
      data: {
        highlights,
      },
    }
  }
}

