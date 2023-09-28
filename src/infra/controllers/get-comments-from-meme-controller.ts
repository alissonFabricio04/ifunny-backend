import { GetCommentsFromMemeUseCase } from "../../usecases/meme/get-comments-from-meme-use-case"
import { MemeGatewayImpl } from "../gateways/meme-gateway-impl"
import { Controller } from "./controller"

export class GetCommentsFromMemeController implements Controller {
  async handle(body: any) {
    const useCase = new GetCommentsFromMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        memeId: body.memeId,
        page: body.page,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    const comments: Array<unknown> = []
    data.comments.forEach(comment => {
      const midia = comment.content?.midia?.postId.toString() ? 
        { postId: comment.content.midia.postId.toString() } :
        undefined
      
      const text = comment.content?.text ? comment.content?.text : undefined

      comments.push({
        id: comment.id.toString(),
        memeId: comment.memeId.toString(),
        authorId: comment.authorId.toString(),
        content: {
          midia,
          text
        }
      })
    })

    return new Response(JSON.stringify(comments), { status: 200 })
  }
}
