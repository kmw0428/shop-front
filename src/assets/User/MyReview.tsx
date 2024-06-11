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
              <p>{review.content}</p>
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
