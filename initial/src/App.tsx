import './App.css'
import ListComponent from './components/List'
import ListUsersComponent from './components/ListUsers'
import ProfileComponent from './components/Profile'
import WelcomeComponent from './components/WelcomeComponent'
import type { User } from './interfaces/user.interface'

function App() {
  const users: Array<User> = [
    {
      name: "Vinicius Marcili",
      email: "vinicius@example.com",
      age: "30",
      birthdate: "1993-01-01"
    },
    {
      name: "Maria Silva",
      email: "maria@example.com",
      age: "25",
      birthdate: "1998-05-15"
    },
    {
      name: "João Pereira",
      email: "joao@example.com",
      age: "40",
      birthdate: "1983-03-20"
    }
  ]


  return (
    <>
      <WelcomeComponent />
      <ProfileComponent />
      <ListComponent />
      <ListUsersComponent users={users} />
    </>
  )
}

export default App
