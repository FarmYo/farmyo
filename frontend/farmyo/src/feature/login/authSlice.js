import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const authSlice = createSlice({
  name : 'auth',
  initialState : {
    refreshToken : null,
    isLogin : false,
    loginId : null,
    password : null,
    telephone : null,
    depositor : null,
    bank : null,
    account : null,
    email : null,
    nickname : null,
    addressCode : null,
    addressLegal : null,
    addressDetail : null,
    job : null

  },
  reducers : {
    setRefreshToken : (state,action) =>{
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
      state.loginId = jwtDecode(action.payload.refreshToken).loginId
      state.password = jwtDecode(action.payload.refreshToken).password
      state.telephone = jwtDecode(action.payload.refreshToken).telephone
      state.depositor = jwtDecode(action.payload.refreshToken).depositor
      state.bank = jwtDecode(action.payload.refreshToken).bank
      state.account = jwtDecode(action.payload.refreshToken).account
      state.email = jwtDecode(action.payload.refreshToken).email
      state.nickname = jwtDecode(action.payload.refreshToken).nickname
      state.addressCode = jwtDecode(action.payload.refreshToken).addressCode
      state.addressLegal = jwtDecode(action.payload.refreshToken).addressLegal
      state.addressDetail = jwtDecode(action.payload.refreshToken).addressDetail
      state.job = jwtDecode(action.payload.refreshToken).job
    },

    logout: (state) =>{
      state.refreshToken = null;
      state.isLogin = false;
      state.loginId = null;
      state.password = null;
      state.telephone = null;
      state.depositor = null;
      state.bank = null;
      state.account = null;
      state.email = null;
      state.nickname = null;
      state.addressCode = null;
      state.addressLegal = null;
      state.addressDetail = null;
      state.job = null;
    },
  }  
})

export default authSlice.reducer
export const { setRefreshToken, logout } = authSlice.actions