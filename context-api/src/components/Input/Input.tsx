import useTheme from '../../contexts/ThemeContext/useTheme'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = ({ label, className = '', ...props }: InputProps) => {
  const { theme } = useTheme()

  return (
    <div className={`input-container ${theme}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        className={`
          input-theme
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

export default Input
