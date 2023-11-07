/* eslint-disable @typescript-eslint/no-explicit-any */

import Content from '../../src/domain/Content'
import Comment from '../../src/domain/Comment'

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
    content: new Content('kkkkk'),
  }
})

test('it should not be able to create a new meme if meme id is invalid', () => {
  expect(() =>
    Comment.create(undefined as any, comment.authorId, comment.content),
  ).toThrow('O id fornecido não é um UUID válido')
})

test('it should not be able to create a new meme if author id is invalid', () => {
  expect(() =>
    Comment.create(comment.memeId, undefined as any, comment.content),
  ).toThrow('O id fornecido não é um UUID válido')
})

test('it should be able get id', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  expect(c.commentId).toBeDefined()
})

test('it should be able get meme id', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  expect(c.memeId.getValue()).toStrictEqual(comment.memeId)
})

test('it should be able get author id', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  expect(c.authorId.getValue()).toStrictEqual(comment.authorId)
})

test('it should be able get content', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  expect(c.content.body).toStrictEqual(comment.content.body)
})

test('it should be able upvote comment', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  c.upvote()

  expect(c.getUpvotes()).toStrictEqual(1)
})

test('it should be able downvote comment', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  c.downvote()

  expect(c.getUpvotes()).toStrictEqual(-1)
})

test('it should be able downvote comment', () => {
  const c = Comment.create(comment.memeId, comment.authorId, comment.content)

  c.downvote()

  expect(c.getUpvotes()).toStrictEqual(-1)
})

test('it should not be able downvote comment if qty of upvotes is invalid', () => {
  const commentCreate = Comment.create(
    comment.memeId,
    comment.authorId,
    comment.content,
  )

  const c = Comment.restore(
    commentCreate.commentId.getValue(),
    commentCreate.memeId.getValue(),
    commentCreate.authorId.getValue(),
    commentCreate.content,
    Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
  )

  expect(() => c.upvote()).toThrow('Quantidade de upvotes invalida')
})

test('it should not be able downvote comment if qty of downvotes is invalid', () => {
  const commentCreate = Comment.create(
    comment.memeId,
    comment.authorId,
    comment.content,
  )

  const c = Comment.restore(
    commentCreate.commentId.getValue(),
    commentCreate.memeId.getValue(),
    commentCreate.authorId.getValue(),
    commentCreate.content,
    Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
  )

  expect(() => c.downvote()).toThrow('Quantidade de downvotes invalida')
})
