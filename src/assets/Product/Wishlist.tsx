import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // react-icons에서 하트 아이콘 가져오기
import "./Wishlist.css";

// 제품 인터페이스 정의
interface Product {
  id: number;
  name: string;
  price: number;
}

// 예제 제품 데이터
const exampleProducts: Product[] = [
  { id: 1, name: "클렌저", price: 300 },
  { id: 2, name: "세럼", price: 260 },
  { id: 3, name: "선케어", price: 170 },
];

const Wishlist: React.FC = () => {
  // 위시리스트 상태 정의
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // 위시리스트에 제품 추가/삭제 함수
  const toggleWishlist = (product: Product) => {
    // 제품이 위시리스트에 이미 있는지 확인
    if (wishlist.some((item) => item.id === product.id)) {
      // 제품이 위시리스트에 있으면 제거
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      // 제품이 위시리스트에 없으면 추가
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Wishlist</h1>

      {/* 제품 목록 */}
      <div className="product-list">
        <h2 className="product-list-title">제품 목록</h2>
        {exampleProducts.map((product) => (
          <div key={product.id} className="product-item">
            <span className="product-name">
              {product.name} . . . . ${product.price}
            </span>
            {/* 위시리스트 추가/삭제 하트 아이콘 버튼 */}
            <button
              onClick={() => toggleWishlist(product)}
              className="wishlist-button"
            >
              {wishlist.some((item) => item.id === product.id) ? (
                <FaHeart className="heart-icon" />
              ) : (
                <FaRegHeart className="heart-icon" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* 위시리스트 목록 */}
      <div className="wishlist">
        <h2 className="wishlist-title">My Wishlist</h2>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <span className="wishlist-product-name">
                {product.name} - ${product.price}
              </span>
              {/* 위시리스트에서 제거하는 하트 아이콘 버튼 */}
              <button
                onClick={() => toggleWishlist(product)}
                className="wishlist-button"
              >
                <FaHeart className="heart-icon" />
              </button>
            </div>
          ))
        ) : (
          <p className="empty-wishlist">- 찜 목록에 상품이 없습니다 -</p> // 위시리스트에 제품이 없을 때 표시
        )}
      </div>
    </div>
  );
};

export default Wishlist;
