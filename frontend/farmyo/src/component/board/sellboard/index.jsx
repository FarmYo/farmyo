import { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/api'
import { Modal } from "react-responsive-modal"
import { Menu,Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Gallery from '../../../image/component/gallery.png'
import Chatting from '../../../image/component/chatting.png'
import Swal from 'sweetalert2'

export default function SellBoardList(){
  const navigate = useNavigate()
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  // const im = jwtDecode(localStorage.getItem('access')).userJob
  const [boardInfo, setBoardInfo] = useState([])
  const [files, setFiles] = useState([])
  const [cropId, setCropId] =useState(0)
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [cropCategory, setCropCategory] =useState([])

  // multipart/form-data로 보내기(json형식 아님)
  const makeArticle = () => {
    if (cropId && files && title && content && quantity && price) {
      const formData = new FormData();
      formData.append('cropId', cropId)
      formData.append('title', title)
      formData.append('content', content)
      formData.append('quantity', quantity)
      formData.append('price', price)
      files.forEach((file, index) => {
        formData.append(`images`, file);
      });
      console.log('formData : ', formData)
      // makeForm()
      // .then(({ formData, files }) => {
        if (formData && files.length < 6) {
          api.post('boards/sell', formData)
          .then((res) => {
            console.log('팝니다 게시글 생성 완료', res.data.dataBody)
            Swal.fire({
              title : '팝니다 게시글이 생성되었습니다.',
              confirmButtonColor: '#1B5E20',
            })
            sellCloseModal()
            navigate(`/board/sell/${res.data.dataBody}/detail`)
          })
          .catch((err) => {
            console.log('게시글 생성 실패', err)
            if (err.response.data.dataHeader.resultCode === "C-002") {
              console.log('작물카테고리→ cropCategoryId에 해당하는 작물이 없을 때')
              Swal.fire({
                title : '존재하지 않는 작물 카테고리<br> 생성되었습니다.',
                confirmButtonColor: '#1B5E20',
              })
            } else if (err.response.data.dataHeader.resultCode === "U-001") {
              console.log('토큰에 적힌 id값의 유저가 없을 때')
              navigate('/login')
              Swal.fire({
                title : '다시 로그인<br>해주세요.',
                confirmButtonColor: '#1B5E20',
              })
            } else if (err.response.data.dataHeader.resultCode === "B-005") {
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
            } else if (err.response.data.dataHeader.resultCode === "B-012") {
              console.log('이미 해당 작물로 게시글이 있을 때')
              Swal.fire({
                title : '이미 해당 작물의 글이<br> 존재합니다.',
                html : '작물당 하나의 글 작성만 가능합니다.',
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
        } else {
          if (files.length > 5) {
            Swal.fire({
              title : '5개만 선택할 수 있습니다.',
              confirmButtonColor: '#1B5E20',
            })
          }
          console.log('formData 형성 실패','cropId : ', cropId, 'files : ', files, 'title : ', title, 'content : ', content, 'quantity : ', quantity, 'price : ', price)
        }
      // })
    } else {
      if (!quantity) {
          Swal.fire({
            title : '수량은 1 이상<br>입력해주세요.',
            confirmButtonColor: '#1B5E20',
          })
      } else if (!price) {
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
  }

  const checkPhoto = ((file) => {
    console.log(file)
    if (file.length > 5) {
      Swal.fire({
        title : '5개만 선택할 수 있습니다.',
        confirmButtonColor: '#1B5E20',
      })
    } else {
    setFiles([...file])
    }
  })

  const BoardInfo = (() => {
    api.get("boards?type=0&page=0&size=100")
    .then((res) => {
      setBoardInfo(res.data.dataBody)
      console.log('게시글 불러오기 성공', res)
    })
    .catch((err) => {
      console.log('게시글 불러오기 실패', err)
    })
  })

  const [sellOpen,setSellOpen] = useState(false)

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

  //삽니다게시글모달
  const sellOpenModal = (() => {
    setSellOpen(true);
  });

  const sellCloseModal = (() => {
    setSellOpen(false);
  });

  useEffect(() => {
    BoardInfo();
    setCropId(29);
  }, [])


  return(
    <div style={{height:'420px',position:'relative'}}>
      {/* 팝니다 게시글 목록 */}
      {boardInfo.map((article) => (
      <div className="p-4 flex" key={article.boardId} onClick={() => navigate(`sell/${article.boardId}/detail`)}>
        <img src={article.imgUrl} alt="작물이미지" className="w-32" />
        {/* <div style={{backgroundColor:'#bbbbbb'}} className="w-32"></div> */}
        <div className="w-full ml-2">
          <h1 className="text-lg font-bold">{article.title}</h1>
          <h1 className="text-sm">{article.userNickname}</h1>
          <h1 style={{ color:'#1B5E20' }} className="font-bold">{article.quantity}kg</h1>
          <div className='flex justify-between'>
            <h1 style={{ color:'#1B5E20' }} className="font-bold">{article.price}원/kg</h1>
            <img src={Chatting} alt="" style={{width:30}}/> 
          </div>     
        </div>
      </div>
      ))}

      <div style={{ position: 'absolute', bottom: 0, right: 10}}>
        <div style={{backgroundColor:'#1B5E20',borderRadius: '50%', width: '50px', height: '50px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '40px' }}
          onClick={() => sellOpenModal()}>+
          </div>
        </div>
      </div>
      
      {/* 팝니다게시글생성모달 */}
      <Modal open={sellOpen} onClose={sellCloseModal} styles={styles}>
        <div className="mt-10">
          <div className='h-32' style={{ backgroundColor:'#bbbbbb'}}>사진있음</div>
          <div className='flex justify-between mt-4'>
            <div>
            <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                작물명을 선택하세요
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-16 py-1 text-sm'
                      )}
                    >
                    감자
                    </a>
                  )}
                </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          </div>
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
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              type="number" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="수량을 입력하세요(kg)"/>
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">가격</label>
          <div className="relative rounded-md mt-1">
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="number" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="가격을 입력하세요(/kg)"/>
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">제목</label>
          <div className="relative rounded-md mt-1">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text" name="price" id="price" className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="제목을 입력하세요"/>
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">내용</label>
          <div className="relative rounded-md mt-1">
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="textarea textarea-bordered w-full h-24" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div className="mt-10">
            <button 
              onClick={() => {
                makeArticle()
              }}
              className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}> 
              <div className="font-bold text-lg" style={{ color:'white' }}>생성</div>
            </button>
          </div>
        </div>
      </Modal>




    </div>
  )
}