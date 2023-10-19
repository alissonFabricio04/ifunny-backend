/* eslint-disable @typescript-eslint/ban-types */

import { sign } from 'jsonwebtoken'

import { UserGateway } from '../../domain/entities/user/gateways/user-gateway'
import { InDTO, OutDTO, UseCase } from '../user-case'
import { NotificationAdapter } from '../../adapters/notification-adapter'
import { UserNotFoundError } from './errors/user-not-found-error'
import { PasswordIncorrect } from './errors/password-incorrect-error'

interface InputDTO {
  username: string
  password: string
}

interface OutputDTO {
  token: string
}

export class SignInUseCase
  implements UseCase<UserGateway, InputDTO, OutputDTO | {}>
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

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO | {}>> {
    if (!inputDTO.data.username || !inputDTO.data.password) {
      throw new Error('Username ou senha inválidos')
    }

    const userExists = await this.gateway.find(inputDTO.data.username)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    try {
      if (!(await Bun.password.verify(inputDTO.data.password, userExists.password || ''))) {
        throw new PasswordIncorrect()
      }
    } catch (error) {
      throw new PasswordIncorrect()
    }

    let tokenForSignIn
    try {
      tokenForSignIn = sign(
        {
          id: userExists.id.toString(),
        },
        Bun.env.JWT_SECRET || '',
        {
          expiresIn: '6h',
        },
      )
    } catch (e) {
      return {
        status: 'ERROR',
        data: {},
      }
    }

    return {
      status: 'SUCCESS',
      data: {
        token: tokenForSignIn,
      },
    }
  }
}
