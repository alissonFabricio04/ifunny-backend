import { CollectiveMemeUseCase } from "../../../usecases/meme/collective-meme-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class CollectiveMemeController implements Controller {
  async handle(body: any) {
    const useCase = new CollectiveMemeUseCase(
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

    const memes: Array<unknown> = []
    data.memes.forEach(meme => {
      const tags: Array<{ name: string }> = []
      meme.tags.forEach(tag => tags.push({ name: tag.name }))

      memes.push({
        id: meme.id.toString(),
        authorId: meme.authorId.toString(),
        content: {
          uri: meme.content.uri
        },
        tags
      })
    })

    return new Response(JSON.stringify(memes), { status: 200 })
  }
}
