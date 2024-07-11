// Importa as bibliotecas React, createContext do pacote 'react'.
import { createContext } from "react"

// ThemeContextType define uma interface para o contexto de tema.
// Especificamente, o contexto tem uma propriedade theme (uma string representando o tema)
// e um método changeTheme (uma função que não aceita argumentos e não retorna nada).
export interface ThemeContextType {
  theme: string
  changeTheme: (theme: string) => void
}

// Cria um contexto React chamado ThemeContext usando a função createContext. O contexto é tipado como ThemeContextType | undefined,
// indicando que seu valor pode ser do tipo ThemeContextType ou undefined. O valor inicial do contexto é undefined.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Exporta o contexto ThemeContext.
export default ThemeContext


