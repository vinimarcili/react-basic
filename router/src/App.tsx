import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/Home'
import AboutPage from './pages/About/About'
import NotFoundPage from './pages/NotFound/NotFound'
import UserPage from './pages/User/User'

function App() {
  return (
    // Componente de Instancia geral das rotas do BrowserRouter
    <Router>
      {/* Componente que indica as rotas, funciona como um switch */}
      <Routes>
        {/* Componente que indica a rota, funciona como um case */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Componente que indica a rota com parametro */}
        <Route path='/user/:id' element={<UserPage />} />
        {/* Componente que indica a rota default, funciona como um default */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App

