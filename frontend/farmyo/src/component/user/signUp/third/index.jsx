import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';
import '../../../../css/signup.css';

export default function SignUpSecond() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSeller, id, email, password, nickName, phoneNumber, zoomNumber, address, detailAddress } = location.state;
  const [account, setAccount] = useState("")
  const [isAccount, setIsAccount] = useState(false)
  const checkAccount = ((account) => {
    if (account) {
      setIsAccount(true)
    }
  })

  const [accountNumber, setAccountNumber] = useState("")
  const [isAccountNumber, setIsAccountNumber] = useState(false)
  const isNumber = ((number) => {
    if (isNaN(number)) {
      Swal.fire({
        title: '숫자 외에 입력할 수 없습니다.',
        confirmButtonColor: '#1B5E20',
      });
      const numbers = number.replace(/[^0-9]/g, "");
      setAccountNumber(numbers)
    } else {
      setAccountNumber(number)
    }
  })
  const checkAccountNumber = ((accountNumber) => {
    if (accountNumber) {
      setIsAccountNumber(true)
    }
  })

  const [bankName, setBankName] = useState("")
  const [isBankName, setIsBankName] = useState(false)
  const checkBankName = ((bankName) => {
    if (bankName) {
      setIsBankName(true)
    }
  })

  const changePage = (() => {
    if (isAccount === true && isAccountNumber === true && isBankName === true) {
      if (isSeller === 0) {
        // 판매자
        navigate("/signup/business", { state: { isSeller, id, email, password, nickName, phoneNumber, zoomNumber, address, detailAddress, account, accountNumber, bankName } }, { replace: true })
      } else if (isSeller === 1) {
        // 구매자
        axios({
          url:`https://j10d209.p.ssafy.io/api/user`,
          method:'post',
          data:{
            loginId : id,              
            password : password,               
            telephone : phoneNumber, 
            depositor : account,         
            bank : bankName,          
            account : accountNumber,
            email : email,  
            nickname : nickName,        
            addressCode : zoomNumber,          
            addressLegal : address,
            addressDetail : detailAddress,
            job : isSeller // 생산자 0, 소비자 1 
          }
        })
        .then((res) => {
          console.log('인증번호 확인 성공')
          if (res.data.dataHeader.successCode === 0) {
            navigate('/login', { replace: true })
            Swal.fire({
              title:'회원이 되신 걸<br>환영합니다',
              confirmButtonColor: '#1B5E20',
            })
          } else if (res.data.dataHeader.resultCode === "G-003") {
            Swal.fire({
              title:'G-003 에러',
              html: '회원가입 실패',
              confirmButtonColor: '#1B5E20',
            })
          }
        })
        .catch((err) => {
          console.log('인증번호 확인 실패', err)
          Swal.fire({
            title:'알 수 없는 에러',
            html: '회원가입 실패',
            confirmButtonColor: '#1B5E20',
          })
        })
      }} else {
        console.log('로그인 실패 화면 확인해보기', zoomNumber, address, detailAddress, account, accountNumber, bankName)
        Swal.fire({
          html: '<br>입력 정보를<br>확인해주세요',
          confirmButtonColor: '#1B5E20',
        })
      }
    })

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
    <div className="main2 mx-auto w-auto max-w-sm p-10">
      <label 
        htmlFor="account"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        계좌
      </label>

      <div>
        <input 
          value={account}
          onChange={(event) => {
            setAccount(event.target.value)
          }}
          onBlur={(event) => {
            checkAccount(event.target.value)
          }}
          id="account" 
          name="account" 
          type="text" 
          placeholder="예금주"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
      <div>
        <input 
          value={accountNumber}
          onChange={(event) => {
            isNumber(event.target.value)
          }}
          onBlur={(event) => {
            checkAccountNumber(event.target.value)
          }}
          id="accountnumber" 
          name="accountnumber" 
          type="text" 
          placeholder="계좌번호"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>
      <div>
        <input 
          value={bankName}
          onChange={(event) => {
            setBankName(event.target.value)
          }}
          onBlur={(event) => {
            checkBankName(event.target.value)
          }}
          id="bankName" 
          name="bankName" 
          type="text" 
          placeholder="은행명"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => {changePage()}} 
      >
        회원 가입 완료(3/3)
      </button>
    </div>
    </div>
  )
}