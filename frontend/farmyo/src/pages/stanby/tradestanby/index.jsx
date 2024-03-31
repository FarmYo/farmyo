import React from "react"
import TradeStanby from "../../../image/component/tradestanby.gif"


export default function Trade(){
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div><img src={TradeStanby} alt=""/></div>
      <div className="font-bold text-lg">
        <h1>거래가 진행중입니다</h1>
        <h1 className="text-center">잠시만 기다려 주세요</h1>
      </div>
    </div>
  )
}