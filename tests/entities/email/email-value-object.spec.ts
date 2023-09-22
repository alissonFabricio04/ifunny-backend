import { describe, expect, test } from 'bun:test'

import { Email } from '../../../src/entities/email/email-value-object'

describe('Suite test for validate e-mail', () => {
  test('it should not be able create new e-mail instance if string params is empty', () => {
    expect(() => new Email('')).toThrow('E-mail invalido')
  })

  test('it should be able create new e-mail instance', () => {
    expect(new Email('teste@gmail.com')).toBeInstanceOf(Email)
  })
})
