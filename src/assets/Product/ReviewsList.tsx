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
  skinType: string;
  scalpType: string;
}

interface ReviewData {
  id?: string;
  user: User;
  content: string;
  rating: number;
  skinType: string;
  scalpType: string;
}

interface ReviewsListProps {
  productName: string;
  productId?: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ productName, productId }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<{
    age?: number;
    gender?: string;
    skinType?: string;
    scalpType?: string;
  }>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews/product/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
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
  }, [productId]);

  const getSkinRe = (skinType: string) => {
    const skin = skinType?.split(",").map(part => part.trim());
    return skin?.slice(4).join("") || "";
  };

  const getScalpRe = (scalpType: string) => {
    const scalp = scalpType?.split(",").map(part => part.trim());
    return scalp?.slice(4).join("") || "";
  };

  const handleAddReview = async (newReview: Omit<ReviewData, "id" | "user"> & { user: User }) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      const reviewPayload = {
        ...newReview,
        product: { id: productId },
        user: { id: userId }
      };
      
      const response = await axios.post("http://localhost:8080/reviews", reviewPayload);
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
    console.log(`Edit review with id: ${id}`);
  };

  const filteredReviews = reviews
    .filter((review) => review.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((review) => (filter.age ? review.user.age === filter.age : true))
    .filter((review) => (filter.gender ? review.user.gender === filter.gender : true))
    .filter((review) => (filter.skinType ? review.user.skinType === filter.skinType : true))
    .filter((review) => (filter.scalpType ? review.user.scalpType === filter.scalpType : true));

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
              <option value="남성">남성/</option>
              <option value="여성">여성</option>
            </select>
            <select onChange={(e) => setFilter({ ...filter, skinType: e.target.value })}>
              <option value="">피부 타입</option>
              <option value="지성">지성</option>
              <option value="건성">건성</option>
              <option value="복합성">복합성</option>
              <option value="중성">중성</option>
            </select>
            <select onChange={(e) => setFilter({ ...filter, scalpType: e.target.value })}>
              <option value="">두피 타입</option>
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
              reviewer={review.user ? (review.user.nickname || review.user.username) : "Unknown User"}
              content={review.content}
              age={review.user ? review.user.age : 0}
              gender={review.user ? review.user.gender : "Unknown"}
              skinType={review.user ? getSkinRe(review.user.skinType) : "Unknown"}
              scalpType={review.user ? getScalpRe(review.user.scalpType) : "Unknown"}
              rating={review.rating}
              onEdit={() => handleEditReview(review.id!)}
              onDelete={() => handleDeleteReview(review.id!)}
              userId={user?.id || ""}
              reviewerId={review.user ? review.user.id : "UnKnown"}
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
