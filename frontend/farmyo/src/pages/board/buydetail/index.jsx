import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Three from "../../../image/component/three.png"
import Trash from "../../../image/component/trash.png"
import Edit from "../../../image/component/edit.PNG"
import Back from '../../../image/component/leftarrow.png'

export default function BuyDetail(){
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return(
    <div>
      <div className="p-5 flex justify-between border-b-2 border-gray-300">
        <div className='flex'>
          <div className='flex items-center'>
            <img src={Back} alt="" style={{ width:30,height:30 }}/>
          </div>
          <div className='ml-4'>
            <h1 className='font-bold text-lg'>감자감자왕감자</h1>
            <h1 className=''>조현제</h1>
          </div>
        </div>      
        {/* 아래의 메뉴바(수정,삭제)는 본인만 보이게 */}
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
      <h1>
      안녕하세요 감자를 살려고 하는데 우선 1kg만 사고 상태랑
      가격 보고 거래처를 구할려고 합니다. 관심 있으신 농부님
      채팅주세요 !!
      </h1>
    </div>

    <div style={{ position:'fixed',bottom:120,right:0,left:0}}>
      <div className='flex justify-between border-t-2 border-gray-300 p-3'>
        <div>
          <h1 className="font-bold">10,000원/kg</h1>
          <h1 className="font-bold">50kg</h1>
        </div>
        <div>
          <button className="btn" style={{ backgroundColor: '#1B5E20'}}> 
            <div className="font-bold text-md" style={{ color:'white' }}>채팅하기</div>
          </button>
        </div>
      </div>
    </div>
  </div>  
  )
}