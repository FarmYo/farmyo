import SaeClick from '../../../image/component/saeclick.png'
import { useState } from 'react';

export default function Favorite() {
  const [farmers, setFarmers] = useState([
    { id: 'farmer1', name: '승현농부', image: SaeClick },
    { id: 'farmer2', name: '현제농부', image: SaeClick },
    // ... 기타 농부들
  ]);

  // 즐겨찾기 삭제 클릭
  const handleImageClick = (farmerId) => {
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
                  onClick={() => handleImageClick(farmer.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}