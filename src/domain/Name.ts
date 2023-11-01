/* eslint-disable no-useless-escape */

export default class Name {
  private value: string

  constructor(name: string) {
    if (!name) throw new Error('Nome não foi fornecido')
    if (name.length <= 1) throw new Error('Nome muito curto')
    if (name.length > 40) throw new Error('Nome muito longo')
    const specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/
    if (specialCharsPattern.test(name)) {
      throw new Error('Nome não deve possuir caracteres especias')
    }
    this.value = name
  }

  getValue() {
    return this.value
  }
}
