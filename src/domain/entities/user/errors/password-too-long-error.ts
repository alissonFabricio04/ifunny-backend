export class PasswordTooLongError extends Error {
  constructor() {
    super('Senha muito longa')
  }
}
