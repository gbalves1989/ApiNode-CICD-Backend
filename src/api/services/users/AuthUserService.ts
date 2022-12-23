import { AuthUserDTO } from './../../repositories/users/UserDTO'
import { IUserRespository } from './../../repositories/users/IUserRepository'
import { compare, hash } from 'bcryptjs'
import { Secret, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { ApiError } from '../../../shared/errors/ApiError'
import authConfig from '../../../config/auth'
import { AuthTokenEntity } from '../../repositories/users/UserEntity'

@injectable()
export class AuthUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRespository,
  ) {}

  async auth({ ...props }: AuthUserDTO): Promise<AuthTokenEntity> {
    const user = await this.userRepository.findByEmail(props.email)

    if (!user) {
      const message = 'Email ou senha incorreta.'
      const statusCode = 400
      throw new ApiError({ message, statusCode })
    }

    const passwordVerify = await compare(props.password, user.password)

    if (!passwordVerify) {
      const message = 'Email ou senha incorreta.'
      const statusCode = 400
      throw new ApiError({ message, statusCode })
    }

    const token = sign(
      {
        email: user.email,
      },
      authConfig.jwt.secret as Secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    )

    return {
      id: user.id,
      email: user.email,
      token: token,
    }
  }
}
