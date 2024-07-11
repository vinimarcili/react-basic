import { useNavigate } from 'react-router-dom'
import './NotFound.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const toHomePage = () => {
    console.error('Redirecting 404 to Home Page')
    navigate('/')
  }


  return (
    <div>
      <h1>Not Found - 404</h1>
      <button onClick={toHomePage}>Go to Home</button>
    </div>
  )
}

export default NotFoundPage


