type StatCardProps = {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="card stat-card">
      <h3>{label}</h3>
      <p className="stat-value">{value}</p>
    </article>
  )
}

