export class TagLimitReachedError extends Error {
  constructor() {
    super('Limite de tags atingido')
  }
}