import { IUserRespository } from './../repositories/users/IUserRepository'
import { UserRepository } from '../repositories/users/UserRepository'
import { container } from 'tsyringe'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { AuthUserController } from '../controllers/users/AuthUserController'
import { ShowUserController } from '../controllers/users/ShowUserController'
import { UpdateUserController } from '../controllers/users/UpdateUserController'
import { UploadAvatarController } from '../controllers/users/UploadAvatarController'

container.registerSingleton<IUserRespository>('UserRepository', UserRepository)

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('AuthUserController', AuthUserController)
container.registerSingleton('ShowUserController', ShowUserController)
container.registerSingleton('UpdateUserController', UpdateUserController)
container.registerSingleton('UploadAvatarController', UploadAvatarController)
