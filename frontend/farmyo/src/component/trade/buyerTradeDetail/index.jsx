import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import api from '../../../api/api'
import DaumPostcode from 'react-daum-postcode';
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Backarrow from '../../../image/component/trade/backarrow.png'

export default function BuyerTrade() {
  const navigate = useNavigate()
  const params = useParams()
  const tradeId = params.tradeId
  const userId = jwtDecode( localStorage.getItem("access") ).userId 
  const [info,setInfo] = useState([])
  const [address, setAddress] = useState(info.tradeLocation);
  const [detailAddress, setDetailAddress] = useState(info.tradeLocationDetail);
  const [showAddressModal, setShowAddressModal] = useState(false) // 우편번호입력모달
  const [showNewAddressModal, setShowNewAddressModal] = useState(false); // 새 주소 등록 모달


  const handleAddressSelect = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += `, ${data.buildingName}`;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setShowAddressModal(false);
    setShowNewAddressModal(true);
  };



  // 상세거래내역 조회
  useEffect(()=>{
    api.get(`trades/detail/${tradeId}`)
    .then((res)=>{
      console.log(res.data.dataBody)
      console.log('상세거래조회성공')
      setInfo(res.data.dataBody)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const tradeStatusToText = {
    0: '입금 대기중',
    1: '입금 완료',
    2: '배송중',
    3: '거래완료'
  };

  // 거래취소버튼
  const deleteTrade = () =>{
    api.delete(`trades/${tradeId}`)
    .then((res)=>{
      // console.log(res)
      Swal.fire({
        html: '<h1 style="font-weight: bold;">거래가 취소되었습니다</h1>',
        icon: 'success',
        showConfirmButton: false,
      })
      console.log('거래취소됨')
      navigate('/trade')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleAddressSubmit = () => {
    // 주소 또는 상세 주소가 비어 있는 경우 알림 표시
    if (!address || !detailAddress) {
      Swal.fire({
        html: '<h1 style="font-weight: bold;">주소를 입력해주세요</h1>',
        icon: 'warning',
        showConfirmButton: false,
      });
    } else {
      // 신규주소등록 로직
      api.patch(`trades/location/${tradeId}`,{
        location:address,
        locationDetail:detailAddress
      })
      .then((res)=>{
        console.log(res)
        console.log('신규주소등록완료')

        // 여기서 info 상태 업데이트
        setInfo(prevInfo => ({
          ...prevInfo,
          tradeLocation: address,
          tradeLocationDetail: detailAddress
        }));

        setShowNewAddressModal(false); // 모든 입력이 유효한 경우, 모달 닫기
        
      })
      .catch((err)=>{
        console.log(err)
      })  
    }
  };


  // 기존주소사용하기로직//확인다시하기
  const noChange = () =>{
    api.patch(`trades/originalLocation/${tradeId}`,{},{
      params:{
        userId:userId
      }  
    })
    .then((res)=>{
      console.log(res)
      console.log('기존주소사용완료')
      const newAddress = res.data.dataBody.location;
      const newDetailAddress = res.data.dataBody.locationDetail;
    
      setAddress(newAddress);
      setDetailAddress(newDetailAddress);
    
      // info 상태 업데이트에 직접 응답 값을 사용
      setInfo(prevInfo => ({
        ...prevInfo,
        tradeLocation: newAddress,
        tradeLocationDetail: newDetailAddress
      }));

      document.getElementById('addressselect').close()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // 결제하기-카카오페이 로직       (입금대기중0->입금완료1로바꾼다)
  const handleKakaoPay = () =>{
    if (!info.tradeLocation || !info.tradeLocationDetail) {
      Swal.fire({
        html: '<h1 style="font-weight: bold;">주소를 입력해주세요</h1>',
        icon: 'warning',
        showConfirmButton: false,
      })
    }else{
      console.log("handleKakaoPay 시작")

      localStorage.setItem('tradeId', tradeId.toString());
      localStorage.setItem('seller', info.seller);

      const IMP = window.IMP; 
      // console.log(IMP)
      IMP.init("imp22683217"); // 아임포트 가맹점 식별코드를 "imp22683217"로 설정

      // 결제 요청 파라미터
      IMP.request_pay({
        pg: "kakaopay", // 카카오페이 사용
        pay_method: "card", // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        name: "팜요", // 서비스명
        amount: info.tradePrice*info.tradeQuantity , // 결제 금액
        buyer_name: info.seller, // 판매자 이름
        m_redirect_url: 'https://j10d209.p.ssafy.io/trade/redirect',
      }, function(rsp) {
        console.log("결제응답:",rsp)
        if (rsp.success) {
          api.patch(`trades/deposit/${tradeId}`,{},{
            params:{
              depositName:info.seller
            }
          })
          .then((res)=>{
            console.log(res)
            console.log("입금완료")
            Swal.fire({
              html: '<h1 style="font-weight: bold;">결제가 정상적으로 완료되었습니다</h1>',
              icon: 'success',
              showConfirmButton: false,
            })
            
            navigate('/trade/redirect', { state: {  rsp } })
            // navigate(`/trade/buyer/${tradeId}`)
          })
          .catch((err)=>{
            console.log(err)
            navigate('/trade')
          })

          // 결제 성공 시 로직,
        } else {
          alert('결제실패');
          // 결제 실패 시 로직,
        }
      });
    }}


    // 구매확정하기
    const goConfirm = () =>{
      api.patch(`trades/final/${tradeId}`)
      .then((res)=>{
        // console.log(res)
        console.log('구매확정완료',res)
        Swal.fire({
          html: '<h1 style="font-weight: bold;">구매확정되었습니다</h1>',
          icon: 'success',
          showConfirmButton: false,
        });
        // info 상태 업데이트로 거래 상태 직접 변경
        setInfo(prevInfo => ({
          ...prevInfo,
          tradeStatus: 3 // 거래완료 상태로 변경
        }));
        })
        .catch((err)=>{
        console.log(err)
      })
    }

    const goTradeList = ()=>{
      navigate('/trade')
    }

  return(
    <div>
      <div>
        <div className="p-3 flex justify-between border-b-2 border-gray-100 h-20"
         >
          <div className='flex'>
            <div className='flex items-center mr-5'
            onClick={goTradeList}><img src={Backarrow} alt="" style={{ width:30,height:30}}/></div>
            <div className="font-bold text-xl flex items-center">{info.board}</div>
          </div>
          <div className="font-bold text-lg flex items-center" style={{color:'gray'}}>{tradeStatusToText[info.tradeStatus]}</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">작물</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>{info.crop}</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">거래수량</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>{info.tradeQuantity}kg</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">거래가격</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>{info.tradePrice*info.tradeQuantity}원(1kg = {info.tradePrice}원)</div>
        </div>
        <div className="p-3 border-b-2 border-gray-100 flex">
          <div>
            <div className="font-bold text-lg flex items-center">구매자</div>
            <div className="text-lg flex items-center" style={{color:'gray'}}>{info.buyer}</div>
          </div>
          <div className="pl-28">
            <div className="font-bold text-lg flex items-center">판매자</div>
            <div className="text-lg flex items-center" style={{color:'gray'}}>{info.seller}</div>
          </div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">배송지</div>
          { info.tradeLocation && info.tradeLocationDetail ?(
            <div className='flex'>
              <div className="text-md items-center mr-2" style={{color:'gray'}}>{info.tradeLocation}</div>
              <div className="text-md items-center" style={{color:'gray'}}>{info.tradeLocationDetail}</div>
            </div>
          ) : (
          <button onClick={()=>document.getElementById('addressselect').showModal()} className="btn">
            주소선택
          </button>
        )}
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">송장번호</div>
          {/* 조건부 렌더링 */}
          {/* 배송중,거래완료이면 송장번호 보임 */}
          {(info.tradeStatus === 2 || info.tradeStatus === 3) && (
            <h1 className="mt-2">{`${info.tradeShipment} ${info.tradeShipcom}`}</h1>
          )}
          {(info.tradeStatus === 0 || info.tradeStatus === 1) && (
            <div className="text-lg flex items-center" style={{color:'gray'}}>배송대기중</div>
          )}
        </div>
        {/* 조건부렌더링하기 입금대기중이면나오는거*/} 
        { info.tradeStatus === 0 && (
          <div className="pt-1 flex justify-between space-x-2">
            <div className='flex-grow' onClick={deleteTrade}><button className="btn w-full"
            style={{background:'red',color:'white'}}>거래취소</button></div>
            <div className='flex-grow' 
              onClick={handleKakaoPay}>
              <button className="btn w-full" style={{backgroundColor:'#1B5E20',color:'white'}}>
              결제</button>
            </div>
          </div>
        )}
        {/* 배송중이면 구매확정 나옴 */}
        {info && (info.tradeStatus === 2) && (
            <button
              className="btn w-full"
              onClick={goConfirm}
              style={{ backgroundColor: '#1B5E20', color: 'white' }}
            >
              구매확정
            </button>
          )}
      </div>

      
      {/* 주소선택 모달 */}
      <dialog id="addressselect" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button>
          </form>
          <div>
          <button
            onClick={noChange}
              className="flex justify-center w-full rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
            >
            기존 주소 사용
          </button>

          <button
            onClick={()=>{
              setShowNewAddressModal(true)
              document.getElementById('addressselect').close()
            }}
              className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
            >
            새로운 주소 등록
          </button>
          </div>
        </div>
      </dialog>
      
      {/* 새로운주소등록모달 */}
        <Modal open={showNewAddressModal} 
        onClose={() => setShowNewAddressModal(false)} center
        styles={{
          modal: {
            borderRadius: '10px',
            width: '90%',
          }
        }}>
          <div className='pt-10'>
            <input
            id="address"
            name="address"
            type="text"
            autoComplete="address"
            value={address}
            required
            readOnly
            className="block rounded-md border-0 py-1 w-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="주소"
          />
          </div>

        <div className='flex justify-end pt-2'>
          <button className="btn btn-sm" 
          style={{color:'black'}}
          onClick={() =>{
            document.getElementById('addressselect').close()
            setShowAddressModal(true)

          }} >주소검색</button>
        </div>

          <div className='pt-3'>
            <input
            id="detailaddress"
            name="detailaddress"          
            type="text"
            autoComplete="text"
            required
            value={detailAddress}
            className="block rounded-md border-0 w-full py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="상세주소"
            onChange={(e)=>setDetailAddress(e.target.value)}

          />
          <button
            onClick={handleAddressSubmit}
            className="flex justify-center w-full h-10 rounded-md py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
          >
            주소등록
          </button>
          </div>
      </Modal>
        
        {/* 우편번호입력 모달 */}
        <Modal open={showAddressModal} onClose={() => {
        setShowAddressModal(false)
        }} >   
          <DaumPostcode onComplete={handleAddressSelect} 
          autoClose width="100%" height="auto" />
        </Modal>

    </div>
  )
}