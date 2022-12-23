import { Router } from 'express'
import { userRouter } from '../../../api/routes/user.routes'

const router = Router()

router.use('/api/v1/users', userRouter)

export { router }
