import { Id } from '../../../value-objects/id/model/id-value-object'
import { InvalidTagWeightError } from '../errors/invalid-tag-weight-error'
import { IdWasNotProvidedError } from '../errors/id-was-not-provided-error'
import { TagContainsWhiteSpacesError } from '../errors/tag-contains-white-spaces-error'
import { TagLimitReachedError } from '../errors/tag-limit-reached-error'
import { TagsWithInvalidFormatError } from '../errors/tags-with-invalid-format-error'
import { MemeWithoutContentError } from '../errors/meme-without-content-error'
import { TagsNotProvidedError } from '../errors/tags-not-provided-error'
import { Content } from '../../../value-objects/midia/model/content-value-object'

export type Tag = {
  name: string
  weight: number
}

export class Meme {
  constructor(
    private _id: Id,
    private _authorId: Id,
    private _content: Content,
    private _tags: Array<Tag>,
  ) {
    this.id = _id
    this.authorId = _authorId
    this.content = _content
    this.tags = _tags
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

  public get authorId() {
    return this._authorId
  }

  private set authorId(authorId: Id) {
    if (!(authorId satisfies Id) || !authorId || !('id' in authorId)) {
      throw new IdWasNotProvidedError()
    }
  }

  public get content() {
    return this._content
  }

  private set content(content: Content) {
    // console.log(
    //   !(content satisfies Content) ||
    //   !content ||
    //   !('content' in content),
    //   content
    // )

    if (
      !(content satisfies Content) ||
      !content ||
      !('content' in content)
    ) {
      throw new MemeWithoutContentError()
    }

    // const url = new URL(content.toString() ?? Bun.env.SELF_URL)
    // if (!(url.protocol === 's3:')) {
    //   throw new MemeURIInvalidError()
    // }

    this._content = content
  }

  public get tags() {
    return this._tags
  }

  private set tags(tags: Array<Tag>) {
    if (!(tags satisfies Array<Tag>) || !tags) {
      throw new TagsWithInvalidFormatError()
    }

    if (tags.length <= 0) {
      throw new TagsNotProvidedError()
    }

    if (tags.length > 20) {
      throw new TagLimitReachedError()
    }

    for (let index = 0; index < tags.length; index++) {
      if (!tags[index].name || tags[index].name.length > 100) {
        throw new TagContainsWhiteSpacesError()
      }

      if (
        tags[index].weight < 0 ||
        isNaN(tags[index].weight) ||
        !isFinite(tags[index].weight) ||
        !Number.isSafeInteger(tags[index].weight)
      ) {
        throw new InvalidTagWeightError()
      }

      tags[index].name = tags[index].name.toLowerCase()
    }

    this._tags = tags
  }

  public addTag(tag: Tag) {
    if (this._tags.length > 20) {
      throw new TagLimitReachedError()
    }

    this.tags = [...this.tags, tag]
  }

  public removeTag(tag: Tag) {
    this.tags = this._tags.filter(
      (current) =>
        String(current.name).toUpperCase() !== String(tag.name).toUpperCase(),
    )
  }
}
