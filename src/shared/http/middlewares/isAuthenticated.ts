import { ApiError } from '../../../shared/errors/ApiError'
import { Request, Response, NextFunction } from 'express'
import { JwtPayload, decode } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization
  if (!authToken) {
    const message = 'Não autorizado.'
    const statusCode = 401
    throw new ApiError({ message, statusCode })
  }

  const token = authToken.replace('Bearer ', '')
  if (!token) {
    const message = 'Não autorizado.'
    const statusCode = 401
    throw new ApiError({ message, statusCode })
  }

  try {
    const decodedToken = decode(token)
    const { sub } = decodedToken as IPayload
    request.user_id = sub

    return next()
  } catch {
    const message = 'Não autorizado.'
    const statusCode = 401
    throw new ApiError({ message, statusCode })
  }
}
