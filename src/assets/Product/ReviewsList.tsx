import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ReviewEditForm from "./ReviewEditForm";
import "./ReviewsList.css";
import axios from "axios";

Modal.setAppElement("#root");

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

const getSkinResult = (code: string) => {
  switch (code) {
    case 'DSPW':
    case 'DSPT':
      return '건성, 민감성';
    case 'DSNW':
    case 'DSNT':
      return '건성, 주름성';
    case 'DRPW':
    case 'DRNW':
      return '건성, 주름성';
    case 'DRPT':
    case 'DRNT':
      return '건성';
    case 'OSPW':
      return '지성';
    case 'OSPT':
    case 'OSNW':
    case 'OSNT':
      return '지성, 민감성';
    case 'ORPW':
    case 'ORNW':
      return '지성, 주름성';
    case 'ORPT':
    case 'ORNT':
      return '지성';
    default:
      return '';
  }
};

const getScalpResult = (code: string) => {
  switch (code) {
    case 'DASH':
    case 'DASI':
      return '건성, 탈모, 민감성';
    case 'DARH':
    case 'DARI':
      return '건성, 탈모';
    case 'DNSH':
    case 'DNSI':
      return '건성, 민감성';
    case 'DNRH':
    case 'DNRI':
      return '건성';
    case 'OASH':
    case 'OASI':
      return '지성, 탈모, 민감성';
    case 'OARH':
    case 'OARI':
      return '지성, 탈모';
    case 'ONSH':
    case 'ONSI':
      return '지성, 민감성';
    case 'ONRH':
    case 'ONRI':
      return '지성';
    default:
      return '';
  }
};

const getSkinRe = (skinType: string) => {
  const skin = skinType?.split(",").map(part => part.trim());
  const skRe = skin?.slice(4).join("") || "";
  return getSkinResult(skRe);
};

const getScalpRe = (scalpType: string) => {
  const scalp = scalpType?.split(",").map(part => part.trim());
  const scRe = scalp?.slice(4).join("") || "";
  return getScalpResult(scRe);
};

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
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editReview, setEditReview] = useState<ReviewData | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/reviews/product/${productId}`);
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
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchReviews();
    fetchUser();
  }, [productId]);

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

      const response = await axios.post("https://shoppingback-ltd0.onrender.com/reviews", reviewPayload);
      setReviews([...reviews, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await axios.delete(`https://shoppingback-ltd0.onrender.com/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = (id: string) => {
    const reviewToEdit = reviews.find((review) => review.id === id);
    if (reviewToEdit) {
      setEditReview(reviewToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveReview = async (id: string, content: string, rating: number) => {
    try {
      const response = await axios.put(`https://shoppingback-ltd0.onrender.com/reviews/${id}`, { content, rating });
      setReviews(reviews.map((review) => (review.id === id ? response.data : review)));
      setIsEditModalOpen(false);
      setEditReview(null);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const filteredReviews = reviews
    .filter((review) => review.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((review) => (filter.age ? review.user.age === filter.age : true))
    .filter((review) => (filter.gender ? review.user.gender === filter.gender : true))
    .filter((review) => (filter.skinType ? getSkinRe(review.user.skinType).includes(filter.skinType) : true))
    .filter((review) => (filter.scalpType ? getScalpRe(review.user.scalpType).includes(filter.scalpType) : true));

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
            <select onChange={(e) => setFilter({ ...filter, skinType: e.target.value })}>
              <option value="">피부 타입</option>
              <option value="지성">지성</option>
              <option value="건성">건성</option>
              <option value="주름성">주름성</option>
              <option value="민감성">민감성</option>
            </select>
            <select onChange={(e) => setFilter({ ...filter, scalpType: e.target.value })}>
              <option value="">두피 타입</option>
              <option value="지성">지성</option>
              <option value="건성">건성</option>
              <option value="탈모">탈모</option>
              <option value="민감성">민감성</option>
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

      <Modal isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)} className="modal">
        {editReview && (
          <ReviewEditForm
            reviewId={editReview.id!}
            initialContent={editReview.content}
            initialRating={editReview.rating}
            onSave={handleSaveReview}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditReview(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ReviewsList;
