import { Router } from 'express'
import { createPublicController } from './public.controller.js'

export function createPublicRouter(port) {
  const router = Router()
  const controller = createPublicController(port)

  router.get('/health', controller.health)
  return router
}

