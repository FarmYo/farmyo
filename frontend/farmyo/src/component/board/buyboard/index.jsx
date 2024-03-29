import Chatting from '../../../image/component/chatting.png'
import { Modal } from "react-responsive-modal"
import { useEffect, useState } from 'react'
import api from '../../../api/api'
import { jwtDecode } from 'jwt-decode'

export default function BuyBoardList(){
  // const im = jwtDecode(localStorage.getItem('access')).userJob
  const [boardInfo, setBoardInfo] = useState([])
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [cropCategory, setCropCategory] =useState([])

  const BoardInfo = () => {
    api.get("boards?type=1&page=0&size=100")
    .then((res) => {
      setBoardInfo(res.data.dataBody)
      console.log('게시글 불러오기 성공', res)
    })
    .catch((err) => {
      console.log('게시글 불러오기 실패', err)
    })
  }

  const [buyOpen,setBuyOpen] = useState(false)

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
  const buyOpenModal = () => {
    setBuyOpen(true);
  };

  const buyCloseModal = () => {
    setBuyOpen(false);
  };

  useEffect(() => {
    BoardInfo()
  }, [])

  return(
    

    <div style={{height:'420px',position:'relative'}}>
      {/* 삽니다 게시글 목록 */}
      {boardInfo.map((article) => (
        <div className="p-4 flex">
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
          onClick={buyOpenModal}>+
          </div>
        </div>
      </div>

      {/* 삽니다게시글생성모달 */}
      <Modal open={buyOpen} onClose={buyCloseModal} styles={styles}>
        <div className="mt-24">
          <label for="price" class="block text-md leading-6 text-gray-900">수량</label>
          <div class="relative rounded-md mt-1">
            <input type="number" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="수량을 입력하세요(kg)"/>
          </div>
          <label for="price" class="block text-md mt-2 leading-6 text-gray-900">가격</label>
          <div class="relative rounded-md mt-1">
            <input type="number" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="가격을 입력하세요(/kg)"/>
          </div>
          <label for="price" class="block text-md mt-2 leading-6 text-gray-900">제목</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="제목을 입력하세요"/>
          </div>
          <label for="price" class="block text-md mt-2 leading-6 text-gray-900">내용</label>
          <div class="relative rounded-md mt-1">
            <textarea className="textarea textarea-bordered w-full h-24" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div className="mt-10">
            <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}> 
              <div className="font-bold text-lg" style={{ color:'white' }}>생성</div>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}