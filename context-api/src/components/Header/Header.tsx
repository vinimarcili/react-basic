import useTheme from "../../contexts/ThemeContext/useTheme"
import Button from "../Button/Button"
import ThemedComponent from "../ThemedComponent/ThemedComponent"
import './Header.css'

const Header = () => {
  const { theme, changeTheme } = useTheme()

  const handleThemeChange = () => {
    if (theme === 'blue') {
      changeTheme('red')
    }

    if (theme === 'red') {
      changeTheme('blue')
    }
  }

  return (
    <ThemedComponent padding='0 1rem'>
      <header>
        <h2>Context API</h2>
        <Button onClick={() => handleThemeChange()}>Change Theme</Button>
      </header>
    </ThemedComponent>
  )
}

export default Header