import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./Components/Banner";
import ProductCard from "./Components/ProductCard";
import axios from "axios";

// 임시 제품 데이터 타입 정의
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
}

const HomePage: React.FC = () => {
  const [, setProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/products/status/best");
        const productsData = response.data;
        setProducts(productsData);
        setDisplayProducts(
          productsData.sort(() => 0.5 - Math.random()).slice(0, 6)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const handleLoad = () => {
        const aspectRatio =
          imageRef.current!.naturalWidth / imageRef.current!.naturalHeight;
        const containerWidth = imageRef.current!.parentElement!.clientWidth;
        setImageHeight(containerWidth / aspectRatio);
      };

      if (imageRef.current.complete) {
        handleLoad();
      } else {
        imageRef.current.onload = handleLoad;
      }
    }
  }, []);

  const handleViewAllClick = () => {
    navigate("/bestproduct");
  };

  return (
    <div className="container">
      <div className="banner">
        <Banner />
      </div>
      <div className="recommend1">
        <div className="header">
          <p style={{marginLeft: "20px"}}>Best Products</p>
          <button className="view-all-button" onClick={handleViewAllClick}>BEST 제품 보기</button>
        </div>
        <div className="product-list">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={`http://localhost:8081${product.imageUrl}`}
              name={product.name}
              link={`product/${product.id}`}
            />
          ))}
        </div>
      </div>
      <div
        className="recommend2"
        style={{ height: imageHeight ? `${imageHeight}px` : "auto" }}
      >
        <div className="recommend2-image">
          <img
            ref={imageRef}
            src="/about.jpg"
            alt="About Us"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="recommend2-about">
          <p>About Us</p>
          <p>
            Céleste(셀레스트)는 맞춤 스킨/두피 케어 화장품 쇼핑몰입니다. <br />
            우리는 고객 한 분 한 분의 피부와 두피에 최적화된 제품을 제공하여
            <br />
            건강하고 아름다운 피부와 두피를 위한 솔루션을 찾으시는 분들께 만족을
            드리고자 합니다. <br />
            우리의 제품은 천연 성분을 기반으로 하여 피부에 부담을 주지
            않으면서도 효과적인 결과를 보장합니다. <br />
            셀레스트와 함께라면 건강하고 빛나는 피부와 두피를 위한 여정을
            시작해보세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
