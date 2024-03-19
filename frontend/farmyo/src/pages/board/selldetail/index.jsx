import Three from "../../../image/component/three.png"
import Trash from "../../../image/component/trash.png"
import Edit from "../../../image/component/edit.PNG"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import '../../../css/barchart.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SellDetail(){
  return(
    <div>
       {/* 팝니다 상세게시글사진 */}
       <div style={{height:240,backgroundColor:'#bbbbbb'}}></div>
      <div className="p-5 flex justify-between">
        <div>
          <h1 className='font-bold text-lg'>감자감자왕감자</h1>
          <h1 className=''>조현제</h1>
        </div>
        <div>
          <button className="btn flex w-32 justify-around" style={{ backgroundColor: '#2E8B57'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>작물정보</div>
          </button>
        </div>
        {/* 아래의 메뉴바는 본인만 보이게 */}
        <Menu as="div" className="relative text-left flex justify-center items-center">
          <div>
            <Menu.Button className="inline-flex w-full items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img src={Three} alt="" className="w-1"/>
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
          <Menu.Items className="absolute top-full right-0 z-10 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item className="flex">
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <img src={Edit} alt="" style={{width:20}}/>수정하기
                    </a>
                  
                  )}
            
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item className='flex'>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )} style={{color:'red'}}
                    >
                      <img src={Trash} alt="" style={{width:20}}/>삭제하기
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
    </div>
    <div className="p-2 pl-5">
      <h1>안녕안녕 안녕 하십니까. 3월 8일이 무슨 날인 줄 아십니까?
        바로 우리팀 외모담당 오승현씨의 생일입니다.
      </h1>
    </div>

    <div style={{ position:'fixed',bottom:120,right:0,left:0}}>
      <div className="p-3">
        {/* max : 총수량 value : 거래가능량 */}
        <progress className="progress custom-progress w-full h-3" value="50" max="100" style={{ color:'#1B5E20'}}></progress>
        <div className="text-sm">거래가능량 : </div>
      </div>
      <div className='flex justify-between border-t-2 border-gray-300 p-3'>
        <div>
          <h1 className="font-bold">10,000원/kg</h1>
          <h1 className="font-bold">50kg</h1>
        </div>
        <div>
          <button className="btn mr-2" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-md" style={{ color:'white' }} onClick={()=>document.getElementById('gotrade').showModal()}>거래하기</div>
          </button>
          <button className="btn" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>채팅하기</div>
          </button>
        </div>
      </div>
    </div>
    {/* 거래하기모달창 */}
    <dialog id="gotrade" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="">
          <label for="price" class="block text-md leading-6 text-gray-900">거래가능량</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="입력됨" disabled/>
          </div>
          <label for="price" class="block text-md mt-5 leading-6 text-gray-900">수량</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="수량을 입력하세요(kg)"/>
          </div>
          <label for="price" class="block text-md mt-5 leading-6 text-gray-900">총 주문금액</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="'계산된금액나옴'" disabled/>
            <h1>10000원/kg</h1>
          </div>
          <div className="mt-10">
            <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}> 
              <div className="font-bold text-lg" style={{ color:'white' }}>구매하기</div>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
  )
}