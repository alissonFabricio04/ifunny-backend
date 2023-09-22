export class ChangeEmailWithUnvalidatedAccountError extends Error {
  constructor() {
    super('Para alterar o e-mail, sua conta deve estar validada')
  }
}