export class EmailWasNotProvidedError extends Error {
  constructor() {
    super('E-mail não foi fornecido')
  }
}
