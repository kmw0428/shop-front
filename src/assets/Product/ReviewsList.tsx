import React, { useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import "./ReviewsList.css";

interface ReviewData {
  reviewer: string;
  content: string;
  age: number;
  gender: string;
  type: string;
}

interface Product {
  title: string;
}

const initialReviews: ReviewData[] = [
  {
    reviewer: "HANNA T",
    content:
      "이것은 최고의 클렌저입니다. 나는 이것을 얼굴과 때때로 면도 제품으로 씁니다...",
    age: 30,
    gender: "여성",
    type: "지성",
  },
  {
    reviewer: "TETIANA B",
    content:
      "분말 형태로 매우 편리하고 경제적인 옵션입니다. 건조함이 느껴지지 않습니다...",
    age: 25,
    gender: "여성",
    type: "건성",
  },
  {
    reviewer: "KATERINA G",
    content:
      "이 제품을 사용한 후, 나는 완전히 액체 클렌저 젤을 잊어버렸습니다...",
    age: 35,
    gender: "여성",
    type: "복합성",
  },
  {
    reviewer: "HANNA H",
    content: "피부의 긴장감 없이 완벽하게 청소합니다...",
    age: 40,
    gender: "여성",
    type: "중성",
  },
];

const product: Product[] = [
  {
    title: "Céleste 시그니처 샴푸 1,000ml",
  },
];

const ReviewsList: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>(initialReviews);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<{
    age?: number;
    gender?: string;
    type?: string;
  }>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleAddReview = (newReview: ReviewData) => {
    setReviews([...reviews, newReview]);
    setShowForm(false);
  };

  const handleEditReview = (index: number) => {
    // 리뷰 수정 로직
  };

  const handleDeleteReview = (index: number) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const filteredReviews = reviews
    .filter((review) =>
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((review) => (filter.age ? review.age === filter.age : true))
    .filter((review) =>
      filter.gender ? review.gender === filter.gender : true
    )
    .filter((review) => (filter.type ? review.type === filter.type : true))
    .sort((a, b) => {
      if (sortCriteria === "age") return a.age - b.age;
      if (sortCriteria === "gender") return a.gender.localeCompare(b.gender);
      if (sortCriteria === "type") return a.type.localeCompare(b.type);
      return 0;
    });

  const averageRating = (
    reviews.reduce((acc, review) => acc + 4.8, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="reviews-list">
      <div className="reviews-summary">
        <span>리뷰</span>
        <div className="rating">
          <span className="rating-score">{averageRating}</span>
          <span>★</span>
        </div>
        <button className="leave-feedback" onClick={() => setShowForm(true)}>
          리뷰 작성
        </button>
      </div>

      {showForm && (
        <ReviewForm
          onSubmit={(reviewData) =>
            handleAddReview({
              ...reviewData,
              title: product.title, // 제품명을 리뷰 제목으로 설정합니다.
            })
          }
        />
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="">정렬 기준</option>
          <option value="age">나이</option>
          <option value="gender">성별</option>
          <option value="type">타입</option>
        </select>
        <select
          onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
        >
          <option value="">성별 필터</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        <select
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="">타입 필터</option>
          <option value="지성">지성</option>
          <option value="건성">건성</option>
          <option value="복합성">복합성</option>
          <option value="중성">중성</option>
        </select>
      </div>

      {filteredReviews.map((review, index) => (
        <Review
          key={index}
          reviewer={review.reviewer}
          content={review.content}
          age={review.age}
          gender={review.gender}
          type={review.type}
          onEdit={() => handleEditReview(index)}
          onDelete={() => handleDeleteReview(index)}
        />
      ))}
      <div className="pagination">
        <button className="prev">&laquo;</button>
        <button className="next">&raquo;</button>
      </div>
    </div>
  );
};

export default ReviewsList;