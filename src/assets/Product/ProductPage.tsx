import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
// import ReviewPage from "./ReviewPage";
import AccordionPage from "./AccordionPage";

interface Product {
  id: string;
  title: string;
  oldPrice: string;
  price: string;
  discount: string;
  isNew: boolean;
  image: string;
}

const products: Product[] = [
  {
    id: "product-1",
    title: "Céleste 시그니처 샴푸 1,000ml",
    oldPrice: "23,000원",
    price: "12,900원",
    discount: "44% off",
    isNew: false,
    image: "/shampoo1.jpg",
  },
  {
    id: "product-2",
    title: "Céleste 샴푸 1,000ml 라벤더머스크 향",
    oldPrice: "22,000원",
    price: "12,900원",
    discount: "",
    isNew: true,
    image: "/shampoo2.jpg",
  },
  {
    id: "product-3",
    title: "Céleste 샴푸 1,000ml 로즈우드 향",
    oldPrice: "23,000원",
    price: "12,900원",
    discount: "",
    isNew: true,
    image: "/shampoo3.jpg",
  },
  {
    id: "product-4",
    title: "Céleste 두피 케어 샴푸 (지성 및 지루성) 500ml",
    oldPrice: "24,900원",
    price: "14,900원",
    discount: "38% off",
    isNew: false,
    image: "/shampoo4.jpg",
  },
  {
    id: "product-5",
    title: "Céleste 두피 케어 샴푸 (건성) 500ml",
    oldPrice: "24,900원",
    price: "14,900원",
    discount: "38% off",
    isNew: false,
    image: "/shampoo5.jpg",
  },
  {
    id: "product-6",
    title: "Céleste 두피 케어 샴푸 (민감성) 500ml",
    oldPrice: "24,900원",
    price: "14,900원",
    discount: "38% off",
    isNew: false,
    image: "/shampoo6.jpg",
  },
  {
    id: "product-7",
    title: "Céleste 탈모 케어 샴푸 500ml",
    oldPrice: "44,000원",
    price: "16,900원",
    discount: "62% off",
    isNew: false,
    image: "/shampoo7.jpg",
  },
  {
    id: "product-8",
    title: "Céleste 샴푸 1,000ml 티트리로즈마리 향",
    oldPrice: "",
    price: "12,900원",
    discount: "",
    isNew: false,
    image: "/shampoo8.jpg",
  },
  {
    id: "product-9",
    title: "Céleste 샴푸 1,000ml 탠저린시트러스 향",
    oldPrice: "",
    price: "12,900원",
    discount: "",
    isNew: false,
    image: "/shampoo9.jpg",
  },
  // 다른 제품들 추가
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === id);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setQuantity(1); // 옵션이 변경되면 수량을 1로 리셋
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateTotalPrice = (price: string, quantity: number): number => {
    const numericPrice = parseInt(price.replace(/[^\d]/g, ""));
    return numericPrice * quantity;
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString("ko-KR");
  };

  const accordionItems = [
    {
      title: "제품제형",
      content: "",
    },
    {
      title: "성분",
      content: "",
    },
    {
      title: "추천하는 타입",
      content: "",
    },
    {
      title: "사용방법",
      content: "",
    },
  ];

  return (
    <div className="pp">
      <div className="product-page">
        <div className="product-image-container">
          <img
            src={product.image} // 제품에 맞는 이미지 경로 사용
            alt="Product"
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h2>상품명: {product.title}</h2>
          <p>
            소비자가: <s>{product.oldPrice}</s>
          </p>
          <p>
            판매가: <strong>{product.price}</strong>
          </p>
          <p>배송방법: 택배</p>
          <p>
            배송비:{" "}
            {parseInt(product.price.replace(/[^\d]/g, "")) >= 30000
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
              <option value={product.id}>{product.title}</option>
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
                  <button className="add-cart">ADD CART</button>
                  <button className="wish-list">WISH LIST</button>
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
                  <button className="add-cart">ADD CART</button>
                  <button className="wish-list">WISH LIST</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="additional-separator" />
      <div className="details">
        <AccordionPage items={accordionItems} image="/PA.jpg" />
      </div>
      <hr className="additional-separator" />
      {/* <div className="review">
        <ReviewPage />
      </div> */}
    </div>
  );
};

export default ProductPage;
