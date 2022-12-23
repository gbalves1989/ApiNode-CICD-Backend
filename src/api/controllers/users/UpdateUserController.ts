import { UpdateUserService } from './../../services/users/UpdateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateUserController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserService)
    const id = request.user_id
    const { ...props } = request.body
    const user = await updateUserService.update(id, { ...props })

    return response.json(user)
  }
}
