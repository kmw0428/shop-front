import React, { useState } from "react";
import "./ReviewEditForm.css"; // 필요한 스타일 추가

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => {
  return <span onClick={onClick}>{selected ? "★" : "☆"}</span>;
};

interface RatingProps {
  maxStars: number;
  rating: number;
  onChange: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ maxStars, rating, onChange }) => {
  const handleStarClick = (starIndex: number) => {
    const newRating = starIndex + 1;
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

  const handleSave = () => {
    onSave(reviewId, content, rating);
  };

  return (
    <div className="review-edit-form">
      <h2>Edit Review</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Rating maxStars={5} rating={rating} onChange={setRating} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ReviewEditForm;
