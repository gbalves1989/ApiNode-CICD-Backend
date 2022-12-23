import { ShowUserService } from './../../services/users/ShowUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ShowUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService)
    const id = request.user_id
    const user = await showUserService.show({ id })

    return response.json(user)
  }
}
