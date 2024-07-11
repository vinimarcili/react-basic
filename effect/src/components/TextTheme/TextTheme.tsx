import { HTMLAttributes, PropsWithChildren } from "react"
import useTheme from "../../contexts/ThemeContext/useTheme"
import './TextTheme.css'

// Define uma interface chamada TextThemeProps que estende HTMLAttributes
// e PropsWithChildren para usar o children como propriedade.
interface TextThemeProps extends HTMLAttributes<HTMLParagraphElement>, PropsWithChildren { }

const TextTheme = ({ children, ...props }: TextThemeProps) => {
  // Utiliza o hook useTheme para obter o valor do contexto ThemeContext.
  const { theme } = useTheme()

  // Retorna um elemento p com as propriedades e estilos definidos.
  // O valor de theme é adicionado à lista de classes do elemento p.
  // A classe de css vai ser trabalhada no arquivo TextTheme.css
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

