import { createContext } from "react"

export interface ThemeContextType {
  theme: string
  changeTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default ThemeContext


