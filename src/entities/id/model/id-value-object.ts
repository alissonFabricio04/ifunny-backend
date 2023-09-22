import { randomUUID } from "crypto"
import { IdNotAreAUUIDError } from "../errors/id-with-format-invalid-error"

export class Id {
  private _id: string

  constructor(id?: string) {
    this.id = id ? id : randomUUID() 
  }

  private get id(): string {
    return this._id
  }

  private set id(id: string) {
    if (
      !id ||
      id.length <= 6 ||
      !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      throw new IdNotAreAUUIDError()
    }

    this._id = id
  }

  public toString(): string {
    return this.id
  }
}