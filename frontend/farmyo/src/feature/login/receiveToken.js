import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "accessSlice";
import { logout } from "authSlice";

export function useTokenCheck() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.access.accessToken);
  
  // accessToken 상태 판단
  const checkAccess = async (accessToken) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    // 모든 페이지에서 토큰 상태 확인
    return axios.get(window.location.href, { headers });
  };

    // cookie에서 token 값 가지고 오기
    const getCookie = (token) => {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const parts = cookie.split("=");
        if (parts[0].trim() === token) {
          return parts[1].trim();
        }
      }
      return null;
    };
  
  // refreshToken 기반으로 새로운 accessToken 발급
  const refreshAccessToken = async () => {
    const refreshToken = getCookie("refreshToken");
    const data = { refreshToken };
    // 모든 페이지에서 토큰 유효성 확인
    return axios.post(window.location.href, data, { withCredentials: true });
  };

  const authCheck = async () => {
    try {
      // accessToken 유효성 검사 결과
      const response = await checkAccess(accessToken);
      if (response.dataHeader.successCode === 0) {
        return true;
        // accessToken 만료
      } else if (response.dataHeader.successCode === 1) {
        const refreshResponse = await refreshAccessToken();
        // refreshToken 살아있어서 accessToken 갱신
        if (refreshResponse.dataHeader.successCode === 0) {
          // redux store에 새로운 accessToken 업데이트
          dispatch(setAccessToken(refreshResponse.headers.authorization));
          return true;
          // accessToken 갱신 실패
        } else {
          // 로그아웃(다시 로그인하기)
          dispatch(logout());
          navigate("/login");
          return false;
        }
        // response.data.status가 200도 아니고 302도 아님
      } else {
        dispatch(logout());
        navigate("/login");
        return false;
      }
    // 알 수 없는 에러(try 실패 = 유효성 검사 실패)
    } catch (error) {
      console.error(error);
      dispatch(logout());
      navigate("/login");
      return false;
    }
  };

  return [authCheck];
}
