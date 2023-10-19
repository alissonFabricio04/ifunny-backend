import { describe, expect, test } from 'bun:test'

import { Email } from '../../../../src/domain/value-objects/email/model/email-value-object'

describe('Suite test for validate e-mail', () => {
  test('it should not be able create new e-mail instance if string params is empty', () => {
    expect(() => new Email('')).toThrow('E-mail mal formatado')
  })

  test('it should be able create new e-mail instance', () => {
    expect(new Email('teste@gmail.com')).toBeInstanceOf(Email)
  })
})
