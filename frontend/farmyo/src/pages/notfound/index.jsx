import Ban from '../../image/component/ban.gif'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage(){
  const navigate = useNavigate()

  const goHome = () =>{
    navigate('/')
  }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className='mb-3'><img src={Ban} alt="잘못된경로" style={{}}/></div>
      <div>
        <h1 className="font-bold text-2xl mb-3">잘못된경로입니다</h1>
        <h1 className="text-center text-md" onClick={goHome}>홈으로가기</h1>
      </div>
    </div>
  )
}