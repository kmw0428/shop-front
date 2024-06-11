import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Products.css";

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
  const [sortCriteria, setSortCriteria] = useState<string>("default");

  useEffect(() => {
    setOriginalProducts(results);
    setProducts(results);
  }, [results]);

  useEffect(() => {
    let sortedProducts = [...originalProducts];
    switch (sortCriteria) {
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
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
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="search-results">
      <h2 className="search-results__title">Search Results</h2>
      <div className="search-results__sort-options">
        <label htmlFor="sort" className="search-results__sort-label">
          정렬 기준:{" "}
        </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortChange}
          className="search-results__sort-select"
        >
          <option value="default">기본</option>
          <option value="name">이름순</option>
          <option value="price-high">높은 가격순</option>
          <option value="price-low">낮은 가격순</option>
        </select>
      </div>
      {products.length > 0 ? (
        <ul className="search-results__list">
          {products.map((product: Product, index: number) => (
            <li key={index} className="search-results__item">
              <h3 className="search-results__item-title">{product.name}</h3>
              <p className="search-results__item-description">
                {product.description}
              </p>
              <p className="search-results__item-price">
                Price: {formatPrice(product.price)} 원
              </p>
              <Link
                to={`/product/${product.id}`}
                className="view-details-button1"
                style={{marginTop: "-10px", marginBottom: "5px"}}
              >
                제품 보러 가기
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="search-results__no-results">No results found.</p>
      )}{" "}
    </div>
  );
};

export default SearchResults;
