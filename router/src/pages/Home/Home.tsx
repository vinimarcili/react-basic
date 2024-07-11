import { Link } from 'react-router-dom'
import './Home.css'

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">Go to About</Link>
    </div>
  )
}

export default HomePage

