import './App.css'
// Importa o arquivo CSS específico para estilização geral do aplicativo.

import Footer from './components/Footer/Footer'
// Importa o componente `Footer` que será exibido no rodapé da página.

import Header from './components/Header/Header'
// Importa o componente `Header` que será exibido no cabeçalho da página.

import LoginForm from './components/LoginForm/LoginForm'
// Importa o componente `LoginForm` que será exibido como o formulário de login.

import ThemeProvider from './contexts/ThemeContext/ThemeProvider'
// Importa o componente `ThemeProvider` que fornece o contexto do tema para toda a aplicação.

function App() {
  return (
    <ThemeProvider>
    {/* Envolve os componentes `Header`, `LoginForm`, e `Footer` com `ThemeProvider` para que eles possam acessar o contexto do tema. */}
      <Header />
      {/* Renderiza o componente `Header` no topo da página. */}
      <LoginForm />
      {/* Renderiza o componente `LoginForm` no meio da página para permitir que os usuários façam login. */}
      <Footer />
      {/* Renderiza o componente `Footer` no rodapé da página. */}
    </ThemeProvider>
  )
}

export default App
// Exporta o componente `App` como padrão, permitindo que ele seja utilizado como o ponto de entrada principal da aplicação.
