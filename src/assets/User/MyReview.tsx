import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyReview.css";
import Swal from "sweetalert2";

interface User {
  id: string;
  username: string;
  nickname: string;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
}

interface Review {
  id: string;
  user: User;
  product: Product;
  content: string;
  rating: number;
}

interface StarProps {
  selected: boolean;
  onClick: () => void;
  editable: boolean;
}

const Star: React.FC<StarProps> = ({ selected, onClick, editable }) => {
  return (
    <span
      onClick={onClick}
      style={{ cursor: editable ? "pointer" : "default" }}
      className={`star ${selected ? "filled" : ""}`}
    >
      {selected ? "★" : "☆"}
    </span>
  );
};

interface RatingProps {
  rating: number;
  editable: boolean;
  onChange: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, editable, onChange }) => {
  const handleStarClick = (starIndex: number) => {
    if (editable) {
      onChange(starIndex + 1);
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          selected={index < rating}
          onClick={() => handleStarClick(index)}
          editable={editable}
        />
      ))}
    </div>
  );
};

const MyReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const [editingRating, setEditingRating] = useState<number>(0);

  useEffect(() => {
    const fetchUserReviews = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Swal.fire({
          title: "Warning",
          text: "사용자 ID를 찾을 수 없습니다.",
          icon: "warning",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/reviews/user/${userId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 데 실패했습니다.", error);
        Swal.fire({
          text: "리뷰 데이터를 가져오는 데 실패했습니다.",
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    };

    fetchUserReviews();
  }, []);

  const handleDeleteReview = async (id: string) => {
    const result = await Swal.fire({
      title: "이 리뷰를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/reviews/${id}`);
        setReviews(reviews.filter((review) => review.id !== id));
        Swal.fire({
          title: "삭제 완료!",
          text: "리뷰가 성공적으로 삭제되었습니다.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      } catch (error) {
        console.error("리뷰 삭제에 실패했습니다.", error);
        Swal.fire({
          text: "리뷰 삭제에 실패했습니다.",
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    }
  };

  const handleEditReview = (id: string, content: string, rating: number) => {
    setEditingReviewId(id);
    setEditingContent(content);
    setEditingRating(rating);
  };

  const handleSaveReview = async (id: string) => {
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
      try {
        await axios.put(`http://localhost:8080/reviews/${id}`, {
          content: editingContent,
          rating: editingRating,
        });
        setReviews(
          reviews.map((review) =>
            review.id === id
              ? { ...review, content: editingContent, rating: editingRating }
              : review
          )
        );
        setEditingReviewId(null);
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
      } catch (error) {
        console.error("리뷰 수정에 실패했습니다.", error);
        Swal.fire({
          text: "리뷰 수정에 실패했습니다.",
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  return (
    <div className="user-reviews">
      <hr className="reviewhr1" />
      <h1
        style={{ fontSize: "3rem", marginBottom: "-20px", marginTop: "55px" }}
      >
        My Review
      </h1>
      <hr className="reviewhr2" />
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-product">
              <div className="review-product-image-container">
                <img
                  src={`http://localhost:8080${review.product.imageUrl}`}
                  alt={review.product.name}
                  className="review-product-image"
                />
              </div>
              <div className="review-product-info">
                <h3>{review.product.name}</h3>
                <div>
                  <Rating
                    rating={review.rating}
                    editable={editingReviewId === review.id}
                    onChange={(newRating) => {
                      if (editingReviewId === review.id) {
                        setEditingRating(newRating);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="review-content">
              {editingReviewId === review.id ? (
                <div className="edit-review-container">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="edit-review-input"
                  />
                  <Rating
                    rating={editingRating}
                    editable={true}
                    onChange={setEditingRating}
                  />
                  <div className="review-buttons">
                    <button onClick={() => handleSaveReview(review.id)}>
                      저장
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={handleCancelEdit}>취소</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{review.content}</p>
                  <div className="review-buttons">
                    <button
                      onClick={() =>
                        handleEditReview(
                          review.id,
                          review.content,
                          review.rating
                        )
                      }
                    >
                      수정
                    </button>
                    &nbsp;&nbsp;
                    <button onClick={() => handleDeleteReview(review.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>아직 작성된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MyReview;
