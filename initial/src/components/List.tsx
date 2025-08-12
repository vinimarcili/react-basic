const ListComponent = () => {
  const itens: string[] = ['apple', 'banana', 'orange', 'pear', 'anotherfruit']

  return (
    <ul>
      {itens.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default ListComponent