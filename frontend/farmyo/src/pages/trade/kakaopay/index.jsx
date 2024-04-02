import React from 'react';
import { useEffect } from 'react';
import api from '../../../api/api'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Swal from 'sweetalert2';


export default function PaymentRedirectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { rsp } = location.state
  const params = queryString.parse(location.search);
  const impSuccess = params.imp_success === 'true';
  const tradeId = localStorage.getItem('tradeId')
  const seller =  localStorage.getItem('seller') 




  useEffect(()=>{
    // if (!location.state) {
    //   return;s
    // }
  //   if (impSuccess) {
  //   api.patch(`trades/deposit/${tradeId}`,{},{
  //     params:{
  //       depositName:seller
  //     }
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //     console.log("입금완료")
  //     navigate(`/trade/buyer/${tradeId}`)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     navigate('/trade')
  //   })
  // }else{

    if (!impSuccess) {
      Swal.fire("결제가 실패했습니다.")
      
    }
    if(rsp === null) {
      api.patch(`trades/deposit/${tradeId}`,{},{
        params:{
          depositName:seller
        }
      })
      .then((res)=>{
        console.log(res)
        console.log("입금완료")
        Swal.fire({
          html: '<h1 style="font-weight: bold;">결제가 정상적으로 완료되었습니다</h1>',
          icon: 'success',
          showConfirmButton: false,
        })
        
        navigate('/trade/redirect', { state: {  rsp } })
        // navigate(`/trade/buyer/${tradeId}`)
      })
      .catch((err)=>{
        console.log(err)
        navigate('/trade')
      })

    }

    navigate(`/trade/buyer/${tradeId}`)
  // }

  },[location,navigate])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>결제가 완료되었습니다</div>
    </div>
  );
}
