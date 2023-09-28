import { SignUpUseCase } from '../../usecases/user/signUp-use-case'
import { NotificationAdapterImpl } from '../adapters/notification/email/notification-adapter-impl'
import { UserGatewayImpl } from '../gateways/user-gateway-impl'
import { Controller } from './controller'

export class SignUpController implements Controller {
  async handle(request: Request) {
    if (!request.body?.values()) {
      throw new Error('Falta de conteúdo na requisição')
    }

    const body = await Bun.readableStreamToJSON(
      request.body ?? new ReadableStream(),
    )

    const useCase = new SignUpUseCase(
      new UserGatewayImpl(),
      new NotificationAdapterImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        passwordAgain: body.passwordAgain,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(
      JSON.stringify({
        message: 'Conta criada com sucesso, por favor, valide seu e-mail',
      }),
      {
        status: 201,
      },
    )
  }
}
