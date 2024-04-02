import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Dropdown from '../../../image/component/dropdown.png'
import Up from '../../../image/component/up.png'
import Search from '../../../image/component/search.png'
import { useState,useEffect } from 'react'
import SellBoardList from '../../../component/board/sellboard'
import BuyBoardList from '../../../component/board/buyboard'
import { useLocation } from 'react-router-dom'

export default function BoardNav(){
  const location = useLocation()
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [selectedItem, setSelectedItem] = useState('전체');
  const [selected,setSelected] = useState(null) // 팝니다클릭 or 삽니다클릭

  const handleClick = (index) => {
    setSelected(index)
  }

  useEffect(()=>{
    // url의 상태확인하고 selected상태 설정
    const stateSelected = location.state?.selected;
    if(stateSelected !== undefined) {
      setSelected(stateSelected);
    } else {
      setSelected(0); // 기본값
    }
  }, [location])


  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}} className="p-2 flex items-center">
        <h1 className="text-xl font-bold" style={{color:"white"}}>팜&삼</h1> 
      </div>
      <div className='p-5 flex justify-between'>
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-32 h-12 justify-between items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          style={{ border: '3px solid #81C784', backgroundColor: 'transparent'}}>
            <div className='pl-3'>{selectedItem}</div>
            <img src={Dropdown} alt="" style={{width:15,height:10}}/>
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
              {['전체','농산물', '제목', '작성자'].map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                      onClick={() => setSelectedItem(item)}
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
      <div style={{ position:'relative' }}>
        <input type="text" className="input w-44" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}} />
        <img src={Search} alt="" style={{ position: 'absolute', right: '13px', top: '25%',width:25,height:25}} />
      </div>
    </div>
    <div className='flex justify-around border-b-2 border-t-2 border-gray-300 p-2' style={{height:50}} >
        <h1 className='font-bold text-lg' style={{ color: selected === 0 ? 'black' : 'gray' }} onClick={()=>{handleClick(0)}}>팝니다</h1>
        <h1 className='font-bold text-lg' style={{ color: selected === 1 ? 'black' : 'gray' }} onClick={()=>{handleClick(1)}}>삽니다</h1>
    </div>
      {selected === 0 && <SellBoardList />}
      {selected === 1 && <BuyBoardList />} 
    </div>
  )                                                       
}