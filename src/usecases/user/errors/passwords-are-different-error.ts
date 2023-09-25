export class PasswordsAreDifferentError extends Error {
  constructor() {
    super('Senhas são diferentes')
  }
}
