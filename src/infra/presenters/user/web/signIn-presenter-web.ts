import { OutDTO } from '../../../usecases/user-case'

interface InputDTO {
  token: string
}

export class SignUpPresenterWeb {
  static handle(inputDTO: OutDTO<InputDTO>) {
    return {
      token: inputDTO.data.token,
    }
  }
}
