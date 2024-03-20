import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
// import axios from "axios";
import "../../../css/trade.css";

export default function BuyerTrade() {
  const { cropId } = useParams(); // URL 파라미터에서 `id` 추출
  const [item, setItem] = useState(null);
  // useEffect(() => {
  //   // 전달받은 id값을 사용하여 데이터 불러오기
  //   axios.get(`/api/trades/${id}`)
  //     .then(response => response.json())
  //     .then(data => setItem(data));
  // }, [id]);
  // item 값이 없을 때(시간차이) 로딩화면 띄우기
  // if (!item) {
  //   return <div>대기화면 컴포넌트</div>;
  // }
  const [open,setOpen] = useState(false)
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const FirstModal = () => {
    return (
    <div className="modal-content">
      <button
        onClick={(event)=>{
          event.preventDefault();
          onCloseModal()}}
        className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
        style={{backgroundColor:'#1B5E20'}}
      >
        기존 주소 입력
      </button>
      <button
        onClick={(event)=>{
          event.preventDefault();
          onTwoOpenModal()}}
        className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
        style={{backgroundColor:'#1B5E20'}}
      >
        새로운 주소 등록
      </button>
      </div>
  )}

  const [twoopen, setTwoOpen] = useState(false)
  const onTwoOpenModal = () => {
    setTwoOpen(true);
  };
  const onTwoCloseModal = () => {
    setTwoOpen(false);
  };
  const SecondModal = () => {
    return(
      <div className="modal-content">
      <div className="mt-2 flex">
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="address"
          required
          // className="inputstyle block h-10 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          className="block h-10 w-50% rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="주소"
        />
        <button className="checkbutton">주소검색</button>
      </div>
      <div className="mt-4 flex justify-center ">
        <input
          id="detailaddress"
          name="detailaddress"
          type="text"
          autoComplete="text"
          required
          className="inputstyle block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="상세주소"
        />
      </div>
      <button
        onClick={(event)=>{
          event.preventDefault();
          onCloseModal()
          onTwoCloseModal()
        }}
        className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
        style={{backgroundColor:'#1B5E20'}}
      >
        주소등록
      </button>
      </div>
    )
  }

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2 flex justify-between">
          <div 
            className="text-xl font-bold"
            style={{color:"white"}}
          >
            거래
          </div>
            <button
              className="text-l font-bold cancelbutton"
              onClick={()=>{}}
              // 삭제로 만들기
            >
              거래 취소
            </button>
        </div>
      </div>

      <div className="flex flex-row">
        {/* {item.name} */}
        {cropId}
        {/* <div>
          {item.status}
          {item.createdAt}
          // status 확인 후 한글로 교체 + (입금완료, 거래중, 거래완료)일 때 수정시간으로 작성
        </div> */}
      </div>
      <div>
      <div className="p-2">
        <div className="h2">농산물</div>
        작물명 들고오기
      </div>
      <div className="p-2">
        <div className="h2">거래 수량</div>
        거래수량 들고오기
      </div>
      <div className="p-2">
        <div className="h2">거래 가격</div>
        거래가격 들고오기
      </div>
        <div className="flex flex-row justify-between p-2">
          <div>
            <div className="h2">구매자</div>
            구매자명 들고오기
            </div>
          <div>
            <div className="h2">판매자</div>
            판매자명 들고오기
          </div>
        </div>
        <div className="p-2">
        <div className="h2">배송지</div>
        <button
          className="addressbutton btn"
          onClick={onOpenModal}
        >
          주소선택
        </button>
        </div>
        <div className="p-2">
        <div className="h2">송장번호</div>
        <p>배송대기중</p>
        </div>
        </div>
        <div className="fixed-bottom">
          <button className="finishbutton">결제</button>
      </div>

      <Modal
      open={open}
      onClose={onCloseModal}
      // showCloseIcon={false}
      // center
      classNames={{
        // overlay: 'customOverlay', // 뒷 배경 설정할 때 커스텀 할 것
        modal: 'customModal', // 모달 커스텀 할 것
      }}
    >
      <FirstModal />
    </Modal>

    <Modal
      open={twoopen}
      onClose={onTwoCloseModal}
      // showCloseIcon={false}
      // center
      classNames={{
        // overlay: 'customOverlay', // 뒷 배경 설정할 때 커스텀 할 것
        modal: 'customModal', // 모달 커스텀 할 것
      }}
    >
      <SecondModal />
    </Modal>

    </div>
  )
}