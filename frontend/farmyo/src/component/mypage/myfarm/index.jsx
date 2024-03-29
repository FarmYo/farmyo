import React, { useState,useEffect } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Gallery from "../../../image/component/gallery.png"
import { jwtDecode } from 'jwt-decode';

export default function MyFarm(props) {
  const loginId = jwtDecode( localStorage.getItem("access") ).loginId
  
  console.log(loginId)
  console.log(props.profileId)
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


  
  const [open,setOpen] = useState(false)
  const [photoOpen,setPhotoOpen] = useState(false)
  const resigtercrops = ['전체','감자','딸기','오이']
  const [selectCrop,setSelectCrop] = useState('전체')
  const writeCropList = ['감자','딸기','오이']
  const [writeCrop,setWriteCrop] = useState('작물명을 선택하세요')

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const photoOpenModal = () => {
    setPhotoOpen(true);
  };

  const photoCloseModal = () => {
    setPhotoOpen(false);
  };

  const handleSelectCrop = (e) => {
    setSelectCrop(e)
  }

  const handleWriteCrop = (e) => {
    setWriteCrop(e)
  }

 return(
  <div style={{ position:'relative',height:'400px' }}>
    <div className='flex justify-end mr-5'>
     <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectCrop}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        {/* 농부가 등록한 농작물이 보여지게 */}
        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {resigtercrops.map((crop)=>(
            <Menu.Item key={crop} onClick={() => handleSelectCrop(crop)}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                {crop}
                </a>
              )}
            </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>

    { !props.profileId  && (
    <div style={{ position: 'absolute', bottom: 0, right: 10}}>
      <div style={{backgroundColor:'#1B5E20',borderRadius: '50%', width: '50px', height: '50px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '40px' }}
        onClick={onOpenModal}>
          +</div>
      </div>
    </div>
    )}
 

    {/* ******모달창들******** */}
    {/* 마이팜게시글등록 모달창 */}
    <Modal open={open} onClose={onCloseModal} styles={styles}>
    <div className='pt-60'>
      <div >
        {/* 사진위치 */}
      </div>
      <div className='flex justify-between'>
      <div div>
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {writeCrop}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
      <Menu.Items className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {writeCropList.map(crop=>(
          <Menu.Item key={crop} onClick={() => handleWriteCrop(crop)}>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-16 py-1 text-sm'
                )}
              >
                {crop}
              </a>
            )}
          </Menu.Item>
          ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
    <div className='flex items-center justify-between'>
      <div className='flex' onClick={photoOpenModal}>
        <h1 className='font-bold'>+</h1>
        <img src={Gallery} alt="" style={{ width:40 }} className='mr-3'/>
      </div>
    </div>
    {/* 사진등록모달창 */}
        














      </div>
      <textarea className="textarea w-full h-28 textarea-bordered mt-10" 
      placeholder="내용을 입력하세요"></textarea>    
      <button class="btn h-10 w-full rounded-md mt-5" style={{ backgroundColor:'#1B5E20'}}
      onClick={onCloseModal}>
        <h1 style={{ color:'white' }} className="text-lg">등록</h1>
      </button>
      </div>
    </Modal>
  </div>
 )
}
