import Id from './Id'
import Midia from './Midia'
import Status, { StatusFactory } from './Status'
import Tag from './Tag'

export default class Meme {
  private status: Status

  private constructor(
    readonly memeId: Id,
    readonly authorId: Id,
    readonly content: Midia,
    private tags: Tag[],
    private upvotes: number,
    status: string,
  ) {
    this.status = StatusFactory.create(this, status)
  }

  static create(authorId: string, content: string, tags: { name: string }[]) {
    if (tags.length > 20) throw new Error('Limite de tags atingido')

    return new Meme(
      Id.create(),
      new Id(authorId),
      new Midia(content),
      tags.map((tag) => new Tag(tag.name)),
      0,
      'visible',
    )
  }

  static restore(
    memeId: string,
    authorId: string,
    content: string,
    tags: { name: string }[],
    upvotes: number,
    status: string,
  ) {
    return new Meme(
      new Id(memeId),
      new Id(authorId),
      new Midia(content),
      tags.map((tag) => new Tag(tag.name)),
      upvotes,
      status,
    )
  }

  addTag(tagName: string) {
    if (this.tags.length >= 20) throw new Error('Limite de tags atingido')
    const tag = new Tag(tagName)
    const newTags = [...this.tags, tag]
    this.tags = newTags
  }

  removeTag(tag: Tag) {
    const newTags = this.getTags().filter(
      (current) =>
        current.getName().toUpperCase() !== tag.getName().toUpperCase(),
    )
    this.tags = newTags
  }

  upvote() {
    const newQtyUpvotes = this.upvotes + 1
    if (
      // newQtyUpvotes < 0 ||
      isNaN(newQtyUpvotes) ||
      !isFinite(newQtyUpvotes) ||
      !Number.isSafeInteger(newQtyUpvotes)
    ) {
      throw new Error('Quantidade de upvotes invalida')
    }
    this.upvotes = newQtyUpvotes
  }

  downvote() {
    const newQtyUpvotes = this.upvotes - 1
    if (
      // newQtyUpvotes < 0 ||
      isNaN(newQtyUpvotes) ||
      !isFinite(newQtyUpvotes) ||
      !Number.isSafeInteger(newQtyUpvotes)
    ) {
      throw new Error('Quantidade de downvotes invalida')
    }
    this.upvotes = newQtyUpvotes
  }

  getTags() {
    return this.tags
  }

  getUpvotes() {
    return this.upvotes
  }

  getStatus() {
    return this.status
  }

  setStatus(status: Status) {
    this.status = status
  }
}
