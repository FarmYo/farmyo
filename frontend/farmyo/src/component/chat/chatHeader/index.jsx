import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../../../image/component/leftarrow.png";

import { jwtDecode } from "jwt-decode"
import Ex from "../../../image/component/ex.png"
import api from "../../../api/api"
import { useParams } from "react-router-dom";
import { useEffect } from "react";




export default function ChatHeader() {
    const param = useParams()
    const chatId = param.chatId
    const navigate = useNavigate();

    const userJob = jwtDecode(localStorage.getItem("access")).userJob;
    const loginId = jwtDecode(localStorage.getItem("access")).loginId;

    const [showForm, setShowForm] = useState(false);
    const [buttonText, setButtonText] = useState("거래하기");
    const [buttonBgcolor, setButtonBgcolor] = useState("#1B5E20");
    const [harvestCrops,setHarvestCrops] = useState([])
    const [cropId,setCropId] = useState(null)
    const [partnerInfo,setPartnerInfo] = useState([])
    const [tradePrice,setTradePrice] = useState(null)
    const [tradeQuantity,setTradeQuantity] = useState(null)
    const [selectCrop,setSelectCrop] = useState(null)

    
    const openForm = () => {
        setShowForm(true);
        setButtonText("거래하기");
        setButtonBgcolor("#1B5E20");
      };
    
      const goBack = () => {
        navigate("/chat");
      };

    
      const closeForm = () => {
        setShowForm(false);
      };

      const goTrade = () =>{
        api.post('trades',{
          sellerId:loginId,
          buyerId:partnerInfo.userLoginId,
          cropId:cropId,
          boardId:partnerInfo.boardId,
          tradePrice,
          tradeQuantity,
          tradeStatus:0
        })
        .then((res)=>{
          console.log('거래생성완료',res)
          closeForm()
          setButtonText('전송완료')
          setButtonBgcolor('#81C784')
        })
        .catch((err)=>{
          console.error(err)
        })
      }

      const [isDropdownOpen, setIsDropdownOpen] = useState(false);




      
      useEffect(()=>{
        console.log(partnerInfo)
       api.get(`crops/list/${loginId}/harvest`)
       .then((res)=>{
        console.log('수확작물조회성공',res)
        setHarvestCrops(res.data.dataBody)
       })
       .catch((err)=>{
        console.log(err)
       })
       api.get(`chats/message/${chatId}`)
       .then((res)=>{
        console.log('상대방아이디,보드아이디받기',res)
        setPartnerInfo(res.data.dataBody.chatDetailDto)
       })
       .catch((err)=>{
        console.error(err)
       })


      },[])


    return (
        <div className="fixed top-50px  w-full z-50 bg-white">

        <div style={{ height: 80 }} className="p-2 border-b-2 border-gray-100 flex justify-between">
            <div className="flex">
            <div className="flex items-center" onClick={goBack}>
                <img src={Back} alt="" style={{ width: 25, height: 25 }} />
            </div>
            <div className="text-lg flex items-center font-bold ml-5">{partnerInfo.userNickname}</div>
            </div>
            {/* 아래거래하기버튼은 판매자만보이게 */}
            <div className="flex items-center">
              {userJob === 0 && (
            <button className="btn" style={{ backgroundColor: buttonBgcolor }}
            onClick={buttonText === "전송완료" ? null : openForm}>
                <div
                className="font-bold text-md"
                style={{ color: "white" }}
                >
                {buttonText}
                </div>
            </button>
            )}
            </div>
          



        </div>
        {/* 거래하기눌렀을때 입력폼- 판매게시판에서 만든 채팅은 작물명X,구매게시판에서 만든채팅은 작물명O*/}
        {showForm && (
        <div>
          <div style={{height: 200}} className="p-5 pt-0  border-b-2 border-gray-100">
            <div className='flex justify-end'><img src={Ex} alt="" style={{ width:30 ,height:30 }}
            onClick={closeForm}/></div>
            {/* ****판매게시판이면 안보이고 구매게시판이면 보이는것*******     */}
            <label htmlFor="nickname"className="block text-sm leading-6 text-gray-900">작물명</label>
            <div>
                <details className="dropdown w-full rounded-md mb-2" open={isDropdownOpen} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <summary className="btn btn-sm w-full">작물명을 선택하세요</summary>
                  <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  {harvestCrops.map((crop, index) => (
                    <li key={index} 
                    onClick={(e) => {
                      e.stopPropagation(); // <details>의 onClick 이벤트가 실행되지 않도록 함
                      setCropId(crop.id); 
                      setSelectCrop(crop.name);
                      setIsDropdownOpen(false); // 드롭다운 닫기
                    }}><a>{crop.name}</a></li>
                  ))}
                  </div>
                </details>
              <input id="nickname" name="nickname" type="text" 
                className="block h-7 w-full rounded-md sm:text-sm sm:leading-6 pl-3 " value={selectCrop}
                style={{ border: '2px solid #1B5E20'}} disabled
                />
            </div>
            {/* ************************************************ */}
            <div className="flex justify-around mt-2">
              <div>
                <label htmlFor="nickname"className="block text-sm leading-6 text-gray-900">수량</label>
                <div>
                  <input id="nickname" name="nickname" type="number" placeholder="kg" autoComplete="text" 
                    className="block h-7 rounded-md w-20 text-gray-900  sm:text-sm sm:leading-6 pl-3"
                    style={{ border: '2px solid #1B5E20'}}
                    onChange={(e)=>setTradeQuantity(e.target.value)}/>
                </div>
              </div>
              <div>
                <label htmlFor="nickname"className="block text-sm leading-6 text-gray-900">kg당 가격</label>
                <div>
                  <input id="nickname" name="nickname" type="number" placeholder="원" autoComplete="text" 
                    className="block h-7  rounded-md w-32 sm:text-sm sm:leading-6 pl-3"
                    style={{ border: '2px solid #1B5E20'}}
                    onChange={(e)=>setTradePrice(e.target.value)}/>
                </div>
              </div>
              <div className='flex items-end'>
                <button className="btn btn-sm" style={{ backgroundColor: '#1B5E20'}}
                onClick={goTrade}> 
                  <div className="font-bold text-md" style={{ color:'white' }}
                  >주문전송</div>
                </button>
              </div>
            </div>
          </div>    
        </div>
        )}

        </div>
    ); 
}