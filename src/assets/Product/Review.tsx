import React from "react";
import "./Review.css";
import Swal from "sweetalert2";

interface ReviewProps {
  reviewer: string;
  content: string; // 제목 필드가 삭제되었습니다.
  age: number;
  gender: string;
  skinType: string;
  scalpType: string;
  rating: number;
  onEdit: () => void;
  onDelete: () => void;
  userId: string; // 현재 로그인한 사용자 ID
  reviewerId: string; // 리뷰 작성자 ID
}

const Review: React.FC<ReviewProps> = ({
  reviewer,
  content,
  age,
  gender,
  skinType,
  scalpType,
  rating,
  onEdit,
  onDelete,
  userId,
  reviewerId,
}) => {
  const isReviewer = userId === reviewerId;

  const handleDeleteClick = () => {
    Swal.fire({
      title: "리뷰를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(); // 삭제 동작 실행
        Swal.fire({
          title: "리뷰가 삭제 되었습니다.",
          text: "",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
            cancelButton: "custom-swal-cancel-button",
          },
        });
      }
    });
  };

  return (
    <div className="review">
      <div className="review-info">
        <h3>{reviewer}</h3>
        <p>{content}</p>
        <p>
          {age}세, {gender}, {skinType}, {scalpType}
        </p>
        <p>별점: {rating}</p> {/* 별점을 표시하는 부분 */}
      </div>
      {isReviewer && (
        <div className="review-actions">
          <button onClick={onEdit}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default Review;
