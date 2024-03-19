import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../../image/component/user/logo.png';
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Swal from "sweetalert2";
import "../../../css/checkpassword.css";

export default function CheckPassword() {
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const alerter = () => {
    Swal.fire({
      html: '<h2>비밀번호가<br>변경되었습니다!</h2>',
      confirmButtonColor: '#1B5E20',
    });
  };
  return(
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 main">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-0">
        <img
          className="mx-auto h-auto w-auto"
          src={Logo}
          alt="FarmYo"
        />
      </div>

      <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-2">
          <input
            id="id"
            name="id"
            type="text"
            autoComplete="text"
            required
            className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="아이디"
          />
        </div>
        <div className="mt-4">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="이메일"
          />
        </div>


          <button
            // onClick={() => {}} 인증코드 발송 로직 짜기
            className="flex w-full justify-center rounded-md px-3 py-2 mt-4 mb-2 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            style={{backgroundColor:'#81C784'}}
            // 이메일 입력되면 버튼 활성화 되도록 처리
            // style={{backgroundColor:'#1B5E20'}}
          >
            인증코드 발송
          </button>
          <div className="mt-5">
          <input
            id="authenticationCode"
            name="authenticationCode"
            type="text"
            autoComplete="text"
            required
            className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="인증코드"
          />
        </div>

          <button
            onClick={onOpenModal} // 모달로 비밀번호 입력창 띄우기
            className="flex w-full justify-center rounded-md px-3 py-2 mt-4 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            style={{backgroundColor:'#1B5E20'}}
          >
            확인
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
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          className="inputstyle block h-10 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="새 비밀번호"
        />
      </div>
      <div className="mt-4 flex justify-center ">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          className="inputstyle block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="새 비밀번호 확인"
        />
      </div>
      <button
        onClick={(event)=>{
          event.preventDefault();
          alerter();
          navigate('/login')}}
        className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
        style={{backgroundColor:'#1B5E20'}}
      >
        비밀번호 변경
      </button>
      </div>
    </Modal>
  </div>
  )
}