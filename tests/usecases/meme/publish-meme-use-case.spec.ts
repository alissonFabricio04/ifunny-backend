import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { Id } from '../../../src/entities/id/model/id-value-object'
import { MemeGateway } from '../../../src/entities/meme/gateways/meme-gateway'
import { Meme } from '../../../src/entities/meme/model/meme'
import { PublishMemeUseCase } from '../../../src/usecases/meme/publish-meme-use-case'

describe('Suite test for testing publish meme use case', () => {
  let meme: Meme
  let gateway: MemeGateway
  let publishMemeUseCase: PublishMemeUseCase

  beforeEach(() => {
    meme = new Meme(
      new Id('d262ab0d-6d32-4a12-a651-06af51c40a69'),
      new Id('5d86c647-3265-4cf4-babb-e5ce353a446a'),
      { uri: 's3://meu-bucket/arquivo-de-teste.mp3' },
      [
        { name: 'nazismo', weight: 10 },
        { name: 'é', weight: 2 },
        { name: 'uma', weight: 2 },
        { name: 'merda', weight: 10 },
      ],
    )

    gateway = {
      publish: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      addComment: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(meme)),
      memesInLast1h: () => new Promise((resolve) => resolve([meme])),
      lastLikes: () => new Promise((resolve) => resolve([meme])),
    } satisfies MemeGateway

    publishMemeUseCase = new PublishMemeUseCase(gateway)
  })

  test('it should be able publish a new meme', async () => {
    const input = {
      data: {
        authorId: meme.authorId.toString(),
        content: 's3://meu-bucket/arquivo-de-teste.mp3',
        tags: meme.tags,
      },
    }

    await expect(await publishMemeUseCase.handle(input)).toStrictEqual({
      status: 'SUCCESS',
      data: {},
    })
  })
})
