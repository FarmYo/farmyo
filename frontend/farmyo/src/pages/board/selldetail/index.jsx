import Three from "../../../image/component/three.png"
import Trash from "../../../image/component/trash.png"
import Edit from "../../../image/component/edit.PNG"
import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import '../../../css/barchart.css'
import Back from '../../../image/component/leftarrow.png'
import { useParams } from "react-router-dom"
import api from '../../../api/api'
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SellDetail(){
  const params = useParams()
  const boardId = params.boardId
  const [tradeQuantity,setTradeQuantity] = useState(null)
  const [boardInfo, setBoardInfo] =useState([])
  const navigate = useNavigate()
  const goList = () => {
    navigate("/board",{state:{selected:0}})
  }


  // 게시판 상세보기
  const getDetail = () => {
    api.get(`boards/${boardId}`)
    .then((res) => {
      console.log('상세 게시판 조회 성공')
      setBoardInfo(res.data.dataBody)
    })
    .catch((err) => {
      console.log(boardId)
      console.error('상세 게시판 조회 실패', err)
    })
    }

  // 게시판에서 바로 거래생성 로직
  const goTrade = () =>{
    api.post('trades',{
      sellerId:"ssafy1",//수정
      buyerId:"ssafy2", //수정
      cropId:1,   //수정
      boardId:boardId,
      tradePrice:20000, //수정
      tradeQuantity:tradeQuantity,
      tradeStatus:0 //수정
    }
  )
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

useEffect(() => {
  getDetail()
}, [])

  return(
    <div>
       {/* 팝니다 상세게시글사진 */}
      <div style={{height:240,backgroundColor:'#bbbbbb'}}>
        {/* 뒤로가기버튼 */}
        <img src={Back} alt="" style={{ width:40,height:40 }} className="p-2" onClick={goList}/>
      </div>
      <div className="p-5 flex justify-between">
        <div>
          <h1 className='font-bold text-lg'>{ boardInfo.title }</h1>
          <h1 className=''>{boardInfo.userNickname}</h1>
        </div>
        <div>
          <button className="btn flex w-32 justify-around" style={{ backgroundColor: '#2E8B57'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>작물정보</div>
          </button>
        </div>
        {/* 아래의 메뉴바는 본인만 보이게 */}
        <Menu as="div" className="relative text-left flex justify-center items-center">
          <div>
            <Menu.Button className="inline-flex w-full items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img src={Three} alt="" className="w-1"/>
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
          <Menu.Items className="absolute top-full right-0 z-10 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item className="flex">
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <img src={Edit} alt="" style={{width:20}}/>수정하기
                    </a>
                  
                  )}
            
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item className='flex'>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )} style={{color:'red'}}
                    >
                      <img src={Trash} alt="" style={{width:20}}/>삭제하기
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
    </div>
    <div className="p-2 pl-5">
      <h1>{boardInfo.content}
      </h1>
    </div>

    <div style={{ position:'fixed',bottom:120,right:0,left:0}}>
      <div className="p-3">
        {/* max : 총수량 value : 거래가능량 */}
        <progress className="progress custom-progress w-full h-3" value="50" max="100" style={{ color:'#1B5E20'}}></progress>
        <div className="text-sm">거래가능량 : { boardInfo.quantity }kg</div>
      </div>
      <div className='flex justify-between border-t-2 border-gray-300 p-3'>
        <div>
          <h1 className="font-bold">{boardInfo.price}원/kg</h1>
          {/* <h1 className="font-bold">50kg</h1> */}
        </div>
        <div>
          <button className="btn mr-2" style={{ backgroundColor: '#1B5E20'}} 
          onClick={()=>{
          document.getElementById('gotrade').showModal()
          
          }}> 
            <div className="font-bold text-md" style={{ color:'white' }}>거래하기</div>
          </button>
          <button className="btn" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>채팅하기</div>
          </button>
        </div>
      </div>
    </div>
    {/* 거래하기모달창 */}
    <dialog id="gotrade" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="">
          <label for="price" class="block text-md leading-6 text-gray-900">거래가능량</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="입력됨" disabled/>
          </div>
          <label for="price" class="block text-md mt-5 leading-6 text-gray-900">수량</label>
          <div class="relative rounded-md mt-1">
            <input type="number" name="price" id="price" min="0" step="1"
            class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
            placeholder="수량을 입력하세요(kg)"
            onChange={(e)=>setTradeQuantity(e.target.value)}/>
          </div>
          <label for="price" class="block text-md mt-5 leading-6 text-gray-900">총 주문금액</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="'계산된금액나옴'" disabled/>
            <h1>10000원/kg</h1>
          </div>
          <div className="mt-10">
            <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}} onClick={()=>goTrade()}> 
              <div className="font-bold text-lg" style={{ color:'white' }}>구매하기</div>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
  )
}