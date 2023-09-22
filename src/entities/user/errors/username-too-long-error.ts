export class UsernameTooLongError extends Error {
  constructor() {
    super('Username muito longo')
  }
}