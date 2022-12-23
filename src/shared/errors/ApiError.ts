interface IApiError {
  message: string
  statusCode: number
}

export class ApiError {
  public readonly message: string
  public readonly statusCode: number

  constructor({ message, statusCode }: IApiError) {
    this.message = message
    this.statusCode = statusCode
  }
}
