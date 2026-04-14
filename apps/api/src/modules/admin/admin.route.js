import { Router } from 'express'
import { verifyAdminToken } from '../auth/auth.service.js'
import { adminController } from './admin.controller.js'

export function createAdminRouter() {
  const router = Router()

  //Deprecated: This router only for testing when I started to learn Nodejs
  router.get('/summary', (request, response) => {
    const isValidToken = verifyAdminToken(request.headers.authorization)

    if (!isValidToken) {
      response.status(401).json({ error: 'Unauthorized' })
      return
    }

    adminController.summary(request, response)
  })

  return router
}

