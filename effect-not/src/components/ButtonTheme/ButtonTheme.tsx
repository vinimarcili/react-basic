import './ButtonTheme.css'

interface ButtonThemeProps {
  theme: string
  setTheme: (theme: string) => void
}

const ButtonTheme = ({ theme, setTheme }: ButtonThemeProps) => {
  return (
    <button
      type='button'
      className={`
        button-theme
        ${theme}  
      `}
      onClick={() => setTheme(theme === 'red' ? 'blue' : 'red')}
    >
      Change Theme
    </button>
  )
}

export default ButtonTheme

