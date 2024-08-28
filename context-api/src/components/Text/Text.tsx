import { HTMLAttributes, PropsWithChildren } from "react"
import useTheme from "../../contexts/ThemeContext/useTheme"
import './Text.css'

interface TextProps extends HTMLAttributes<HTMLParagraphElement>, PropsWithChildren { }

const Text = ({ children, ...props }: TextProps) => {
  const { theme } = useTheme()

  return <p
    {...props}
    className={`
      text-theme 
      ${theme} 
      ${props.className ?? ''}  
    `}
  >
    {children}
  </p>
}

export default Text

