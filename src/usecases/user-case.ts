export interface UseCase<G, I, O> {
  readonly gateway: G

  handle: (input: DTO<I>) => Promise<DTO<O>>
}

export interface DTO<D> {
  status: 'SUCCESS' | 'ERROR'
  data: D
}
