import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import path from 'path'

interface IMulterConfig {
  directory: string
  storage: StorageEngine
}

const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    },
  }),
} as IMulterConfig
