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
import OpponentSellerMypage from "./pages/mypage/opseller/index"
import MyFarmDetail from "./pages/mypage/myfarm/detail/index"
import BoardNav from "./pages/board/navbar/index"
import SellDetail from "./pages/board/selldetail/index"
import BuyDetail from "./pages/board/buydetail/index"
import MypageEdit from "./pages/mypage/edit/index"
import Chatting from "./pages/chat/index"
import ChattingRoom from "./pages/chat/room/index"
import Stanby from "./pages/stanby/index"
import CropStanby from "./pages/stanby/cropstanby/index"
import TradeStanby from "./pages/stanby/tradestanby/index"
import Payment from "./pages/trade/kakaopay/index"
import NotFoundPage from "./pages/notfound/index"



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
      <Route path='/trade/seller/:tradeId' element={<SellerTradePage />} />
      {/* 거래상세 구매자페이지 */}
      <Route path='/trade/buyer/:tradeId' element={<BuyerTradePage />} />
      {/* 판매자마이페이지 */}
      <Route path='/mypage/seller' element={<SellerMypage />} /> 
      {/* 구매자마이페이지 */}
      <Route path='/mypage/buyer' element={<BuyerMypage />} />
      {/* 상대방판매자마이페이지 */}
      <Route path='/mypage/seller/:id' element={<OpponentSellerMypage />} /> 
      {/* 마이팜디테일페이지 */}
      <Route path='/mypage/myfarm/:farmId' element={<MyFarmDetail />} />
      {/* 팜&삼 게시판페이지 */}
      <Route path='/board' element={<BoardNav />} />
      {/* 팝니다상세페이지 */}
      <Route path='/board/sell/:boardId/detail' element={<SellDetail />} />
      {/* 삽니다상세페이지 */}
      <Route path='/board/buy/:boardId/detail' element={<BuyDetail />} />
      {/* 회원정보수정페이지 */}
      <Route path='/mypage/edit' element={<MypageEdit />} />
      {/* 채팅목록페이지 */}
      <Route path='/chat' element={<Chatting />} />
      {/* 채팅방페이지 */}
      <Route path='/chat/:chatId' element={<ChattingRoom />} />
      {/* 대기화면 */}
      <Route path='/stanby' element={<Stanby />} />
      {/* 작물대기화면 */}
       <Route path='/stanby/crop' element={<CropStanby />} />
      {/* 작물대기화면 */}
       <Route path='/stanby/trade' element={<TradeStanby />} />
      {/* 카카오페이대기화면 */}
      <Route path='/trade/redirect' element={<Payment />} />
      {/* 잘못된 경로화면*/}
      <Route path='*' element={<NotFoundPage />} />

    </Routes>
  )
}