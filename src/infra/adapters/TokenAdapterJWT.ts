import jsonwebtoken from 'jsonwebtoken'
import { TokenAdapter } from '../../application/adapters/TokenAdapter'

export default class TokenAdapterJWT implements TokenAdapter {
  sign(data: object) {
    return jsonwebtoken.sign(data, 'secret', {
      expiresIn: '1d',
    })
  }
}
