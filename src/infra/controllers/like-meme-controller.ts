import { LikeMemeUseCase } from "../../usecases/meme/like-meme-use-case"
import { MemeGatewayImpl } from "../gateways/meme-gateway-impl"

export class LikeMemeController {
  static async handle(request: Request) {
    if (!request.body?.values()) {
      throw new Error('Falta de conteúdo na requisição')
    }

    const body = await Bun.readableStreamToJSON(
      request.body ?? new ReadableStream(),
    )

    const useCase = new LikeMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId,
        memeId: body.memeId
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 200 })
  }
}
