import React, { useEffect, useState } from "react";
import axios from "axios";

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

const MyReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  useEffect(() => {
    const fetchUserReviews = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("사용자 ID를 찾을 수 없습니다.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/reviews/user/${userId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 데 실패했습니다.", error);
        alert("리뷰 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchUserReviews();
  }, []);

  const handleDeleteReview = async (id: string) => {
    const confirmDelete = window.confirm('이 리뷰를 삭제하시겠습니까?');
    if (!confirmDelete) {
        return;
    }

    try {
      await axios.delete(`http://localhost:8080/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("리뷰 삭제에 실패했습니다.", error);
      alert("리뷰 삭제에 실패했습니다.");
    }
  };

  const handleEditReview = (id: string, content: string) => {
    setEditingReviewId(id);
    setEditingContent(content);
  };

  const handleSaveReview = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/reviews/${id}`, { content: editingContent });
      setReviews(reviews.map((review) => (review.id === id ? { ...review, content: editingContent } : review)));
      setEditingReviewId(null);
    } catch (error) {
      console.error("리뷰 수정에 실패했습니다.", error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  return (
    <div className="user-reviews">
      <h1>나의 리뷰</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-product">
              <img src={`http://localhost:8080${review.product.imageUrl}`} alt={review.product.name} className="review-product-image" />
              <div className="review-product-info">
                <h3>{review.product.name}</h3>
                <p>별점: {review.rating}</p>
              </div>
            </div>
            <div className="review-content">
              {editingReviewId === review.id ? (
                <div>
                  <input
                    type="text"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <button onClick={() => handleSaveReview(review.id)}>저장</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              ) : (
                <div>
                  <p>{review.content}</p>
                  <button onClick={() => handleEditReview(review.id, review.content)}>수정</button>
                  <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
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
