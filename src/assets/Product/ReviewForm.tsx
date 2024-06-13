import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => {
  return <span onClick={onClick}>{selected ? "★" : "☆"}</span>;
};

interface RatingProps {
  maxStars: number;
  onChange: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ maxStars, onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex: number) => {
    const newRating = starIndex + 1;
    setRating(newRating);
    onChange(newRating); // 변경된 별점을 부모 컴포넌트로 전달
  };

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          selected={index < rating}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

interface User {
  id: string;
  username: string;
  nickname: string;
  age: number;
  gender: string;
  skinType: string;
  scalpType: string;
}

interface ReviewFormProps {
  onSubmit: (reviewData: Omit<ReviewData, "id"> & { user: User }) => void;
  user?: User | null; // 여기를 수정하여 null 및 undefined를 허용
  productName: string;
}

interface ReviewData {
  reviewer: string;
  content: string;
  age: number;
  gender: string;
  skinType: string;
  scalpType: string;
  productName: string;
  rating: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  user,
  productName,
}) => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState<Omit<ReviewData, "id">>({
    reviewer: user?.nickname || user?.username || "",
    age: user?.age || 0,
    gender: user?.gender || "",
    skinType: user?.skinType || "",
    scalpType: user?.scalpType || "",
    productName: productName,
    content: "",
    rating: 0, // 별점 필드 추가
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setReviewData({
      reviewer: user?.nickname || user?.username || "",
      age: user?.age || 0,
      gender: user?.gender || "",
      skinType: user?.skinType || "",
      scalpType: user?.scalpType || "",
      productName: productName,
      content: "",
      rating: 0,
    });
  }, [user, productName]);

  const handleRatingChange = (newRating: number) => {
    setReviewData({ ...reviewData, rating: newRating }); // 선택된 별점 업데이트
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
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
    onSubmit({ ...reviewData, user });
  };

  const getSkinResult = (code: string) => {
    switch (code) {
      case "DSPW":
      case "DSPT":
        return "건성, 민감성";
      case "DSNW":
      case "DSNT":
        return "건성, 주름성";
      case "DRPW":
      case "DRNW":
        return "건성, 주름성";
      case "DRPT":
      case "DRNT":
        return "건성";
      case "OSPW":
        return "지성";
      case "OSPT":
      case "OSNW":
      case "OSNT":
        return "지성, 민감성";
      case "ORPW":
      case "ORNW":
        return "지성, 주름성";
      case "ORPT":
      case "ORNT":
        return "지성";
      default:
        return "";
    }
  };

  const getScalpResult = (code: string) => {
    switch (code) {
      case "DASH":
      case "DASI":
        return "건성, 탈모, 민감성";
      case "DARH":
      case "DARI":
        return "건성, 탈모";
      case "DNSH":
      case "DNSI":
        return "건성, 민감성";
      case "DNRH":
      case "DNRI":
        return "건성";
      case "OASH":
      case "OASI":
        return "지성, 탈모, 민감성";
      case "OARH":
      case "OARI":
        return "지성, 탈모";
      case "ONSH":
      case "ONSI":
        return "지성, 민감성";
      case "ONRH":
      case "ONRI":
        return "지성";
      default:
        return "";
    }
  };

  const getSkinRe = (skinType: string) => {
    const skin = skinType?.split(",").map((part) => part.trim());
    const skRe = skin?.slice(4).join("") || "";
    return getSkinResult(skRe);
  };

  const getScalpRe = (scalpType: string) => {
    const scalp = scalpType?.split(",").map((part) => part.trim());
    const scRe = scalp?.slice(4).join("") || "";
    return getScalpResult(scRe);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="rform">
        <input
          type="text"
          name="reviewer"
          placeholder="리뷰어 이름"
          value={reviewData.reviewer}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="나이"
          value={reviewData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="성별"
          value={reviewData.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          name="skinType"
          placeholder="피부 타입"
          value={getSkinRe(reviewData.skinType)}
          onChange={handleChange}
        />
        <input
          type="text"
          name="scalpType"
          placeholder="두피 타입"
          value={getScalpRe(reviewData.scalpType)}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productName"
          placeholder="제품명"
          value={reviewData.productName}
          onChange={handleChange}
        />
        <div className="rating-stars">
          <span className="rating-label">별점: </span>
          <span className="label-star">
            <Rating maxStars={5} onChange={handleRatingChange} />
          </span>
        </div>
        <textarea
          name="content"
          placeholder="리뷰 내용"
          value={reviewData.content}
          onChange={handleChange}
        />
      </div>
      <button type="submit">리뷰 작성 완료</button>
    </form>
  );
};

export default ReviewForm;
