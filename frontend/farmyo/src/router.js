import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/login/index"
import SellerMypage from "./pages/mypage/seller/index"
import BuyerMypage from "./pages/mypage/buyer/index"
import MyFarmDetail from "./pages/mypage/myfarm/detail/index"

export default function Router (){
  return(
   <Routes>
      <Route path='/' element={<Login />} />
      {/* 판매자마이페이지 */}
      <Route path='/mypage/seller' element={<SellerMypage />} /> 
      {/* 구매자마이페이지 */}
      <Route path='/mypage/buyer' element={<BuyerMypage />} />
      // 마이팜디테일페이지
      <Route path='/mypage/:myfarmId/detail' element={<MyFarmDetail />} />
   </Routes>
  )
}