import React, { useEffect, useState } from "react";
import axios from "axios";

interface AccordionItemProps {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isActive,
  onClick,
}) => {
  return (
    <div className="accordion-item">
      <div
        className={`accordion-title ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        {title}
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

interface AccordionProps {
  image: string;
  productId: string;
}

const AccordionPage: React.FC<AccordionProps> = ({ image, productId }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [productDetails, setProductDetails] = useState<{
    category: string;
    name: string;
    ingredient: string;
    recommender: string;
    htu: string;
  } | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/products/${productId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const onTitleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getCategoryContent = (category: string, name: string): string => {
    if (category === "tonic" && name.includes("헤어 에센스")) {
      return "헤어 에센스";
    }

    if (category === "tonic" && name.includes("헤어 세럼")) {
      return "세럼";
    }

    if (category === "tonic" && name.includes("워터 트리트먼트")) {
      return "트리트먼트 토닉";
    }
    
    if (category === "tonic" && name.includes("스타일링")) {
      return "픽서 토닉";
    }

    if (category === "toner" && name.includes("토너 미스트")) {
      return "토너 미스트";
    }

    if (category === "serumessence" && name.includes("에센스")) {
      return "에센스";
    }
    
    switch (category) {
      case "shampoo":
        return "샴푸";
      case "treat":
        return "트리트먼트";
      case "tonic":
        return "토닉";
      case "cleanser":
        return "클렌저"
      case "toner":
        return "토너"
      case "serumessence":
        return "세럼"
      case "lotioncream":
        return "로션크림";
      case "suncare":
        return "선케어";
      default:
        return "이 제품은 다양한 유형의 피부와 모발에 적합합니다.";
    }
  };

  const items = [
    { title: "제품제형", content: productDetails ? getCategoryContent(productDetails.category, productDetails.name) : "" },
    { title: "성분", content: productDetails?.ingredient || "" },
    { title: "추천하는 타입", content: productDetails?.recommender || "" },
    { title: "사용방법", content: productDetails?.htu || "" },
  ];

  return (
    <div className="accordion-container">
      <div className="accordion-image">
        <img src={image} alt="Accordion" />
      </div>
      <div className="accordion">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isActive={activeIndex === index}
            onClick={() => onTitleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionPage;
