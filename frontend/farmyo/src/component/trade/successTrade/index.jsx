import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../css/trade.css'

// 완료된데이터
const successData = [
  { id: 1, name: "딸기딸기딸기딸기", opponent: "조현제"},
  { id: 2, name: "달고달고 달디단 밤", opponent: "조현제"},
  { id: 3, name: "호박고구마호박고구마!", opponent: "조현제"}
];

export default function SuccessTrade() {

  return(
    <div>
      {/* 완료된거래목록 */}
      {successData.map((item) => (
          <div key={item.id} className="p-3 border-b-2 border-gray-150 flex">
            <div style={{backgroundColor:'#bbbbbb'}} className="w-32 h-20"></div>
            <div className="w-full ml-2">
              <h1 className="text-lg font-bold">{item.name}</h1>
              <h1 className="text-sm">{item.opponent}</h1>
              <div className='flex justify-end'>
                <h1 className="text-xl">거래완료</h1>
              </div>     
            </div>
          </div>
        ))
      }
    </div>
  )
}