import Three from "../../../../image/component/three.png"
import Trash from "../../../../image/component/trash.png"
import Edit from "../../../../image/component/edit.PNG"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const styles = {
  modal: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    margin: '0',
  },
};

export default function MyFarmDetail() {
  return(
    <div>
      {/* 마이팜사진 */}
      <div style={{height:350,backgroundColor:'#bbbbbb'}}></div>
      <div className="p-5 flex justify-between">
        <div>
          <h1 className='font-bold'>오쌤</h1>
          <h1 className=''>2023.03.05</h1>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
    {/* 마이팜작성글위치 */}
    <div className="p-2 pl-5">
      <h1>양파 상태 최고네요^^</h1>
    </div>


    {/* ******마이팜게시글 수정하기모달******** */}

  </div>
  )
}