import { Id } from "../../id/model/id-value-object"
import { CommentWithoutContentError } from "../errors/comment-without-content-error"
import { IdWasNotProvidedError } from "../errors/id-was-not-provided-error"
import { TagContainsSpacesError } from "../errors/tag-contains-spaces-error"
import { TagLimitReachedError } from "../errors/tag-limit-reached-error"
import { TagsWithInvalidFormatError } from "../errors/tags-with-invalid-format-error"

export type Tag = {
  name: string
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
    if (!(content satisfies Image) || !(content satisfies Video) || !content || !('uri' in content)) {
      throw new CommentWithoutContentError()
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

    let errors = []
    for (let index = 0; index < tags.length; index++) {
      if(!tags[index].name || tags[index].name.includes(" ")) {
        errors.push(new TagContainsSpacesError())
      }
    }

    if(errors.length > 0) {
      throw new TagContainsSpacesError()
    }

    this._tags = tags
  }

  public addTag(tag: Tag) {
    if(this._tags.length > 6) {
      throw new TagLimitReachedError()
    }

    this.tags = [...this.tags, tag]
  }
  
  public removeTag(tag: Tag) {
    this.tags = [...this._tags.filter(current => String(current.name).toUpperCase() !== String(tag).toUpperCase())]
  }
}
