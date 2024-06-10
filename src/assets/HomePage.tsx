import React, { useRef, useEffect, useState } from "react";
import Banner from "./Components/Banner";
import ProductCard from "./Components/ProductCard";

// 임시 제품 데이터 타입 정의
interface Product {
  id: number;
  image: string;
  name: string;
  link: string;
}

// 임시 제품 데이터
const products: Product[] = [
  { id: 1, image: "path/to/image1.jpg", name: "Product 1", link: "/product1" },
  { id: 2, image: "path/to/image2.jpg", name: "Product 2", link: "/product2" },
  { id: 3, image: "path/to/image3.jpg", name: "Product 3", link: "/product3" },
  { id: 4, image: "path/to/image4.jpg", name: "Product 4", link: "/product4" },
  { id: 5, image: "path/to/image5.jpg", name: "Product 5", link: "/product5" },
];

const HomePage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

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

  return (
    <div className="container">
      <div className="banner">
        <Banner />
      </div>
      <div className="recommend1">
        <div className="header">
          <p>Products</p>
          <button className="view-all-button">추천 모든 제품 보기</button>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              link={product.link}
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
