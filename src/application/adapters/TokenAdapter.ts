export interface TokenAdapter {
  sign: (plaintext: string) => string
}
