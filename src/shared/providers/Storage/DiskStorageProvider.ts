import multerConfig from '../../../config/multer'
import fs from 'fs'
import path from 'path'

export default class DiskStorageProvider {
  public async uploadFile(file: string): Promise<void> {
    const userAvatarFilePath = path.join(multerConfig.directory, file)
    const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

    if (userAvatarFileExists) {
      await fs.promises.unlink(userAvatarFilePath)
    }
  }
}
