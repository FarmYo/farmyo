import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
// import axios from "axios";

export default function BuyerTrade() {

  return(
    <div>
      <div>
        <div className="p-3 flex justify-between border-b-2 border-gray-100 h-20">
          <div className="font-bold text-xl flex items-center">달디달고 달디단 밤양갱</div>
          <div className="font-bold text-lg flex items-center" style={{color:'gray'}}>입금대기중</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">작물</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>밤양갱</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">거래수량</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>20kg</div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">거래가격</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>220000원(1kg = 11000원)</div>
        </div>
        <div className="p-3 border-b-2 border-gray-100 flex">
          <div>
            <div className="font-bold text-lg flex items-center">구매자</div>
            <div className="text-lg flex items-center" style={{color:'gray'}}>내이름</div>
          </div>
          <div className="pl-28">
            <div className="font-bold text-lg flex items-center">판매자</div>
            <div className="text-lg flex items-center" style={{color:'gray'}}>오승현</div>
          </div>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">배송지</div>
          <button onClick={()=>document.getElementById('addressselect').showModal()} className="btn">
            주소선택
          </button>
        </div>
        <div className="p-3 border-b-2 space-y-2 border-gray-100">
          <div className="font-bold text-lg flex items-center">송장번호</div>
          <div className="text-lg flex items-center" style={{color:'gray'}}>배송대기중</div>
        </div>
        <div className="pt-1 flex justify-between space-x-2">
          <div className='flex-grow'><button className="btn w-full">거래취소</button></div>
          <div className='flex-grow'><button className="btn w-full" style={{backgroundColor:'#1B5E20',color:'white'}}>결제</button></div>
        </div>

      </div>

      
      {/* 주소선택 모달 */}
      <dialog id="addressselect" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div>
          <button
            onClick={(event)=>{
              event.preventDefault()
              document.getElementById('addressselect').close()}}
              className="flex justify-center w-full rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
            >
            기존 주소 사용
          </button>

          <button
            onClick={(event)=>{
              event.preventDefault()
              document.getElementById('newaddress').showModal()}}
              className="flex justify-center w-full h-10 rounded-md px-3 py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
            >
            새로운 주소 등록
          </button>
          </div>
        </div>
      </dialog>
      
      {/* 새로운주소등록모달 */}
      <dialog id="newaddress" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className='pt-5 flex justify-between'>
            <input
            id="address"
            name="address"
            type="text"
            autoComplete="address"
            required
            className="block rounded-md border-0 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="주소"
          />
          <button className="btn btn-sm" style={{ backgroundColor:'#1B5E20',color:'white' }}>주소검색</button>
          </div>
          <div className='pt-3'>
            <input
            id="detailaddress"
            name="detailaddress"          
            type="text"
            autoComplete="text"
            required
            className="block rounded-md border-0 w-full py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-950 sm:text-sm sm:leading-6 pl-3"
            placeholder="상세주소"
          />
          <button
            onClick={(event)=>{
              event.preventDefault()
              document.getElementById('newaddress').close()
              document.getElementById('addressselect').close()
            }}
            className="flex justify-center w-full h-10 rounded-md py-2 mt-5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-950"
            style={{backgroundColor:'#1B5E20'}}
          >
            주소등록
          </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}