import Name from '../../src/domain/Name'

test('it should not be able create new name instance if name not informed', () => {
  expect(() => new Name('')).toThrow('Nome não foi fornecido')
})

test('it should not be able create new name instance if name is too short', () => {
  expect(() => new Name('a')).toThrow('Nome muito curto')
})

test('it should not be able create new name instance if name is too long', () => {
  expect(
    () =>
      new Name(
        'Aa1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ),
  ).toThrow('Nome muito longo')
})

test('it should not be able create new name instance if name has special characters', () => {
  expect(() => new Name('@@@@@')).toThrow(
    'Nome não deve possuir caracteres especias',
  )
})

test('it should be able get body content', () => {
  const name = new Name('wftDeNome')
  expect(name.getValue()).toStrictEqual('wftDeNome')
})
