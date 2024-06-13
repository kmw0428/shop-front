import React, { useState } from "react";
import Swal from "sweetalert2";
import "./ReviewEditForm.css"; // 필요한 스타일 추가

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => {
  return <span onClick={onClick}>{selected ? "★" : "☆"}</span>;
};

interface RatingProps {
  className?: string; // className 속성 추가
  maxStars: number;
  rating: number;
  onChange: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  className,
  maxStars,
  rating,
  onChange,
}) => {
  const handleStarClick = (starIndex: number) => {
    const newRating = starIndex + 1;
    onChange(newRating); // 변경된 별점을 부모 컴포넌트로 전달
  };

  return (
    <div className={className}>
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

interface ReviewEditFormProps {
  reviewId: string;
  initialContent: string;
  initialRating: number;
  onSave: (id: string, content: string, rating: number) => void;
  onCancel: () => void;
}

const ReviewEditForm: React.FC<ReviewEditFormProps> = ({
  reviewId,
  initialContent,
  initialRating,
  onSave,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);
  const [rating, setRating] = useState(initialRating);

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "리뷰를 수정하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "수정",
      cancelButtonText: "취소",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      onSave(reviewId, content, rating);
      Swal.fire({
        title: "수정 완료!",
        text: "리뷰가 성공적으로 수정되었습니다.",
        icon: "success",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      });
    }
  };

  return (
    <div className="review-edit-form">
      <h1>Edit Review</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Rating
        className="rating"
        maxStars={5}
        rating={rating}
        onChange={setRating}
      />
      <div className="review-edit-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ReviewEditForm;
