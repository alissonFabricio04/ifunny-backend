export class PasswordHasNoNumbersError extends Error {
  constructor() {
    super('A senha deve possuir pelo menos um número')
  }
}