import useTheme from "../../contexts/ThemeContext/useTheme"
// Importa o hook `useTheme` para acessar e manipular o tema atual a partir do contexto.

import Button from "../Button/Button"
// Importa o componente `Button` que será usado para alterar o tema.

import ThemedComponent from "../ThemedComponent/ThemedComponent"
// Importa o componente `ThemedComponent` para aplicar estilos temáticos ao cabeçalho.

import './Header.css'
// Importa o arquivo CSS específico para estilização do cabeçalho.

const Header = () => {
  const { theme, changeTheme } = useTheme()
  // Usa o hook `useTheme` para obter o tema atual (`theme`) e a função para alterar o tema (`changeTheme`).

  const handleThemeChange = () => {
    if (theme === 'blue') {
      changeTheme('red')
    }
    // Se o tema atual for 'blue', a função `changeTheme` é chamada para mudar o tema para 'red'.

    if (theme === 'red') {
      changeTheme('blue')
    }
    // Se o tema atual for 'red', a função `changeTheme` é chamada para mudar o tema para 'blue'.
  }

  return (
    <ThemedComponent padding='0 1rem'>
    {/* Aplica o componente `ThemedComponent` ao cabeçalho com padding definido. */}
      <header>
        <h2>Context API</h2>
        {/* Cabeçalho com o título da aplicação. */}
        <Button onClick={() => handleThemeChange()}>Change Theme</Button>
        {/* Botão que, ao ser clicado, chama a função `handleThemeChange` para alternar entre os temas 'blue' e 'red'. */}
      </header>
    </ThemedComponent>
    // O conteúdo dentro do `header` é estilizado com base no tema atual.
  )
}

export default Header
// Exporta o componente `Header` como padrão para que possa ser usado em outros arquivos.
