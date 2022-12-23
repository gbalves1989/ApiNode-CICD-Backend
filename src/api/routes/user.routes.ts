import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'
import multerConfig from '../../config/multer'
import { isAuthenticated } from '../../shared/http/middlewares/isAuthenticated'
import { CreateUserController } from '../controllers/users/CreateUserController'
import { AuthUserController } from '../controllers/users/AuthUserController'
import { ShowUserController } from '../controllers/users/ShowUserController'
import { UpdateUserController } from '../controllers/users/UpdateUserController'
import { UploadAvatarController } from '../controllers/users/UploadAvatarController'

const userRouter = Router()

const upload = multer(multerConfig)

const createUserController = container.resolve(CreateUserController)
const authUserController = container.resolve(AuthUserController)
const showUserController = container.resolve(ShowUserController)
const updateUserController = container.resolve(UpdateUserController)
const uploadAvatarController = container.resolve(UploadAvatarController)

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(10).max(20).required(),
    }),
  }),
  (request, response) => {
    return createUserController.create(request, response)
  },
)

userRouter.post(
  '/auth',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(10).max(20).required(),
    }),
  }),
  (request, response) => {
    return authUserController.auth(request, response)
  },
)

userRouter.get('/me', isAuthenticated, (request, response) => {
  return showUserController.show(request, response)
})

userRouter.patch('/', isAuthenticated, (request, response) => {
  return updateUserController.update(request, response)
})

userRouter.patch(
  '/upload',
  isAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    return uploadAvatarController.upload(request, response)
  },
)

export { userRouter }
