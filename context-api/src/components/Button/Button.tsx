import useTheme from '../../contexts/ThemeContext/useTheme' 
// Importa o hook `useTheme` do contexto de tema para acessar a configuração atual do tema.

import './Button.css'
// Importa o arquivo CSS específico para estilização do botão.

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode 
}
// Define a interface `ButtonProps`, que extende as propriedades padrão de um botão HTML (`React.ButtonHTMLAttributes<HTMLButtonElement>`).
// `children` é opcional e pode ser qualquer elemento React.

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  const { theme } = useTheme()
  // Usa o hook `useTheme` para obter o tema atual a partir do contexto.

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
  // Retorna um elemento `<button>` com as classes CSS combinadas: 
  // - `button-theme` é uma classe padrão.
  // - `className` permite que o usuário adicione classes adicionais ao botão.
  // - `theme` adiciona uma classe correspondente ao tema atual (por exemplo, 'light' ou 'dark').
  // `...props` propaga todas as outras propriedades recebidas para o botão.
  // `{children}` é o conteúdo que será exibido dentro do botão.
}

export default Button
// Exporta o componente `Button` como padrão, permitindo que ele seja importado e utilizado em outros arquivos.
