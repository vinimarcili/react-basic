import { useContext } from "react"
// Importa o hook `useContext` do React para acessar o contexto.

import ThemeContext from './ThemeContext'
// Importa o contexto `ThemeContext` para que o hook possa consumir o valor do contexto.

const useTheme = () => {
  const context = useContext(ThemeContext)
  // Usa o hook `useContext` para obter o valor atual do `ThemeContext`.

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  // Verifica se o contexto é `undefined`. Se for, lança um erro indicando que `useTheme` deve ser usado dentro de um `ThemeProvider`.
  // Isso garante que o hook só é utilizado quando o componente está dentro do provedor de contexto.

  return context
  // Retorna o valor do contexto, que inclui o tema atual e a função para mudar o tema.
}

export default useTheme
// Exporta o hook `useTheme` como padrão para que possa ser usado em outros componentes para acessar o contexto do tema.
