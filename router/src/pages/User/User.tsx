import { Link, useNavigate, useParams } from 'react-router-dom'
import './User.css'
import { useEffect } from 'react'

const UserPage = () => {
  // Hook que retorna os parametros da URL
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (id && parseInt(id) > 5) {
      console.error('Redirecting User Page to 404')
      navigate('/404')
    }
  }, [id, navigate])

  if (!id) {
    return null
  }

  return (
    <div>
      <h1>User Page</h1>
      <p>
        User ID: {parseInt(id)}
      </p>
      <Link to="/">Go to Home</Link>
    </div>
  )
}

export default UserPage


