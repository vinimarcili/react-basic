

import InteractiveCard from './InteractiveCard';
import ProductList from './ProductList';
import './App.css';

const products = Array.from({ length: 9 }, (_, i) => ({
  name: `Smartphone XYZ #${i + 1}`,
  price: 'R$ 999,99',
  description: 'O smartphone XYZ é repleto de recursos incríveis para atender às suas necessidades diárias.'
}));

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--app-bg, #ececec)', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Lista de Produtos</h1>
      {/* Versão original: cards renderizados diretamente com .map */}
      {/*
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          justifyItems: 'center',
          maxWidth: '100vw',
        }}
      >
        {products.map((product, idx) => (
          <InteractiveCard
            key={idx}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
      */}

      {/* Nova versão: usando componente ProductList */}
      <ProductList items={products} />
      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns'] {
            grid-template-columns: 1fr;
          }
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --app-bg: #181a20;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
