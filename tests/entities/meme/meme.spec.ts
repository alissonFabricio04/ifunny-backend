/* eslint-disable @typescript-eslint/no-explicit-any */

import { beforeEach, describe, expect, test } from 'bun:test'

import { Image, Meme, Tag } from '../../../src/entities/meme/model/meme'
import { Id } from '../../../src/entities/id/model/id-value-object'

describe('Suite test for testing meme entity', () => {
  let meme: {
    id: string
    authorId: string
    content: { uri: string }
    tags: Array<Tag>
  }

  beforeEach(() => {
    meme = {
      id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
      authorId: '5d86c647-3265-4cf4-babb-e5ce353a446a',
      content: { uri: 's3://meu-bucket/arquivo-de-teste.mp3' },
      tags: [
        { name: 'nazismo', weight: 10 },
        { name: 'é', weight: 2 },
        { name: 'uma', weight: 2 },
        { name: 'merda', weight: 10 },
      ],
    }
  })

  test('it should not be able to create a new meme if id is invalid', () => {
    expect(
      () => new Meme({} as Id, new Id(meme.authorId), meme.content, meme.tags),
    ).toThrow('Id não foi fornecido')
  })

  test('it should not be able to create a new meme if author id is invalid', () => {
    expect(() => new Meme(new Id(), {} as Id, meme.content, meme.tags)).toThrow(
      'Id não foi fornecido',
    )
  })

  test('it should not be able to create a new meme without content', () => {
    expect(
      () => new Meme(new Id(), new Id(meme.authorId), {} as Image, meme.tags),
    ).toThrow('Não é criar um novo meme sem conteúdo')
  })

  test('it should not be able to create a new meme with content URI invalid', () => {
    expect(
      () =>
        new Meme(
          new Id(),
          new Id(meme.authorId),
          { uri: 'http://site.com/arquivo-de-teste.mp3' },
          meme.tags,
        ),
    ).toThrow('URI de conteúdo inválida')
  })

  test('it should not be able to create a new meme without tags', () => {
    expect(
      () => new Meme(new Id(), new Id(meme.authorId), meme.content, []),
    ).toThrow('Não é possível criar um novo meme sem tags')
  })

  test('it should not be able to create a new meme if tags are invalids', () => {
    expect(
      () =>
        new Meme(
          new Id(),
          new Id(meme.authorId),
          meme.content,
          undefined as any,
        ),
    ).toThrow('Tags com formato inválido')
  })

  test('it should not be able to create a new meme if tags contains white spaces', () => {
    const tag = {} as Tag
    expect(
      () => new Meme(new Id(), new Id(meme.authorId), meme.content, [tag]),
    ).toThrow('As tags não podem conter espaços')
  })

  test('it should not be able to create a new meme if exists tags with weight invalid', () => {
    expect(
      () =>
        new Meme(new Id(), new Id(meme.authorId), meme.content, [
          { name: 'shitpost', weight: Infinity },
        ]),
    ).toThrow('Peso da tag invalido')
  })

  test('it should not be able to create a new meme if the number of tags exceeds 20', () => {
    const tags: Array<Tag> = []
    for (let i = 0; i < 23; i++) {
      tags.push({ name: 'shitpost', weight: 10 })
    }

    expect(
      () => new Meme(new Id(), new Id(meme.authorId), meme.content, tags),
    ).toThrow('Limite de tags atingido')
  })

  test('it should be able to create a meme', () => {
    const tags: Array<Tag> = []
    for (let i = 0; i < 19; i++) {
      tags.push({ name: 'shitpost', weight: 10 })
    }

    expect(
      new Meme(new Id(), new Id(meme.authorId), meme.content, tags),
    ).toBeInstanceOf(Meme)
  })

  test('it should be able get id', () => {
    const m = new Meme(
      new Id(meme.id),
      new Id(meme.authorId),
      meme.content,
      meme.tags,
    )

    expect(m.id).toStrictEqual(new Id(meme.id))
  })

  test('it should be able get author id', () => {
    const m = new Meme(
      new Id(meme.id),
      new Id(meme.authorId),
      meme.content,
      meme.tags,
    )

    expect(m.authorId).toStrictEqual(new Id(meme.authorId))
  })

  test('it should be able get content', () => {
    const m = new Meme(
      new Id(meme.id),
      new Id(meme.authorId),
      meme.content,
      meme.tags,
    )

    expect(m.content).toStrictEqual(meme.content)
  })

  test('it should be able get tags', () => {
    const m = new Meme(
      new Id(meme.id),
      new Id(meme.authorId),
      meme.content,
      meme.tags,
    )

    expect(m.tags).toStrictEqual(meme.tags)
  })

  test('it should be able add new tags', () => {
    const m = new Meme(
      new Id(meme.id),
      new Id(meme.authorId),
      meme.content,
      meme.tags,
    )

    m.addTag({ name: 'engraçado', weight: 1 })

    expect(m.tags).toStrictEqual([
      ...meme.tags,
      { name: 'engraçado', weight: 1 },
    ])
  })

  test('it should be able add new tags', () => {
    const m = new Meme(new Id(meme.id), new Id(meme.authorId), meme.content, [
      ...meme.tags,
      { name: 'engraçado', weight: 1 },
    ])

    m.removeTag({ name: 'engraçado', weight: 1 })

    expect(m.tags).toStrictEqual(meme.tags)
  })
})
