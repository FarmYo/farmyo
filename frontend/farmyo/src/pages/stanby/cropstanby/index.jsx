import React from "react"
import CropStanby from "../../../image/component/cropstanby.gif"
import Daegi from "../../../image/component/daegi.gif"

export default function Crop(){
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div><img src={Daegi} alt="" style={{width:200}}/></div>
      <div className="font-bold text-lg">
        {/* <h1>정보를 불러오는 중입니다</h1> */}
        <h1 className="text-center">작물이 등록되고 있어요</h1>
        <h1 className="text-center">잠시만 기다려 주세요</h1>
      </div>
    </div>
  )
}