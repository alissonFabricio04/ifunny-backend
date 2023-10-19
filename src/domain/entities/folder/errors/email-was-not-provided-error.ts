export class ThumbnailWasNotProvidedError extends Error {
  constructor() {
    super('Thumbnail não foi fornecido')
  }
}
