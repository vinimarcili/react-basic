import useTheme from '../../contexts/ThemeContext/useTheme'
import './Button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode 
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  const { theme } = useTheme()

  return (
    <button
      className={`
        button-theme
        ${className}
        ${theme}  
      `}
       {...props}
    >
      {children}
    </button>
  )
}

export default Button

