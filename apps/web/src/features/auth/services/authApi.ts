const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

type LoginPayload = {
  username: string
  password: string
}

type LoginResponse = {
  token: string
  user: {
    username: string
    role: string
  }
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(errorBody.error ?? 'Login failed')
  }

  return (await response.json()) as LoginResponse
}

