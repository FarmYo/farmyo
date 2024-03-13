import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/login/index"
import SellerMypage from "./pages/mypage/seller/index"


export default function Router (){
  return(
   <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/mypage/seller' element={<SellerMypage />} />
   </Routes>
  )
}