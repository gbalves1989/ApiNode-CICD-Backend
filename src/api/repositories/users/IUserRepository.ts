import { UserEntity, UserPassEntity } from './UserEntity'
import { CreateUserDTO, UpdateUserDTO, UploadAvatarDTO } from './UserDTO'

export interface IUserRespository {
  create({ ...props }: CreateUserDTO): Promise<UserEntity>
  update(id: string, { ...props }: UpdateUserDTO): Promise<UserEntity>
  upload(id: string, { ...props }: UploadAvatarDTO): Promise<UserEntity>
  findById(id: string): Promise<UserEntity>
  findByEmail(email: string): Promise<UserPassEntity>
}
