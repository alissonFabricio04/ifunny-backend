export class PasswordNotHaveCapitalLetterError extends Error {
  constructor() {
    super('A senha deve possuir pelo menos uma letra maiúscula')
  }
}