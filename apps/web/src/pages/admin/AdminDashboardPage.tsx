import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SectionTitle } from '../../components/common/SectionTitle'
import { StatCard } from '../../features/admin/components/StatCard'
import { getAdminSummary, type AdminSummary } from '../../features/admin/services/adminApi'
import { clearAuthToken, getAuthToken } from '../../features/auth/hooks/useAuth'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const token = getAuthToken()
  const [summary, setSummary] = useState<AdminSummary | null>(null)
  const [statusText, setStatusText] = useState('Loading dashboard...')

  useEffect(() => {
    if (!token) {
      return
    }

    getAdminSummary(token)
      .then((data) => {
        setSummary(data)
        setStatusText('Dashboard loaded')
      })
      .catch((error: unknown) => {
        setStatusText(`Cannot load dashboard: ${String(error)}`)
      })
  }, [token])

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <section className="content-grid">
      <article className="card">
        <SectionTitle title="Admin Dashboard" subtitle={statusText} />
        <button
          className="link-button"
          onClick={() => {
            clearAuthToken()
            navigate('/login')
          }}
          type="button"
        >
          Sign out
        </button>
      </article>

      {summary ? (
        <div className="stats-grid">
          <StatCard label="Total projects" value={summary.totalProjects} />
          <StatCard label="Total members" value={summary.totalMembers} />
          <StatCard label="Open contacts" value={summary.openContacts} />
        </div>
      ) : (
        <article className="card">Loading metrics...</article>
      )}
    </section>
  )
}



