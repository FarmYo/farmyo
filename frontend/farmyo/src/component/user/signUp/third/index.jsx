import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../../api/api"
import Back from "../../../../image/component/leftarrow.png"
import '../../../../css/signup.css';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function SignUpSecond() {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  };
  const location = useLocation()
  const { isSeller, id, email, password, nickName, phoneNumber, zoomNumber, address, detailAddress } = location.state;
  const [account, setAccount] = useState("")
  const [isAccount, setIsAccount] = useState(false)
  const checkAccount = ((account) => {
    if (account) {
      setIsAccount(true)
    }
  })

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


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

  const [bankName, setBankName] = useState({ id: null, bankName: "은행명을 선택해주세요." })

  const [bankList, setBankList] = useState([]);

  const BankList = () => {
    api.get('banks')
    .then((res) => {
      console.log('은행 리스트 받아오기 성공', res.data.dataBody)
      setBankList(res.data.dataBody)
    })
    .catch((err) => {
      console.log('은행 리스트 받아오기 실패', err)
    })
  }


  const changePage = (() => {
    if (isAccount === true && isAccountNumber === true) {
      if (isSeller === 0) {
        // 판매자
        navigate("/signup/business", { state: { isSeller, id, email, password, nickName, phoneNumber, zoomNumber, address, detailAddress, account, accountNumber, bankName: bankName.bankName } }, { replace: true })
      } else if (isSeller === 1) {
        // 구매자
        api.post('users', {
            loginId : id,              
            password : password,               
            telephone : phoneNumber, 
            depositor : account,         
            bank : bankName.bankName,          
            account : accountNumber,
            email : email,  
            nickname : nickName,        
            addressCode : zoomNumber,          
            addressLegal : address,
            addressDetail : detailAddress,
            job : isSeller
          }
        )
        .then((res) => {
          console.log('소비자 회원가입 확인 성공')
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
          console.log('소비자 회원가입 확인 실패', err)
          Swal.fire({
            title:'알 수 없는 에러',
            html: '회원가입 실패',
            confirmButtonColor: '#1B5E20',
          })
        })
      }} else {
        console.log('소비자 회원가입 실패 이유 확인해보기', '우편번호 : ', zoomNumber, '주소 :', address, '상세주소 :', detailAddress, '예금주 :', account, '계좌번호 :', accountNumber, '은행명 :', bankName.bankName)
        Swal.fire({
          title: '<br>입력 정보를<br>확인해주세요',
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

    BankList();
  }, []);

  
  return(
    <div>
      <img class="mt-8 ml-4" src={Back} alt="" style={{ width:30 }} onClick={goBack}/>
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
          type="tel" 
          placeholder="계좌번호"
          autoComplete="tel"
          required
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mt-4"
        />
      </div>


      <Menu as="div" className="mt-4">
            <div>
            <Menu.Button className="flex items-center justify-between h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 pr-4">
              <span>{bankName.bankName}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items className="absolute z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-20">
              <div className="py-1">
                {bankList.map((bank,index)=>(
                  <Menu.Item key={bank.id} onClick={() => {
                    setBankName({ id: bank.id, bankName: bank.bankName }); 
                    }}> 
                    {({ active }) => (
                      <button
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block  px-12 py-2 text-xl'
                        )}
                      >
                        {bank.bankName}
                      </button>
                    )}
                  </Menu.Item>
                ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

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