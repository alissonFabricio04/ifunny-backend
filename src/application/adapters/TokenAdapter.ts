export interface TokenAdapter {
  sign: (data: object) => string
}
