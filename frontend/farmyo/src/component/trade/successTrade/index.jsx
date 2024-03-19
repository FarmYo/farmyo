import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import strawberry from '../../../image/component/trade/strawberry.jpg'
import bam from '../../../image/component/trade/bam.jpg'
import sweetpotato from '../../../image/component/trade/sweetpotato.jpg'
import '../../../css/trade.css'

// 상품을 받아올테니까 대충 있다고 치고
const ListData = [
  { id: 1, name: "딸기", seller: "조현제", photo: strawberry, status: "입금 대기중" },
  { id: 2, name: "밤", seller: "조현제", photo: bam, status: "입금 완료" },
  { id: 3, name: "고구마", seller: "조현제", photo: sweetpotato, status: "거래중" },
  { id: 4, name: "테스트", seller: "테스트", photo: "기본 이미지", status: "거래중" },
  { id: 5, name: "거래", seller: "완료", photo: "불러오면 넣을 거", status: "거래완료" },
  { id: 6, name: "거래완료", seller: "거래완료", photo: "대충 이미지", status: "거래완료" },
  { id: 7, name: "이름", seller: "판매자", photo: "대충 사진", status: "거래완료" },
];

export default function SuccessTrade() {
  const filteredList = ListData.filter(item => item.status === "거래완료");
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
      {/* 완료된 목록 화면에 나타낼 것 */}
      <div className="">
        {getVisibleList().map(item => (
          <div key={item.id} className="p-2 border rounded-md" onClick={() => {navigate(`/trade/buyer/${item.id}`)}}>
              <img src={item.photo} alt={item.name} /> 
              {item.name} <br/> {item.seller} ({item.status})</div>
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
    </div>
  )
}