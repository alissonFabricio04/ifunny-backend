export class TagContainsSpacesError extends Error {
  constructor() {
    super('As tags não podem conter espaços')
  }
}