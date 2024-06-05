import React, { useState } from "react";

interface ReviewFormProps {
  onSubmit: (reviewData: ReviewData) => void;
}

interface ReviewData {
  reviewer: string;
  productName: string; // 제품명을 입력 받습니다.
  title: string;
  content: string;
  age: number;
  gender: string;
  type: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    reviewer: "",
    productName: "", // 초기값은 빈 문자열로 설정합니다.
    title: "",
    content: "",
    age: 0,
    gender: "",
    type: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewData);
    // 리뷰 작성 후 입력 필드 초기화
    setReviewData({
      reviewer: "",
      productName: "",
      title: "",
      content: "",
      age: 0,
      gender: "",
      type: "",
    });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="리뷰어 이름"
        value={reviewData.reviewer}
        onChange={(e) =>
          setReviewData({ ...reviewData, reviewer: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="제품명"
        value={reviewData.productName}
        onChange={(e) =>
          setReviewData({ ...reviewData, productName: e.target.value })
        }
      />
      <textarea
        placeholder="리뷰 내용"
        value={reviewData.content}
        onChange={(e) =>
          setReviewData({ ...reviewData, content: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="나이"
        value={reviewData.age}
        onChange={(e) =>
          setReviewData({ ...reviewData, age: parseInt(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="성별"
        value={reviewData.gender}
        onChange={(e) =>
          setReviewData({ ...reviewData, gender: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="피부 타입"
        value={reviewData.type}
        onChange={(e) => setReviewData({ ...reviewData, type: e.target.value })}
      />
      <button type="submit">리뷰 작성 완료</button>
    </form>
  );
};

export default ReviewForm;
