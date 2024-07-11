import { PropsWithChildren, useState } from "react"
// Importa o contexto ThemeContext de './ThemeContext'.
import ThemeContext from "./ThemeContext"

// Define uma interface chamada ThemeProviderProps que estende PropsWithChildren para usar o children como propriedade.
export interface ThemeProviderProps extends PropsWithChildren { }

// Define um componente chamado ThemeProvider que recebe children como propriedade.
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Define um estado chamado theme com o valor inicial "red" e uma função chamada setTheme para atualizar o estado.
  const [theme, setTheme] = useState("red")

  // Define uma função chamada changeTheme que recebe um tema como argumento e atualiza o estado theme com o valor do argumento.
  const changeTheme = (theme: string) => {
    setTheme(theme)
  }

  // Retorna o componente ThemeContext.Provider com o valor do estado theme e a função changeTheme.
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

