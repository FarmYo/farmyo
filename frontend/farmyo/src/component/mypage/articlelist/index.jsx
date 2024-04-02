import { useState,useEffect } from "react"
import { jwtDecode } from 'jwt-decode'
import api from '../../../api/api'
import { useNavigate } from "react-router-dom"


export default function Articlelist(props) {
  const loginId = jwtDecode( localStorage.getItem("access") ).loginId
  // console.log(loginId)
  // console.log(props.profileId)
  const navigate = useNavigate()
  const [boardList,setBoardList] = useState([])
 
  // 본인이 작성한 게시글조회 
  useEffect(()=>{
    if (!props.profileId){
      api.get(`boards/list/${loginId}`,{
        params:{
          page : 0,
          size: 4
        }
      })
      .then((res)=>{
        console.log(res)
        console.log('게시글 조회성공')
        setBoardList(res.data.dataBody)
        // {boardId: 41, title: '상추맛집', createdAt: '2024-03-28T16:44:42.220845', boardType: 0}
      })
      .catch((err)=>{
        console.log(err)
      })
    }else{
      api.get(`boards/list/${props.profileId}`,{
        params:{
          page : 0,
          size: 4
        }
      })
      .then((res)=>{
        console.log(res)
        console.log('게시글 조회성공')
        setBoardList(res.data.dataBody)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    },[])


  return(
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {boardList.map((article) => ( 
              <tr key={article.id} style={{ height: 80 }}
              onClick={() => navigate(
                article.boardType === 0
                  ? `/board/sell/${article.boardId}/detail` 
                  : `/board/buy/${article.boardId}/detail`
              )}>
                <td className="font-bold pl-8 text-lg">{article.title}</td>
                <td>{article.createdAt.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


// boardType = 0 이면 팝니다가 맞는지 