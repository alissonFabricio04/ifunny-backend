import { GetMemesInFolderUseCase } from "../../../usecases/user/get-memes-in-folder-use-case"
import { UserGatewayImpl } from "../../gateways/user-gateway-impl"
import { Controller } from "../controller"

export class GetMemesInFolderController implements Controller {
  async handle(body: any) {
    const useCase = new GetMemesInFolderUseCase(
      new UserGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        folderId: body.folderId
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
