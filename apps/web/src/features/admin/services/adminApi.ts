const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export type AdminSummary = {
  totalProjects: number
  totalMembers: number
  openContacts: number
}

export async function getAdminSummary(token: string): Promise<AdminSummary> {
  const response = await fetch(`${API_BASE_URL}/api/admin/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(errorBody.error ?? 'Cannot load admin summary')
  }

  return (await response.json()) as AdminSummary
}

