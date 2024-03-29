import React from 'react'
import { useNavigate } from "react-router-dom";
import '../../../css/signup.css';
import Back from "../../../image/component/leftarrow.png"
import Logo from '../../../image/component/user/logo.png';

export default function SignUp() {
  const navigate = useNavigate()
  const handleSellerClick = () => {
    navigate("/signup/first", { state: { seller:0 } });
  };
  const handleBuyerClick = () => {
    navigate("/signup/first", { state: { seller:1 } });
  };

  const goBack = () => {
      navigate('/login')
  };

  return(
    <div>
    <img src={Back} alt="" style={{ width:20}} onClick={goBack}/>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 logo">
    <div className="mx-auto w-full max-w-sm mb-0">
      <img
        className="mx-auto h-auto w-auto"
        src={Logo}
        alt="FarmYo"
      />
    </div>
    <div className="flex mx-2 my-4">
      <button
        onClick={() => {handleSellerClick()}}
        className="buttonmain"
      >
        판매자
      </button>
      <button
        onClick={() => {handleBuyerClick()}}
        className="buttonmain"
      >
        구매자
      </button>
    </div>
  </div>
  </div>
  )
}