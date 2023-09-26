/* eslint-disable @typescript-eslint/no-empty-interface */
import { sign } from 'jsonwebtoken'

import { Email } from '../../entities/email/model/email-value-object'
import { Id } from '../../entities/id/model/id-value-object'
import { UserGateway } from '../../entities/user/gateways/user-gateway'
import { User } from '../../entities/user/model/user'
import { InDTO, OutDTO, UseCase } from '../user-case'
import { PasswordsAreDifferentError } from './errors/passwords-are-different-error'
import { NotificationAdapter } from '../../adapters/notification-adapter'

interface InputDTO {
  username: string
  email: string
  password: string
  passwordAgain: string
}

interface OutputDTO {}

export class SignUpUseCase
  implements UseCase<UserGateway, InputDTO, OutputDTO>
{
  readonly gateway: UserGateway
  readonly notificationAdapter: NotificationAdapter<string>

  constructor(
    gateway: UserGateway,
    notificationAdapter: NotificationAdapter<string>,
  ) {
    this.gateway = gateway
    this.notificationAdapter = notificationAdapter
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    if (
      !Bun.deepEquals(inputDTO.data.password, inputDTO.data.passwordAgain) ||
      !inputDTO.data.password ||
      !inputDTO.data.passwordAgain
    ) {
      throw new PasswordsAreDifferentError()
    }

    const user = new User(
      new Id(),
      inputDTO.data.username,
      new Email(inputDTO.data.email),
      false,
      inputDTO.data.password,
    )

    const userAlreadyExists = await this.gateway.find(user.username)

    if (userAlreadyExists) {
      throw new Error('E-mail ou username já em uso')
    }

    const tokenForValidateEmail = sign(
      {
        id: user.id.toString(),
      },
      Bun.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      },
    )

    const passwordHash = await Bun.password.hash(user.password || '', {
      algorithm: 'bcrypt'
    })
    user.password = passwordHash

    await this.gateway.save(user)
    await this.notificationAdapter.send(user, 'Validação de e-mail', {
      body: `
        Olá,
        Para validar seu e-mail, <a href="${Bun.env.SELF_URL}/validate-email/${tokenForValidateEmail}">clique aqui</a>
      `,
    })

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
