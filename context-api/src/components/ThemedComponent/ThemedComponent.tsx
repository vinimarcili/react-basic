import { HTMLAttributes, PropsWithChildren } from "react"
import useTheme from "../../contexts/ThemeContext/useTheme"
import './ThemedComponent.css'

interface ThemedComponentProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  padding?: string
}

const ThemedComponent = ({ children, padding = '0', ...props }: ThemedComponentProps) => {
  const { theme } = useTheme()

  return <div
    {...props}
    className={`
      themed-component 
      ${theme} 
      ${props.className ?? ''}  
    `}
    style={{ padding }}
  >
    {children}
  </div>
}

export default ThemedComponent

