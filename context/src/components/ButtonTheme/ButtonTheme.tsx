import useTheme from '../../contexts/ThemeContext/useTheme'
import './ButtonTheme.css'

const ButtonTheme = () => {
  // Utiliza o hook useTheme para obter o valor do contexto e a função changeTheme
  const { theme, changeTheme } = useTheme()

  // Retorna um botão com a classe button-theme e o tema atual.
  // Quando o botão é clicado, a função changeTheme é chamada com o tema oposto ao atual.
  // Isso altera o tema do aplicativo de "red" para "blue" e vice-versa.
  return (
    <button
      type='button'
      className={`
        button-theme
        ${theme}  
      `}
      onClick={() => changeTheme(theme === 'red' ? 'blue' : 'red')}
    >
      Change Theme
    </button>
  )
}

export default ButtonTheme

