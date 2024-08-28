import Button from "../Button/Button"
import Input from "../Input/Input"
import Text from '../Text/Text'

const LoginForm = () => {
  return <form style={{ margin: '1rem auto', textAlign: 'center' }}>
    <Text><h1 style={{ margin: '1rem auto 0' }}>Entrar</h1></Text>
    <Input label="E-mail" type="email" />
    <Input label="Password" type="password" />
    <Button type="submit">Login</Button>
  </form>
}

export default LoginForm