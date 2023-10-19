export class MemeWithoutContentError extends Error {
  constructor() {
    super('Não é criar um novo meme sem conteúdo')
  }
}
