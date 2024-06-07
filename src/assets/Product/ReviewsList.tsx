import React, { useEffect, useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import "./ReviewsList.css";
import axios from "axios";

interface User {
  id: string;
  username: string;
  nickname: string;
  age: number;
  gender: string;
}

interface ReviewData {
  id?: string; // 선택적 필드로 변경
  reviewer: string;
  content: string;
  age: number;
  gender: string;
  type: string;
  rating: number;
}

interface ReviewsListProps {
  productName: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ productName }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<{
    age?: number;
    gender?: string;
    type?: string;
  }>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchUser = async () => {
      const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 사용자 ID 가져오기
      if (!userId) {
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchReviews();
    fetchUser();
  }, []);

  const handleAddReview = async (newReview: Omit<ReviewData, "id">) => {
    try {
      const response = await axios.post("http://localhost:8080/reviews", newReview);
      setReviews([...reviews, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = (id: string) => {
    // 리뷰 수정 로직을 구현하세요
    console.log(`Edit review with id: ${id}`);
  };

  const filteredReviews = reviews
    .filter((review) => review.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((review) => (filter.age ? review.age === filter.age : true))
    .filter((review) => (filter.gender ? review.gender === filter.gender : true))
    .filter((review) => (filter.type ? review.type === filter.type : true));

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);

  const handleLeaveFeedbackClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="reviews-container">
      <div className="reviews-list">
        <div className="reviews-summary">
          <span>REVIEW</span>
          <div className="rating">
            <span className="rating-score">{averageRating}</span>
            <span className="rating-star">★</span>
          </div>
          <button className="leave-feedback" onClick={handleLeaveFeedbackClick}>
            {showForm ? "리뷰 작성 닫기" : "리뷰 작성"}
          </button>
        </div>

        {showForm && <ReviewForm onSubmit={handleAddReview} user={user} productName={productName} />}
      </div>

      <div className="reviews-content">
        <div className="left-panel">
          <div className="filters">
            <input
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select onChange={(e) => setFilter({ ...filter, gender: e.target.value })}>
              <option value="">성별</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
            <select onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
              <option value="">타입</option>
              <option value="지성">지성</option>
              <option value="건성">건성</option>
              <option value="복합성">복합성</option>
              <option value="중성">중성</option>
            </select>
          </div>
        </div>

        <div className="right-panel">
          {filteredReviews.map((review) => (
            <Review
              key={review.id}
              reviewer={review.reviewer}
              content={review.content}
              age={review.age}
              gender={review.gender}
              type={review.type}
              rating={review.rating}
              onEdit={() => handleEditReview(review.id!)}
              onDelete={() => handleDeleteReview(review.id!)}
            />
          ))}
          <div className="pagination">
            <button className="prev">&laquo;</button>
            <button className="next">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;
