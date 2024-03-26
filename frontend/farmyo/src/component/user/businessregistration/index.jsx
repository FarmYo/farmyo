import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import api from '../../../api/api';
import '../../../css/signup.css';

export default function Business() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSeller, id, email, password, nickName, phoneNumber, zoomNumber, address, detailAddress, account, accountNumber, bankName } = location.state;

  const [businessNumber, setBusinessNumber] = useState("")
  const [isBusinessNumber, setIsBusinessNumber] = useState(false)

  const [ownerName, setOwnerName] = useState("")
  const [isOwnerName, setIsOwnerName] = useState(false)
  
  const [openDay, setOpenDay] = useState("")
  const [strOpenDay, setStrOpenDay] = useState("")
  const [isOpenDay, setIsOpenDay] = useState(false)
  
    const changeString = ((date) => {
      const changeString = date.replace(/-/g, '');
      console.log(changeString)
      setStrOpenDay(changeString)
    })

  const checkAll = (() => {
    if (businessNumber) {
      setIsBusinessNumber(true)
    } if (ownerName) {
      setIsOwnerName(true)
    } if (strOpenDay) {
      setIsOpenDay(true)
    }
  })

  const changePage = (() => {
    checkAll()
    if (isBusinessNumber === true && isOwnerName === true && isOpenDay === true) {
    api.post('users', {
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
      job : isSeller,
      licenseNum : businessNumber,
      representative : ownerName,
      startDate : strOpenDay,
    }
  )
  .then((res) => {
    console.log('판매자 회원가입 성공 확인 성공')
    if (res.data.dataHeader.successCode === 0) {
      navigate('/login', { replace: true })
      Swal.fire({
        title:'회원이 되신 걸<br>환영합니다',
        confirmButtonColor: '#1B5E20',
      })
    } else {
      console.log('그렇지만 여기로 왔다는 건 로직 다시 확인 필요')
    }
  })
  .catch((err) => {
    if (err.response.data.dataHeader.resultCode === "U-008") {
      console.log('사업자등록 오류', err)
      Swal.fire({
        title:'사업자등록 오류',
        html: '사업자 등록 정보를 확인해주세요',
        confirmButtonColor: '#1B5E20',
      })
    } else if (err.response.data.dataHeader.resultCode === "U-009") {
      console.log('중복된 사업자등록', err)
      Swal.fire({
        title:'중복된 사업자등록',
        html: '사업자 등록 정보를 확인해주세요',
        confirmButtonColor: '#1B5E20',
      })
    } else {
    console.log('판매자 회원가입 확인 실패', err)
    Swal.fire({
      title:'알 수 없는 에러',
      html: '회원가입 실패',
      confirmButtonColor: '#1B5E20',
    })}
  })
} else {
  console.log('판매자 회원가입 실패 화면 확인해보기', '우편번호 : ', zoomNumber, '주소 :', address, '상세주소 :', detailAddress, '예금주 :', account, '계좌번호 :', accountNumber, '은행명 :', bankName, '사업자등록번호 :', businessNumber, '대표자 :', ownerName, '개업일 :', strOpenDay)
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
        htmlFor="businessnumber"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        사업자등록
      </label>

      <div>
        <input 
          value={businessNumber}
          onChange={(event) => setBusinessNumber(event.target.value)}
          id="businessnumber" 
          name="businessnumber"
          type="text" 
          placeholder="사업자 등록번호"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
        />
      </div>
      <div>
        <input 
          value={ownerName}
          onChange={(event) => setOwnerName(event.target.value)}
          id="businessname" 
          name="businessname" 
          type="text" 
          placeholder="대표자 성명"
          autoComplete="text"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>
      <label 
        htmlFor="businessopenday"
        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
      >
        개업일자
      </label>
      <div>
        <input 
          value={openDay}
          onChange={(event) => {
            setOpenDay(event.target.value)
            changeString(event.target.value)
          }}
          id="businessopenday" 
          name="businessopenday" 
          type="date" 
          placeholder="개업일자"
          autoComplete="date"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>

    </div>
    <div className="fixed-bottom">
      <button 
        className="finishbutton"
        onClick={() => changePage()} // 사업자등록확인 API 돌리기
      >
        회원가입 완료
      </button>
    </div>
    </div>
  )
}