import { HTMLAttributes, PropsWithChildren } from 'react'
import './Button.css'

interface ButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const Button = ({ type = 'button', children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        button 
        ${props.className}  
      `}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button