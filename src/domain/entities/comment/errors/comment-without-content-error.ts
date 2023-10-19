export class CommentWithoutContentError extends Error {
  constructor() {
    super('Não é possível fazer um comentario sem conteúdo')
  }
}
