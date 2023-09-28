import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { Id } from '../../../src/entities/id/model/id-value-object'
import { MemeGateway } from '../../../src/entities/meme/gateways/meme-gateway'
import { Meme } from '../../../src/entities/meme/model/meme'
import { AddCommentUseCase } from '../../../src/usecases/meme/add-comment-use-case'

describe('Suite test for testing add comment to meme use case', () => {
  let meme: Meme
  let gateway: MemeGateway
  let addCommentUseCase: AddCommentUseCase

  beforeEach(() => {
    meme = new Meme(
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

    gateway = {
      publish: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      addComment: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(meme)),
      recentMemesNotLikedByUser: () => new Promise((resolve) => resolve([meme])),
      lastLikes: () => new Promise((resolve) => resolve([meme])),
      like: jest.fn().mockImplementationOnce(() => Promise.resolve()),
    } satisfies MemeGateway

    addCommentUseCase = new AddCommentUseCase(gateway)
  })

  test('it should be able add comment to meme', async () => {
    const input = {
      data: {
        memeId: meme.id.toString(),
        authorId: '8f451c11-ef44-4970-a4f8-e083ed6f5c62',
        content: {
          text: 'Isso msm!!! O nazismo foi um momento muito triste da historia, infelizmente',
        },
      },
    }

    await expect(await addCommentUseCase.handle(input)).toStrictEqual({
      status: 'SUCCESS',
      data: {},
    })
  })
})
