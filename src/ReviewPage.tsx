import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Review 인터페이스 정의
interface Review {
  id: number;
  rating: number | null;
  review: string;
  image?: string;
}

const ReviewPage: React.FC = () => {
  // 상태 정의
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [editReviewIndex, setEditReviewIndex] = useState<number | null>(null);
  const [showImageReviews, setShowImageReviews] = useState<boolean>(false);
  const [showTextReviews, setShowTextReviews] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  // 평점 변경 핸들러
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
  };

  // 리뷰 텍스트 변경 핸들러
  const handleReviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  // 이미지 파일 변경 핸들러
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  // 리뷰 제출 핸들러
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editReviewIndex !== null) {
      // 기존 리뷰 수정
      const updatedReviewsList = [...reviewsList];
      updatedReviewsList[editReviewIndex] = {
        ...updatedReviewsList[editReviewIndex],
        rating,
        review,
        image: image ? URL.createObjectURL(image) : undefined
      };
      setReviewsList(updatedReviewsList);
      setEditReviewIndex(null);
    } else {
      // 새로운 리뷰 추가 (최신순으로 맨 앞에 추가)
      setReviewsList([
        { id: Date.now(), rating, review, image: image ? URL.createObjectURL(image) : undefined },
        ...reviewsList
      ]);
    }
    // 입력 폼 초기화
    setRating(0);
    setReview('');
    setImage(null);
  };

  // 리뷰 삭제 핸들러
  const handleDeleteReview = (id: number) => {
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (isConfirmed) {
      const updatedReviewsList = reviewsList.filter(item => item.id !== id);
      setReviewsList(updatedReviewsList);
    }
  };

  // 리뷰 수정 핸들러
  const handleEditReview = (id: number) => {
    const index = reviewsList.findIndex(item => item.id === id);
    if (index !== -1) {
      const { rating, review } = reviewsList[index];
      setRating(rating);
      setReview(review);
      setImage(null); // 기존 이미지 초기화
      setEditReviewIndex(index);
    }
  };

  // 평점의 평균 계산 함수
  const calculateAverageRating = () => {
    if (reviewsList.length === 0) return null;
    const totalRating = reviewsList.reduce((acc, review) => acc + (review.rating || 0), 0);
    return totalRating / reviewsList.length;
  };

  // reviewsList가 변경될 때마다 평균 평점을 업데이트
  useEffect(() => {
    setAverageRating(calculateAverageRating());
  }, [reviewsList]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <FormGroup style={{ marginBottom: '20px' }}>
        {/* 포토 리뷰 체크박스 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showImageReviews}
              onChange={() => {
                setShowImageReviews(!showImageReviews);
                setShowTextReviews(false); // 체크박스를 동시에 선택할 수 없도록 설정
              }}
            />
          }
          label="포토 리뷰"
        />
        {/* 텍스트 리뷰 체크박스 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showTextReviews}
              onChange={() => {
                setShowTextReviews(!showTextReviews);
                setShowImageReviews(false); // 체크박스를 동시에 선택할 수 없도록 설정
              }}
            />
          }
          label="텍스트 리뷰"
        />
      </FormGroup>
      <hr />
      {/* 평균 평점 표시 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>평균 평점 ★ : {averageRating !== null ? averageRating.toFixed(1) : '0'}</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* 평점 입력 */}
          <Rating
            name="half-rating"
            defaultValue={0.0}
            precision={0.5}
            value={rating}
            onChange={handleRatingChange}
          />
          {/* 리뷰 텍스트 입력 */}
          <TextField
            label="Review"
            multiline
            rows={4}
            variant="outlined"
            value={review}
            onChange={handleReviewChange}
          />
          {/* 이미지 파일 입력 */}
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {/* 선택된 이미지 미리보기 */}
          {image && <img src={URL.createObjectURL(image)} alt="Review" style={{ maxWidth: '100px', margin: '10px 0' }} />}
          {/* 제출 버튼 */}
          <Button type="submit" variant="contained" color="primary">
            {editReviewIndex !== null ? '수정 완료' : '작성 완료'}
          </Button>
        </Stack>
      </form>
      <hr />
      {/* 이미지가 있는 리뷰들의 이미지를 가로로 나열 */}
      <div style={{ display: 'flex', overflowX: 'auto', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ddd' }}>
        {reviewsList
          .filter(item => item.image)
          .map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt="Review"
              style={{ maxWidth: '100px', marginRight: '10px', cursor: 'pointer' }}
              onClick={() => (window.location.hash = `#review-${item.id}`)}
            />
          ))}
      </div>

      <div>
        <h3>Review</h3>
        <hr />
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {reviewsList
            .filter(item => (!showImageReviews || item.image) && (!showTextReviews || !item.image))
            .map((item) => (
              <li key={item.id} id={`review-${item.id}`} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <p>★ {item.rating}</p>
                <p>리뷰 내용: {item.review}</p>
                {/* 리뷰 이미지 */}
                {item.image && <img src={item.image} alt="Review" style={{ maxWidth: '100px', margin: '10px 0' }} />}
                {/* 삭제 버튼 */}
                <Button onClick={() => handleDeleteReview(item.id)}>삭제</Button>
                {/* 수정 버튼 */}
                <Button onClick={() => handleEditReview(item.id)}>수정</Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewPage;
