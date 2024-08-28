import { HTMLAttributes, PropsWithChildren } from "react"
// Importa os tipos `HTMLAttributes` e `PropsWithChildren` do React para definir as propriedades do componente.

import useTheme from "../../contexts/ThemeContext/useTheme"
// Importa o hook `useTheme` para acessar o tema atual a partir do contexto.

import './Text.css'
// Importa o arquivo CSS específico para estilização do componente `Text`.

interface TextProps extends HTMLAttributes<HTMLParagraphElement>, PropsWithChildren { }
// Define a interface `TextProps`, que extende as propriedades padrão de um elemento `<p>` HTML (`HTMLAttributes<HTMLParagraphElement>`) 
// e inclui as propriedades para os elementos filhos (`PropsWithChildren`).

const Text = ({ children, ...props }: TextProps) => {
  const { theme } = useTheme()
  // Usa o hook `useTheme` para obter o tema atual a partir do contexto.

  return (
    <p
      {...props}
      className={`
        text-theme 
        ${theme} 
        ${props.className ?? ''}  
      `}
    >
    {/* Renderiza um elemento `<p>` com as classes CSS combinadas: 
        - `text-theme` é uma classe padrão para o texto.
        - `${theme}` adiciona a classe correspondente ao tema atual.
        - `${props.className ?? ''}` aplica quaisquer classes adicionais passadas via `className`. 
        - `?? ''` garante que, se `className` não for fornecida, uma string vazia será utilizada.
        - As outras propriedades (`...props`) são propagadas para o elemento `<p>`. */}
      {children}
      {/* Renderiza os elementos filhos (texto ou outros componentes) dentro do parágrafo. */}
    </p>
  )
}

export default Text
// Exporta o componente `Text` como padrão para que possa ser utilizado em outros arquivos.
