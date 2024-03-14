import Next from "../../../image/component/next.png"
import Vet from "../../../image/component/vet.png"
import Harvest from "../../../image/component/harvest.png"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import React,{ useState,useEffect } from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ko from 'date-fns/locale/ko';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

 

export default function MyCrops() {
  const [startDate,setStartDate] = useState(null);
  
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
  const [infoOpen,setInfoOpen] = useState(false)

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const infoOpenModal = () => {
    setOpen(true);
  };

  const infoCloseModal = () => {
    setOpen(false);
  };

  return(
    // "작물없으면 등록한 작물이 없습니다"노출
    <div className="mt-2" style={{ position:'relative'}}>
      {/* 아래의 디브가 작물이 추가될 때마다 반복됨  */}
      <div className="flex">
        <div style={{backgroundColor:'#bbbbbb',width:80,height:80}}></div>
        <div className="p-5">
          <h1 className="font-bold">감자</h1>
        </div>
        <div className="ml-auto flex items-center p-5" onClick={infoOpenModal}>
          <img src={Next} alt="" style={{width:30}}/>
        </div>
      </div>

      <Modal open={infoOpen} onClose={infoCloseModal} styles={styles}>
        <div className="">
        <div className="px-8">
          <label for="price" class="block text-xl font-medium leading-6 text-gray-900">작물명</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="작물명입력됨" disabled/>
          </div>
        </div>
        <div className="px-8">
          <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="재배지입력됨" disabled/>
          </div>
        </div>
        <div className="px-8">
          <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="날짜입력됨" disabled />
          </div>
        </div>
        <div className="px-8 mt-10">
          <button className="btn w-full flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
            <img src={Vet} alt=""/>
            <div className="font-bold">농산물 생애기록 보기</div>
          </button>
        </div>
        {/* 아래부분은 판매자만보이게 */}
        <div className="px-8 flex justify-end mt-3">
          <p className="text-md font-bold">+생애기록 추가하기</p>
        </div>

        <div className="px-8 mt-10">
          <button className="btn w-full flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
            <img src={Harvest} alt="" />
            <div className="mr-5 font-bold">수확하기</div>
          </button>
        </div>
        </div>
    </Modal>





































      
      <div style={{height:'310px'}}>
        <div style={{ position: 'absolute', bottom: 0, right: 10}}>
          <div style={{backgroundColor:'#1B5E20',borderRadius: '50%', width: '50px', height: '50px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '40px' }}
            onClick={onOpenModal}>
              +</div>
              {/* 농작물 등록 모달창 */}
              <Modal open={open} onClose={onCloseModal} styles={styles}>
              <div className="flex justify-center items-center pt-32">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md
                bg-white px-12 py-3 text-xl text-gray-900 font-semibold
                  ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  작물을 선택하세요
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
  
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                  <Menu.Items className="absolute right-0 z-10 w-full px-4 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{width:'16rem'}}>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-12 py-2 text-xl'
                            )}
                          >
                            농작물1
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-12 py-2 text-xl'
                            )}
                          >
                            농작물2
                          </a>
                        )}
                      </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>   
                </Menu>
                </div>
                

                <div className="px-8 py-16 ">
                  <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    placeholder="재배지를 입력하세요" disabled/>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                    </div>
                  </div>
                </div>
                <div className="px-8">
                  <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                  <DatePicker
                    locale={ko}
                    selected={startDate}
                    dateFormat="yyyy년 MM월 dd일"
                    
                    onChange={date => setStartDate(date)}
                    className="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholderText="날짜를 선택하세요"
                  />
                   <div class="absolute inset-y-0 right-0 flex items-center">
                    </div>
                  </div>
                </div>
              <div  style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '75px', backgroundColor: '#1B5E20' }}
                  className="flex justify-center items-center"
                  onClick={onCloseModal}>
                <h1 style={{color:'white'}} className="text-2xl">등록</h1>
              </div>
            </Modal>
          </div>
        </div>
      </div>  
    </div>
  )
}