

// import InteractiveCard from './components/interactive-card/InteractiveCard';
import './App.css';
import ProductList from './components/products-list/ProductList';

const products = Array.from({ length: 9 }, (_, i) => ({
  name: `Smartphone XYZ #${i + 1}`,
  price: 'R$ 999,99',
  description: 'O smartphone XYZ é repleto de recursos incríveis para atender às suas necessidades diárias.'
}));

function App() {
  return (
    <div className="app-bg">
      <h1 className="products-title">Lista de Produtos</h1>
      {/* Versão original: cards renderizados diretamente com .map */}
      {/* <div className="products-grid">
        {products.map((product, idx) => (
          <InteractiveCard
            key={idx}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div> */}
      {/* Nova versão: usando componente ProductList */}
      <ProductList items={products} />
    </div>
  );
}

export default App;
