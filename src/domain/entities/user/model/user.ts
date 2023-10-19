import { Email } from '../../../value-objects/email/model/email-value-object'
import { Id } from '../../../value-objects/id/model/id-value-object'
import { AccountIsAlreadyActiveError } from '../errors/account-is-already-active-error'
import { ChangeEmailWithUnvalidatedAccountError } from '../errors/change-email-with-unvalidated-account-error'
import { ChangePassWithUnvalidatedAccountError } from '../errors/change-pass-with-unvalidated-account-error'
import { EmailWasNotProvidedError } from '../errors/email-was-not-provided-error'
import { IdWasNotProvidedError } from '../errors/id-was-not-provided-error'
import { PasswordHasNoNumbersError } from '../errors/password-has-no-numbers-error'
import { PasswordHasNoSpecialCharactersError } from '../errors/password-has-no-special-characters-error'
import { PasswordNotHaveCapitalLetterError } from '../errors/password-not-have-capital-letter-error'
import { PasswordNotHaveLowercaseLetterError } from '../errors/password-not-have-lowercase-letter-error'
import { PasswordTooLongError } from '../errors/password-too-long-error'
import { PasswordTooShortError } from '../errors/password-too-short-error'
import { UsernameHasSpecialCharactersError } from '../errors/username-has-special-characters-error'
import { UsernameTooLongError } from '../errors/username-too-long-error'
import { UsernameTooShortError } from '../errors/username-too-short-error'
import { UsernameWasNotProvidedError } from '../errors/username-was-not-provided-error'

export class User {
  private _isActive: boolean

  constructor(
    private _id: Id,
    private _username: string,
    private _email: Email,
    isActive?: boolean | undefined,
    private _password?: string | undefined,
  ) {
    this.id = _id
    this.username = _username
    this.email = _email
    this.isActive = isActive || false

    if (_password) {
      this.password = _password
    }
  }

  public get id() {
    return this._id
  }

  private set id(id: Id) {
    if (!(id satisfies Id) || !id || !('id' in id)) {
      throw new IdWasNotProvidedError()
    }

    this._id = id
  }

  public get username(): string {
    return this._username
  }

  private set username(username: string) {
    if (!username) {
      throw new UsernameWasNotProvidedError()
    }

    if (username.length <= 1) {
      throw new UsernameTooShortError()
    }

    if (username.length > 40) {
      throw new UsernameTooLongError()
    }

    const specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/

    if (specialCharsPattern.test(username)) {
      throw new UsernameHasSpecialCharactersError()
    }

    this._username = username
  }

  public get email(): Email {
    return this._email
  }

  private set email(email: Email) {
    if (!(email satisfies Email) || !email || !('email' in email)) {
      throw new EmailWasNotProvidedError()
    }

    this._email = email
  }

  public get isActive() {
    return this._isActive
  }

  private set isActive(isActive: boolean) {
    this._isActive = isActive
  }

  public get password(): string | undefined {
    return this._password
  }

  set password(password: string | undefined) {
    if (password) {
      const regexUpperCase = /[A-Z]/
      const regexLowerCase = /[a-z]/
      const regexNumber = /[0-9]/
      const regexSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/

      if (password.length < 8) {
        throw new PasswordTooShortError()
      }

      if (password.length > 100) {
        throw new PasswordTooLongError()
      }

      if (!regexUpperCase.test(password)) {
        throw new PasswordNotHaveCapitalLetterError()
      }

      if (!regexLowerCase.test(password)) {
        throw new PasswordNotHaveLowercaseLetterError()
      }

      if (!regexNumber.test(password)) {
        throw new PasswordHasNoNumbersError()
      }

      if (!regexSpecial.test(password)) {
        throw new PasswordHasNoSpecialCharactersError()
      }

      this._password = password
    }
  }

  public activeAccount() {
    if (this.isActive) {
      throw new AccountIsAlreadyActiveError()
    }

    this.isActive = true
  }

  public changeEmail(email: Email) {
    if (!this.isActive) {
      throw new ChangeEmailWithUnvalidatedAccountError()
    }

    this.email = email
  }

  public changePassword(password: string) {
    if (!this.isActive) {
      throw new ChangePassWithUnvalidatedAccountError()
    }

    this.password = password
  }
}
