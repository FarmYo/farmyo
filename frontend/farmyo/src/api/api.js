import axios from 'axios';
// import { useCookies } from 'react-cookie';

// refreshToken을 cookie에서 받기
axios.defaults.withCredentials = true;

// Axios 인스턴스 생성
const api = axios.create({
  // baseURL: 'https://j10d209.p.ssafy.io/api/',
  baseURL: "http://localhost:8080/api/",
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


// 재발급 중복 요청 이슈 - 리팩토링 필요

const refreshURL = 'https://j10d209.p.ssafy.io/api/'; 
// const refreshURL = "http://localhost:8080/api/";

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // resultCode를 체크하여 토큰 만료 확인
    if (error.response && error.response.data && error.response.data.dataHeader && error.response.data.dataHeader.resultCode === "O-003" && !originalRequest._retry) {
      originalRequest._retry = true; // 이 요청이 재시도되었음을 표시

      try {
        // 여기서 토큰 재발급 요청 로직을 구현하세요.
        const response = await axios.post(`${refreshURL}refresh/reissue`);
        const newToken = response.headers.access;

        // 새 토큰을 저장하고 요청 헤더에 설정
        localStorage.setItem('access', newToken);
        axios.defaults.headers.common['access'] = newToken;

        // 원래 요청을 새 토큰으로 다시 시도
        return api(originalRequest);
      } catch (reissueError) {
        // 토큰 재발급 요청 실패 처리
        return Promise.reject(reissueError);
      }
    }

    // 이외의 모든 에러 처리
    return Promise.reject(error);
  }
);

export default api;