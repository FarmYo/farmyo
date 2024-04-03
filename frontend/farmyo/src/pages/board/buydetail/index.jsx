import { useState, useEffect, Fragment } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Menu, Transition } from '@headlessui/react'
import { Modal } from "react-responsive-modal"
import Three from "../../../image/component/three.png"
// import Trash from "../../../image/component/trash.png"
import Edit from "../../../image/component/edit.PNG"
import Back from '../../../image/component/leftarrow.png'
import api from '../../../api/api'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Swal from 'sweetalert2'
import { jwtDecode } from 'jwt-decode'
import WBackArrow from "../../../image/component/trade/wbackarrow.png"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BuyDetail(){
  const params = useParams()
  const boardId = params.boardId
  const [boardInfo, setBoardInfo] =useState([])

  const navigate = useNavigate()
  const goList = (() => {
    navigate(-1,{state:{selected:1}})
  })

  const styles = {
    modal: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      margin: '0',
    },
  };

  const im = jwtDecode(localStorage.getItem('access')).userJob;
  const myId = jwtDecode(localStorage.getItem('access')).userId;
  const goChat = (() =>{
    if (im === 0) {
      console.log(myId, boardInfo.userLoginId, boardId)
      api.post('chats/room', {
        sellerId : myId,
        buyerId : Number(boardInfo?.userId),
        boardId : Number(boardId),
      })
      .then((res)=>{
        console.log(res.data.dataBody)
        navigate(`/chat/${res.data.dataBody.id}`)
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      Swal.fire({
        title : '구매자는 구매자와 채팅할 수 없습니다.',
        confirmButtonColor: '#1B5E20',
      })
    }
  })

  const [buyOpen,setBuyOpen] = useState(false)
  const buyOpenModal = () => {
    setBuyOpen(true);
  };
  const buyCloseModal = () => {
    setBuyOpen(false);
  };

  const modifyArticle = (() => {
    if (boardInfo.title && boardInfo.content && boardInfo.quantity && boardInfo.price) {
      const formData = new FormData();
      formData.append('title', boardInfo.title)
      formData.append('content', boardInfo.content)
      formData.append('quantity', boardInfo.quantity)
      formData.append('price', boardInfo.price)
      if (formData) {
        api.patch(`boards/${boardInfo.id}`, formData)
        .then((res) => {
          console.log('수정 완료')
          buyCloseModal()
          getDetail()
        })
        .catch((err) => {
          console.log('수정 실패', err)
          
          if (err.response.data.dataHeader.resultCode === "B-005") {
            console.log('수량이 0초과가 아닐 때')
            Swal.fire({
              title : '수량은 1 이상<br>입력해주세요.',
              confirmButtonColor: '#1B5E20',
            })
          } else if (err.response.data.dataHeader.resultCode === "B-006") {
            console.log('가격이 0초과가 아닐 때')
            Swal.fire({
              title : '가격은 1원 이상<br>입력해주세요.',
              confirmButtonColor: '#1B5E20',
            })
          } else if (err.response.data.dataHeader.resultCode === "B-011") {
            console.log('접속한 사람과 작성자가 다를때')
            Swal.fire({
              title : '본인 글만<br>수정할 수 있습니다.',
              confirmButtonColor: '#1B5E20',
            })
          } else {
            console.log('내용이나 제목 없을때')
            Swal.fire({
              title : '제목과 내용을<br>확인해주세요.',
              confirmButtonColor: '#1B5E20',
            })
          }
          // Swal.fire({
          //   title : '게시글 수정 실패',
          //   confirmButtonColor: '#1B5E20',
          // })
          
        })
      }
  } else {
    if (!boardInfo.quantity) {
        Swal.fire({
          title : '수량은 1 이상<br>입력해주세요.',
          confirmButtonColor: '#1B5E20',
        })
    } else if (!boardInfo.price) {
      Swal.fire({
        title : '가격은 1원 이상<br>입력해주세요.',
        confirmButtonColor: '#1B5E20',
      })
    } else {
    Swal.fire({
      title : '정보를 입력해주세요.',
      confirmButtonColor: '#1B5E20',
    })}
  }
  })

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

useEffect(() => {
  getDetail()
}, [])


  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2 flex justify-between" onClick={() => goList()}>
          <img src={WBackArrow} alt="" style={{ width:30,height:30}}/>
        </div>
      </div>


      <div className="p-3 flex justify-between border-b-2 border-gray-300">
        <div className='flex'>
          <div className='flex items-center'>
    
          </div>
          <div className='ml-4'>
            <h1 className='font-bold text-xl'>{boardInfo.title}</h1>
            <h1 className='text-md'>{boardInfo.userNickname}</h1>
          </div>
        </div>      
        {/* 아래의 메뉴바(수정,삭제)는 본인만 보이게 */}
        {boardInfo.userId === myId && (<Menu as="div" className="relative text-left flex justify-center items-center">
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
                      onClick={() => buyOpenModal()}
                    >
                      <img src={Edit} alt="" style={{width:20}}/>수정하기
                    </a>
                  )}
            
                </Menu.Item>
              </div>
              {/* <div className="py-1">
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
              </div> */}
            </Menu.Items>
          </Transition>
        </Menu>)}
    </div>
    <div className="p-2 pl-5">
      <h1>
        {boardInfo.content}
      </h1>
    </div>

    <div style={{ position:'fixed',bottom:80,right:0,left:0}}>
      <div className='flex justify-between border-t-2 border-gray-300 p-3'>
        <div>
          <h1 className="font-bold">{boardInfo.price}원/kg</h1>
          <h1 className="font-bold">{boardInfo.quantity}kg</h1>
        </div>
        { im === 0 && (
        <div>
          <button onClick={() => goChat()} className="btn" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>채팅하기</div>
          </button>
        </div>
        )}
      </div>
    </div>

    {/* 게시글 수정 모달 */}
    <Modal open={buyOpen} onClose={buyCloseModal} styles={styles}>
        <div className="mt-24">
          <label htmlFor="price" className="block text-md leading-6 text-gray-900">수량</label>
          <div className="relative rounded-md mt-1">
            <input 
              value={boardInfo.quantity}
              onChange={(event) => {
                const newBoardInfo = {
                  ...boardInfo,
                  quantity : event.target.value,
                };
                setBoardInfo(newBoardInfo);}}
              type="number" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="수량을 입력하세요(kg)"/>
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">가격</label>
          <div className="relative rounded-md mt-1">
            <input 
              value={boardInfo.price}
              onChange={(event) => {
                const newBoardInfo = {
                  ...boardInfo,
                  price : event.target.value,
                };
                setBoardInfo(newBoardInfo);}}
              type="number" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="가격을 입력하세요(/kg)"/>
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">제목</label>
          <div className="relative rounded-md mt-1">
            <input 
              value={boardInfo.title}
              onChange={(event) => {
                const newBoardInfo = {
                  ...boardInfo,
                  title : event.target.value,
                };
                setBoardInfo(newBoardInfo);}}
              type="text" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="제목을 입력하세요"/>
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">내용</label>
          <div className="relative rounded-md mt-1">
            <textarea 
              value={boardInfo.content}
              onChange={(event) => {
                const newBoardInfo = {
                  ...boardInfo,
                  content : event.target.value,
                };
                setBoardInfo(newBoardInfo);}}
              className="textarea textarea-bordered w-full h-24" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div className="mt-10">
            <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}> 
              <div 
                onClick={() => {
                  modifyArticle()
                }}
                className="font-bold text-lg" style={{ color:'white' }}>수정</div>
            </button>
          </div>
        </div>
      </Modal>
  </div>  
  )
}