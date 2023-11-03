import jsonwebtoken from 'jsonwebtoken'
import { TokenAdapter } from '../../application/adapters/TokenAdapter'

export default class TokenAdapterJWT implements TokenAdapter {
  sign(plaintext: string) {
    return jsonwebtoken.sign({ userId: plaintext }, 'secret', {
      expiresIn: '1d',
    })
  }
}
