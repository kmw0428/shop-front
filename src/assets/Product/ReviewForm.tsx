import React, { useState } from "react";

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

interface ReviewFormProps {
  onSubmit: (reviewData: ReviewData) => void;
}

interface ReviewData {
  reviewerName: string;
  age: number;
  gender: string;
  type: string;
  productName: string;
  content: string;
  rating: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    reviewerName: "",
    age: 0,
    gender: "",
    type: "",
    productName: "",
    content: "",
    rating: 0, // 별점 필드 추가
  });

  const handleRatingChange = (newRating: number) => {
    setReviewData({ ...reviewData, rating: newRating }); // 선택된 별점 업데이트
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewData);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="rform">
        <input
          type="text"
          placeholder="리뷰어 이름"
          value={reviewData.reviewerName}
          onChange={(e) =>
            setReviewData({ ...reviewData, reviewerName: e.target.value })
          }
        />
        <input
          type="text"
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
          onChange={(e) =>
            setReviewData({ ...reviewData, type: e.target.value })
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
        <div className="rating-stars">
          <span className="rating-label">별점: </span>
          <span className="label-star"><Rating maxStars={5} onChange={handleRatingChange} /></span>
        </div>
        <textarea
          placeholder="리뷰 내용"
          value={reviewData.content}
          onChange={(e) =>
            setReviewData({ ...reviewData, content: e.target.value })
          }
        />
      </div>
      <button type="submit">리뷰 작성 완료</button>
    </form>
  );
};

export default ReviewForm;
