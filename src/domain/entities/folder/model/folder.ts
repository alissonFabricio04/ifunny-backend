import { Id } from '../../../value-objects/id/model/id-value-object'
import { Image } from '../../../value-objects/image/model/image-value-object'
import { ThumbnailWasNotProvidedError } from '../errors/email-was-not-provided-error'
import { IdWasNotProvidedError } from '../errors/id-was-not-provided-error'
import { NameHasSpecialCharactersError } from '../errors/name-has-special-characters-error'
import { NameTooLongError } from '../errors/name-too-long-error'
import { NameTooShortError } from '../errors/name-too-short-error'
import { NameWasNotProvidedError } from '../errors/name-was-not-provided-error'

export class Folder {
  constructor(
    private _id: Id,
    private _name: string,
    private _thumbnail: Image,
  ) {
    this.id = _id
    this.name = _name
    this.thumbnail = _thumbnail
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

  public get name(): string {
    return this._name
  }

  private set name(name: string) {
    if (!name) {
      throw new NameWasNotProvidedError()
    }

    if (name.length <= 1) {
      throw new NameTooShortError()
    }

    if (name.length > 40) {
      throw new NameTooLongError()
    }

    const specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/

    if (specialCharsPattern.test(name)) {
      throw new NameHasSpecialCharactersError()
    }

    this._name = name
  }

  public get thumbnail(): Image {
    return this._thumbnail
  }

  private set thumbnail(thumbnail: Image) {
    if (!(thumbnail satisfies Image) || !thumbnail || !('content' in thumbnail)) {
      throw new ThumbnailWasNotProvidedError()
    }

    this._thumbnail = thumbnail
  }
}
