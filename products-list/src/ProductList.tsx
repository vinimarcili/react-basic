import React from 'react';
import InteractiveCard from './InteractiveCard';

interface Product {
  name: string;
  price: string;
  description: string;
}

interface ProductListProps {
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        justifyItems: 'center',
        maxWidth: '100vw',
      }}
    >
      {items.map((product, idx) => (
        <InteractiveCard
          key={idx}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductList;
