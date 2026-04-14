import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { corsMiddleware } from './middlewares/cors.js'
import { notFoundMiddleware } from './middlewares/notFound.js'
import { createPublicRouter } from './modules/public/public.route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function createApp(port) {
  const app = express()

  app.use(express.json())
  app.use(corsMiddleware)

  app.use('/api', createPublicRouter(port))
  //DEPRECATED: The following routes are only for testing when I started to learn Nodejs
  //app.use('/api/auth', createAuthRouter())
  //app.use('/api/admin', createAdminRouter())

  app.use('/api', notFoundMiddleware)

  const webDistPath = path.resolve(__dirname, '../../web/dist')
  app.use(express.static(webDistPath))

  // SPA fallback
  app.get('/{*path}', (_request, response) => {
    response.sendFile(path.join(webDistPath, 'index.html'))
  })

  return app
}

