import type { User } from "../interfaces/user.interface"

interface ListUsersComponentInterface {
  users?: Array<User>
}

const ListUsersComponent = ({ users = [] }: ListUsersComponentInterface) => {
  return (
    <>
      <h2>Lista de usuários</h2>
      <ol>
        { 
          users?.length === 0 ? <p> Nenhum usuário encontrado. </p> :
          users?.map((user, i) => {
            return (
              <li key={i}>
                <strong>{user.name}</strong><br/>
                <small>{user.email} - {user.age} - {user.birthdate}</small>
              </li>
            )
        })}
      </ol>
    </>
  )
}

export default ListUsersComponent