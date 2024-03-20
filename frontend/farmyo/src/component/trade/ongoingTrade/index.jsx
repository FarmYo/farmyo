import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Element } from "react-scroll";
import strawberry from '../../../image/component/trade/strawberry.jpg'
import bam from '../../../image/component/trade/bam.jpg'
import sweetpotato from '../../../image/component/trade/sweetpotato.jpg'
import '../../../css/trade.css'

// 상품을 받아올테니까 대충 있다고 치고
const ListData = [
  { id: 1, name: "딸기딸기딸기딸기", seller: "조현제", photo: strawberry, status: "입금 대기중" },
  { id: 2, name: "달고달고 달디단 밤", seller: "조현제", photo: bam, status: "입금 완료" },
  { id: 3, name: "호박고구마호박고구마!", seller: "조현제", photo: sweetpotato, status: "거래중" },
  { id: 4, name: "테스트", seller: "테스트", photo: "기본 이미지", status: "거래중" },
  { id: 5, name: "거래", seller: "완료", photo: "불러오면 넣을 거", status: "거래완료" },
  { id: 6, name: "거래완료", seller: "거래완료", photo: "대충 이미지", status: "거래완료" },
  { id: 7, name: "이름", seller: "판매자", photo: "대충 사진", status: "거래완료" },
];

export default function OngoingTrade() {
  const [filter, setFilter] = useState("전체");
  const filteredList = ListData.filter(item => item.status === filter || (filter === "전체" && item.status !== "거래완료"));
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getVisibleList = () => {
    const startIndex = (currentPage - 1) * 3; // 현재 페이지의 시작 인덱스
    const endIndex = startIndex + 3; // 현재 페이지의 끝 인덱스
    return filteredList.slice(startIndex, endIndex); // 현재 페이지에 표시할 목록
  };
  return(
    <div>
      {/* 드롭다운 구현 */}
      <div className="flex justify-end">
      <div className="dropdown dropdown-hover">
        <div 
          tabIndex={0} 
          role="button" 
          className="btn m-1 filterbutton" 
          onClick={() => setFilter("전체")}
        >
          {filter}
        </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52">
            <li><button onClick={() => setFilter("전체")}>전체</button></li>
            <li><button onClick={() => setFilter("입금 대기중")}>입금 대기중</button></li>
            <li><button onClick={() => setFilter("입금 완료")}>입금 완료</button></li>
            <li><button onClick={() => setFilter("거래중")}>거래중</button></li>
          </ul>
      </div>
      </div>
      {/* 진행중 목록 화면에 나타낼 것 */}
      {/* <div className="fruitlist">  스크롤 표시하려고 함 */}
      <div className="scroll-mr-1">
        {getVisibleList().map(item => (
          <div key={item.id} className="item p-2 border rounded-md" onClick={() => {navigate(`/trade/seller/${item.id}`)}}>
            <img src={item.photo} alt={item.name} />
            <div>
              <div>{item.name}</div>
              <div>{item.seller}</div>
              
            </div>
            <span className="item-status">({item.status})</span>
             
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="join flex justify-center pagination">
        {Array.from({ length: Math.ceil(filteredList.length / 3) }).map((_, index) => (
          <button key={index} className="join-item btn" onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {/* </div> */}
    </div>
  )
}