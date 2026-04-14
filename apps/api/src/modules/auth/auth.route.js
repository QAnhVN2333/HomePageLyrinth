import { Router } from 'express'
import { authController } from './auth.controller.js'

//Deprecated: This router only for testing when I started to learn Nodejs
export function createAuthRouter() {
  const router = Router()

  router.post('/login', authController.login)

  return router
}

