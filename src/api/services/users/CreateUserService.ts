import { UserEntity } from './../../repositories/users/UserEntity'
import { CreateUserDTO } from './../../repositories/users/UserDTO'
import { IUserRespository } from './../../repositories/users/IUserRepository'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { ApiError } from '../../../shared/errors/ApiError'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRespository,
  ) {}

  async create({ ...props }: CreateUserDTO): Promise<UserEntity> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(
      props.email,
    )

    if (userEmailAlreadyExists) {
      const message = 'Email já existe.'
      const statusCode = 400
      throw new ApiError({ message, statusCode })
    }

    const passwordHash = await hash(props.password, 8)
    props.password = passwordHash
    return this.userRepository.create({ ...props })
  }
}
