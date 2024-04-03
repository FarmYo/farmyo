import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Dropdown from '../../../image/component/dropdown.png'

import api from "../../../api/api";
import { jwtDecode } from "jwt-decode";

export default function OngoingTrade({ selectedItem, setSelectedItem }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();
  const userId = jwtDecode(localStorage.getItem("access")).userId;

  const userJob = jwtDecode(localStorage.getItem("access")).userJob; // 0이면 판매자,1이면 구매자
  const [ongoingList, setOngoingList] = useState([]); //진행중인 거래담길 리스트

  // 진행중인 거래목록 조회
  // useEffect(()=>{
  //   api.get('trades/list', {
  //     params: {
  //       id: userId
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setOngoingList(res.data.dataBody.notFinishedList)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // },[])

  // 무한스크롤 부분
  const [page, setPage] = useState(0);
  const obsRef = useRef(null);
  const preventRef = useRef(true);
  const [haveMore, setHaveMore] = useState(true);
  const size = 4;

  const obsHandler = (entries) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (haveMore && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false;
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  useEffect(() => {
    //옵저버 생성
    if (!haveMore) return;
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setSelectedItem("전체");
  }, []);

  const getTrade = () => {
    api
      .get("trades/list", {
        params: {
          id: userId,
          page: page,
          size: size,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.dataBody.notFinishedList.length < size) {
          setHaveMore(false);
          setOngoingList((preongoingList) => [...preongoingList, ...res.data.dataBody.notFinishedList]);
          console.log("더이상의 데이터가 없습니다.", res);
          console.log(res.data.dataBody.notFinishedList, ongoingList, page);
        } else {
          setOngoingList((preongoingList) => [...preongoingList, ...res.data.dataBody.notFinishedList]);
          //불러올 때마다 다시 중복방지값 true로 변환
          preventRef.current = true;
          console.log("무한스크롤 되는중");
        }
      })
      .catch((err) => {
        console.log("실패", err);
      })
      .finally(() => {
        preventRef.current = true; // 데이터 로딩 시도 후에 중복 방지를 리셋
      });
  };

  useEffect(() => {
    getTrade();
  }, [page]);

  // 상태에 따른 표시 문자열과 tradeStatus 매핑
  const statusMapping = {
    "전체": null, // '전체'를 선택한 경우 모든 항목을 표시
    "입금 대기중": 0,
    "입금 완료": 1,
    "배송중": 2,
  };

  // 전체,입금대기중,입금완료,거래중 필터링
  const filteredItems = ongoingList.filter((item) => {
    if (selectedItem === "전체") return true;

    return item.tradeStatus === statusMapping[selectedItem];
  });

  const tradeStatusToText = {
    0: "입금 대기중",
    1: "입금 완료",
    2: "배송중",
  };

  // 상세 거래내역으로 가는것
  const goDetail = (id) => {
    console.log(userJob);
    console.log(id);

    if (userJob == 0) {
      navigate(`/trade/seller/${id}`);
    } else {
      navigate(`/trade/buyer/${id}`);
    }
  };

  return (
    <div>
      {/* 거래목록  */}
      <div style={{ height: "130px" }}></div>
      {filteredItems.map((item, index) => (
        <div key={item.id} className="p-2 border-b-2 border-gray-150 flex" onClick={() => goDetail(item.id)}>
          <div>
            <img src={item.cropImg} alt="" className="w-32 h-24" />
          </div>
          <div className="w-full ml-2">
            <h1 className="text-lg font-bold">{item.boardTitle}</h1>
            <h1 className="text-sm">{item.nickname}</h1>
            <h1 style={{ color: "#1B5E20" }} className="font-bold">
              {item.tradeQuantity}kg
            </h1>
            <div className="flex justify-between">
              <h1 style={{ color: "#1B5E20" }} className="font-bold">
                {item.tradePrice}원/kg
              </h1>
              <h1 className="text-lg font-bold">{tradeStatusToText[item.tradeStatus]}</h1>
            </div>
          </div>
        </div>
      ))}
      <div ref={obsRef} style={{ height: "77px" }}>
        <br />
      </div>
    </div>
  );
}
