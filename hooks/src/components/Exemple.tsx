import { useState } from "react"

const ExempleComponent = () => {
  const [name, setName] = useState<string>('')

  return (
    <>
      <h6>
        Exemplo de estado
      </h6>
      <p>
        Nome:
        <span>
          <br />
          {name}
        </span>
      </p>
      <button onClick={() => setName('Vinícius')}>
        Clique Aqui
      </button>
    </>
  )
}

export default ExempleComponent

