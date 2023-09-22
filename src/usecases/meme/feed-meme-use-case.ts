import { Id } from "../../entities/id/model/id-value-object"
import { MemeGateway } from "../../entities/meme/gateways/meme-gateway"
import { Meme } from "../../entities/meme/model/meme"
import { UseCase, DTO } from "../user-case"


interface InputDTO {
  pagination: number
}

interface OutputDTO {
  feed: Array<Meme>
}

export class FeedMemeUseCase implements UseCase<MemeGateway, InputDTO, OutputDTO> {
  constructor(
    readonly gateway: MemeGateway
  ) {}

  async handle(inputDTO: DTO<InputDTO>): Promise<DTO<OutputDTO>> {
    if (isNaN(Number(inputDTO.data.pagination)) || 
    !isFinite(Number(inputDTO.data.pagination)) ||
    !Number.isSafeInteger(Number(InputEvent.data.pagination))) {
      throw new Error('Número de paginas invalido')
    }
    
    const feed = await this.gateway.feed(inputDTO.data.pagination)
    
    return {
      status: 'SUCCESS',
      data: {
        feed
      }
    }
  }
}