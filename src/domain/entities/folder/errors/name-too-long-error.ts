export class NameTooLongError extends Error {
  constructor() {
    super('O nome da pasta é muito longo')
  }
}
