/* eslint-disable @typescript-eslint/no-explicit-any */

import Id from '../../src/domain/Id'
import Meme from '../../src/domain/Meme'
import Midia from '../../src/domain/Midia'
import Tag from '../../src/domain/Tag'

let meme: {
  id: string
  authorId: string
  content: string
  tags: { name: string }[]
}

beforeEach(() => {
  meme = {
    id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
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

// test('it should not be able to create a new meme without content', () => {
//   expect(
//     () =>
//       Meme.create(
//         meme.authorId,
//         undefined,
//         meme.tags,
//         0,
//         0,
//         {
//           status: 'VISIBLE',
//         },
//       ),
//   ).toThrow('Não é possível fazer um meme sem conteúdo')
// })

// test('it should not be able to create a new meme with content URI invalid', () => {
//   expect(
//     () =>
//       new Meme(
//         new Id(),
//         new Id(meme.authorId),
//         { uri: 'http://site.com/arquivo-de-teste.mp3' },
//         meme.tags,
//       ),
//   ).toThrow('URI de conteúdo inválida')
// })

// test('it should not be able to create a new meme without tags', () => {
//   expect(
//     () =>
//       new Meme(
//         Id.create(),
//         new Id(meme.authorId),
//         new Midia(meme.content),
//         [],
//         0,
//         0,
//         { status: 'VISIBLE' },
//       ),
//   ).toThrow('Tag não foi fornecido')
// })

// test('it should not be able to create a new meme if tags are invalids', () => {
//   expect(
//     () =>
//       new Meme(
//         Id.create(),
//         new Id(meme.authorId),
//         new Midia(meme.content),
//         undefined as any,
//         0,
//         0,
//         { status: 'VISIBLE' },
//       ),
//   ).toThrow('Tag com formato inválido')
// })

// test('it should not be able to create a new meme if tags is not informed', () => {
//   const tag = {} as Tag
//   expect(
//     () =>
//       new Meme(
//         Id.create(),
//         new Id(meme.authorId),
//         new Midia(meme.content),
//         [tag],
//         0,
//         0,
//         { status: 'VISIBLE' },
//       ),
//   ).toThrow('Tag com formato inválido')
// })

// test('it should not be able to create a new meme if exists tags with weight invalid', () => {
//   expect(
//     () =>
//       new Meme(
//         Id.create(),
//         new Id(meme.authorId),
//         new Midia(meme.content),
//         [{ name: 'shitpost', weight: Infinity }],
//         0,
//         0,
//         { status: 'VISIBLE' },
//       ),
//   ).toThrow('Peso da tag invalido')
// })

test('it should not be able to create a new meme if the number of tags exceeds 20', () => {
  const tags: { name: string }[] = []
  for (let i = 0; i < 23; i++) {
    tags.push({ name: 'shitpost' })
  }

  expect(() => Meme.create(meme.authorId, meme.content, tags)).toThrow(
    'Limite de tags atingido',
  )
})

// test('it should not be able to create a new meme if the number of upvotes is invalid', () => {
//   expect(() => Meme.create(meme.authorId, meme.content, tags)).toThrow(
//     'Quantidade de upvotes invalida',
//   )
// })

// test('it should not be able to create a new meme if the number of downvotes is invalid', () => {
//   const tags: Array<Tag> = []
//   for (let i = 0; i < 19; i++) {
//     tags.push({ name: 'shitpost', weight: 10 })
//   }

//   expect(
//     () =>
//       new Meme(
//         Id.create(),
//         new Id(meme.authorId),
//         new Midia(meme.content),
//         tags,
//         0,
//         Infinity,
//         { status: 'VISIBLE' },
//       ),
//   ).toThrow('Quantidade de downvotes invalida')
// })

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
  const m = new Meme(
    new Id(meme.id),
    new Id(meme.authorId),
    new Midia(meme.content),
    meme.tags,
    0,
    0,
    { status: 'VISIBLE' },
  )

  expect(m.getAuthorId()).toStrictEqual(new Id(meme.authorId))
})

test('it should be able get content', () => {
  const m = new Meme(
    new Id(meme.id),
    new Id(meme.authorId),
    new Midia(meme.content),
    meme.tags,
    0,
    0,
    { status: 'VISIBLE' },
  )

  const content = m.getContent()

  expect(content.getContent()).toStrictEqual(meme.content)
})

test('it should be able get tags', () => {
  const m = new Meme(
    new Id(meme.id),
    new Id(meme.authorId),
    new Midia(meme.content),
    meme.tags,
    0,
    0,
    { status: 'VISIBLE' },
  )

  expect(m.getTags()).toStrictEqual(meme.tags)
})

test('it should be able add new tags', () => {
  const m = new Meme(
    new Id(meme.id),
    new Id(meme.authorId),
    new Midia(meme.content),
    meme.tags,
    0,
    0,
    { status: 'VISIBLE' },
  )

  m.addTag({ name: 'engraçado', weight: 1 })

  expect(m.getTags()).toStrictEqual([
    ...meme.tags,
    { name: 'engraçado', weight: 1 },
  ])
})

test('it should be able add new tags', () => {
  const m = new Meme(
    new Id(meme.id),
    new Id(meme.authorId),
    new Midia(meme.content),
    [...meme.tags, { name: 'engraçado', weight: 1 }],
    0,
    0,
    { status: 'VISIBLE' },
  )

  m.removeTag({ name: 'engraçado', weight: 1 })

  expect(m.getTags()).toStrictEqual(meme.tags)
})

test('it should be able get status', () => {
  const m = new Meme(
    new Id(meme.id),
    new Id(meme.authorId),
    new Midia(meme.content),
    meme.tags,
    0,
    0,
    { status: 'VISIBLE' },
  )

  expect(m.getStatus()).toStrictEqual({ status: 'VISIBLE' })
})
