export class UsernameWasNotProvidedError extends Error {
  constructor() {
    super('Username não foi fornecido')
  }
}