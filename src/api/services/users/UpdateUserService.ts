import { UserEntity } from './../../repositories/users/UserEntity'
import { UpdateUserDTO } from './../../repositories/users/UserDTO'
import { IUserRespository } from './../../repositories/users/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { ApiError } from '../../../shared/errors/ApiError'

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRespository,
  ) {}

  async update(id: string, { ...props }: UpdateUserDTO): Promise<UserEntity> {
    const user = this.userRepository.findById(id)

    if (!user) {
      const message = 'Usuário não encontrado.'
      const statusCode = 404
      throw new ApiError({ message, statusCode })
    }

    return this.userRepository.update(id, { ...props })
  }
}
