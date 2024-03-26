import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-responsive-modal"
import api from "../../../../api/api"
import Swal from "sweetalert2";
import '../../../../css/signup.css';

export default function SignUpFirst() {
  const navigate = useNavigate()
  // const { search } = useLocation()
  // const params = new URLSearchParams(search);
  // const isSeller = params.get("seller") === "true";
  const location = useLocation()
  const isSeller = location.state?.seller
  const changeIsSeller = ((isSeller) => {
    if (isSeller === 0) {
      return '판매자'
    } else {
      return '구매자'
    }
  })

  const [id, setId] = useState("")
  const [checkIdMessage, setCheckIdMessage] = useState('6글자 이상 20글자 이하로 공백 없이 작성')
  const [checkIsId, setCheckIsId] = useState(false)
  const checkId = useCallback((id) => {
    if (id && typeof id === 'string') {
      const trimmedId = id.trim();
      if (trimmedId.split(' ').length < 2 && trimmedId.length > 5 && trimmedId.length < 21) {
        api.get(`users/join/duplicate?id=${id}`)
        .then((res) => {
          console.log('아이디 중복검사 완료', res)
          if (res.data.dataBody === 1) {
            setCheckIsId(true)
            setCheckIdMessage("")
          } else {
            console.log(res.data)
            setCheckIsId(false)
            setCheckIdMessage('이미 사용중인 아이디입니다.')
          }
        })
        .catch((err) => {
          console.log('아이디 중복검사 실패', err)
          navigate('/signup')
        })
      } else {
        setCheckIsId(false)
        if (id.length < 6 || id.length > 20) {
          setCheckIdMessage('6글자 이상 20글자 이하로 작성해주세요.')
        } else {
          console.log(id.length)
        setCheckIdMessage('공백을 제거해주세요.')
        }
      }
    }
  },[navigate])

  const [email, setEmail] = useState("")
  const [checkEmailMessage, setCheckEmailMessage] = useState("")
  const [checkIsEmail, setCheckIsEmail] = useState(false)
  const checkEmail = useCallback((email) => {
    const emailForm = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    const isValid = emailForm.test(email);
    return isValid
  }, [])
  const sendEmail = async (email) => {
    setCode("")
    const isValid = await checkEmail(email);
    setCheckIsEmail(isValid);
    if (isValid === false) {
      setCheckEmailMessage('형식에 맞지 않는 이메일입니다.')
    } else {
      api.post('users/email', {email:email})
      .then((res) => {
        console.log('이메일 중복 검사 및 인증번호 발송 완료')
      //   if (res.dataHeader.successCode === "1") {
      //     if (res.dataHeader.resultCode === "U-003") {
      //       setCheckEmailMessage('중복된 이메일입니다.')
      //     } else if (res.dataHeader.resultCode === "인증번호 발송 실패") {
      //       setCheckEmailMessage('인증번호 발송을 다시 눌러주세요.')
      //     }
      //   } else if (res.dataHeader.successCode === 0) {
      //     setCheckEmailMessage("")
      //     onOpenModal();
      //   }
      // })
      if (res.data.dataHeader.successCode === 0) {
        setCheckEmailMessage("")
        onOpenModal();
      }
    })
    .catch((err) => {
      if (err.response.data.dataHeader.resultCode === "U-003") {
        setCheckEmailMessage('중복된 이메일입니다.')
      } else {
      console.log('이메일 인증 발송 실패', err)
      setCheckEmailMessage('인증번호 발송을 다시 눌러주세요.')
    }})
    }
  }
  
  const [code, setCode] = useState("")
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
    if (code.length < 1) {
      Swal.fire('인증번호를 입력하세요.')
    } else {
      api.post('users/auth/check', {
          email:email,
          authCode:code
        }
      )
      .then((res) => {
        console.log('인증번호 확인 성공')
        if (res.data.dataHeader.successCode === 0) {
          setCheckIsEmail(true)
          onCloseModal();
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
        if (err.response.data.dataHeader.resultCode === "U-004") {
          setCheckIsEmail(false)
          alerter1()
          onCloseModal();
          setCheckEmailMessage('이메일 전송 버튼을 다시 눌러주세요')
        } else if (err.response.data.dataHeader.resultCode === "U-005") {
          setCheckIsEmail(false)
          setCode("")
          alerter2()
        }
      })
    }
  },[email])
  
  const [password, setPassword] = useState("")
  const [realPassword, setRealPassword] = useState("")
  const [checkPasswordMessage, setCheckPasswordMessage] = useState("")
  const [checkIsPassword, setCheckIsPassword] = useState(false)
  const checkNullPassword = ((password) => {
    if (!password) {
      setCheckIsPassword(false)
      setCheckPasswordMessage('비밀번호를 입력해주세요.');
    } else {
      if (password === realPassword) {
        setCheckIsPassword(true);
        setCheckPasswordMessage("올바른 비밀번호입니다.")
      } else if (!realPassword) {
        setCheckIsPassword(false)
        setCheckPasswordMessage('비밀번호를 입력해주세요.');
      } else {
        setCheckIsPassword(false)
        setCheckPasswordMessage('비밀번호가 서로 일치하지 않습니다.');
      }
    }
  })
  const checkPassword = useCallback((event) => {
    const secret = event.target.value
    if (secret.length > 0) {
      if (secret === password) {
          setCheckIsPassword(true);
          setCheckPasswordMessage("올바른 비밀번호입니다.");
      } else if (password.length < 1) {
        setCheckIsPassword(false)
        setCheckPasswordMessage('비밀번호를 입력해주세요.');
      } else {
        setCheckIsPassword(false)
        setCheckPasswordMessage('비밀번호가 서로 일치하지 않습니다.');
      }
    } else {
      setCheckIsPassword(false)
      setCheckPasswordMessage('비밀번호를 입력해주세요.');
    }
  }, [password]);
  
  const [open,setOpen] = useState(false)
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const CheckModal = () => {
    return (
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
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          placeholder="인증번호"
          />
      </div>
        <button
          // disabled={!checkIsEmail}
          onClick={(event) => {
            event.preventDefault();
            checkCode(code)
          }}
          className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
          style={{backgroundColor:'#1B5E20'}}
          >
          인증번호 확인
        </button>
      </div>
    )}

  const changePage = () => {
    if (checkIsId === true && checkIsEmail === true && checkIsPassword === true) {
      navigate("/signup/second", { state: { isSeller, id, email, password } }, { replace: true })
    } else {
      if (checkIsId === true && checkIsEmail === false && checkIsPassword === true) {
        console.log('이메일 인증 실패')
      Swal.fire({
        html: '<br>이메일 인증을<br>확인해주세요',
        confirmButtonColor: '#1B5E20',
      })
      } else {
      console.log('로그인 실패 화면 확인해보기', checkIsId, checkIsEmail, checkIsPassword)
      Swal.fire({
        html: '<br>입력 정보를<br>확인해주세요',
        confirmButtonColor: '#1B5E20',
      })}
    }
  }

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
    }, [location]);
    
    return(
      <div>
    <div className="main mx-auto w-auto max-w-sm p-10">
      <div className="text">{changeIsSeller(isSeller)} 회원가입</div>
      <label 
        htmlFor="id"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
        >
        아이디
      </label>
      <div>
        <input 
          value={id}
          onChange={(event) => {
            setId(event.target.value)
            setCheckIdMessage(true)
          }}
          onBlur={(event) => {
            checkId(event.target.value)
          }}
          id="id" 
          name="id" 
          type="text" 
          placeholder="아이디"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <p className="warningmessage">{checkIdMessage}</p>
      </div>

<div className="mt-8">
      <label 
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
        >
        이메일
      </label>
      <div className="flex">
        <input 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          
          id="email" 
          name="email" 
          type="email" 
          placeholder="이메일"
          autoComplete="text"
          required
          className="block h-10 w-50% rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <button
          // disabled={checkIsEmail}
          className="checkbutton"
          onClick={(event) => {
            event.preventDefault()
            sendEmail(email);
          }}
        >
          인증번호 발송
        </button>
      </div>
          <p className="warningmessage">{checkEmailMessage}</p>
      </div>

      <div className="mt-8">
      <label 
        htmlFor="password"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        비밀번호
      </label>

        <input 
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={(event) => checkNullPassword(event.target.value)}
          id="password" 
          name="password" 
          type="password" 
          placeholder="비밀번호"
          autoComplete="password"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
        <input
          value={realPassword}
          onChange={(event) => {setRealPassword(event.target.value)}}
          onBlur={(event) => {checkPassword(event)}}
          id="passwordcheck"
          name="passwordcheck"
          type="password" 
          placeholder="비밀번호 확인"
          autoComplete="password"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-2"
        />
        <p className={checkIsPassword ? "successmessage" : "warningmessage"}>{checkPasswordMessage}</p>
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => {changePage()}}
      >
        추가정보입력(1/3)
      </button>
    </div>

  <Modal
    open={open}
    onClose={onCloseModal}
    showCloseIcon={false}
    classNames={{
      modal: 'customModal',
    }}
  >
    <CheckModal />
  </Modal>

    </div>
  )
}