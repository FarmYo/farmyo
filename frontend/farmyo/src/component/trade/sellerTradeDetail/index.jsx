import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Swal from "sweetalert2";
import "../../../css/trade.css";
import api from '../../../api/api'




export default function SellerTrade() {
  const params = useParams()
  const tradeId = params.tradeId
  const [open,setOpen] = useState(false)
  const [info,setInfo] = useState([])
  const [company,setCompany] = useState(null)
  const [number,setNumber] = useState(null)


  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const alerter = () => {
    Swal.fire({
      html: '<h1 style="font-weight: bold;">송장번호가 입력되었습니다!</h1>',
      confirmButtonColor: '#1B5E20',
    });
  };

  // 상세거래내역 조회
  useEffect(()=>{
    api.get(`trades/detail/${tradeId}`)
    .then((res)=>{
      console.log(res.data.dataBody)
      console.log('상세거래조회성공')
      setInfo(res.data.dataBody)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const tradeStatusToText = {
    0: '입금 대기중',
    1: '입금 완료',
    2: '배송중',
    3: '거래완료'
  };

  //송장번호전송 입금완료가->배송중으로 변함
  const goInvoice = () =>{
    api.patch(`trades/deal/${tradeId}`,{
      tradeShipment:company,
      tradeShipcom:number
    })
    .then((res)=>{
    
      console.log('송장번호전송완료')
      onCloseModal()
      alerter()

      setInfo(prevInfo => ({
        ...prevInfo,
        tradeStatus: 2, // 입금완료(1)를 '배송중(2)'으로 변경
        tradeShipment: company,
        tradeShipcom:number
      }));
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return(
    <div>
      <div>
        <div className="p-3 flex justify-between border-b-2 border-gray-100 h-20">
          <div className="font-bold text-xl flex items-center">{info.board}</div>
          <div className="font-bold text-lg flex items-center" style={{color:'gray'}}>{tradeStatusToText[info.tradeStatus]}</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">작물</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>{info.crop}</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">거래수량</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>{info.tradeQuantity}kg</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">거래가격</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>{info.tradePrice*info.tradeQuantity}원(1kg = {info.tradePrice}원)</div>
        </div>
        <div className="p-3 border-b-2 border-gray-100 flex justify-between">
          <div>
            <div className="font-bold text-lg flex items-center">구매자</div>
            <div className="text-lg flex items-center" style={{color:'gray'}}>{info.buyer}</div>
          </div>
          <div className="">
            <div className="font-bold text-lg flex items-center">판매자</div>
            <div className="text-lg flex items-center" style={{color:'gray'}}>{info.seller}</div>
          </div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">배송지</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}> {info.tradeLocation}</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">송장번호</div>
          {/*입금대기중이면 입금완료후 입력가능하다고 알리기*/}
          {info.tradeStatus === 0 && (
            <h1 className="mt-2">입금완료후 입력가능</h1>)}
          {/*입금완료이면 송장번호 입력버튼보임 */}
          {info.tradeStatus === 1 && (
            <button onClick={onOpenModal} className="addressbutton btn">송장번호 입력</button>)}
          {/* 배송중이면 입력한송장번호 보임 */}
          {info.tradeStatus === 2 && (
            <h1 className="mt-2">{`${info.tradeShipment} ${info.tradeShipcom}`}</h1> )}
          {/* 거래완료이면 입력한송장번호 보임 */}
          {info.tradeStatus === 3 && (
            <h1 className="mt-2">{`${info.tradeShipment} ${info.tradeShipcom}`}</h1> )}
        </div>
      </div>
      


      {/* 송장번호입력모달창 */}
      <Modal
      open={open}
      onClose={onCloseModal}
      showCloseIcon={false}
      classNames={{
        // overlay: 'customOverlay', // 뒷 배경 설정할 때 커스텀 할 것
        modal: 'customModal', // 모달 커스텀 할 것
      }}
    >
      <div className="modal-content">
      <div className="mt-2">
        <input
          id="deliverycompany"
          name="deliverycompany"
          type="text"
          autoComplete="text"
          required
          className="inputstyle block h-10 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="택배사"
          onChange={(e)=>setCompany(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-center ">
        <input
          id="deliverynumber"
          name="deliverynumber"
          type="text"
          autoComplete="text"
          required
          className="inputstyle block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="송장번호"
          onChange={(e)=>setNumber(e.target.value)}
        />
      </div>
      <button
        onClick={()=>goInvoice()}
        className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
        style={{backgroundColor:'#1B5E20'}}
      >
        송장번호 입력
      </button>
      </div>
    </Modal>
    </div>
  )
}