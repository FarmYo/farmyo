import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/user/mainpage";
import LoginPage from "./pages/user/login/index";
import CheckPasswordPage from "./pages/user/checkpassword/index";
import SignUpPage from "./pages/user/signup/index"
import SignUpFirstPage from "./pages/user/signup/first/index"
import SignUpSecondPage from "./pages/user/signup/second/index"
import SignUpThirdPage from "./pages/user/signup/third/index"
import BusinessPage from "./pages/user/businessregistration/index"
import SellerMypage from "./pages/mypage/seller/index"
import BuyerMypage from "./pages/mypage/buyer/index"
import MyFarmDetail from "./pages/mypage/myfarm/detail/index"
import BoardNav from "./pages/board/navbar/index"
import SellDetail from "./pages/board/selldetail/index"
import BuyDetail from "./pages/board/buydetail/index"

export default function Router (){
  return(
    <Routes>
      {/* 메인화면 - 이거 만들고 링크 바꾸기*/}
      <Route path='/' element={<MainPage />} />
      {/* 로그인페이지 */}
      <Route path='/login' element={<LoginPage />} />
      {/* 비밀번호페이지 */}
      <Route path='/password' element={<CheckPasswordPage />} />
      {/* 회원가입초기페이지 */}
      <Route path='/signup' element={<SignUpPage />} />
      {/* 회원가입공통1페이지 */}
      <Route path='/signup/first' element={<SignUpFirstPage />} />
      {/* 회원가입공통2페이지 */}
      <Route path='/signup/second' element={<SignUpSecondPage />} />
      {/* 회원가입공통3페이지 */}
      <Route path='/signup/third' element={<SignUpThirdPage />} />
      {/* 사업자등록페이지 */}
      <Route path='/signup/business' element={<BusinessPage />} />
      {/* 판매자마이페이지 */}
      <Route path='/mypage/seller' element={<SellerMypage />} /> 
      {/* 구매자마이페이지 */}
      <Route path='/mypage/buyer' element={<BuyerMypage />} />
      {/* 마이팜디테일페이지 */}
      <Route path='/mypage/:myfarmId/detail' element={<MyFarmDetail />} />
      {/* 팜&삼 게시판페이지 */}
      <Route path='/board' element={<BoardNav />} />
      {/* 팝니다상세페이지 */}
      <Route path='/board/sell/:boardId/detail' element={<SellDetail />} />
      {/* 삽니다상세페이지 */}
      <Route path='/board/buy/:boardId/detail' element={<BuyDetail />} />
    </Routes>
  )
}