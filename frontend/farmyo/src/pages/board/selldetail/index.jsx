import { useState, Fragment, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { Menu, Transition } from '@headlessui/react'
import { Modal } from "react-responsive-modal"
import Three from "../../../image/component/three.png"
// import Trash from "../../../image/component/trash.png"
import Edit from "../../../image/component/edit.PNG"
import Back from '../../../image/component/leftarrow.png'
import api from '../../../api/api'
import Swal from 'sweetalert2'
import Slider from "react-slick";
import Gallery from '../../../image/component/gallery.png'
import '../../../css/barchart.css'
import { jwtDecode } from 'jwt-decode'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SellDetail(){
  const params = useParams()
  const boardId = Number(params.boardId)
  const [tradeQuantity,setTradeQuantity] = useState(0)
  const [boardInfo, setBoardInfo] =useState([])
  const navigate = useNavigate()
  const goList = (() => {
    navigate("/board",{state:{selected:0}})
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

  const settings = {
    dots: true, // 하단에 점으로 페이지 표시 여부
    infinite: true, // 무한으로 반복
    speed: 500, // 넘어가는 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 스크롤할 때 넘어가는 슬라이드 수
    adaptiveHeight: true
  };

  const [url, setUrl] = useState([])
  const [fileUrl, setFileUrl] = useState([])
  const [quantity, setQuantity] = useState(boardInfo.quantity)
  const [price, setPrice] = useState(boardInfo.price)
  const [title, setTitle] = useState(boardInfo.title)
  const [content, setContent] = useState(boardInfo.content)
  // const [files, setFiles] = useState(boardInfo.files)s

  const [sellOpen, setSellOpen] = useState(false)
  const sellOpenModal = (() => {
    setSellOpen(true);
  });

  const sellCloseModal = (() => {
    setSellOpen(false);
  });

  const checkPhoto = ((files) => {
    console.log(files)
    if (files.length > 5) {
      Swal.fire({
        title : '5개만 선택할 수 있습니다.',
        confirmButtonColor: '#1B5E20',
      })
    } else {
        const promises = [];
        for (const file of files) {
          const reader = new FileReader();
          promises.push(
            new Promise((resolve) => {
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(file);
            })
          );
        }
        Promise.all(promises).then((urls) => {
          setFileUrl([...fileUrl, ...urls]);
        });
      const newBoardInfo = {
        ...boardInfo,
        files,
      };
      console.log(newBoardInfo)
      console.log(newBoardInfo.files)
      setBoardInfo(newBoardInfo);
    }
  })

  const modifyArticle = () => {
    if (boardInfo.title && boardInfo.content && boardInfo.quantity && boardInfo.price) {
      const formData = new FormData();
      console.log('formData : ', formData)
      formData.append('title', boardInfo.title)
      formData.append('content', boardInfo.content)
      formData.append('quantity', boardInfo.quantity)
      formData.append('price', boardInfo.price)
      if (boardInfo.files) {
        if (boardInfo.files?.length < 6) {
          for (const file of boardInfo.files) {
            formData.append('images', file);
          }
          console.log('formData : ', formData)
        } else {
          Swal.fire({
            title : '사진은 5장 이내로<br>업로드 할 수 있습니다.',
            confirmButtonColor: '#1B5E20',
          })
        }
      }
      if (formData) {
        api.patch(`boards/${boardInfo.id}`, formData)
        .then((res) => {
          console.log('수정 완료')
          sellCloseModal()
          getDetail()
        })
        .catch((err) => {
          console.log('수정 실패', err)
          if (err.response?.data?.dataHeader?.resultCode === "B-005") {
            console.log('수량이 0초과가 아닐 때')
            Swal.fire({
              title : '수량은 1 이상<br>입력해주세요.',
              confirmButtonColor: '#1B5E20',
            })
          } else if (err.response?.data?.dataHeader?.resultCode === "B-006") {
            console.log('가격이 0초과가 아닐 때')
            Swal.fire({
              title : '가격은 1원 이상<br>입력해주세요.',
              confirmButtonColor: '#1B5E20',
            })
          } else if (err.response?.data?.dataHeader?.resultCode === "B-011") {
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
      console.log(boardInfo.title, boardInfo.content, boardInfo.quantity, boardInfo.price, boardInfo.files)
    Swal.fire({
      title : '정보를 입력해주세요.',
      confirmButtonColor: '#1B5E20',
    })}
  }
  }

  // 게시판 상세보기
  const getDetail = () => {
    api.get(`boards/${boardId}`)
    .then((res) => {
      console.log('상세 게시판 조회 성공', res.data.dataBody)
      setBoardInfo(res.data.dataBody)
    })
    // .then((res) => {
    //   console.log(boardInfo.boardImgUrls)
    //   setUrl(boardInfo.boardImgUrls)
    // })
    .catch((err) => {
      console.log(boardId)
      console.error('상세 게시판 조회 실패', err)
    })
    }

  const im = jwtDecode(localStorage.getItem('access')).userJob
  const loginId = jwtDecode(localStorage.getItem('access')).loginId
  // 게시판에서 바로 거래생성 로직
  const goTrade = () =>{
    if (im === 1) {
      if (tradeQuantity <= boardInfo.quantity) {
        console.log(boardInfo.userLoginId,'/',loginId,'/',boardInfo.cropId,'/',)
        api.post('trades', {
          sellerId : boardInfo.userLoginId,
          buyerId : loginId, 
          cropId : boardInfo.cropId, 
          boardId : boardId,
          tradePrice : boardInfo.price, 
          tradeQuantity : Number(tradeQuantity),
          tradeStatus : 0,
        })
        .then((res)=>{
          console.log(res)
          document.getElementById('gotrade').close()
          navigate('/trade')
        })
        .catch((err)=>{
          console.log(err)
        })
      } else {
        document.getElementById('gotrade').close()
        Swal.fire({
          title : '거래가능량 이내로<br>주문할 수 있습니다.',
          confirmButtonColor: '#1B5E20',
        })
        setTradeQuantity(0)
      }
    } else {
      Swal.fire({
        title : '농부는 구매할 수 없습니다.',
        confirmButtonColor: '#1B5E20',
      })
    }
  }
// 게시판에서 바로 채팅생성 로직
const myId = jwtDecode(localStorage.getItem('access')).userId
const goChat = (() =>{
  if (im === 1) {
    api.post('chats/room', {
      sellerId : boardInfo.userId,
      buyerId : myId,
      boardId : boardId,
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
      title : '농부는 농부와 채팅할 수 없습니다.',
      confirmButtonColor: '#1B5E20',
    })
  }
})

useEffect(() => {
  getDetail()
}, [])

  return(
    <div>
       {/* 팝니다 상세게시글사진 */}
      {/* <div style={{height:240,backgroundColor:'#bbbbbb'}}> */}
      <div>
        {/* 뒤로가기버튼 */}
        <img src={Back} alt="" style={{ width:40,height:40 }} className="p-2" onClick={() => goList()}/>
        {boardInfo.boardImgUrls && (
      <Slider {...settings}  
      className="sliderOne">
          {boardInfo.boardImgUrls.map((img, index) => (
            <div key={index}  style={{height:240}}>
              <img src={img} alt={`slide-${index}`}/>
            </div>
          ))}
        </Slider>
        )}
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
                      onClick={() => sellOpenModal()}
                    >
                      <img src={Edit} alt="수정하기 버튼" style={{width:20}}/>수정하기
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
        { im === 1 && (<div>
          <button className="btn mr-2" style={{ backgroundColor: '#1B5E20'}} 
          onClick={()=>{
          document.getElementById('gotrade').showModal()
          }}> 
            <div className="font-bold text-md" style={{ color:'white' }}>거래하기</div>
          </button>
          <button onClick={() => goChat()} className="btn" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>채팅하기</div>
          </button>
        </div>)}
      </div>
    </div>

    {/* 거래하기모달창 */}
    <dialog id="gotrade" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="">
          <label htmlFor="price" className="block text-md leading-6 text-gray-900">거래가능량</label>
          <div className="relative rounded-md mt-1">
            <input 
              value={boardInfo.quantity}
              type="text" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="입력됨" disabled/>
          </div>
          <label htmlFor="price" className="block text-md mt-5 leading-6 text-gray-900">수량</label>
          <div className="relative rounded-md mt-1">
            <input 
              value={tradeQuantity}
              type="number" name="price" id="price" min="0" step="1" max={boardInfo.quantity}
            className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
            placeholder="수량을 입력하세요(kg)"
            onChange={(e)=>setTradeQuantity(e.target.value)}/>
          </div>
          <label htmlFor="price" className="block text-md mt-5 leading-6 text-gray-900">총 주문금액</label>
          <div className="relative rounded-md mt-1">
            <input 
              value={boardInfo.price * tradeQuantity}
              type="text" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="계산된금액" disabled/>
            <h1>{boardInfo.price}원/kg</h1>
          </div>
          <div className="mt-10">
            <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}} onClick={()=>goTrade()}> 
              <div className="font-bold text-lg" style={{ color:'white' }}>구매하기</div>
            </button>
          </div>
        </div>
      </div>
    </dialog>

    {/* 게시글 수정 모달 */}
      <Modal open={sellOpen} onClose={sellCloseModal} styles={styles}>
      <div className="mt-10">
      <Slider {...settings}  
      // style={{ minHeight: '350px' }}
      className="sliderOne">
          {fileUrl?.map((fileUrl, index) => (
            <div key={index}  style={{height:240}}>
              <img src={fileUrl} alt={`slide-${index}`}/>
            </div>
          ))}
        </Slider>
        <div className='flex justify-between mt-4'>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <h1 className='font-bold'>+</h1>
            <label htmlFor="img"><img src={Gallery} alt="사진 추가하기" style={{ width:30 }} className='mr-3'/></label>
              <input
                type="file"
                id="img"
                autoComplete="img"
                accept="image/*"
                multiple
                onChange={(event) => checkPhoto(event.target.files)} 
                // capture="camera"
                // react-native-image-picker 라이브러리 사용해도 됨
                hidden
              />
            {/* <img src={Gallery} alt="" style={{ width:30 }} className='mr-3'/> */}
          </div>
        </div>
        </div>

        <label htmlFor="price" className="block text-md leading-6 mt-4 text-gray-900">수량</label>
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
          <button 
            onClick={() => {
              modifyArticle()
            }}
            className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-lg" style={{ color:'white' }}>수정</div>
          </button>
        </div>
      </div>
    </Modal>
  </div>
  )
}