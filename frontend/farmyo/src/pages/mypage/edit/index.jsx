import Me from "../../../image/component/me.png"
import Back from "../../../image/component/leftarrow.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../../api/api"

export default function MypageEdit(){
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState([])
  // const [id, setId] = useState("")
  // const [email, setEmail] = useState("")
  // const [name, setName] = useState("")
  // const [number, setNumber] = useState("")
  // const [message, setMessage] = useState("상태메세지를 입력해주세요.")
  // const [address, setAddress] = useState("")
  // const [account, setAccount] = useState([])
  // const [addressCode, setAddressCode] = useState("")
  // const [addressLegal, setAddressLegal] = useState("")
  // const [addressDetail, setAddressDetail] = useState("")

  const getUserInfo = (() => {
    api.get('users')
    .then((res) => {
      console.log('정보 받아오기 성공')
      setUserInfo(res.data.dataBody)
      // if (userInfo.comment) {
      //   setMessage(userInfo.comment)   
      // }
    })
    .catch((err) => {
      console.log('정보 받아오기 실패', err)
    })
  })

  // 이전페이지로
  const goBack = () => {
    navigate(-1); 
  };

  useEffect(()=>{
    getUserInfo();
  },[])

  return(
    <div className="p-5">
      <div>
        <img src={Back} alt="" style={{ width:20}} onClick={goBack}/>
      </div>
      <div className="flex justify-center">
        <img src={Me} alt="" style={{ width:80 }}/>
      </div>
      <div className="flex justify-end mt-5">
        <button
          className="btn rounded-md" style={{ backgroundColor:'#81C784'}}
          onClick={()=>document.getElementById('checkPoint').showModal()}
        >
          <h1 style={{ color:'white' }} className="text-sm" >내 포인트 확인</h1>
        </button>
      </div>
      <label htmlFor="id"
        className="block text-sm leading-6 text-gray-900">
        아이디
      </label>
      <div>
        <p>{userInfo?.loginId}</p>
        {/* <input id="id" name="id" type="text" placeholder="아이디입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>
      <label htmlFor="email"
        className="block text-sm leading-6 text-gray-900 mt-2">
        이메일
      </label>
      <div className="mb-3">
        <p>{userInfo?.email}</p>
        {/* <input id="email" name="email" type="text" placeholder="이메일입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>
      <hr />
      <div className="flex justify-between">
      <label htmlFor="nickname"
        className="block text-sm leading-6 text-gray-900 mt-2">
        닉네임
      </label>
      <button className="mr-5">수정</button>
      </div>
      <div>
        <p>{userInfo?.nickname}</p>
        {/* <input id="nickname" name="nickname" type="text" placeholder="닉네임입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>
      <label htmlFor="number"
        className="block text-sm leading-6 text-gray-900 mt-2">
        연락처
      </label>
      <div>
        <p>{userInfo?.telephone}</p>
        {/* <input id="number" name="number" type="text" placeholder="연락처입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>
      <label htmlFor="message"
        className="block text-sm leading-6 text-gray-900 mt-2">
        상태메시지
      </label>
      <div className="mb-3">
        <p>{userInfo?.comment}</p>
        {/* <p>{message}</p> */}
        {/* <input id="message" name="message" type="text" placeholder="상태메시지 입니다" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>
      <hr />
      <label htmlFor="address"
        className="block text-sm leading-6 text-gray-900 mt-2">
        주소
      </label>
      <div>
        <p>{userInfo?.addressDetail}</p>
        <p>{userInfo?.addressLegal}</p>
        {/* <input id="address" name="address" type="text" placeholder="주소입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/>
          <input id="address" name="address" type="text" placeholder="상세주소입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>
      <label htmlFor="account"
        className="block text-sm leading-6 text-gray-900 mt-2">
        계좌
      </label>
      <div>
        <p>예금주 : {userInfo?.account?.depositor}</p>
        <p>은행명 : {userInfo?.account?.bankName}</p>
        <p>계좌번호 : {userInfo?.account?.accountNumber}</p>
        {/* <input id="account" name="account" type="text" placeholder="예금주입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/>
          <input id="account" name="account" type="text" placeholder="계좌번호입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/>
          <input id="account" name="account" type="text" placeholder="은행명입력됨" autoComplete="text" 
          className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
          disabled/> */}
      </div>

      <button className="btn rounded-md w-full mt-5" style={{ backgroundColor:'#81C784'}}
            onClick={()=>document.getElementById('changepassword').showModal()}>
              <h1 style={{ color:'white' }} className="text-sm">비밀번호 변경</h1>
            </button>

      {/* <div className="flex justify-between mt-5">
        <button className="btn rounded-md" style={{ backgroundColor:'#81C784'}} onClick={()=>document.getElementById('changepassword').showModal()}>
          <h1 style={{ color:'white' }} className="text-sm" >비밀번호 변경</h1>
        </button>
        <button className="btn rounded-md w-32" style={{ backgroundColor:'#81C784'}} onClick={()=>document.getElementById('edit').showModal()}>
          <h1 style={{ color:'white' }} className="text-sm" >프로필 수정</h1>
        </button>
      </div> */}

      {/* 포인트 잔액 모달 */}
      <dialog id="checkPoint" className="modal">
        <div className="modal-box" style={{ height:'80px'}}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            내 포인트 : {userInfo?.account?.accountBalance}
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
            <input id="account" name="account" type="text" placeholder="새비밀번호" autoComplete="text" 
            className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            />
            <input id="account" name="account" type="text" placeholder="새비밀번호 확인" autoComplete="text" 
            className="block h-10 w-full rounded-md border-0 mt-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            />
            <button className="btn rounded-md w-full mt-5" style={{ backgroundColor:'#81C784'}}
            onClick={()=>document.getElementById('changepassword').close()}>
              <h1 style={{ color:'white' }} className="text-sm">비밀번호 변경하기</h1>
            </button>
          </div>
        </div>
      </dialog>

      {/* 프로필 수정모달*/}
      <dialog id="edit" className="modal">
        <div className="modal-box pt-16" style={{ height:'1000px'}}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
            <div className="flex justify-center">
              <img src={Me} alt="" style={{ width:80 }}/>
            </div>
            <button className="btn rounded-md w-full mt-5" style={{ backgroundColor:'#bbbbbb'}}>
              <h1 style={{ color:'white' }} className="text-sm">프로필 사진 변경하기</h1>
            </button>
            <label htmlFor="nickname"
              className="block text-sm leading-6 text-gray-900 mt-4">
              닉네임
            </label>
            <div>
              <input id="nickname" name="nickname" type="text" placeholder="닉네임입력됨" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <label htmlFor="number"
              className="block text-sm leading-6 text-gray-900 mt-2">
              연락처
            </label>
            <div>
              <input id="number" name="number" type="text" placeholder="연락처입력됨" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <label htmlFor="message"
              className="block text-sm leading-6 text-gray-900 mt-2">
              상태메시지
            </label>
            <div>
              <input id="message" name="message" type="text" placeholder="상태메시지 입니다" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <label htmlFor="address"
              className="block text-sm leading-6 text-gray-900 mt-2">
              주소
            </label>
            <div>
              <div className="flex justify-between">
                <input id="address" name="address" type="text" placeholder="주소입력됨" autoComplete="text" 
                  className="block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                  />
                  <button className="btn rounded-md" style={{ backgroundColor:'#bbbbbb'}}>
                  <span style={{ color:'white' }} className="text-sm">주소검색</span>
                </button>
              </div>
                <input id="address" name="address" type="text" placeholder="상세주소입력됨" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <label htmlFor="account"
              className="block text-sm leading-6 text-gray-900 mt-2">
              계좌
            </label>
            <div>
              <input id="account" name="account" type="text" placeholder="예금주입력됨" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
                <input id="account" name="account" type="text" placeholder="계좌번호입력됨" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
                <input id="account" name="account" type="text" placeholder="은행명입력됨" autoComplete="text" 
                className="block h-10 w-full rounded-md border-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
                />
            </div>
            <button className="btn rounded-md w-full mt-5" style={{ backgroundColor:'#81C784'}}
            onClick={()=>document.getElementById('edit').close()}>
              <h1 style={{ color:'white' }} className="text-sm">프로필 수정하기</h1>
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}