import { HTMLAttributes, PropsWithChildren } from "react"
import './ButtonCss.css'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  icon?: string
}

const ButtonCss = ({ children, icon, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`button ${props.className || ''}`}>
      <div className="button-icon">
        {icon || '👍'}
      </div>
      <div className="button-content">
        {children}
      </div>
    </button>
  )
}

export default ButtonCss

