import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import AccordionPage from "./AccordionPage";
import ReviewsList from "./ReviewsList";
import axios from "axios";
import Swal from "sweetalert2";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setQuantity(1); // 옵션이 변경되면 수량을 1로 리셋
  };

  const calculateTotalPrice = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString("ko-KR");
  };

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      {
        Swal.fire({
          title: "Warning",
          text: "로그인 후 이용해주세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "로그인 하러 가기",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"; // 로그인 페이지로 이동
          }
        });
      }
      return;
    }

    if (!selectedOption) {
      Swal.fire({
        title: "Warning",
        text: "옵션을 선택해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      });
      return;
    }

    if (quantity <= 0) {
      Swal.fire({
        title: "Warning",
        text: "수량을 선택해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      });
      return;
    }

    try {
      const totalAmount = calculateTotalPrice(product.price, quantity);
      const orderPayload = {
        user: { id: userId },
        products: [{ id: product.id }],
        totalAmount, // 총 금액 계산
        orderDate: new Date(),
      };
      console.log(orderPayload);

      await axios.post("http://localhost:8080/orders", orderPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "장바구니에 상품이 저장되었습니다.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "장바구니 이동",
        cancelButtonText: "쇼핑 계속하기",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
          cancelButton: "custom-swal-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // If "장바구니 이동" button is clicked
          window.location.href = "/cartpage";
        }
      });
    } catch (error) {
      console.error("Order creation failed:", error);
      {
        Swal.fire({
          text: "상품 추가 중 오류가 발생하였습니다.",
          icon: "error",
          showCancelButton: true,
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    }
  };

  const handleAddToFavorites = async (product: Product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      Swal.fire({
        title: "Warning",
        text: "로그인 후 이용해주세요.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "로그인 하러 가기",
        cancelButtonText: "취소",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      if (favoriteProducts.includes(product.id!)) {
        // 위시리스트에서 제거
        const wish = await axios.get(`http://localhost:8080/wish/product/${product.id}/user/${userId}`);
        await axios.delete(`http://localhost:8080/wish/${wish.data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoriteProducts(favoriteProducts.filter(id => id !== product.id));
        Swal.fire({
          title: "즐겨찾기에서 삭제되었습니다.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      } else {
        // 위시리스트에 추가
        const wishload = {
          user: { id: userId },
          product: { id: product.id },
        };
        await axios.post("http://localhost:8080/wish", wishload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoriteProducts([...favoriteProducts, product.id!]);
        Swal.fire({
          title: "즐겨찾기에 추가되었습니다.",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "즐겨찾기로 이동",
          cancelButtonText: "계속 쇼핑하기",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
            cancelButton: "custom-swal-cancel-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/wishlist";
          }
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      Swal.fire({
        text: "즐겨찾기 업데이트 중 오류가 발생하였습니다.",
        icon: "error",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pp">
      <div className="product-page">
        <div className="product-image-container">
          <img
            src={`http://localhost:8080${product.imageUrl}`} // 제품에 맞는 이미지 경로 사용
            alt="Product"
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h2>상품명: {product.name}</h2>
          <p>설명: {product.description}</p>
          <p>
            판매가: <strong>{formatPrice(product.price)}</strong>
          </p>
          <p>배송방법: 택배</p>
          <p>
            배송비:{" "}
            {product.price >= 30000
              ? "무료"
              : "3,000원 (30,000원 이상 구매 시 무료)"}
          </p>
          <p>평일 15시까지 주문시 오늘 출발!</p>
          <hr />
          <div className="input-group">
            <label htmlFor="option-select" className="input-label">
              옵션 선택:{" "}
            </label>
            <select
              id="option-select"
              className="input-field"
              onChange={handleOptionChange}
            >
              <option value="">[필수] 옵션을 선택해주세요.</option>
              <option value={product.id}>{product.name}</option>
            </select>
          </div>
          {selectedOption && (
            <>
              <div className="input-group">
                <label htmlFor="quantity-select" className="input-label">
                  수량:{" "}
                </label>
                <select
                  id="quantity-select"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="input-field"
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <h3>
                Total:{" "}
                {formatPrice(calculateTotalPrice(product.price, quantity))}원
              </h3>
              <hr />
              <div className="PPbuttons">
                <button className="buy-button">BUY NOW</button>
                <div className="cart-wishlist">
                  <button
                    className="add-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD CART
                  </button>
                  <button
                    className={`wish-list ${favoriteProducts.includes(product.id!) ? 'favorite' : ''}`}
                    onClick={() => handleAddToFavorites(product)}
                  >
                    WISH LIST
                  </button>
                </div>
              </div>
            </>
          )}
          {!selectedOption && (
            <>
              <h3>Total: 0원</h3>
              <div className="PPbuttons">
                <button className="buy-button">BUY NOW</button>
                <div className="cart-wishlist">
                  <button
                    className="add-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD CART
                  </button>
                  <button
                    className={`wish-list ${favoriteProducts.includes(product.id!) ? 'favorite' : ''}`}
                    onClick={() => handleAddToFavorites(product)}
                  >
                    WISH LIST
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="additional-separator" />
      <div className="details">
        <AccordionPage image="/PA.jpg" productId={product.id!} />
      </div>
      <hr className="additional-separator" />
      <div className="review">
        <ReviewsList productName={product.name} productId={product.id} />
      </div>
    </div>
  );
};

export default ProductPage;
