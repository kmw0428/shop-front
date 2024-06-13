import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./Wishlist.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
  product: Product;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Wish[]>([]);

  useEffect(() => {
    const fetchUserWish = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Swal.fire({
          title: "Warning",
          text: "사용자 ID를 찾을 수 없습니다.",
          icon: "warning",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/wish/user/${userId}`
        );
        setWishlist(response.data);
      } catch (error) {
        console.error("즐겨찾기 데이터를 가져오는 데 실패했습니다.", error);
        Swal.fire({
          text: "즐겨찾기 데이터를 가져오는 데 실패했습니다.",
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    };

    fetchUserWish();
  }, []);

  const handleDeleteWish = async (id: string) => {
    const result = await Swal.fire({
      title: "이 상품을 즐겨찾기에서 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/wish/${id}`);
        setWishlist(wishlist.filter((wish) => wish.id !== id));
        Swal.fire({
          title: "삭제 완료!",
          text: "상품이 즐겨찾기에서 삭제되었습니다.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      } catch (error) {
        console.error("즐겨찾기 삭제에 실패했습니다.", error);
        Swal.fire({
          text: "즐겨찾기 삭제에 실패했습니다.",
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    }
  };

  return (
    <div className="wishlist-container wishcont">
      <hr className="wishhr1" />
      <h1
        style={{ fontSize: "3rem", marginBottom: "-20px", marginTop: "55px" }}
      >
        My Wishlist
      </h1>
      <hr className="wishhr2" />
      <div className="product-wishlist">
        {wishlist.length > 0 ? (
          wishlist.map((wish) => (
            <div key={wish.id} className="wish-product-item">
              <img
                src={`http://localhost:8080${wish.product.imageUrl}`}
                alt={wish.product.name}
                className="wish-product-image"
              />
              <div className="wish-product-info">
                <span className="wish-product-name">{wish.product.name}</span>
                <div className="button-link-group">
                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    className="wishlist-button"
                  >
                    <FaHeart className="heart-icon" />
                  </button>
                  <Link
                    to={`/product/${wish.product.id}`}
                    className="viewproducpage"
                  >
                    제품 보러 가기
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-wishlist">- 즐겨찾기 목록에 상품이 없습니다 -</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
