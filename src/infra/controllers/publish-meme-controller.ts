import { PublishMemeUseCase } from "../../usecases/meme/publish-meme-use-case"
import { MemeGatewayImpl } from "../gateways/meme-gateway-impl"

export class PublishMemeController {
  static async handle(request: Request) {
    if (!request.body?.values()) {
      throw new Error('Falta de conteúdo na requisição')
    }

    const body = await Bun.readableStreamToJSON(
      request.body ?? new ReadableStream(),
    )

    const useCase = new PublishMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        authorId: body.authorId,
        content: body.content,
        tags: body.tags,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 201 })
  }
}