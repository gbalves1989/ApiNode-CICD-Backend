import { UserEntity } from './../../repositories/users/UserEntity'
import { ShowUserDTO } from './../../repositories/users/UserDTO'
import { IUserRespository } from './../../repositories/users/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { ApiError } from '../../../shared/errors/ApiError'

@injectable()
export class ShowUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRespository,
  ) {}

  async show({ id }: ShowUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      const message = 'Usuário não encontrado.'
      const statusCode = 404
      throw new ApiError({ message, statusCode })
    }

    return user
  }
}
