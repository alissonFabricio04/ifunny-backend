export class BadFormattedEmailError extends Error {
  constructor() {
    super("E-mail mal formatado")
  }
}