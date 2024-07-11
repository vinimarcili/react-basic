import './App.css'
import ButtonTheme from './components/ButtonTheme/ButtonTheme'
import TextTheme from './components/TextTheme/TextTheme'
import ThemeProvider from './contexts/ThemeContext/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <ButtonTheme />
      <TextTheme>
        Hello World!
      </TextTheme>
    </ThemeProvider>
  )
}

export default App
