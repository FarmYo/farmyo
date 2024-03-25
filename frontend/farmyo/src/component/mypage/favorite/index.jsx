import SaeClick from '../../../image/component/saeclick.png'
import { useState } from 'react';

export default function Favorite() {
  const [farmers, setFarmers] = useState([
    { id: 'farmer1', name: '승현농부', image: SaeClick },
    { id: 'farmer2', name: '현제농부', image: SaeClick },
    // ... 기타 농부들
  ]);

  //선택된 farmid를 저장해놓기
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);

  // 즐겨찾기에서 삭제하기
  const deleteFavorite = (farmerId) => {
    // 클릭된 농부의 id를 가지고 목록에서 제거합니다.
    setFarmers(farmers.filter(farmer => farmer.id !== farmerId));
  };


  return(
    <div>
      <table className="table">
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id} style={{ height: 80 }}>
              <td className="font-bold pl-8 text-lg">{farmer.name}</td>
              <td>
                <img 
                  src={farmer.image} 
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