import { HTMLAttributes, PropsWithChildren } from "react"
// Importa os tipos `HTMLAttributes` e `PropsWithChildren` do React para definir as propriedades do componente.

import useTheme from "../../contexts/ThemeContext/useTheme"
// Importa o hook `useTheme` para acessar o tema atual a partir do contexto.

import './ThemedComponent.css'
// Importa o arquivo CSS específico para estilização do componente `ThemedComponent`.

interface ThemedComponentProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  padding?: string
}
// Define a interface `ThemedComponentProps`, que extende as propriedades padrão de um elemento `<div>` HTML 
// (`HTMLAttributes<HTMLDivElement>`) e inclui as propriedades para os elementos filhos (`PropsWithChildren`).
// Adiciona também a propriedade opcional `padding`, que é uma string.

const ThemedComponent = ({ children, padding = '0', ...props }: ThemedComponentProps) => {
  const { theme } = useTheme()
  // Usa o hook `useTheme` para obter o tema atual a partir do contexto.

  return (
    <div
      {...props}
      className={`
        themed-component 
        ${theme} 
        ${props.className ?? ''}  
      `}
      style={{ padding }}
    >
    {/* Renderiza um elemento `<div>` com as classes CSS combinadas:
        - `themed-component` é uma classe padrão para o componente.
        - `${theme}` adiciona a classe correspondente ao tema atual.
        - `${props.className ?? ''}` aplica quaisquer classes adicionais passadas via `className`.
        - `?? ''` garante que, se `className` não for fornecida, uma string vazia será utilizada.
        - Define o estilo `padding` com o valor passado via propriedade ou usa o valor padrão `'0'`.
        - As outras propriedades (`...props`) são propagadas para o elemento `<div>`. */}
      {children}
      {/* Renderiza os elementos filhos dentro da `<div>`. */}
    </div>
  )
}

export default ThemedComponent
// Exporta o componente `ThemedComponent` como padrão para que possa ser utilizado em outros arquivos.
