import { FeedMemeUseCase } from "../../usecases/meme/feed-meme-use-case"
import { MemeGatewayImpl } from "../gateways/meme-gateway-impl"

export class FeedMemeController {
  static async handle(request: Request) {
    if (!request.body?.values()) {
      throw new Error('Falta de conteúdo na requisição')
    }

    const body = await Bun.readableStreamToJSON(
      request.body ?? new ReadableStream(),
    )

    const useCase = new FeedMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId,
        alreadySeen: body.alreadySeen
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(JSON.stringify(data), { status: 200 })
  }
}
