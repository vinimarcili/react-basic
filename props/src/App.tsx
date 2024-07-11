import './App.css'
import MyComponent from './components/my-component'

function App() {
  const clickRecieved = (button: HTMLButtonElement) => {
    console.log('Click Recieved on button:', button)
  }

  return (
    <>
      <MyComponent identifyClick={clickRecieved}>
        Hello, World!
      </MyComponent>
    </>
  )
}

export default App


