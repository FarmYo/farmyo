import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/user/login/index";
import PasswordPage from "./pages/user/checkpassword/index";
import SignUpPage from "./pages/user/signup/index"
import SignUpFirst from "./pages/user/signup/first/index"
import SignUpSecond from "./pages/user/signup/second/index"
import SignUpThird from "./pages/user/signup/third/index"
import SellerMypage from "./pages/mypage/seller/index"
import BuyerMypage from "./pages/mypage/buyer/index"
import MyFarmDetail from "./pages/mypage/myfarm/detail/index"

export default function Router (){
  return(
   <Routes>
      {/* 로그인페이지(최초화면) */}
      <Route path='/' element={<LoginPage />} />
      {/* 비밀번호페이지 */}
      <Route path='/password' element={<PasswordPage />} />
      {/* 회원가입초기페이지 */}
      <Route path='/signup' element={<SignUpPage />} />
      {/* 회원가입공통1페이지 */}
      <Route path='/signup/first' element={<SignUpFirst />} />
      {/* 회원가입공통2페이지 */}
      <Route path='/signup/second' element={<SignUpSecond />} />
      {/* 회원가입공통3페이지 */}
      <Route path='/signup/third' element={<SignUpThird />} />
      {/* 판매자마이페이지 */}
      <Route path='/mypage/seller' element={<SellerMypage />} /> 
      {/* 구매자마이페이지 */}
      <Route path='/mypage/buyer' element={<BuyerMypage />} />
      {/* 마이팜디테일페이지 */}
      <Route path='/mypage/:myfarmId/detail' element={<MyFarmDetail />} />
   </Routes>
  )
}