import { HTMLAttributes } from 'react'
import './Input.css'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  value?: string
  placeholder?: string
}

const Input = ({ label = '', ...props }: InputProps) => {
  return (
    <label htmlFor={props.id || props.name}>
      {label}
      <input
        {...props}
        className={`
        input 
        ${props.className}  
      `}
      />
    </label>
  )
}

export default Input