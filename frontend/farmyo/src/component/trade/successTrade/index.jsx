import React from "react";

// 상품을 받아올테니까 대충 있다고 치고
const ListData = [
  { id: 1, name: "딸기", seller: "조현제", photo: "", status: "입금 대기중" },
  { id: 2, name: "밤", seller: "조현제", photo: "", status: "입금 완료" },
  { id: 3, name: "고구마", seller: "조현제", photo: "", status: "거래중" },
];

export default function SuccessTrade() {
  return(
    <div>
      {/* 완료된 목록 화면에 나타낼 것 */}
      <div className="mt-4">
        {ListData.map(item => (
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