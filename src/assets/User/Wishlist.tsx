import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // react-icons에서 하트 아이콘 가져오기
import "./Wishlist.css";
import axios from "axios";

interface User {
  id: string;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

interface Wish {
  id: string;
  user: User;
  product: Product
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Wish[]>([]);

  useEffect(() => {
    const fetchUserWish = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("사용자 ID를 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/wish/user/${userId}`);
        setWishlist(response.data);
      } catch (error) {
        console.error("찜 데이터를 가져오는 데 실패했습니다.", error);
        alert("찜 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchUserWish();
  }, []);

  const handleDeletewish = async (id: string) => {
    const confirmDelete = window.confirm('이 찜을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/wish/${id}`);
      setWishlist(wishlist.filter((wish) => wish.id !== id));
    } catch (error) {
      console.error("찜 삭제에 실패했습니다.", error);
      alert("찜 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="wishlist-container">
      <hr className='wishhr1' />
      <h1 style={{ fontSize: '3rem', marginBottom: '-20px', marginTop: '55px' }}>My Wishlist</h1>
      <hr className='wishhr2' />
      <div className="product-list">
        <h2 className="product-list-title">찜 목록</h2>

        {wishlist.length > 0 ? (
          wishlist.map((wish) => (
            <div key={wish.id} className="product-item">
              <img src={`http://localhost:8080${wish.product.imageUrl}`} alt={wish.product.name} className="wish-product-image" />
              <div className="wish-product-info">
                <span className="product-name">{wish.product.name}</span>
                <button
                  onClick={() => handleDeletewish(wish.id)}
                  className="wishlist-button"
                >
                  <FaHeart className="heart-icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-wishlist">- 찜 목록에 상품이 없습니다 -</p> // 찜리스트에 제품이 없을 때 표시
        )}
      </div>
    </div>
  );
};


export default Wishlist;
