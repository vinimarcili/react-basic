import { useState } from "react"
// Importa o hook `useState` do React para gerenciar o estado do tema.

import ThemeContext from "./ThemeContext"
// Importa o contexto `ThemeContext` que será fornecido pelos componentes filhos.

export interface ThemeProviderProps {
  children?: React.ReactNode 
}
// Define a interface `ThemeProviderProps`, que especifica que o componente pode ter `children` (elementos filhos) do tipo `React.ReactNode`.

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("red")
  // Usa o hook `useState` para criar o estado `theme` com valor inicial 'red'.
  // `setTheme` é a função para atualizar o valor do estado `theme`.

  const changeTheme = (theme: string) => {
    setTheme(theme)
  }
  // Define a função `changeTheme` que atualiza o estado `theme` com o novo valor passado como argumento.

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
    {/* Fornece o contexto `ThemeContext` para os componentes filhos com o valor do tema atual e a função para mudar o tema. */}
      {children}
      {/* Renderiza os elementos filhos dentro do `ThemeContext.Provider`, permitindo que eles acessem o contexto fornecido. */}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
// Exporta o componente `ThemeProvider` como padrão, permitindo que ele seja utilizado em outros arquivos para fornecer o contexto do tema.
