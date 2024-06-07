import React from "react";
import "./Review.css";

interface ReviewProps {
  reviewer: string;
  content: string; // 제목 필드가 삭제되었습니다.
  age: number;
  gender: string;
  type: string;
  rating: number;
  onEdit: () => void;
  onDelete: () => void;
  userId: string;  // 현재 로그인한 사용자 ID
  reviewerId: string;  // 리뷰 작성자 ID
}

const Review: React.FC<ReviewProps> = ({
  reviewer,
  content,
  age,
  gender,
  type,
  rating,
  onEdit,
  onDelete,
  userId,
  reviewerId,
}) => {
  const isReviewer = userId === reviewerId;

  return (
    <div className="review">
      <div className="review-info">
        <h3>{reviewer}</h3>
        <p>{content}</p>
        <p>
          {age}세, {gender}, {type}
        </p>
        <p>별점: {rating}</p> {/* 별점을 표시하는 부분 */}
      </div>
      {isReviewer && (
        <div className="review-actions">
          <button onClick={onEdit}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default Review;
