export class PasswordTooShortError extends Error {
  constructor() {
    super('Senha muito curta')
  }
}
