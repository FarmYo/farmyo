import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../../../image/component/leftarrow.png";
import Form from "../../../pages/chat/form"

export default function ChatHeader({partnerInfo}) {

    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [buttonText, setButtonText] = useState("거래하기");
    const [buttonBgcolor, setButtonBgcolor] = useState("#1B5E20");

    const openForm = () => {
        setShowForm(true);
        setButtonText("거래하기");
        setButtonBgcolor("#1B5E20");
      };
    
      const goBack = () => {
        navigate("/chat");
      };
    
      const handleFormSubmit = () => {
        setShowForm(false);
        setButtonText("전송완료");
        setButtonBgcolor("#8FBC8F");
      };
    
      const closeForm = () => {
        setShowForm(false);
      };
    
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
                <button className="btn" style={{ backgroundColor: buttonBgcolor }}>
                    <div
                    className="font-bold text-md"
                    style={{ color: "white" }}
                    onClick={buttonText === "전송완료" ? null : openForm}
                    >
                    {buttonText}
                    </div>
                </button>
                </div>
            </div>
            {/* 거래하기눌렀을때 입력폼- 판매게시판에서 만든 채팅은 작물명X,구매게시판에서 만든채팅은 작물명O*/}
            {showForm && <Form onFormSubmit={handleFormSubmit} onCloseForm={closeForm} />}
        </div>
    ); 
}