import ThemedComponent from "../ThemedComponent/ThemedComponent"
// Importa o componente `ThemedComponent` de um arquivo local para uso dentro do `Footer`.

const Footer = () => {
    return (
      <ThemedComponent padding='0 1rem'>
      {/* Renderiza o componente `ThemedComponent` e aplica o padding ('0 1rem') ao seu conteúdo. */}
        <footer>
          {/* O elemento `footer` é utilizado para representar o rodapé da página. */}
            <p>Footer - Vinícius Marcili</p>
            {/* Parágrafo que contém o texto do rodapé. */}
        </footer>
      </ThemedComponent>
      // O conteúdo dentro do `footer` será estilizado e temático conforme o componente `ThemedComponent`.
    )
}

export default Footer
// Exporta o componente `Footer` como padrão, permitindo que ele seja importado e utilizado em outros arquivos.
