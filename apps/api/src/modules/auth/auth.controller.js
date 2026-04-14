import { login } from './auth.service.js'

export const authController = {
  login(request, response) {
    const { username, password } = request.body ?? {}
    const result = login(username, password)

    if (!result) {
      response.status(401).json({ error: 'Invalid username or password' })
      return
    }

    response.status(200).json(result)
  },
}

