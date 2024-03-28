import React from "react"
import CropStanby from "../../../image/component/cropstanby.gif"


export default function Crop(){
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div><img src={CropStanby} alt=""/></div>
      <div className="font-bold text-lg">
        <h1>정보를 불러오는 중입니다</h1>
        <h1 className="text-center">잠시만 기다려 주세요</h1>
      </div>
    </div>
  )
}