import useTheme from '../../contexts/ThemeContext/useTheme'
// Importa o hook `useTheme` para acessar o tema atual a partir do contexto.

import './Input.css'
// Importa o arquivo CSS específico para estilização do componente `Input`.

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
// Define a interface `InputProps`, que extende as propriedades padrão de um elemento HTML `<input>`.
// `label` é opcional e pode ser uma string para identificar o campo de entrada.

const Input = ({ label, className = '', ...props }: InputProps) => {
  const { theme } = useTheme()
  // Usa o hook `useTheme` para obter o tema atual a partir do contexto.

  return (
    <div className={`input-container ${theme}`}>
    {/* Cria um contêiner `div` que recebe as classes `input-container` e a classe do tema atual. */}
      {label && <label className="input-label">{label}</label>}
      {/* Se a propriedade `label` for fornecida, renderiza um elemento `label` com a classe `input-label`. */}
      <input
        className={`
          input-theme
          ${className}
        `}
        {...props}
      />
      {/* Renderiza o elemento `input`, aplicando as classes `input-theme` e quaisquer outras classes adicionais passadas via `className`. */}
      {/* As outras propriedades (`...props`) são propagadas para o elemento `input`. */}
    </div>
  )
}

export default Input
// Exporta o componente `Input` como padrão para que possa ser utilizado em outros arquivos.
