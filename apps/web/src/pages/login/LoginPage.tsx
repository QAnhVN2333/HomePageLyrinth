import { useNavigate } from 'react-router-dom'
import { SectionTitle } from '../../components/common/SectionTitle'
import { LoginForm } from '../../features/auth/components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <section className="content-grid narrow">
      <SectionTitle
        title="Login"
        subtitle="Use demo account admin / admin123 to access the admin dashboard."
      />
      <LoginForm onLoginSuccess={() => navigate('/admin')} />
    </section>
  )
}

