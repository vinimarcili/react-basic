import Button from "../Button/Button"
// Importa o componente `Button` para ser utilizado no formulário de login.

import Input from "../Input/Input"
// Importa o componente `Input` para ser utilizado para os campos de e-mail e senha.

import Text from '../Text/Text'
// Importa o componente `Text` para estilizar o texto no formulário.

const LoginForm = () => {
  return (
    <form style={{ margin: '1rem auto', textAlign: 'center' }}>
    {/* Renderiza um formulário HTML com margens automáticas e centralização de texto. */}
      <Text>
        <h1 style={{ margin: '1rem auto 0' }}>Entrar</h1>
      </Text>
      {/* Renderiza o título "Entrar" dentro do componente `Text`, com margens personalizadas para centralização. */}
      <Input label="E-mail" type="email" />
      {/* Renderiza o campo de entrada de e-mail com um rótulo "E-mail". */}
      <Input label="Password" type="password" />
      {/* Renderiza o campo de entrada de senha com um rótulo "Password". */}
      <Button type="submit">Login</Button>
      {/* Renderiza um botão com o texto "Login". Ao clicar, ele enviará o formulário. */}
    </form>
  )
}

export default LoginForm
// Exporta o componente `LoginForm` como padrão para que possa ser utilizado em outros arquivos.
