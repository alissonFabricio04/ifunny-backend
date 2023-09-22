export class UsernameHasSpecialCharactersError extends Error {
  constructor() {
    super('Username não deve possuir caracteres especias')
  }
}