import { Id } from '../../../src/domain/value-objects/id'

test('it should not be able create new id instance if string params lenght are than less 6', () => {
  expect(() => new Id('b427')).toThrow('O id fornecido não é um UUID válido')
})

test('it should be able create new id instance', () => {
  expect(new Id('b4277dd3-1f06-4c4a-9e00-1f735788eec3')).toBeInstanceOf(Id)
})

test('it should be able get id value', () => {
  const id = new Id('b4277dd3-1f06-4c4a-9e00-1f735788eec3')
  expect(id.getId()).toStrictEqual('b4277dd3-1f06-4c4a-9e00-1f735788eec3')
})
