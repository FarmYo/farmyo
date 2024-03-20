import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Swal from "sweetalert2";
import "../../../css/trade.css";

export default function SellerTrade() {
  const { cropId } = useParams(); // URL 파라미터에서 `cropId` 추출
  // 받아온 거 그대로 적어주기
  // const [item, setItem] = useState(null);
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
  const alerter = () => {
    Swal.fire({
      html: '<h1>송장번호가<br>입력되었습니다!</h1>',
      confirmButtonColor: '#1B5E20',
    });
  };
  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2">
          <h1 className="text-xl font-bold" style={{color:"white"}}>거래</h1>
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
        <h2 className="h2">농산물</h2>
        작물명
      </div>
      <div className="p-2">
        <h2 className="h2">거래 수량</h2>
        20kg
        </div>

        <h2 className="h2">거래 가격</h2>
        220,000원

        <div className="flex flex-row justify-between">
          <div>
            <h2 className="h2">구매자</h2>
            구매자명
          </div>
          <div>
            <h2 className="h2">판매자</h2>
            판매자명
          </div>
        </div>

        <h2 className="h2">배송지</h2>
        경상북도 구미시 여현로 7길
        
        <h2 className="h2">송장번호</h2>
        <button
          onClick={onOpenModal}
          className="addressbutton btn"
        >
          송장번호 입력
        </button>

      </div>
      <Modal
      open={open}
      onClose={onCloseModal}
      showCloseIcon={false}
      // center
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
        />
      </div>
      <button
        onClick={(event)=>{
          event.preventDefault();
          onCloseModal()
          alerter()}}
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