import React from "react";
import Banner from "./Components/Banner";
import ProductCard from "./Components/ProductCard";
import ScrollToTopButton from "./Components/ScrollToTopButton";

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
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            image={product.image} 
                            name={product.name} 
                            link={product.link} 
                        />
                    ))}
                </div>
            </div>
            <div className="recommend2">
                <p>추천2</p>
            </div>
            <ScrollToTopButton />
        </div>
    );
}

export default HomePage;
