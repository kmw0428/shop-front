import React from "react";
import "./Review.css";

interface ReviewProps {
  reviewer: string;
  content: string; // 제목 필드가 삭제되었습니다.
  age: number;
  gender: string;
  type: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Review: React.FC<ReviewProps> = ({
  reviewer,
  content,
  age,
  gender,
  type,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="review">
      <div className="review-header">
        <span className="reviewer">{reviewer}</span>
      </div>
      <div className="content">{content}</div>
      <div className="review-footer">
        <span>{age}세</span>
        <span>{gender}</span>
        <span>{type}</span>
        <div className="edit-buttons">
          <button onClick={onEdit}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default Review;
