import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { Id } from '../../../src/domain/value-objects/id/model/id-value-object'
import { DownvoteCommentUseCase } from '../../../src/usecases/comment/downvote-comment-use-case'
import { CommentGateway } from '../../../src/domain/entities/comment/gateways/comment-gateway'
import { Comment } from '../../../src/domain/entities/comment/model/comment'

describe('Suite test for testing downvote comment use case', () => {
  let comment: Comment
  let gateway: CommentGateway
  let downvoteCommentUseCase: DownvoteCommentUseCase

  beforeEach(() => {
    comment = new Comment(
      new Id('d262ab0d-6d32-4a12-a651-06af51c40a69'),
      new Id('5d86c647-3265-4cf4-babb-e5ce353a446a'),
      new Id('8f451c11-ef44-4970-a4f8-e083ed6f5c62'),
      {
        midia: {
          postId: new Id('7974656c-844c-4b30-ad68-1a3b07aff18b')
        },
        text: 'KKKKKKKKKKKKKKKKKKKKKK'
      }
    )

    gateway = {
      addComment: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      postExists: () => new Promise((resolve) => resolve(true)),
      getComments: () => new Promise((resolve) => resolve([comment])),
      find: () => new Promise((resolve) => resolve(comment)),
      upvoteComment: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      downvoteComment: jest.fn().mockImplementationOnce(() => Promise.resolve()),
    } satisfies CommentGateway

    downvoteCommentUseCase = new DownvoteCommentUseCase(gateway)
  })

  test('it should be able downvote comment', async () => {
    const input = {
      data: {
        userId: '8f451c11-ef44-4970-a4f8-e083ed6f5c62',
        commentId: comment.id.toString(),
      },
    }

    await expect(await downvoteCommentUseCase.handle(input)).toStrictEqual({
      status: 'SUCCESS',
      data: {},
    })
  })
})
