import { UploadAvatarService } from '../../services/users/UploadAvatarService'
import { Request, Response } from 'express'
import { ApiError } from '../../../shared/errors/ApiError'
import { container } from 'tsyringe'

export class UploadAvatarController {
  async upload(request: Request, response: Response): Promise<Response> {
    const uploadAvatarService = container.resolve(UploadAvatarService)
    const id = request.user_id

    if (!request.file) {
      const message = 'Falha ao carregar avatar.'
      const statusCode = 400
      throw new ApiError({ message, statusCode })
    }

    const { originalname, filename: avatar } = request.file
    const user = await uploadAvatarService.upload(id, { avatar })
    return response.json(user)
  }
}
