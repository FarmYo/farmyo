import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://j10d209.p.ssafy.io/api/',
  // baseURL: "http://localhost:8080/api/",
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      // 토큰이 있으면 헤더에 추가
      config.headers['access'] = accessToken;
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);
export default api;