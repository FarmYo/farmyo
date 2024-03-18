import React, { useState } from "react";

// 상품을 받아올테니까 대충 있다고 치고
const ListData = [
  { id: 1, name: "딸기", seller: "조현제", photo: "", status: "입금 대기중" },
  { id: 2, name: "밤", seller: "조현제", photo: "", status: "입금 완료" },
  { id: 3, name: "고구마", seller: "조현제", photo: "", status: "거래중" },
];

export default function OngoingTrade() {
  const [filter, setFilter] = useState("전체");
  const filteredList = ListData.filter(item => item.status === filter || filter === "전체");
  return(
    <div>
      {/* 드롭다운 구현 */}
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1" onClick={() => setFilter("전체")}>{filter}</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52">
            <li><button onClick={() => setFilter("입금 대기중")}>입금 대기중</button></li>
            <li><button onClick={() => setFilter("입금 완료")}>입금 완료</button></li>
            <li><button onClick={() => setFilter("거래중")}>거래중</button></li>
          </ul>
      </div>

      {/* 진행중 목록 화면에 나타낼 것 */}
      <div className="mt-4">
        {filteredList.map(item => (
          <div key={item.id} className="p-2 border rounded-md mb-2">{item.name} <br/> {item.seller} ({item.status})</div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="join flex justify-center">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn">3</button>
        {/* 이거는 for문 돌리면 되니까 일단은 3개만 만들기 */}
      </div>
    </div>
  )
}