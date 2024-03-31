import React from "react"
import Daegi from "../../image/component/daegi.gif"

export default function Stanby() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div><img src={Daegi} alt="대기 이미지" style={{width:200}}/></div>
      <div className="font-bold text-lg">
        <h1>신선하고 믿음직한 농산품은</h1>
        <h1 className="text-center">FarmYo와 함께</h1>
      </div>
    </div>
  );
}
