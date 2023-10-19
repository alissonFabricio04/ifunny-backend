export class NameWasNotProvidedError extends Error {
  constructor() {
    super('O nome da pasta não foi fornecido')
  }
}
