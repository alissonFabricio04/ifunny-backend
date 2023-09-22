export class ContentWithInvalidFormatError extends Error {
  constructor() {
    super('Conteúdo com formato inválido')
  }
}