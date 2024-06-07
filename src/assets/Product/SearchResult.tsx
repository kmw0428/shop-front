import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('default');

  useEffect(() => {
    setOriginalProducts(results);
    setProducts(results);
  }, [results]);

  useEffect(() => {
    let sortedProducts = [...originalProducts];
    switch (sortCriteria) {
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  }, [sortCriteria, originalProducts]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div>
      <h2>Search Results</h2>
      <div className="sort-options">
        <label htmlFor="sort">정렬 기준: </label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="default">기본</option>
          <option value="name">이름순</option>
          <option value="price-high">높은 가격순</option>
          <option value="price-low">낮은 가격순</option>
        </select>
      </div>
      {products.length > 0 ? (
        <ul>
          {products.map((product: Product, index: number) => (
            <li key={index}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {formatPrice(product.price)} 원</p>
              <p>Category: {product.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
