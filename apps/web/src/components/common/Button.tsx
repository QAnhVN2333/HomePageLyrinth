type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: string
}

export function Button({ type = 'button', disabled = false, children }: ButtonProps) {
  return (
    <button className="primary-button" type={type} disabled={disabled}>
      {children}
    </button>
  )
}

