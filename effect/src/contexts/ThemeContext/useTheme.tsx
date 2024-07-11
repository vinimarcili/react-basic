import { useContext } from "react"
// Importa o contexto ThemeContext de '../contexts/ThemeContext'.
import ThemeContext from './ThemeContext'

// Define uma função chamada useTheme que retorna o contexto ThemeContext.
const useTheme = () => {
  // Utiliza o hook useContext para obter o valor atual do contexto ThemeContext.
  // O hook useContext é usado em React para acessar o valor de um ThemeContext fornecido como argumento. Neste caso,
  // ThemeContext é o contexto do tema.
  const context = useContext(ThemeContext)

  // Verifica se o valor obtido do contexto é false (ou seja, undefined, null, false, 0, etc.).
  // Isso geralmente significa que o componente que está tentando usar o contexto não está envolvido em um ThemeProvider.
  if (!context) {
    // Caso o valor do contexto seja false, lança um erro indicando que a função useTheme
    // deve ser usada dentro de um componente que envolve um ThemeProvider.
    // Este é um mecanismo de segurança para garantir que o contexto esteja sendo utilizado corretamente 
    // e que o provedor esteja presente na hierarquia de componentes.
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export default useTheme


