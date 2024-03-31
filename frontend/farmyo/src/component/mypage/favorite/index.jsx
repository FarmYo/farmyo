import SaeClick from '../../../image/component/saeclick.png'
import { useState,useEffect } from 'react';
import api from '../../../api/api'

export default function Favorite() {
  const [favoriteFarmers,setFavoriteFarmers] = useState([])

  //선택된 farmid를 저장해놓기
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);

  // 즐겨찾기에서 삭제하기
  const deleteFavorite = (farmerId) => {
    // 클릭된 농부의 id를 가지고 목록에서 제거합니다.
    api.delete('users/bookmarks',{
      params :{
        bookmarkId : farmerId
      }
    })
    .then((res)=>{
      console.log(res)
      console.log('즐겨찾기삭제성공')
      setFavoriteFarmers(favoriteFarmers.filter(farmer => farmer.id !== farmerId));
    })
    .catch((err)=>{
      console.log(err)
    })
    
  };

  // 즐겨찾기 조회
  // 이게 로그인한 유저를 기반으로 그냥 조회해버리는데 
  // 나말고 다른 구매자유저의 목록에도 내가 즐찾한 사람목록이 나와버림
  // 나의아이디를 가지고 조회하던지 그런방향으로 바꾸기
  useEffect(()=>{
    api.get('users/bookmarks')
    .then((res)=>{
      console.log(res)
      console.log('즐겨찾기조회성공')
      setFavoriteFarmers(res.data.dataBody)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  return(
    <div>
      <table className="table">
        <tbody>
          {favoriteFarmers.map((farmer) => (
            <tr key={farmer.id} style={{ height: 80 }}>
              <td className="font-bold pl-8 text-lg">{farmer.farmerName}</td>
              
              <td>
                <img 
                  src={SaeClick} 
                  alt={farmer.name} 
                  style={{ width: 40 }} 
                  onClick={()=>{document.getElementById('deletefavorite').showModal()
                  setSelectedFarmerId(farmer.id)}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* 즐겨찾기 삭제 물어보는 모달 */}
      <dialog id="deletefavorite" className="modal">
        <div className="modal-box p-8" style={{ height:200}}>
          <h3 className="font-bold text-lg">즐겨찾기에서 삭제하시겠습니까?</h3>
          <div className='flex justify-around pt-10'>
            <div>
              <button className="btn w-20" style={{ backgroundColor: '#1B5E20'}}
              onClick={() => {
                deleteFavorite(selectedFarmerId); // 저장된 farmer.id를 사용하여 삭제
                document.getElementById('deletefavorite').close() // 모달 닫기
              }}
              > 
                <div className="font-bold text-md" style={{ color:'white' }}>네</div>
              </button>
            </div>
            <div>
              <button className="btn w-20" onClick={() => {document.getElementById('deletefavorite').close()}}> 
                <div className="font-bold text-md">아니요</div>
              </button>
            </div>
          </div>
          </div>
      </dialog>
    </div>
  )
}