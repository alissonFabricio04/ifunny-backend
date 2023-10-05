import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { NotificationAdapter } from '../../../src/adapters/notification-adapter'
import { Email } from '../../../src/entities/email/model/email-value-object'
import { Id } from '../../../src/entities/id/model/id-value-object'
import { UserGateway } from '../../../src/entities/user/gateways/user-gateway'
import { User } from '../../../src/entities/user/model/user'
import { SignInUseCase } from '../../../src/usecases/user/signIn-use-case'
import { Meme } from '../../../src/entities/meme/model/meme'

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

    const meme = new Meme(
      new Id('7996dc77-4da0-4cab-b172-1296ed891800'),
      new Id('8de4254c-f75f-4a77-a885-7b41de1b0cea'),
      { uri: 's3://meu-bucket/arquivo-de-teste02.mp3' },
      [
        { name: 'nazismo', weight: 1 },
        { name: 'é', weight: 1 },
        { name: 'um', weight: 1 },
        { name: 'lixo', weight: 1 },
      ],
    )

    gateway = {
      save: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(user)),
      alreadyFolderWithThisName: () => new Promise((resolve) => resolve(true)),
      createFolder: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      folderExists: jest.fn().mockImplementationOnce(() => Promise.resolve(true)),
      getFolders: jest.fn().mockImplementationOnce(() => Promise.resolve([])),
      getMemeInFolder: jest.fn().mockImplementationOnce(() => Promise.resolve([meme])),
      repubMeme: jest.fn().mockImplementationOnce(() => Promise.resolve()),
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
