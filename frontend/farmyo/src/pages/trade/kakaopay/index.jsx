import React from 'react';
import { useEffect } from 'react';
import api from '../../../api/api'
import { useNavigate, useLocation } from 'react-router-dom';


export default function PaymentRedirectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { tradeId,seller } = location.state

  useEffect(()=>{
    api.patch(`trades/deposit/${tradeId}`,{},{
      params:{
        depositName:seller
      }
    })
    .then((res)=>{
      console.log(res)
      console.log("입금완료")
      navigate(`/trade/buyer/${tradeId}`)
    })
    .catch((err)=>{
      console.log(err)
    })

  })

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>결제가 완료되었습니다</div>
    </div>
  );
}
