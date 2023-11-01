import { randomUUID } from 'crypto'
import { DomainError } from '../error/domain-error'

export class Id {
  private value: string

  constructor(id: string) {
    this.setId(id)
  }

  static create() {
    return new Id(randomUUID())
  }

  getId(): string {
    return this.value
  }

  private setId(id: string) {
    if (
      !id ||
      id.length <= 6 ||
      !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      throw new DomainError('O id fornecido não é um UUID válido')
    }

    this.value = id
  }
}
