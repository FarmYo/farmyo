import { useState } from 'react'
import api from '../../../api/api'
import { useNavigate } from 'react-router-dom'
import { Modal } from "react-responsive-modal"
import CropStanby from "../../../image/component/cropstanby.gif"

export default function Award( { cropId, onRegister }){
  const navigate = useNavigate()
  const [contestName,setContestName] = useState(null) // 대회명
  const [awardDetails,setAwardDetails] = useState(null) // 수상내역
  const [eventDate,setEventDate] = useState(null) // 수상날짜
  const [stanbyModal,setStanbyModal] = useState(false)

  const stanbyOpenModal = () => {
    setStanbyModal(true);
  };

  const stanbyCloseModal = () => {
    setStanbyModal(false);
  };
  
  const styles = {
    modal: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      margin: '0',
    },
  };


  const handelRegister = () =>{
    stanbyOpenModal()
    api.post(`crops/${cropId}`,{
      type:2,
      eventDate: eventDate,
      contestName:contestName,
      awardDetails:awardDetails
    })
    .then((res)=>{
      console.log(res)
      console.log('대회수상 블록체인보내기성공')
      stanbyCloseModal()
      onRegister()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return(
    <div className="pt-10" style={{ position:'relative' }}>
     <div style={{border:'1px solid gray'}} className="rounded-md">
        <div className="p-6">
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">대회명</span>
          </div>
          <input type="text" placeholder="대회명을 입력해주세요" className="input input-bordered w-full max-w-xs" 
          onChange={(e)=>setContestName(e.target.value)}/>
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">수상내역</span>
          </div>
          <input type="text" placeholder="수상내역을 입력해주세요" className="input input-bordered w-full max-w-xs" 
          onChange={(e)=>setAwardDetails(e.target.value)}/>
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">수상날짜</span>
          </div>
          <input type="number" placeholder="yyyy-mm-dd 형식으로 입력" className="input input-bordered w-full max-w-xs"
          onChange={(e)=>setEventDate(e.target.value)} />
          </label>
      </div>
      <div style={{bottom: 0, left: 0, width: '100%', height: '50px', backgroundColor: '#1B5E20' }}
            className="flex justify-center items-center rounded-bl-md rounded-br-md"
            onClick={handelRegister}>
          <h1 style={{color:'white'}} className="text-2xl">등록</h1>
      </div>  
     </div>
    {/* 지역대회수상등록시 대기화면모달 */}
    <Modal open={stanbyModal} onClose={stanbyCloseModal} styles={styles} closeIcon={null}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div><img src={CropStanby} alt="" style={{width:200}}/></div>
        <div className="font-bold text-lg">
          <h1 className="text-center">기록이 블록체인에 등록되고있어요</h1>
          <h1 className="text-center">잠시만 기다려 주세요</h1>
        </div>
      </div>
    </Modal>

  </div>
  )
}