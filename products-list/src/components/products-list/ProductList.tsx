import React from 'react';

import './ProductList.css';
import InteractiveCard from '../interactive-card/InteractiveCard';

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
    <div className="products-grid">
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
