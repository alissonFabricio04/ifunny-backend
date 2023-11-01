import { randomUUID } from 'node:crypto'

export default class Id {
  private value: string

  constructor(id: string) {
    if (
      !id ||
      id.length <= 6 ||
      !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      throw new Error('O id fornecido não é um UUID válido')
    }
    this.value = id
  }

  static create() {
    return new Id(randomUUID())
  }

  getValue(): string {
    return this.value
  }
}
