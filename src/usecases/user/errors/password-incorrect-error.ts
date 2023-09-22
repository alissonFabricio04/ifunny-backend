export class PasswordIncorrect extends Error {
  constructor() {
    super('Senhas incorreta')
  }
}