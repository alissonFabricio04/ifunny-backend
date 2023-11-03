import Content from '../../src/domain/Content'

test('it should not be able create new content instance if neither the body nor the media are informed', () => {
  expect(() => new Content()).toThrow('Conteúdo com formato invalido')
})

test('it should be able get midia id', () => {
  const content = new Content('', '86c31c16-884e-4aeb-b1be-90c0ba6b59d2')
  expect(content.getMidiaId().getValue()).toStrictEqual(
    '86c31c16-884e-4aeb-b1be-90c0ba6b59d2',
  )
})

test('it should be able get body content', () => {
  const content = new Content('kkkkk', '86c31c16-884e-4aeb-b1be-90c0ba6b59d2')
  expect(content.body).toStrictEqual('kkkkk')
})
