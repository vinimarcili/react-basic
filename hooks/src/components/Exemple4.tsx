import { useEffect, useState } from "react"

interface Address {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

const Exemple4Component = () => {
  const [loading, setLoading] = useState(false)
  const [zipcode, setZipcode] = useState('')
  const [address, setAddress] = useState<Address>()

  useEffect(() => {
    if (!loading || !zipcode || zipcode.length < 9) {
      return
    }

    fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      .then(response => response.json())
      .then(data => setAddress(data))
      .catch(() => setAddress(undefined))
      .finally(() => setLoading(false))
  }, [loading, zipcode])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h5>Buscar Endereço</h5>
      <form onSubmit={() => setLoading(true)}>
        <label htmlFor='zipcode'>
          Digite o CEP (ex: 01001-000)<br />
          <input type="text" name='zipcode' id='zipcode' value={zipcode} onChange={e => setZipcode(e.target.value)} pattern="\d{5}-\d{3}" />
        </label>
        <br />
        <button type='submit'>
          Buscar
        </button>
      </form>
      {!loading && address?.logradouro && (
        <div>
          <h6>
            Resultado para o CEP: {zipcode}
          </h6>
          <p>{address?.logradouro}</p>
          <p>{address?.complemento}</p>
          <p>{address?.bairro}</p>
          <p>{address?.localidade}</p>
          <p>{address?.uf}</p>
          <p>{address?.cep}</p>
        </div>
      )}
    </div>
  )
}

export default Exemple4Component