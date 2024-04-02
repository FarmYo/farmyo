import React from 'react';
import { useEffect } from 'react';
import api from '../../../api/api'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Swal from 'sweetalert2';


export default function PaymentRedirectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search);
  const impSuccess = queryParams.get('imp_success');
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

    if (impSuccess) {
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
        
        navigate(`/trade/buyer/${tradeId}`)

        // navigate(`/trade/buyer/${tradeId}`)
      })
      .catch((err)=>{
        console.log(err)
        navigate('/trade')
      })
      Swal.fire("결제 완료 페이지에서 대기하시면 페이지가 이동됩니다.")
      
    }
    else{
      navigate(`/trade/buyer/${tradeId}`)
    }

  // }

  },[])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div>결제가 완료되었습니다</div>
    </div>
  );
}
