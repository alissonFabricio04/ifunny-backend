import { FeedMemeUseCase } from "../../../usecases/meme/feed-meme-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class FeedMemeController implements Controller {
  async handle(body: any) {
    const useCase = new FeedMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    const recommendations: Array<unknown> = []
    data.recommendations.forEach(recommendation => {
      const tags: Array<{ name: string }> = []
      recommendation.tags.forEach(tag => tags.push({ name: tag.name }))

      recommendations.push({
        id: recommendation.id.toString(),
        authorId: recommendation.authorId.toString(),
        content: {
          uri: recommendation.content.uri
        },
        tags
      })
    })

    return new Response(JSON.stringify(recommendations), { status: 200 })
  }
}
