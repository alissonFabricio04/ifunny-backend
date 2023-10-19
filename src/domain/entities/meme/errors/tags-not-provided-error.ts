export class TagsNotProvidedError extends Error {
  constructor() {
    super('Não é possível criar um novo meme sem tags')
  }
}
