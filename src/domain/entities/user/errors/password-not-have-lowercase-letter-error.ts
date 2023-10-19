export class PasswordNotHaveLowercaseLetterError extends Error {
  constructor() {
    super('A senha deve possuir pelo menos uma letra minúscula')
  }
}
