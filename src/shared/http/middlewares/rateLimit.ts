import { rateLimit } from 'express-rate-limit'

export const limit = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
