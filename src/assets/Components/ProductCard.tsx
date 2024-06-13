import React from "react";
import "./Recommend.css";

interface ProductCardProps {
  image: string;
  name: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, link }) => {
  return (
    <div className="product-card-container">
      <div className="product-card">
        <img src={image} alt={name} />
        <span className="best">best</span>
        <h3>{name}</h3>
        <a href={link} target="_blank" rel="noopener noreferrer">
          제품 보러 가기
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
