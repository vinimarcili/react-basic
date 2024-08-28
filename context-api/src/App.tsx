import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import ThemeProvider from './contexts/ThemeContext/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <LoginForm />
      <Footer />
    </ThemeProvider>
  )
}

export default App
