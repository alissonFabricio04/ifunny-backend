import Tag from '../../src/domain/Tag'

test('it should not be able create new tag instance if tag name is not informad', () => {
  expect(() => new Tag('')).toThrow('Tag com formato inválido')
})

test('it should not be able create new tag instance if tag name is not informad', () => {
  let tagName = ''
  for (let index = 0; index < 102; index++) {
    tagName += 'a'
  }

  expect(() => new Tag(tagName)).toThrow('Nome de tag muito longo')
})

test('it should not be able create new tag instance if weight is than less 0', () => {
  expect(() => new Tag('one piece', -1)).toThrow('Peso da tag invalido')
})

test('it should not be able create new tag instance if weight is NaN', () => {
  expect(() => new Tag('one piece', NaN)).toThrow('Peso da tag invalido')
})

test('it should not be able create new tag instance if weight is infinity', () => {
  expect(() => new Tag('one piece', Infinity)).toThrow('Peso da tag invalido')
})

test('it should not be able create new tag instance if weight is not safe integer', () => {
  expect(() => new Tag('one piece', Number.MAX_SAFE_INTEGER ** 2)).toThrow(
    'Peso da tag invalido',
  )
})

test('it should be able create new tag instance', () => {
  expect(new Tag('one piece')).toBeInstanceOf(Tag)
})

test('it should be able get tag name', () => {
  const tag = new Tag('one piece')
  expect(tag.getName()).toStrictEqual('one piece')
})

test('it should be able get tag weight', () => {
  const tag = new Tag('one piece', 10)
  expect(tag.getWeight()).toStrictEqual(10)
})
