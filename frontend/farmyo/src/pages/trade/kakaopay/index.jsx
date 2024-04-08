import React from 'react';
import { useEffect } from 'react';
import api from '../../../api/api'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Swal from 'sweetalert2';
import TradeStanby from "../../../image/component/tradestanby.gif"


export default function PaymentRedirectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search);
  const impSuccess = queryParams.get('imp_success');
  const tradeId = localStorage.getItem('tradeId')
  const seller =  localStorage.getItem('seller') 




  useEffect(()=>{

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
      Swal.fire({
        html: '<h1 style="font-weight: bold;">결제성공!</h1>',
        icon: 'success',
        showConfirmButton: false,
      });
              
    }
    else{
      navigate(`/trade/buyer/${tradeId}`)
    }

  },[])

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <div><img src={TradeStanby} alt="" style={{width:200}}/></div>
      <div className="font-bold text-lg">
        <h1 className="text-center">결제가 완료되었습니다!</h1>
        <h1 className="text-center">블록체인에 거래 내역을 저장하고 있습니다.잠시만 기다려 주세요...</h1>
      </div>
    </div>
  );
}
