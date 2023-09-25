export interface InDTO<I> {
  data: I
}

export interface OutDTO<O> {
  status: 'SUCCESS' | 'ERROR'
  data: O
}

export interface UseCase<G, I, O> {
  readonly gateway: G

  handle: (input: InDTO<I>) => Promise<OutDTO<O>>
}
