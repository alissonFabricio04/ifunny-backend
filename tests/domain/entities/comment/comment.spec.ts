/* eslint-disable @typescript-eslint/no-explicit-any */

import { beforeEach, describe, expect, test } from 'bun:test'

import { Id } from '../../../../src/domain/value-objects/id/model/id-value-object'
import { Comment, Content } from '../../../../src/domain/entities/comment/model/comment'

describe('Suite test for testing comment entity', () => {
  let comment: {
    id: string
    memeId: string
    authorId: string
    content: Content
  }

  beforeEach(() => {
    comment = {
      id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
      memeId: '46bde1e6-cbde-4f55-ae37-fcb3739d7b44',
      authorId: '5d86c647-3265-4cf4-babb-e5ce353a446a',
      content: {
        midia: { postId: new Id('fe47aca2-ae0c-41f5-8e7d-d70329f69c9d') },
        text: 'literalmente eu',
      },
    }
  })

  test('it should not be able to create a new comment if id is invalid', () => {
    expect(
      () =>
        new Comment(
          {} as Id,
          new Id(comment.memeId),
          new Id(comment.authorId),
          comment.content,
        ),
    ).toThrow('Id não foi fornecido')
  })

  test('it should not be able to create a new meme if meme id is invalid', () => {
    expect(
      () =>
        new Comment(
          new Id(),
          {} as Id,
          new Id(comment.authorId),
          comment.content,
        ),
    ).toThrow('Id não foi fornecido')
  })

  test('it should not be able to create a new meme if author id is invalid', () => {
    expect(
      () =>
        new Comment(
          new Id(),
          new Id(comment.memeId),
          {} as Id,
          comment.content,
        ),
    ).toThrow('Id não foi fornecido')
  })

  test('it should not be able to create a new meme if commet is invalid', () => {
    expect(
      () =>
        new Comment(
          new Id(comment.id),
          new Id(comment.memeId),
          new Id(comment.authorId),
          {} as Content,
        ),
    ).toThrow('Não é possível fazer um comentario sem conteúdo')
  })

  test('it should be able get id', () => {
    const c = new Comment(
      new Id(comment.id),
      new Id(comment.memeId),
      new Id(comment.authorId),
      comment.content,
    )

    expect(c.id).toStrictEqual(new Id(comment.id))
  })

  test('it should be able get meme id', () => {
    const c = new Comment(
      new Id(comment.id),
      new Id(comment.memeId),
      new Id(comment.authorId),
      comment.content,
    )

    expect(c.memeId).toStrictEqual(new Id(comment.memeId))
  })

  test('it should be able get author id', () => {
    const c = new Comment(
      new Id(comment.id),
      new Id(comment.memeId),
      new Id(comment.authorId),
      comment.content,
    )

    expect(c.authorId).toStrictEqual(new Id(comment.authorId))
  })

  test('it should be able get content', () => {
    const c = new Comment(
      new Id(comment.id),
      new Id(comment.memeId),
      new Id(comment.authorId),
      comment.content,
    )

    expect(c.content).toStrictEqual(comment.content)
  })
})
