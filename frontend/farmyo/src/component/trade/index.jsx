import React, { useState, useEffect } from "react";
import OngoingTrade from "./ongoingTrade";
import SuccessTrade from "./successTrade";
import Headerbar from "../../component/common/headerbar/index.jsx";
import TablSelect from "../../component/trade/tabSelect/index.jsx";

export default function Trade() {
  const [selected, setSelected] = useState(null);
  const [selectedItem, setSelectedItem] = useState("전체");
  const abc = 1;

  useEffect(() => {
    setSelected(0);
  }, []);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div>
      {/* 헤더 */}
      <Headerbar title={"거래"}></Headerbar>
      <div className="m-10"></div>

      {/* 탭 선택 */}
      <TablSelect
        selected={selected}
        setSelected={setSelected}
        handleClick={handleClick}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      ></TablSelect>

      {/* 선택된 컴포넌트 조건부 렌더링 */}
      {selected === 0 && <OngoingTrade selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
      {selected === 1 && <SuccessTrade />}
    </div>
  );
}
