import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Dropdown from '../../../image/component/dropdown.png'
import Search from '../../../image/component/search.png'

export default function ToggleButtons({ selected, setSelected, selectedItem, setSelectedItem, searchName, setSearchName }) {

    const handleClick = (index) => {
        setSelected(index)
    }

    return (
        <div className="fixed top-50px w-full z-50 bg-white">
            {/* 검색 */}
            <div className='p-4 flex justify-between'>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-28 h-12 justify-between items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        style={{ border: '3px solid #2E8B57', backgroundColor: 'transparent'}}>
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
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    <input 
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                    type="text" className="input w-52" style={{ border:'3px solid #2E8B57',backgroundColor: 'transparent'}}
                    disabled={selectedItem === "전체"}
                    placeholder={selectedItem === "전체" ? "조건선택 후 검색" : ""}
                    />
                    <img src={Search} alt="" style={{ position: 'absolute', right: '13px', top: '25%',width:25,height:25}} />
                </div>
            </div>  
            {/* 카테고리 버튼 */}
            <div className='flex justify-around border-b-2 border-t-2 border-gray-300 p-2' style={{height:50}} >
                <h1 className='font-bold text-lg' style={{ color: selected === 0 ? 'black' : 'gray' }} onClick={()=>{handleClick(0)}}>팝니다</h1>
                <h1 className='font-bold text-lg' style={{ color: selected === 1 ? 'black' : 'gray' }} onClick={()=>{handleClick(1)}}>삽니다</h1>
            </div>
        </div>
    );
}