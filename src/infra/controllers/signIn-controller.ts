import { SignInUseCase } from '../../usecases/user/signIn-use-case'
import { NotificationAdapterImpl } from '../adapters/notification/email/notification-adapter-impl'
import { UserGatewayImpl } from '../gateways/user-gateway-impl'
import { Controller } from './controller'

export class SignInController implements Controller {
  async handle(request: Request) {
    if (!request.body?.values()) {
      throw new Error('Falta de conteúdo na requisição')
    }

    const body = await Bun.readableStreamToJSON(
      request.body ?? new ReadableStream(),
    )

    const useCase = new SignInUseCase(
      new UserGatewayImpl(),
      new NotificationAdapterImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        username: body.username,
        password: body.password,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  }
}
