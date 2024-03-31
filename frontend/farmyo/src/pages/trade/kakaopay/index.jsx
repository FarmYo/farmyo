import React from 'react';
import { useEffect } from 'react';
import api from '../../../api/api'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';


export default function PaymentRedirectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  // const { tradeId,seller } = location.state
  const params = queryString.parse(location.search);
  const impSuccess = params.imp_success === 'true';
  const tradeId = localStorage.getItem('tradeId'); // 예시에서는 trade_id라고 가정합니다. 실제 파라미터 이름에 맞게 조정해야 합니다.
  const seller =  localStorage.getItem('seller'); // 이 값도 URL에서 얻거나 다른 방식으로 제공받아야 할 수 있습니다.





  useEffect(()=>{
    // if (!location.state) {
    //   return;
    // }
    if (impSuccess) {
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
      navigate('/trade')
    })
  }else{
    navigate('/trade')
  }

  },[location,navigate])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>결제가 완료되었습니다</div>
    </div>
  );
}
