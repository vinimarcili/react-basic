import { HTMLAttributes, PropsWithChildren } from "react"
import './TextTheme.css'


interface TextThemeProps extends HTMLAttributes<HTMLParagraphElement>, PropsWithChildren {
  theme?: string
}

const TextTheme = ({ children, theme, ...props }: TextThemeProps) => {
  return <p
    {...props}
    className={`
      text-theme 
      ${theme} 
      ${props.className}  
    `}
  >
    {children}
  </p>
}

export default TextTheme

