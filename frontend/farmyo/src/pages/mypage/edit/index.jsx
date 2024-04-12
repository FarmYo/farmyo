import Back from "../../../image/component/leftarrow.png"
import Dropdown from '../../../image/component/dropdown.png'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../../api/api"
import Modal from "react-responsive-modal"
import { Menu, Transition } from '@headlessui/react'
import DaumPostcode from 'react-daum-postcode';
// import { Dropdown } from 'primereact/dropdown';
// import BankNameList from "../../../store"
import Swal from "sweetalert2"
import { jwtDecode } from "jwt-decode"
import { Fragment, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


export default function MypageEdit(){
  const navigate = useNavigate()
  const im = jwtDecode(localStorage.getItem('access')).userJob
  const [userInfo, setUserInfo] = useState([])
  const [pastPassword, setPastPassword] =useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const [open,setOpen] = useState(false)
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const resetSelectedBank = () => {
    setSelectedBank({ id: null, bankName: userInfo?.account?.bankName });
  };

  const addressSearch = (data) => {
    console.log(data)
    const newUserInfo = {
      ...userInfo,
      addressCode : data.zonecode,
      addressLegal : data.roadAddress,
    };
    setUserInfo(newUserInfo)}

    
  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState({ id: null, bankName: userInfo?.account?.bankName });

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const isNumber = ((number) => {
    if (isNaN(number)) {
      Swal.fire({
        title: '숫자 외에 입력할 수 없습니다.',
        confirmButtonColor: '#1B5E20',
      });
      const numbers = number.replace(/[^0-9]/g, "");
      const newUserInfo = {
        ...userInfo,
        account :{
          ...userInfo.account,
          accountNumber: numbers,
        }
      };
      setUserInfo(newUserInfo);
    } else {
      const newUserInfo = {
        ...userInfo,
        account :{
          ...userInfo.account,
          accountNumber: number,
        }
      };
      setUserInfo(newUserInfo);
    }
  })

  const getUserInfo = (() => {
    api.get('users')
    .then((res) => {
      console.log('정보 받아오기 성공', res.data, res.data.dataBody)
      setUserInfo(res.data.dataBody)
      setProfileImg(res.data.dataBody.profile)
      // setSelectedBank({ id: null, bankName: res.data.dataBody.account.bankName});
    })
    .catch((err) => {
      console.log('정보 받아오기 실패', err)
    })
  })

  const changeInfo = (() => {
    if (userInfo?.nickname && userInfo?.telephone && userInfo?.comment) {
      api.patch('users', {
        nickname : userInfo?.nickname,
        telephone : userInfo?.telephone,
        comment : userInfo?.comment,
      })
      .then((res) => {
        console.log('유저정보 수정 성공')
        console.log('현재 유저 정보 :', userInfo)
        getUserInfo()
        document.getElementById('changeInfo').close()
        Swal.fire({
          title : '변경되었습니다.',
          confirmButtonColor: '#1B5E20',
        })
      })
      .catch((err) => {
        console.log('유저 정보 수정 실패', err)
        console.log('현재 유저 정보 :', userInfo)
      })
    }
  })

  const changeAddress = (() => {
    if (userInfo?.addressCode && userInfo?.addressLegal && userInfo?.addressDetail) {
      api.patch('users/address', {
        addressCode : userInfo?.addressCode,
        addressLegal : userInfo?.addressLegal,
        addressDetail : userInfo?.addressDetail,
      })
      .then((res) => {
        console.log('주소정보 수정 성공')
        console.log('현재 유저 정보 :', userInfo)
        getUserInfo()
        document.getElementById('changeAddress').close()
        Swal.fire({
          title : '변경되었습니다.',
          confirmButtonColor: '#1B5E20',
        })
      })
      .catch((err) => {
        console.log('주소 정보 수정 실패', err)
        console.log('현재 유저 정보 :', userInfo)
      })
    }
  })

  const changeAccount = (() => {
    if (userInfo?.account?.depositor && userInfo?.account?.bankName && userInfo?.account?.accountNumber) {
      api.patch('users/account', {
        depositor : userInfo?.account?.depositor,
        bank : selectedBank.bankName,
        account : userInfo?.account?.accountNumber,
      })
      .then((res) => {
        console.log('계좌 정보 수정 성공')
        console.log('현재 유저 정보 :', userInfo)
        getUserInfo()
        document.getElementById('changeAccount').close()
        Swal.fire({
          title : '변경되었습니다.',
          confirmButtonColor: '#1B5E20',
        })
      })
      .catch((err) => {
        console.log('계좌 정보 수정 실패', err)
        console.log('현재 유저 정보 :', userInfo)
      })
    }
  })

  const changePassword = (() => {
    if (pastPassword && newPassword) {
      api.patch('users/password/update', {
        pastPassword : pastPassword,
        newPassword : newPassword,
      })
      .then((res) => {
        console.log('비밀번호 변경 성공')
        Swal.fire({
          title: '비밀번호가<br>변경되었습니다.',
          confirmButtonColor: '#1B5E20',
        })
        setPastPassword("")
        setNewPassword("")
        document.getElementById('changepassword').close()
      })
      .catch((err) => {
        console.log('비밀번호 변경 실패', err)
        setPastPassword("")
        setNewPassword("")
        document.getElementById('changepassword').close()
        if (err.response.data.dataHeader.resultCode === "U-011") {
          Swal.fire({
              title: '현재 비밀번호가<br>일치하지 않습니다.',
              confirmButtonColor: '#1B5E20',
            })
        } else {
          Swal.fire({
            title: '알 수 없는 에러로<br>비밀번호 변경 실패',
            confirmButtonColor: '#1B5E20',
          })
        }
      })
    } else {
      Swal.fire({
        title: '비밀번호를 입력해주세요.',
        confirmButtonColor: '#1B5E20',
      })
    }
  })

  // 이전페이지로
  const goBack = () => {
    if (im === 0) {
      navigate('/mypage/seller')
    } else {
      navigate('/mypage/buyer')
    }
  };

  useEffect(()=>{
    getUserInfo();
    setSelectedBank()
    BankList();
  },[userInfo.profile])

  const imgRef = useRef(null); 
  const [profileImg, setProfileImg] = useState(""); 
  
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };

    const formData = new FormData();
    formData.append(`profileImg`, file);
    api.patch(`users/profile`, formData)
    .then((res) => {
      console.log("수정 완료")
    })
    .catch((err) => {
      console.log('수정 실패 백엔드 누구야!', err)
      Swal.fire({
        icon: "error",
        title: '이미지 파일이</br> 너무 큽니다.',
        text: "10MB 이하 파일을 업로드해주세요.",
        confirmButtonColor: '#1B5E20',
      });
    })

  };

  return(
    <div className="p-5">
      {/* 이미지 */}
      <div>
        <img src={Back} alt="" style={{ width:20}} onClick={goBack}/>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <input type="file" accept="image" capture="camera" hidden id="img"/>
          {/* 아래 img랑 연결해놓기 */}
          {userInfo.profile && (<img src={profileImg} alt="" style={{ width:80, height:80 }}  htmlFor="img" className='rounded-full'/>)}
        </div>
        {/* 사진 눌러서 선택하는 거 아니면 이걸로 하기 */}
        <label style={{ backgroundColor:'#bbbbbb'}} className="mx-auto btn rounded-md w-1/2 mt-2" htmlFor="profileImg">
            <div style={{ color: 'white' }} className="text-sm cursor-pointer">
                프로필 사진 변경
            </div>
        </label>
        <input
                  type="file"
                  id="profileImg"
                  autocomplete="img"
                  accept="image/*"
                  hidden
                  onChange={saveImgFile}
                  ref={imgRef}
          />
      </div>
      {/* 이미지 */}
      <div className="flex justify-between mt-8">
        <div className="flex flex-col">
      <label htmlFor="id"
        className="block text-sm leading-6 text-gray-900">
        아이디
      </label>
        <p>{userInfo?.loginId}</p>
      </div>
      <div>
      {im === 0 && (
        <button
          className="btn rounded-md" style={{ backgroundColor:'#81C784'}}
          onClick={()=>document.getElementById('checkPoint').showModal()}
        >
          <h1 style={{ color:'white' }} className="text-sm" >내 지갑</h1>
        </button> )}
      </div>
      </div>
      <div>
      </div>

      <label htmlFor="email"
        className="block text-sm leading-6 text-gray-900 mt-2">
        이메일
      </label>
      <div className="mb-3">
        <p>{userInfo?.email}</p>
      </div>
      <hr />
      <div className="flex justify-between mt-2">
      <label htmlFor="nickname"
        className="block text-sm leading-6 text-gray-900 mt-2">
        닉네임
      </label>
      <button 
        className="mr-5 border"
        onClick={() => document.getElementById('changeInfo').showModal()}
      >
        수정
      </button>
      </div>
      <div>
        <p>{userInfo?.nickname}</p>
      </div>
      <label htmlFor="number"
        className="block text-sm leading-6 text-gray-900 mt-2">
        연락처
      </label>
      <div>
        <p>{userInfo?.telephone}</p>
      </div>
      <label htmlFor="message"
        className="block text-sm leading-6 text-gray-900 mt-2">
        상태메시지
      </label>
      <div className="mb-3">
        <p>{userInfo?.comment}</p>
      </div>
      <hr />
      <div className="flex justify-between mt-2">
      <label htmlFor="address"
        className="block text-sm leading-6 text-gray-900 mt-2">
        주소
      </label>
      <button 
        className="mr-5 border"
        onClick={() => document.getElementById('changeAddress').showModal()}
      >
        수정
      </button>
      </div>
      <div className="mb-3">
        <p>{userInfo?.addressLegal}</p>
        <p>{userInfo?.addressDetail}</p>
      </div>
      <hr />
      <div className="flex justify-between mt-2">
      <label htmlFor="account"
        className="block text-sm leading-6 text-gray-900 mt-2">
        계좌
      </label>
      <button 
        className="mr-5 border"
        onClick={() => document.getElementById('changeAccount').showModal()}
      >
        수정
      </button>
      </div>
      <div>
        <p>예금주 : {userInfo?.account?.depositor}</p>
        <p>은행명 : {userInfo?.account?.bankName}</p>
        <p>계좌번호 : {userInfo?.account?.accountNumber}</p>
      </div>

      <button className="btn rounded-md w-full mt-5" style={{ backgroundColor:'#81C784'}}
            onClick={()=>document.getElementById('changepassword').showModal()}>
              <h1 style={{ color:'white' }} className="text-sm">비밀번호 변경</h1>
            </button>

      {/* 포인트 잔액 모달 */}
      <dialog id="checkPoint" className="modal">
        <div className="modal-box" style={{ height:'80px'}}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            내 판매액 : {userInfo?.account?.accountBalance}원
          </div>
        </div>
      </dialog>

      {/* 정보 수정 모달 */}
      <dialog id="changeInfo" className="modal">
        <div className="modal-box" style={{ height:'350px'}}>
          <form method="dialog">
            <button 
              onClick={() => getUserInfo()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
          <label htmlFor="nickname"
              className="block text-sm leading-6 text-gray-900 mt-4">
              닉네임
            </label>
            <div>
              <input 
                value={userInfo?.nickname}
                onChange={(event) => {
                  const newUserInfo = {
                    ...userInfo,
                    nickname: event.target.value,
                  };
                  setUserInfo(newUserInfo);}}
                id="nickname" 
                name="nickname" 
                type="text" 
                placeholder={userInfo?.nickname} 
                autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
            <label htmlFor="number"
              className="block text-sm leading-6 text-gray-900 mt-2">
              연락처
            </label>
            <div>
              <input 
                value={userInfo?.telephone}
                onChange={(event) => {
                  const newUserInfo = {
                    ...userInfo,
                    telephone: event.target.value,
                  };
                  setUserInfo(newUserInfo);}}
                id="number" name="number" type="text" placeholder={userInfo?.telephone} autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <label htmlFor="message"
              className="block text-sm leading-6 text-gray-900 mt-2">
              상태메세지
            </label>
            <div>
              <input 
                value={userInfo?.comment}
                onChange={(event) => {
                  const newUserInfo = {
                    ...userInfo,
                    comment: event.target.value,
                  };
                  setUserInfo(newUserInfo);}}
                id="message" name="message" type="text" placeholder={userInfo?.comment} autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <button
              className="btn rounded-md w-full mt-5"
              style={{ backgroundColor:'#81C784'}}
              onClick={() => changeInfo()}
            >
              <h1 style={{ color:'white' }} className="text-sm">저장</h1>
            </button>
          </div>
        </div>
      </dialog>

      {/* 주소 수정 모달 */}
      <Modal
        open={isOpen}
        showCloseIcon={true}
        // center
        className={{
          modal: 'customModal',
        }}
        onOverlayClick={() => setIsOpen(false)} //  Modal 외부 영역을 클릭했을 때 실행되는 함수
        onEscapeKey={() => setIsOpen(false)} // Esc 키를 눌렀을 때 실행되는 함수
        onClose={() => {}}
      >
        {/* <button onClick={() => {setIsOpen(false)}} className="closeButton">X</button> */}
        {/* <firstModal/> */}
        <DaumPostcode
          onComplete={(data) => {
            addressSearch(data);
            document.getElementById('changeAddress').showModal()
            setIsOpen(false); // 주소 검색 완료 후 Modal 닫기 // 주소가 선택 안되는 문제 수정해야한다.
          }}
          autoClose
          width="100%"
          height="100%"
        />
      </Modal>

      <dialog id="changeAddress" className="modal">
        <div className="modal-box" style={{ height:'250px'}}>
          <form method="dialog">
            <button 
              onClick={() => getUserInfo()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
          <label htmlFor="address"
              className="block text-sm leading-6 text-gray-900 mt-2">
              주소
            </label>
            <div>
              <div className="flex justify-between">
                <input 
                  value={userInfo?.addressLegal}
                  onChange={(event) => {
                    const newUserInfo = {
                      ...userInfo,
                      addressLegal : event.target.value,
                    };
                    setUserInfo(newUserInfo);}}
                  id="address" name="address" type="text" placeholder={userInfo?.addressLegal} autoComplete="text" 
                  className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                  />
                  <button
                    onClick={() => {
                      document.getElementById('changeAddress').close()
                      setIsOpen(true)
                    }}
                      className="btn rounded-md"
                      style={{ backgroundColor:'#bbbbbb'}}
                    >
                  <span style={{ color:'white' }} className="text-sm">주소검색</span>
                </button>
              </div>
                <input 
                  value={userInfo?.addressDetail}
                  onChange={(event) => {
                    const newUserInfo = {
                      ...userInfo,
                      addressDetail : event.target.value,
                    };
                    setUserInfo(newUserInfo);}}
                  id="addressDetail" name="addressDetail" type="text" placeholder={userInfo?.addressDetail} autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <button
              className="btn rounded-md w-full mt-5"
              style={{ backgroundColor:'#81C784'}}
              onClick={() => changeAddress()}
            >
              <h1 style={{ color:'white' }} className="text-sm">정보 수정</h1>
            </button>
          </div>
        </div>
      </dialog>

      {/* 계좌 수정 모달 */}
      <dialog id="changeAccount" className="modal">
        <div className="modal-box" style={{ height:'350px'}}>
          <form method="dialog">
            <button 
              onClick={() => {getUserInfo(); resetSelectedBank()}}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
          <label htmlFor="accountOwner"
              className="block text-sm leading-6 text-gray-900 mt-2">
              예금주
            </label>
            <div>
              <input 
                value={userInfo?.account?.depositor}
                onChange={(event) => {
                  const newUserInfo = {
                    ...userInfo,
                    account :{
                      ...userInfo.account,
                      depositor: event.target.value,
                    }
                  };
                  setUserInfo(newUserInfo);}}
                id="accountOwner" name="accountOwner" type="text" placeholder={userInfo?.account?.depositor} autoComplete="text" 
                className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
                </div>
                <label htmlFor="bankName"
              className="block text-sm leading-6 text-gray-900 mt-2">
              은행명
            </label>
            {/* 드롭다운 */}
            <Menu as="div" >
            <div>
            <Menu.Button className="flex items-center justify-between h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 pr-4">
              {selectedBank ? (<span>{selectedBank?.bankName}</span>) : (<span>{userInfo?.account?.bankName}</span>)}
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
                    setSelectedBank({ id: bank.id, bankName: bank.bankName })
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
            <label htmlFor="account"
              className="block text-sm leading-6 text-gray-900 mt-2">
              계좌번호
            </label>
                <div>
                <input
                  value={userInfo?.account?.accountNumber}
                  onChange={(event) => {isNumber(event.target.value)}}
                  id="account" name="account" type="text" placeholder={userInfo?.account?.accountNumber} autoComplete="text" 
                  className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <button
              className="btn rounded-md w-full mt-5"
              style={{ backgroundColor:'#81C784'}}
              onClick={() => changeAccount()}
            >
              <h1 style={{ color:'white' }} className="text-sm">저장</h1>
            </button>
          </div>
        </div>
      </dialog>

      {/* 비밀번호변경모달 */}
      <dialog id="changepassword" className="modal">
        <div className="modal-box pt-16" style={{ height:'300px'}}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            <p>현재 비밀번호</p>
            <input 
              value={pastPassword}
              onChange={(event) => setPastPassword(event.target.value)}
              id="pastPassword" 
              name="pastPassword" 
              type="password" 
              placeholder="현재 비밀번호" 
              autoComplete="password" 
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3 mb-3"
            />
            <p>새 비밀번호</p>
            <input 
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              id="newPassword" 
              name="newPassword" 
              type="password" 
              placeholder="새비밀번호" 
              autoComplete="password" 
              className="block h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            />
            <button
              className="btn rounded-md w-full mt-5"
              style={{ backgroundColor:'#81C784'}}
              onClick={() => changePassword()}
            >
              <h1 style={{ color:'white' }} className="text-sm">비밀번호 변경</h1>
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}