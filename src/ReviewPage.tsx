import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

// Review 인터페이스 정의
interface Review {
  id: number;
  rating: number | null;
  review: string;
  image?: string;
  likes: number;
  age: number;
  gender: string;
  type: string;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [filterGender, setFilterGender] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');

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
    const newReview: Review = {
      id: Date.now(),
      rating,
      review,
      image: image ? URL.createObjectURL(image) : undefined,
      likes: 0,
      age: 30, // 예시로 고정값을 넣었습니다. 실제로는 입력받는 필드로 변경해야 합니다.
      gender: 'male', // 예시로 고정값을 넣었습니다. 실제로는 입력받는 필드로 변경해야 합니다.
      type: 'general' // 예시로 고정값을 넣었습니다. 실제로는 입력받는 필드로 변경해야 합니다.
    };

    if (editReviewIndex !== null) {
      // 기존 리뷰 수정
      const updatedReviewsList = [...reviewsList];
      updatedReviewsList[editReviewIndex] = { ...newReview, id: reviewsList[editReviewIndex].id };
      setReviewsList(updatedReviewsList);
      setEditReviewIndex(null);
    } else {
      // 새로운 리뷰 추가 (최신순으로 맨 앞에 추가)
      setReviewsList([newReview, ...reviewsList]);
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

  // 리뷰 좋아요 핸들러
  const handleLikeReview = (id: number) => {
    const updatedReviewsList = reviewsList.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setReviewsList(updatedReviewsList);
  };

  // 평점의 평균 계산 함수
  const calculateAverageRating = () => {
    if (reviewsList.length === 0) return null;
    const totalRating = reviewsList.reduce((acc, review) => acc + (review.rating || 0), 0);
    return totalRating / reviewsList.length;
  };

  // 리뷰 정렬 함수
  const sortReviews = (reviews: Review[]) => {
    return reviews.sort((a, b) => {
      if (sortOrder === 'latest') return b.id - a.id;
      if (sortOrder === 'highest') return (b.rating || 0) - (a.rating || 0);
      if (sortOrder === 'lowest') return (a.rating || 0) - (b.rating || 0);
      return 0;
    });
  };

  // 리뷰 필터링 함수
  const filterReviews = (reviews: Review[]) => {
    return reviews.filter(review => {
      return (
        (filterGender === '' || review.gender === filterGender) &&
        (filterType === '' || review.type === filterType)
      );
    });
  };

  // 리뷰 검색 함수
  const searchReviews = (reviews: Review[]) => {
    return reviews.filter(review => review.review.includes(searchQuery));
  };

  // reviewsList가 변경될 때마다 평균 평점을 업데이트
  useEffect(() => {
    setAverageRating(calculateAverageRating());
  }, [reviewsList]);

  // 필터링, 정렬, 검색을 적용한 리뷰 리스트
  const displayedReviews = sortReviews(filterReviews(searchReviews(reviewsList)));

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
        <h4>평균 평점 : ★  {averageRating !== null ? averageRating.toFixed(1) : '0'}</h4>
      </div>
      {/* 리뷰 검색 입력 */}
      <TextField
        label="Search Reviews"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {/* 리뷰 정렬 선택 */}
      <InputLabel id="sort-order-label">리뷰 순</InputLabel>
      <Select
        labelId="sort-order-label"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as string)}
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="latest">최신순</MenuItem>
        <MenuItem value="highest">평점 높은순</MenuItem>
        <MenuItem value="lowest">평점 낮은순</MenuItem>
      </Select>
      {/* 리뷰 필터링 입력 */}
      <InputLabel id="filter-gender-label">성별</InputLabel>
      <Select
        labelId="filter-gender-label"
        value={filterGender}
        onChange={(e) => setFilterGender(e.target.value as string)}
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="male">남자</MenuItem>
        <MenuItem value="female">여자</MenuItem>
      </Select>
      <InputLabel id="filter-type-label">타입</InputLabel>
      <Select
        labelId="filter-type-label"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value as string)}
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="general">타입1</MenuItem>
        <MenuItem value="premium">타입2</MenuItem>
      </Select>
      <hr />
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
              onClick={() => window.location.hash = `#review-${item.id}`}
            />
          ))}
      </div>

      <div>
        <h3>Review</h3>
        <hr />
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {displayedReviews
            .filter(item => (!showImageReviews || item.image) && (!showTextReviews || !item.image))
            .map((item) => (
              <li key={item.id} id={`review-${item.id}`} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <p>★ {item.rating}</p>
                <p> {item.review}</p>
                {/* 리뷰 이미지 */}
                {item.image && <img src={item.image} alt="Review" style={{ maxWidth: '100px', margin: '10px 0' }} />}
                {/* 좋아요 버튼 및 개수 */}
                <Button onClick={() => handleLikeReview(item.id)}>좋아요 {item.likes}</Button>
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
