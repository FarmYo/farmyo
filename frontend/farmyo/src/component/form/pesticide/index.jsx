import { useState } from 'react'
import api from '../../../api/api'
import { useNavigate } from 'react-router-dom'
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import CropStanby from "../../../image/component/cropstanby.gif"

export default function Pesticide( { cropId, onRegister }){
  const navigate = useNavigate()
  const [eventDate,setEventDate] = useState(null)
  const [pesticideName,setPesticideName] = useState(null)
  const [pesticideType,setPesticideType] = useState(null)
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
  // const handelRegister = () =>{
  //   console.log(cropId)
  //   api.post(`crops/${cropId}`,{
  //     type:1,
  //     eventDate: eventDate,
  //     pesticideName:pesticideName,
  //     pesticideType:pesticideType
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //     console.log('농약입력정보 블록체인보내기성공')
  //     onRegister()
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }

  const handleRegister = () => {
    // 대기 모달오픈
    stanbyOpenModal()
    // API 호출
    api.post(`crops/${cropId}`, {
      type: 1,
      eventDate: eventDate,
      pesticideName: pesticideName,
      pesticideType: pesticideType,
    })
    .then((res) => {
      console.log('농약입력정보 블록체인보내기성공', res);
      stanbyCloseModal()
      onRegister();
    })
    .catch((err) => {
      console.log(err)
    });
  };


  return(
    <div className="pt-10" style={{ position:'relative' }}>
     <div style={{border:'1px solid gray'}} className="rounded-md">
        <div className="p-6">
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">사용날짜</span>
          </div>
          <input type="text" placeholder="yyyy-mm-dd 형식으로입력" className="input input-bordered w-full max-w-xs" 
          onChange={(e)=>setEventDate(e.target.value)}/>
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">약품명</span>
          </div>
          <input type="text" placeholder="약품명을 입력해주세요" className="input input-bordered w-full max-w-xs" 
          onChange={(e)=>setPesticideName(e.target.value)}/>
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">약품분류</span>
          </div>
          <input type="text" placeholder="약품분류를 입력해주세요" className="input input-bordered w-full max-w-xs" 
          onChange={(e)=>setPesticideType(e.target.value)}/>
          </label>
      </div>
      <div style={{bottom: 0, left: 0, width: '100%', height: '50px', backgroundColor: '#1B5E20' }}
            className="flex justify-center items-center rounded-bl-md rounded-br-md"
            onClick={handleRegister}>
          <h1 style={{color:'white'}} className="text-2xl">등록</h1>
      </div>  
     </div>

    {/* 농약 정보등록시 대기화면모달 */}
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