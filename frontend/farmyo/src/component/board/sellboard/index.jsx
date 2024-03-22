import Chatting from '../../../image/component/chatting.png'
import { Modal } from "react-responsive-modal"
import { useState } from 'react'
import { Fragment } from 'react'
import { Menu,Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Gallery from '../../../image/component/gallery.png'

export default function SellBoardList(){
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [sellOpen,setSellOpen] = useState(false)

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

  //삽니다게시글모달
  const sellOpenModal = () => {
    setSellOpen(true);
  };

  const sellCloseModal = () => {
    setSellOpen(false);
  };

  return(
    <div style={{height:'450px',position:'relative'}}>
      {/* 팝니다 게시글목록하나 */}
      <div className="p-4 flex">
        <div style={{backgroundColor:'#bbbbbb'}} className="w-32"></div>
        <div className="w-full ml-2">
          <h1 className="text-lg font-bold">감자감자왕감자</h1>
          <h1 className="text-sm">작성자</h1>
          <h1 style={{ color:'#1B5E20' }} className="font-bold">50kg</h1>
          <div className='flex justify-between'>
            <h1 style={{ color:'#1B5E20' }} className="font-bold">10000원/kg</h1>
            <img src={Chatting} alt="" style={{width:30}}/> 
          </div>     
        </div>
      </div>
      <div className="p-4 flex">
        <div style={{backgroundColor:'#bbbbbb'}} className="w-32"></div>
        <div className="w-full ml-2">
          <h1 className="text-lg font-bold">감자감자왕감자</h1>
          <h1 className="text-sm">작성자</h1>
          <h1 style={{ color:'#1B5E20' }} className="font-bold">50kg</h1>
          <div className='flex justify-between'>
            <h1 style={{ color:'#1B5E20' }} className="font-bold">10000원/kg</h1>
            <img src={Chatting} alt="" style={{width:30}}/> 
          </div>     
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, right: 10}}>
        <div style={{backgroundColor:'#1B5E20',borderRadius: '50%', width: '50px', height: '50px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '40px' }}
          onClick={sellOpenModal}>+
          </div>
        </div>
      </div>
      {/* 팝니다게시글생성모달 */}
      <Modal open={sellOpen} onClose={sellCloseModal} styles={styles}>
        <div className="mt-10">
          <div className='h-32' style={{ backgroundColor:'#bbbbbb'}}>사진있음</div>
          <div className='flex justify-between mt-4'>
            <div>
            <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                작물명을 선택하세요
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
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-16 py-1 text-sm'
                      )}
                    >
                    감자
                    </a>
                  )}
                </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex'>
              <h1 className='font-bold'>+</h1>
              <img src={Gallery} alt="" style={{ width:30 }} className='mr-3'/>
            </div>
          </div>
        {/* 사진등록모달창 */}
            



          </div>
        
      















          <label for="price" class="block text-md leading-6 mt-4 text-gray-900">수량</label>
          <div class="relative rounded-md mt-1">
            <input type="number" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="수량을 입력하세요(kg)"/>
          </div>
          <label for="price" class="block text-md mt-2 leading-6 text-gray-900">가격</label>
          <div class="relative rounded-md mt-1">
            <input type="number" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="가격을 입력하세요(/kg)"/>
          </div>
          <label for="price" class="block text-md mt-2 leading-6 text-gray-900">제목</label>
          <div class="relative rounded-md mt-1">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="제목을 입력하세요"/>
          </div>
          <label for="price" class="block text-md mt-2 leading-6 text-gray-900">내용</label>
          <div class="relative rounded-md mt-1">
            <textarea className="textarea textarea-bordered w-full h-24" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div className="mt-10">
            <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}> 
              <div className="font-bold text-lg" style={{ color:'white' }}>생성</div>
            </button>
          </div>
        </div>
      </Modal>




    </div>
  )
}