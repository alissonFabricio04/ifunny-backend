export class AccountIsAlreadyActiveError extends Error {
  constructor() {
    super('Conta já está ativa')
  }
}