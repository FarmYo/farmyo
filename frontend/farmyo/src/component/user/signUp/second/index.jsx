import React, { useState, useEffect } from 'react'
// import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-responsive-modal';
import Swal from "sweetalert2";
import Back from "../../../../image/component/leftarrow.png"
import '../../../../css/signup.css';

export default function SignUpSecond() {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  };
  // const customModal = {  
  //   maxWidth: "100%",
  //   maxHeight: "100vh", /* 화면 높이에 맞춰 설정 */ 
  //   width: "90%",
  //   position: "fixed",
  //   top: "30%",
  //   left: 0,
  //   borderRadius: "5%",
  // }

  const location = useLocation()
  const { isSeller, id, email, password } = location.state;
  const alerter = () => {
    Swal.fire({
      title: '숫자 외에는 <br>입력할 수 없습니다.',
      confirmButtonColor: '#1B5E20',
    });
  };
  
  const [nickName, setNickName] = useState("")
  const [isNickName, setIsNickName] = useState(false)
  const checkNickName = ((nickName) => {
    if (nickName) {
      setIsNickName(true)
    }
  })
  
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const isNumber = ((number) => {
    if (isNaN(number)) {
      alerter()
      const numbers = number.replace(/[^0-9]/g, "");
      setPhoneNumber(numbers)
    } else {
      setPhoneNumber(number)
    }
  })
  const checkPhoneNumber = ((phoneNumber) => {
    if (phoneNumber) {
      setIsPhoneNumber(true)
    }
  })
  
  const [zoomNumber, setZoomNumber] = useState("00000")

  const [address, setAddress] = useState("")
  const [isAddress, setIsAddress] = useState(false)
  const checkAddress = ((address) => {
    if (address.length > 0) {
      setIsAddress(true)
    }
  })
  const addressSearch = (data) => {
    // 주소 입력시 모달 확인 => 페이지를 새로 만든다 or 모달 띄우는 법을 찾는다(커스텀)
    console.log(data)
    setAddress(data.roadAddress);
    setZoomNumber(data.zonecode)
    setIsAddress(true)
    // setDetailAddress('');
    setIsOpen(false)
  }
  const [detailAddress, setDetailAddress] = useState("")
  const [isDetailAddress, setIsDetailAddress] = useState(false)
  const checkDetailAddress = ((detailAddress) => {
    if (detailAddress) {
      setIsDetailAddress(true)
    }
  })

  const [isOpen, setIsOpen] = useState(false);

  const changePage = (() => {
      if (isNickName === true && isPhoneNumber === true && isAddress === true && isDetailAddress === true) {
        console.log(isSeller, id, email, password, nickName, phoneNumber, address, detailAddress)
        navigate("/signup/third", { state: { isSeller, id, email, password, nickName, phoneNumber, zoomNumber, address, detailAddress } }, { replace: true })
      } else {
        console.log('로그인 실패 화면 확인해보기', isNickName, isPhoneNumber, isAddress, isDetailAddress)
        Swal.fire({
          title: '<br>입력 정보를<br>확인해주세요',
          confirmButtonColor: '#1B5E20',
        })
      }
    }
  )


  useEffect(() => {
    const allInputs = document.querySelectorAll('input');
    const button = document.querySelector('.finishbutton');
  
    allInputs.forEach(input => {
      input.addEventListener('focus', () => {
        button.style.display = 'none';
      });
  
      input.addEventListener('blur', () => {
        button.style.display = 'block';
      });
    });
  }, []);

  return(
    <div>
      <img class="mt-8 ml-4" src={Back} alt="" style={{ width:30 }} onClick={goBack}/>
    <div className="main mx-auto w-auto max-w-sm p-10">
      <label 
        htmlFor="nickname"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        닉네임
      </label>

      <div>
        <input 
          value={nickName}
          onChange={(event) => setNickName(event.target.value)}
          onBlur={(nickName) => {
            checkNickName(nickName)
          }}
          id="nickname" 
          name="nickname" 
          type="text" 
          placeholder="닉네임"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
      <div className="mt-10">
        <label 
          htmlFor="phonenumber"
          className="block text-sm font-medium leading-6 text-gray-900 mt-2"
        >
          연락처
        </label>
        <div>
          <input 
            value={phoneNumber}
            onChange={(event) => isNumber(event.target.value)}
            onBlur={(phoneNumber) => {
              checkPhoneNumber(phoneNumber)
            }}
            id="phonenumber" 
            name="phonenumber" 
            type="tel" 
            placeholder="연락처"
            autoComplete="tel"
            required
            className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          />
        </div>
      </div>

    <div className="mt-10">
      <label 
        htmlFor="address"
        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
      >
        주소
      </label>
      <div className="flex">
        <input 
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          onBlur={(event) => {
            checkAddress(event.target.value)
          }}
          id="address" 
          name="address" 
          type="text"
          placeholder="주소"
          autoComplete="address"
          required
          className="block h-10 w-50% rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <button 
          className="checkbutton"
          onClick={() => setIsOpen(true)}
        >
          주소검색
        </button>
      </div>
      
      <div>
        <input 
          value={detailAddress}
          onChange={(event) => setDetailAddress(event.target.value)}
          onBlur={(detailAddress) => {
            checkDetailAddress(detailAddress)
          }}
          id="detailaddress" 
          name="detailaddress" 
          type="text" 
          placeholder="상세주소"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-2"
        />
      </div>

    <div style={{ position: 'relative' }}>
      <Modal
        open={isOpen}
        showCloseIcon={false}
        // style={customModal}
        className={{
          modal: 'customModal',
        }}
        onOverlayClick={() => setIsOpen(false)} //  Modal 외부 영역을 클릭했을 때 실행되는 함수
        onEscapeKey={() => setIsOpen(false)} // Esc 키를 눌렀을 때 실행되는 함수
        onClose={() => {}}
      >
        {/* <button 
          onClick={() => {
            setIsOpen(false)
          }}
          className="closeButton"
        >X</button> */}
        <DaumPostcode
          onComplete={(data) => {
            addressSearch(data);
            // setIsOpen(false); // 주소 검색 완료 후 Modal 닫기 // 주소가 안되는 문제 수정해야한다.
          }}
          autoClose
          width="100%"
          height="100%"
        />
      </Modal>
    </div>
  </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => changePage()}
      >
        추가정보입력(2/3)
      </button>
    </div>
    </div>
  )
}