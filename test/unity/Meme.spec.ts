/* eslint-disable @typescript-eslint/no-explicit-any */

import Id from '../../src/domain/Id'
import Meme from '../../src/domain/Meme'
import { StatusFactory } from '../../src/domain/Status'
import Tag from '../../src/domain/Tag'

let meme: {
  authorId: string
  content: string
  tags: { name: string }[]
}

beforeEach(() => {
  meme = {
    authorId: '5d86c647-3265-4cf4-babb-e5ce353a446a',
    content:
      'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII=',
    tags: [
      { name: 'nazismo' },
      { name: 'é' },
      { name: 'uma' },
      { name: 'merda' },
    ],
  }
})

test('it should not be able to create a new meme if the number of tags exceeds 20', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 23; i++) {
    tags.push({ name: 'shitpost' })
  }

  expect(() => Meme.create(meme.authorId, meme.content, tags)).toThrow(
    'Limite de tags atingido',
  )
})

test('it should not be able to given upvotes in a meme if the number of upvotes is invalid', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 10; i++) {
    tags.push({ name: 'shitpost' })
  }

  const m = Meme.restore(
    '7604aa63-3336-42ae-a7a7-c20db5569a2a',
    meme.authorId,
    meme.content,
    tags,
    Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
    'visible',
  )

  expect(() => m.upvote()).toThrow('Quantidade de upvotes invalida')
})

test('it should not be able to given downvotes in a meme if the number of upvotes is invalid', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 10; i++) {
    tags.push({ name: 'shitpost' })
  }

  const m = Meme.restore(
    '7604aa63-3336-42ae-a7a7-c20db5569a2a',
    meme.authorId,
    meme.content,
    tags,
    Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER,
    'visible',
  )

  expect(() => m.downvote()).toThrow('Quantidade de downvotes invalida')
})
test('it should be able to create a meme', () => {
  expect(Meme.create(meme.authorId, meme.content, meme.tags)).toBeInstanceOf(
    Meme,
  )
})

test('it should be able to upvote the meme', () => {
  const m = Meme.create(meme.authorId, meme.content, meme.tags)
  m.upvote()

  expect(m.getUpvotes()).toStrictEqual(1)
})

test('it should be able to downvote the meme', () => {
  const m = Meme.create(meme.authorId, meme.content, meme.tags)
  m.downvote()

  expect(m.getUpvotes()).toStrictEqual(-1)
})

test('it should not be able to add new tag if limit has already been reached', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 20; i++) {
    tags.push({ name: 'shitpost' })
  }

  const m = Meme.create(meme.authorId, meme.content, tags)

  expect(() => m.addTag('test1')).toThrow('Limite de tags atingido')
})

test('it should be able get id', () => {
  const m = Meme.create(meme.authorId, meme.content, meme.tags)

  expect(m.memeId.getValue()).toBeDefined()
})

test('it should be able get author id', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 20; i++) {
    tags.push({ name: 'shitpost' })
  }

  const m = Meme.create(meme.authorId, meme.content, tags)

  expect(m.authorId).toStrictEqual(new Id(meme.authorId))
})

test('it should be able get content', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 20; i++) {
    tags.push({ name: 'shitpost' })
  }

  const m = Meme.create(meme.authorId, meme.content, tags)

  expect(m.content.getContent()).toStrictEqual(meme.content)
})

test('it should be able get tags', () => {
  const tags = [{ name: 'shitpost' }]
  const m = Meme.create(meme.authorId, meme.content, tags)

  expect(m.getTags()).toStrictEqual([new Tag('shitpost')])
})

test('it should be able add new tags', () => {
  const tags = [{ name: 'shitpost' }]
  const m = Meme.create(meme.authorId, meme.content, tags)

  m.addTag('engraçado')

  expect(m.getTags()).toStrictEqual([new Tag('shitpost'), new Tag('engraçado')])
})

test('it should be able remove tags', () => {
  const tags = [{ name: 'shitpost' }]
  const m = Meme.create(meme.authorId, meme.content, tags)

  m.removeTag('engraçado')

  expect(m.getTags()).toStrictEqual([new Tag('shitpost')])
})

test('it should be able get status', () => {
  const tags = [{ name: 'shitpost' }]
  const m = Meme.create(meme.authorId, meme.content, tags)

  expect(m.getStatus().value).toStrictEqual('visible')
})

test('it should be able set status', () => {
  const tags = [{ name: 'shitpost' }]
  const m = Meme.create(meme.authorId, meme.content, tags)

  m.setStatus(StatusFactory.create(m, 'invisible'))

  expect(m.getStatus().value).toStrictEqual('invisible')
})

test('it should be able restore meme state', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 19; i++) {
    tags.push({ name: 'shitpost' })
  }

  expect(
    Meme.restore(
      '7604aa63-3336-42ae-a7a7-c20db5569a2a',
      meme.authorId,
      meme.content,
      tags,
      1,
      'visible',
    ),
  ).toBeInstanceOf(Meme)
})
