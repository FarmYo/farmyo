import React, { useState,useEffect } from 'react'
import OngoingTrade from './ongoingTrade';
import SuccessTrade from './successTrade';

export default function Trade() {
  const [selected,setSelected] = useState(null)
  
  useEffect(()=>{
    setSelected(0);
  },[])
  
  const handleClick = (index) => {
    setSelected(index)
  }
  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2">
          <h1 className="text-xl font-bold" style={{color:"white"}}>거래</h1>
        </div>
      </div>

      <div className='flex justify-around p-3' style={{height:50}}>
        <h1 className='font-extrabold' style={{ color: selected === 0 ? 'black' : 'gray' }} onClick={()=>{handleClick(0)}}>진행중인 거래</h1>
        <h1 className='font-extrabold' style={{ color: selected === 1 ? 'black' : 'gray' }} onClick={()=>{handleClick(1)}}>완료된 거래</h1>
      </div>
      {/* 선택된 컴포넌트 조건부 렌더링 */}
      {selected === 0 && <OngoingTrade />}
      {selected === 1 && <SuccessTrade />}
    </div>
  )
}