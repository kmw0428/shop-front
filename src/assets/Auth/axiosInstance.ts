import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoppingback-ltd0.onrender.com',
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
