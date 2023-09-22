export class IdNotAreAUUIDError extends Error {
  constructor() {
    super("Id não é um uuid válido")
  }
}