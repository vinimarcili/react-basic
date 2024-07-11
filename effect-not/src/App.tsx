import { useState } from 'react'
import './App.css'
import ButtonTheme from './components/ButtonTheme/ButtonTheme'
import TextTheme from './components/TextTheme/TextTheme'

function App() {
  const [theme, setTheme] = useState('red')

  return (
    <>
      <ButtonTheme theme={theme} setTheme={setTheme} />
      <TextTheme theme={theme}>
        Hello World!
      </TextTheme>
    </>
  )
}

export default App
