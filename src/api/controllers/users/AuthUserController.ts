import { AuthUserService } from './../../services/users/AuthUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class AuthUserController {
  async auth(request: Request, response: Response): Promise<Response> {
    const authUserService = container.resolve(AuthUserService)
    const { ...props } = request.body
    const user = await authUserService.auth({ ...props })

    return response.json(user)
  }
}
