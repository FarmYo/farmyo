import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Element } from "react-scroll";
import '../../../css/trade.css'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Dropdown from '../../../image/component/dropdown.png'
import Up from '../../../image/component/up.png'

// 진행중인 거래목록들
const ongoingData = [
  { id: 1, name: "딸기딸기딸기딸기", seller: "조현제",  status: "입금 대기중",count:50,won:10000 },
  { id: 2, name: "달고달고 달디단 밤", seller: "조현제", status: "입금 완료",count:50,won:10000  },
  { id: 3, name: "호박고구마호박고구마!", seller: "조현제", status: "거래중" ,count:50,won:10000 },
];

export default function OngoingTrade() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [selectedItem, setSelectedItem] = useState('전체')
  const [isOpen, setIsOpen] = useState(false) // 드롭다운 메뉴 열림닫힘 구분

  // 전체,입금대기중,입금완료,거래중 필터링
  const filteredItems = ongoingData.filter(item => {
    if (selectedItem === '전체') return true; 
    return item.status === selectedItem; 
  });


  return(
    <div>
      {/* 드롭다운 구현 */}
      <div className='p-2 flex justify-end'>
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-32 h-12 justify-between items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          style={{ border: '3px solid #81C784', backgroundColor: 'transparent'}}>
            <div className='pl-3'>{selectedItem}</div>
            <img src={isOpen ? Up : Dropdown} alt="" style={{width:15,height:10}}/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {['전체','입금 대기중', '입금 완료', '거래중'].map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                      onClick={(e) => {
                        setSelectedItem(item)}}
                    >
                      {item}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      </div>
      
      {/* 거래목록  */}
      {filteredItems.map((item) => (
          <div key={item.id} className="p-3 border-b-2 border-gray-150 flex">
            <div style={{backgroundColor:'#bbbbbb'}} className="w-32"></div>
            <div className="w-full ml-2">
              <h1 className="text-lg font-bold">{item.name}</h1>
              <h1 className="text-sm">{item.seller}</h1>
              <h1 style={{ color:'#1B5E20' }} className="font-bold">{item.count}kg</h1>
              <div className='flex justify-between'>
                <h1 style={{ color:'#1B5E20' }} className="font-bold">{item.won}원/kg</h1>
                <h1 className="text-xl">{item.status}</h1>
              </div>     
            </div>
          </div>
        ))
      }

    </div>
  )
}