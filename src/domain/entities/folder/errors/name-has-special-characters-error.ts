export class NameHasSpecialCharactersError extends Error {
  constructor() {
    super('O nome da pasta não deve possuir caracteres especias')
  }
}
