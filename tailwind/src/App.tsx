import './App.css'
import ButtonCss from './components/ButtonCss/ButtonCss'
import ButtonTailwind from './components/ButtonTailwind/ButtonTailwind'

function App() {

  return (
    <>
      <ButtonCss>Click me</ButtonCss>
      <br />
      <ButtonTailwind icon='👎'>Click me</ButtonTailwind>
    </>
  )
}

export default App


