import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../../image/component/user/logo.png';
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Swal from "sweetalert2";
import api from '../../../api/api';
import "../../../css/checkpassword.css";

export default function CheckPassword() {
  const navigate = useNavigate()

  const [id, setId] = useState("")

  const [email, setEmail] = useState("")
  const [checkEmail, setCheckEmail] = useState(false)
  
  const checkValidEmail = useCallback((email) => {
    const emailForm = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    const isValid = emailForm.test(email);
    return isValid
  }, [])
  
  const sendEmail = (async (email) => {
    setCode("")
    const isValid = await checkValidEmail(email);
    setCheckEmail(isValid);
    if (isValid === false) {
      Swal.fire({
        title:'형식에 맞지 않는<br> 이메일입니다.',
        confirmButtonColor: '#1B5E20',
      })
    } else {
      if (id && email) {
        api.post('users/email/password', {
          loginId:id,
          email:email
        })
        .then((res) => {
          console.log('아이디 확인&이메일 인증 번호 발송 성공')
          onOpenModal()
        })
        .catch((err) => {
          console.log('아이디 확인&이메일 인증 번호 발송 실패', err)
          if (err.response.data.dataHeader.resultCode === "U-007") {
            Swal.fire({
              title:'존재하지 않는<br> 이메일입니다.',
              confirmButtonColor: '#1B5E20',
            })
          } else {
          console.log('존재하지 않는 이메일', err)
          Swal.fire({
            title:'일치하는 회원이<br>없습니다.',
            confirmButtonColor: '#1B5E20',
          })
        }})
      } else {
        Swal.fire({
          title: '<br>회원 정보를<br>입력해주세요',
          confirmButtonColor: '#1B5E20',
        })
      }
    }})
    
    const [code, setCode] = useState("")
    
    const [open, setOpen] = useState(false)
    const onOpenModal = () => {
      setOpen(true);
    };
    const onCloseModal = () => {
      setOpen(false);
    };
    
    const FirstModal = () => {
      return(
        <div>
        <div className="mt-5">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            id="authenticationCode"
            name="authenticationCode"
            type="text"
            autoComplete="text"
            required
            className="inputstyle block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="인증코드"
          />
        </div>

          <button
            onClick={(event) => {
              event.preventDefault();
              checkCode(code);
            }} // 모달로 비밀번호 입력창 띄우기
            className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
            >
            확인
          </button>
      </div>
    )}
    
    const alerter1 = () => {
      Swal.fire({
        title: '인증시간이 초과하였습니다',
        html: '다시 이메일 인증을<br>진행해주세요',
        confirmButtonColor: '#1B5E20',
      });
    };
    const alerter2 = () => {
      Swal.fire({
    title: '인증코드가 일치하지 않습니다',
    html: '작성한 이메일로 발송된<br>인증코드를 입력해주세요',
    confirmButtonColor: '#1B5E20',
  });
};

const checkCode = useCallback((code) => {
  setNewPassword("")
  setPassword("")
  if (code.length < 1) {
    Swal.fire({
      title: '인증번호를 입력하세요.',
      confirmButtonColor: '#1B5E20',
    })
  } else {
    api.post('users/auth/check', {
      email:email,
      authCode:code
    }
    )
    .then((res) => {
      console.log('인증번호 확인 성공')
      if (res.data.dataHeader.successCode === 0) {
        onCloseModal();
        onTwoOpenModal();
        Swal.fire({
          title:'인증완료',
          confirmButtonColor: '#1B5E20',
        })
      } else {
        console.log('여기로 온다는 것? 로직을 확인해야한다는 것')
      }
    })
    .catch((err) => {
      console.log('인증번호 확인 실패', err)
      setCode("")
      if (err.response.data.dataHeader.resultCode === "U-004") {
        alerter1()
        onCloseModal();
        console.log('인증시간 초과')
      } else if (err.response.data.dataHeader.resultCode === "U-005") {
        alerter2()
        console.log('이메일 불일치')
      }
    })
  }
},[email])

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [twoopen, setTwoOpen] = useState(false)
  const onTwoOpenModal = () => {
    setTwoOpen(true);
  };
  const onTwoCloseModal = () => {
    setTwoOpen(false);
  };

  const alerter = () => {
    Swal.fire({
      title: '비밀번호가<br>변경되었습니다!',
      confirmButtonColor: '#1B5E20',
    });
  };

  const alerterWrong1 = () => {
    Swal.fire({
      title: '비밀번호를<br>입력해주세요.',
      confirmButtonColor: '#1B5E20',
    });
  };

  const alerterWrong2 = () => {
    Swal.fire({
      title: '두 비밀번호가<br>일치하지 않습니다.',
      confirmButtonColor: '#1B5E20',
    });
  };

const checkPassword = () => {
  if (!password || !newPassword) {
    alerterWrong1()
  } else if (password === newPassword) {
    api.patch('users/password/reset', {
      loginId : id,
      email : email,
      password : password,
    })
    .then((res) => {
      console.log('비밀번호 변경 완료')
      onTwoCloseModal();
      alerter();
      navigate('/login');
    })
    .catch((err) => {
      console.log('비밀번호 변경 실패', err)
    })
  } else {
    alerterWrong2()
  }
}

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
            value={id}
            onChange={(event) => {
              setId(event.target.value)
            }}
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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
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
            onClick={(event) => {
              event.preventDefault();
              sendEmail(email)
            }}
            className="flex w-full justify-center rounded-md px-3 py-2 mt-4 mb-2 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950 h-10"
            // style={{backgroundColor:'#81C784'}}
            // 이메일 입력되면 버튼 활성화 되도록 처리
            style={{backgroundColor:'#1B5E20'}}
          >
            인증코드 발송
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
      {/* <FirstModal /> */}
      <div className="mt-5">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            id="authenticationCode"
            name="authenticationCode"
            type="text"
            autoComplete="text"
            required
            className="inputstyle block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="인증코드"
          />
        </div>

          <button
            onClick={(event) => {
              event.preventDefault();
              checkCode(code);
            }} // 모달로 비밀번호 입력창 띄우기
            className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
            >
            확인
          </button>
    </Modal>

    <Modal
      open={twoopen}
      onClose={onTwoCloseModal}
      showCloseIcon={false}
      // center
      classNames={{
        // overlay: 'customOverlay', // 뒷 배경 설정할 때 커스텀 할 것
        modal: 'customModal', // 모달 커스텀 할 것
      }}
    >
      {/* <SecondModal /> */}
      <div className="modal-content">
        <div className="mt-2">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            id="newPassword"
            name="newPassword"
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
            checkPassword();
          }}
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