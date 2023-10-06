import { HighlightsMemeUseCase } from "../../../usecases/meme/highlight-meme-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class HighlightsMemeController implements Controller {
  async handle(body: any) {
    const useCase = new HighlightsMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        page: body.page,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    const highlights: Array<unknown> = []
    data.highlights.forEach(meme => {
      const tags: Array<{ name: string }> = []
      meme.tags.forEach(tag => tags.push({ name: tag.name }))

      highlights.push({
        id: meme.id.toString(),
        authorId: meme.authorId.toString(),
        content: {
          uri: meme.content.uri
        },
        tags
      })
    })

    return new Response(JSON.stringify(highlights), { status: 200 })
  }
}
