import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../feature/login/authSlice.js";
import accessReducer from '../features/login/accessSlice.js';

// Redux-persist 설정을 위한 객체 생성
// Redux-persist = 리덕스 상태를 다양한 저장소에 영구적으로 저장하는 기능(새로고침, 브라우저 종료일때도 유지)
const persistConfig = {
  // root state
  key : 'root',
  // 사용할 저장소(로컬 스토리지)
  storage,
  // 저장할 Redux state의 slice 이름 설정(선택 저장)
  whitelist : ['auth'],
  // 저장하지 않을 Redux state의 slice 이름
  // blacklist : ['']
};

// 하나의 root reducer로 통합 생성
const rootReducer = combineReducers({
  auth : authReducer,
  access : accessReducer,
})

// 지속화된 reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux store 생성
export const store = configureStore({
  reducer: persistedReducer,
});

// Redux store에 대한 persistor 생성(앱 실행 시 저장 상태 불러오는 용도)
export const persistor = persistStore(store);