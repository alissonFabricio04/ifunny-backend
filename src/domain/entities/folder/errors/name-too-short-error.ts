export class NameTooShortError extends Error {
  constructor() {
    super('O nome da pasta é muito curto')
  }
}
