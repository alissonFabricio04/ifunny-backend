export class PasswordHasNoSpecialCharactersError extends Error {
  constructor() {
    super('A senha deve possuir pelo menos um caractere especial')
  }
}
