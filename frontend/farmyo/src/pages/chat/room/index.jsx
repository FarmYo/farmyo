import Back from '../../../image/component/leftarrow.png'
import Photo from '../../../image/component/me.png'
import Form from '../form/index'
import Vector from '../../../image/component/Vector.png'
import { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Room(){
  const navigate  = useNavigate()
  const [showForm,setShowForm] = useState(false)
  const [buttonText,setButtonText] = useState('거래하기')
  const [buttonBgcolor,setButtonBgcolor] = useState('#1B5E20')
  const textRef = useRef(null)
  const [width, setWidth] = useState(120); 
  const textRef2 = useRef(null)
  const [width2, setWidth2] = useState(120); 
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      // 키보드가 올라왔는지 여부를 판단하기 위한 로직
      //화면 높이가 특정 값 이하로 줄어들면 키보드가 올라온 것으로 판단
      if (screenHeight < 500) { 
        setKeyboardVisible(true);
      } else {
        setKeyboardVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 텍스트 요소의 너비를 계산하고 상태를 업데이트
    const textWidth = textRef.current ? textRef.current.offsetWidth : 0;
    const padding = 40 // 좌우 패딩을 추가하기 위한 값
    setWidth(textWidth + padding)
    const textWidth2 = textRef2.current ? textRef2.current.offsetWidth : 0;
    const padding2 = 40 // 좌우 패딩을 추가하기 위한 값
    setWidth2(textWidth2 + padding2);
  }, [])

  const openForm = () =>{
    setShowForm(true)
    setButtonText('거래하기')
    setButtonBgcolor('#1B5E20')
  }

  const goBack = () => {
    navigate('/chat');
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setButtonText('전송완료')
    setButtonBgcolor('#8FBC8F')
  }

  const closeForm = () =>{
    setShowForm(false)
  }

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}} className="p-2 flex items-center">
        <h1 className="text-xl font-bold" style={{color:"white"}}>채팅</h1>
      </div>
      <div style={{height:80}} className="p-2 border-b-2 border-gray-100 flex justify-between">
        <div className='flex'>
          <div className='flex items-center' onClick={goBack}><img src={Back} alt="" style={{ width:25,height:25 }}/></div>
          <div className='text-lg flex items-center font-bold ml-5'>차은우보다현준</div>
        </div>
        {/* 아래거래하기버튼은 판매자만보이게 */}
        <div className='flex items-center'>
          <button className="btn" style={{ backgroundColor: buttonBgcolor}}> 
            <div className="font-bold text-md" style={{ color:'white' }}
            onClick={buttonText === '전송완료' ? null : openForm}
           >{buttonText}</div>
          </button>
        </div>
      </div>
      {/* 거래하기눌렀을때 입력폼- 판매게시판에서 만든 채팅은 작물명X,구매게시판에서 만든채팅은 작물명O*/}
      {showForm && <Form onFormSubmit={handleFormSubmit} onCloseForm={closeForm} />}
      {/* 대화말풍선 - 상대방 */}
      <div className='flex p-3'>
        <img src={Photo} alt="" style={{ width:40,height:40 }}/>
        <div style={{width:`${width2}px`,backgroundColor:'#D3D3D3'}} className='rounded-3xl ml-3 flex justify-center items-center'>
          <div ref={textRef2}>판매자님</div>
        </div>
      </div>
      {/* 대화말풍선 - 나 */}
      <div className='flex p-3 justify-end'>
        <div style={{width:`${width}px`,height:40,backgroundColor:'#8FBC8F'}} className='rounded-3xl ml-3 flex justify-center items-center'>
          <div ref={textRef}>안녕하세요</div>
        </div>
      </div>
      {/* 채팅입력창 */}
      <div className='p-3 flex'  style={{ position: 'fixed', bottom: keyboardVisible ? '0vh' : 10, left: '0', width: '100%', padding: '10px', boxSizing: 'border-box' }}>
        <input id="" name="" type="text" placeholder="" autoComplete="text" 
        className="block h-10 pl-5 w-full rounded-3xl border-0 py-1 text-gray-800 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
        />
        <div style={{backgroundColor:'#D3D3D3'}} className='rounded-3xl w-12 flex justify-center items-center ml-1'>
          <div><img src={Vector} alt="" style={{ width:20,height:20}}/></div>
        </div>
      </div> 
    </div>
  )
}