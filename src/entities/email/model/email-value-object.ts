import { BadFormattedEmailError } from "../errors/email-with-format-invalid-error";

export class Email {
  constructor(private _email: string) {
    this.email = _email
  }

  private get email(): string {
    return this._email
  }

  private set email(email: string) {
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ;/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!regexEmail.test(email)) {
      throw new BadFormattedEmailError()
    }

    this._email = email
  }

  public toString(): string {
    return this.email
  }
}