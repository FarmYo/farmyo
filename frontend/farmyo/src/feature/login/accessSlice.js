import { createSlice } from '@reduxjs/toolkit';

// access token 관리용 Redux state slice 만들기
export const accessSlice = createSlice({
  // slice 이름
  name: 'access',
  // slice 초기 상태
  initialState: {
    // access token 저장 필드
    accessToken: null
  },
  reducers: {
    setAccessToken: (state, action) => {
      // 전달된 값을 access token에 저장
      state.accessToken = action.payload
    },
    logout: () =>{
      console.log('로그아웃가라')
      return { accessToken: null };
    }
  }
})

  // 기본 reducer export
  export default accessSlice.reducer
  
  // setAccessToken reducer를 export함
  // setAccessToken = access token 설정 reducer(상태 관리 함수)
  export const { setAccessToken, logout } = accessSlice.actions