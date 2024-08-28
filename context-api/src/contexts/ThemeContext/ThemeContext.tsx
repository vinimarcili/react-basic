import { createContext } from "react"
// Importa a função `createContext` do React para criar um contexto.

export interface ThemeContextType {
  theme: string
  changeTheme: (theme: string) => void
}
// Define a interface `ThemeContextType`, que especifica o formato do valor que será fornecido pelo contexto.
// `theme` é uma string que representa o tema atual.
// `changeTheme` é uma função que recebe uma string (o novo tema) e não retorna nada (void).

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
// Cria o contexto `ThemeContext` com um valor inicial `undefined`. 
// O valor do contexto pode ser do tipo `ThemeContextType` ou `undefined`.
// Inicialmente, `undefined` é usado para indicar que o contexto ainda não tem um valor fornecido.

export default ThemeContext
// Exporta o contexto `ThemeContext` como padrão para que possa ser utilizado e consumido em outros arquivos.
