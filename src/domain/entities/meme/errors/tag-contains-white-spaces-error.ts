export class TagContainsWhiteSpacesError extends Error {
  constructor() {
    super('As tags não podem conter espaços')
  }
}
