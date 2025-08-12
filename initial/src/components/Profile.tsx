const ProfileComponent = () => {
  const user = {
    name: 'Vinicius Marcili',
    email: 'profvinicius.marcili@fiap.com.br',
    birth: '1995-06-03',
    age: 30
  }


  return (
    <div>
      <h2>Perfil</h2>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Data de Nascimento: {user.birth}</p>
      <p>Idade: {user.age}</p>
    </div>
  )
}

export default ProfileComponent