import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../css/trade.css'
import api from '../../../api/api'
import { jwtDecode } from 'jwt-decode'

export default function SuccessTrade({finishedData}) {
  const userJob = jwtDecode( localStorage.getItem("access") ).userJob // 0이면 판매자,1이면 구매자
  const navigate = useNavigate()

    // 상세 거래내역으로 가는것
    const goDetail = (id)=>{
      console.log(userJob)
      console.log(id)
  
      if (userJob == 0){
        navigate(`/trade/seller/${id}`) //  '/trade/seller/:tradeId'
      }
      else{
        navigate(`/trade/buyer/${id}`)
      }
    }
  

  return(
    <div>
      {/* 완료된거래목록 */}
      {finishedData.map((item) => (
          <div key={item.id} className="p-2 border-b-2 border-gray-150 flex" onClick={()=>goDetail(item.id)}>
            <div><img src={item.cropImg} alt="" className="w-32 h-24"/></div>
            <div className="w-full ml-2">
              <h1 className="text-lg font-bold">{item.boardTitle}</h1>
              <h1 className="text-sm">{item.nickname}</h1>
              <div className='flex justify-end'>
                <h1 className="text-lg font-bold">거래완료</h1>
              </div>     
            </div>
          </div>
        ))
      }
    </div>
  )
}