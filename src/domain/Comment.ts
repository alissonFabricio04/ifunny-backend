/* eslint-disable no-useless-constructor */

import Content from './Content'
import Id from './Id'

export default class Comment {
  private constructor(
    readonly commentId: Id,
    readonly memeId: Id,
    readonly authorId: Id,
    readonly content: Content,
    private upvotes: number,
  ) {}

  upvote() {
    const newQtyUpvotes = this.upvotes + 1
    if (!this.qtyOfVotesIsValid(newQtyUpvotes)) {
      throw new Error('Quantidade de upvotes invalida')
    }
    this.upvotes = newQtyUpvotes
  }

  downvote() {
    const newQtyUpvotes = this.upvotes - 1
    if (!this.qtyOfVotesIsValid(newQtyUpvotes)) {
      throw new Error('Quantidade de downvotes invalida')
    }
    this.upvotes = newQtyUpvotes
  }

  private qtyOfVotesIsValid(votes: number): boolean {
    if (isNaN(votes) || !isFinite(votes) || !Number.isSafeInteger(votes)) {
      return false
    }
    return true
  }

  static create(memeId: string, authorId: string, content: Content) {
    return new Comment(
      Id.create(),
      new Id(memeId),
      new Id(authorId),
      content,
      0,
    )
  }

  static restore(
    commentId: string,
    memeId: string,
    authorId: string,
    content: Content,
    upvotes: number,
  ) {
    return new Comment(
      new Id(commentId),
      new Id(memeId),
      new Id(authorId),
      content,
      upvotes,
    )
  }

  getUpvotes() {
    return this.upvotes
  }
}
