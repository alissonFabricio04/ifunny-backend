import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { NotificationAdapter } from '../../../src/adapters/notification-adapter'
import { Email } from '../../../src/entities/email/model/email-value-object'
import { Id } from '../../../src/entities/id/model/id-value-object'
import { UserGateway } from '../../../src/entities/user/gateways/user-gateway'
import { User } from '../../../src/entities/user/model/user'
import { SignInUseCase } from '../../../src/usecases/user/signIn-use-case'

describe('Suite test for testing sign in use case', () => {
  let user: User
  let gateway: UserGateway
  let notificationAdapter: NotificationAdapter<string>
  let signInUseCase: SignInUseCase

  beforeEach(() => {
    user = new User(
      new Id('d262ab0d-6d32-4a12-a651-06af51c40a69'),
      'WtfDeNome',
      new Email('alissonfabricio04@gmail.com'),
      false,
      'Al!ss0n04',
    )

    gateway = {
      save: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(user)),
    } satisfies UserGateway

    notificationAdapter = {
      send: jest.fn().mockImplementationOnce(() => Promise.resolve()),
    } satisfies NotificationAdapter<string>

    signInUseCase = new SignInUseCase(gateway, notificationAdapter)
  })

  test('it should not be able sign in user if user not exists', async () => {
    gateway.find = () => new Promise((resolve) => resolve(null))

    const input = {
      data: {
        username: user.username,
        password: user.password!,
      },
    }

    try {
      await signInUseCase.handle(input)

      expect(true).toStrictEqual(false)
    } catch (error) {
      expect((error as Error).message).toStrictEqual('Usuário não encontrado')
    }
  })

  test('it should not be able sign in user if password are incorrect', async () => {
    const input = {
      data: {
        username: user.username,
        password: user.password!,
      },
    }

    try {
      await signInUseCase.handle(input)

      expect(true).toStrictEqual(false)
    } catch (error) {
      expect((error as Error).message).toStrictEqual('Senhas incorreta')
    }
  })
})
