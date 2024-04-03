import WBackArrow from "../../../image/component/trade/wbackarrow.png"
import { useState,useEffect } from "react"

export default function CropInfo(){
  return(
    <div>
       <div style={{height:50,backgroundColor:'#1B5E20'}}>
          <div className="p-2 flex justify-between">
            <img src={WBackArrow} alt="" style={{ width:30,height:30}}/>
          </div>
        </div>
    </div>
  )
}