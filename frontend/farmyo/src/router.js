import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/user/mainpage";
import LoginPage from "./pages/user/login/index";
import CheckPasswordPage from "./pages/user/checkpassword/index";
import SignUpPage from "./pages/user/signup/index"
import SignUpFirstPage from "./pages/user/signup/first/index"
import SignUpSecondPage from "./pages/user/signup/second/index"
import SignUpThirdPage from "./pages/user/signup/third/index"
import BusinessPage from "./pages/user/businessregistration/index"
import TradePage from "./pages/trade";
import SellerTradePage from "./pages/trade/sellerTradeDetail";
import BuyerTradePage from "./pages/trade/buyerTradeDetail";
import SellerMypage from "./pages/mypage/seller/index"
import BuyerMypage from "./pages/mypage/buyer/index"
import MyFarmDetail from "./pages/mypage/myfarm/detail/index"

export default function Router (){
  return(
    <Routes>
      {/* 메인페이지 */}
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
      {/* 거래 메인페이지 */}
      <Route path='/trade' element={<TradePage />} />
      {/* 거래상세 판매자페이지 */}
      <Route path='/trade/seller' element={<SellerTradePage />} />
      {/* 거래상세 구매자페이지 */}
      <Route path='/trade/buyer' element={<BuyerTradePage />} />
      {/* 판매자마이페이지 */}
      <Route path='/mypage/seller' element={<SellerMypage />} /> 
      {/* 구매자마이페이지 */}
      <Route path='/mypage/buyer' element={<BuyerMypage />} />
      {/* 마이팜디테일페이지 */}
      <Route path='/mypage/:myfarmId/detail' element={<MyFarmDetail />} />
    </Routes>
  )
}