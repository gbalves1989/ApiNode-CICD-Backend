import { CreateUserService } from './../../services/users/CreateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService)
    const { ...props } = request.body
    const user = await createUserService.create({ ...props })

    return response.status(201).json(user)
  }
}
