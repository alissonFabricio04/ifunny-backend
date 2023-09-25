import { Id } from '../../id/model/id-value-object'
import { InvalidTagWeightError } from '../errors/invalid-tag-weight-error'
// import { CommentWithoutContentError } from '../errors/comment-without-content-error'
import { IdWasNotProvidedError } from '../errors/id-was-not-provided-error'
import { TagContainsWhiteSpacesError } from '../errors/tag-contains-white-spaces-error'
import { TagLimitReachedError } from '../errors/tag-limit-reached-error'
import { TagsWithInvalidFormatError } from '../errors/tags-with-invalid-format-error'
import { MemeWithoutContentError } from '../errors/meme-without-content-error'
import { TagsNotProvidedError } from '../errors/tags-not-provided-error'
import { MemeURIInvalidError } from '../errors/meme-uri-invalid-error'

export type Tag = {
  name: string
  weight: number
}

export type Image = {
  uri: string
}

export type Video = {
  uri: string
}

export class Meme {
  constructor(
    private _id: Id,
    private _authorId: Id,
    private _content: Image | Video,
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

  private set content(content: Image | Video) {
    if (
      !(content satisfies Image) ||
      !(content satisfies Video) ||
      !content ||
      !('uri' in content)
    ) {
      // throw new CommentWithoutContentError()
      throw new MemeWithoutContentError()
    }

    const url = new URL(content.uri)
    if (!(url.protocol === 's3:')) {
      throw new MemeURIInvalidError()
    }

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
      if (!tags[index].name || tags[index].name.includes(' ')) {
        throw new TagContainsWhiteSpacesError()
      }

      if (
        tags[index].weight <= 0 ||
        isNaN(tags[index].weight) ||
        !isFinite(tags[index].weight) ||
        !Number.isSafeInteger(tags[index].weight)
      ) {
        throw new InvalidTagWeightError()
      }
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
