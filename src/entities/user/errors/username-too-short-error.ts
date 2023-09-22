export class UsernameTooShortError extends Error {
  constructor() {
    super('Username muito curto')
  }
}