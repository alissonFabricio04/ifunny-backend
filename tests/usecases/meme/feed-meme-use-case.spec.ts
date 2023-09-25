import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { Id } from '../../../src/entities/id/model/id-value-object'
import { MemeGateway } from '../../../src/entities/meme/gateways/meme-gateway'
import { Meme } from '../../../src/entities/meme/model/meme'
import { FeedMemeUseCase } from '../../../src/usecases/meme/feed-meme-use-case'

describe('Suite test for testing feed meme use case', () => {
  let meme01: Meme
  let meme02: Meme
  let memes: Array<Meme>
  let gateway: MemeGateway
  let feedMemeUseCase: FeedMemeUseCase

  beforeEach(() => {
    meme01 = new Meme(
      new Id('d262ab0d-6d32-4a12-a651-06af51c40a69'),
      new Id('5d86c647-3265-4cf4-babb-e5ce353a446a'),
      { uri: 's3://meu-bucket/arquivo-de-teste03.mp3' },
      [
        { name: 'nazismo', weight: 10 },
        { name: 'é', weight: 2 },
        { name: 'uma', weight: 2 },
        { name: 'merda', weight: 10 },
      ],
    )
    meme02 = new Meme(
      new Id('7996dc77-4da0-4cab-b172-1296ed891800'),
      new Id('8de4254c-f75f-4a77-a885-7b41de1b0cea'),
      { uri: 's3://meu-bucket/arquivo-de-teste02.mp3' },
      [
        { name: 'nazismo', weight: 10 },
        { name: 'é', weight: 2 },
        { name: 'um', weight: 2 },
        { name: 'lixo', weight: 10 },
      ],
    )

    memes = [meme01, meme02]

    gateway = {
      publish: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      addComment: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(memes[0])),
      memesInLast1h: () => new Promise((resolve) => resolve(memes)),
      lastLikes: () => new Promise((resolve) => resolve([meme01])),
    } satisfies MemeGateway

    feedMemeUseCase = new FeedMemeUseCase(gateway)
  })

  test('it should be able receive meme from feed', async () => {
    const input = {
      data: {
        userId: '8f451c11-ef44-4970-a4f8-e083ed6f5c62',
        alreadySeen: [{ id: meme01.id.toString() }],
      },
    }

    await expect(await feedMemeUseCase.handle(input)).toStrictEqual({
      status: 'SUCCESS',
      data: {
        recommendations: [meme02],
      },
    })
  })
})
