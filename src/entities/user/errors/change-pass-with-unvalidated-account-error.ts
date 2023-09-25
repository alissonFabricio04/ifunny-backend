export class ChangePassWithUnvalidatedAccountError extends Error {
  constructor() {
    super('Para alterar a senha, sua conta deve estar validada')
  }
}
