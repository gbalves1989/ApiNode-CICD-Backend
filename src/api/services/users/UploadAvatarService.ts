import { UserEntity } from '../../repositories/users/UserEntity'
import { UploadAvatarDTO } from '../../repositories/users/UserDTO'
import { IUserRespository } from '../../repositories/users/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { ApiError } from '../../../shared/errors/ApiError'
import DiskStorageProvider from '../../../shared/providers/Storage/DiskStorageProvider'

@injectable()
export class UploadAvatarService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRespository,
  ) {}

  async upload(id: string, { ...props }: UploadAvatarDTO): Promise<UserEntity> {
    const diskProvider = new DiskStorageProvider()
    const user = await this.userRepository.findById(id)

    if (!user) {
      const message = 'Usuário não encontrado.'
      const statusCode = 404
      throw new ApiError({ message, statusCode })
    }

    if (user.avatar) {
      await diskProvider.uploadFile(user.avatar)
    }

    return this.userRepository.upload(id, { ...props })
  }
}
