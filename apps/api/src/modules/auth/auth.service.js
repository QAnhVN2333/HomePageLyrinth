import { demoUsers } from '../../shared/constants/demoUsers.js'

function createDemoToken(user) {
  const tokenPayload = `${user.username}:${user.role}:demo-token`
  return Buffer.from(tokenPayload).toString('base64')
}

export function login(username, password) {
  const normalizedUsername = typeof username === 'string' ? username.trim() : ''
  const normalizedPassword = typeof password === 'string' ? password.trim() : ''

  const user = demoUsers.find(
    (item) => item.username === normalizedUsername && item.password === normalizedPassword,
  )

  if (!user) {
    return null
  }

  return {
    token: createDemoToken(user),
    user: {
      username: user.username,
      role: user.role,
    },
  }
}

export function verifyAdminToken(authorizationHeader) {
  const headerValue = typeof authorizationHeader === 'string' ? authorizationHeader : ''
  const token = headerValue.startsWith('Bearer ') ? headerValue.slice(7) : ''

  if (!token) {
    return false
  }

  const expectedToken = createDemoToken(demoUsers[0])
  return token === expectedToken
}

