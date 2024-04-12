import { Menu, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Dropdown from "../../../image/component/trade/downarrow.png";
import Up from "../../../image/component/up.png";

export default function TabSelect({ selected, handleClick, selectedItem, setSelectedItem }) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴 열림닫힘 구분

  return (
    <>
      {/* <div className='flex justify-around border-b-2 p-2 border-gray-300' style={{height:60}}> */}
      <div
        className="fixed flex justify-around w-full z-50 top-50px bg-white border-b-2 p-2 border-gray-300"
        style={{ height: 60 }}
      >
        <div className="flex justify-center items-center">
          <h1
            className="font-bold text-lg"
            style={{ color: selected === 0 ? "black" : "gray" }}
            onClick={() => {
              handleClick(0);
            }}
          >
            진행중인 거래
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <h1
            className="font-bold text-lg"
            style={{ color: selected === 1 ? "black" : "gray" }}
            onClick={() => {
              handleClick(1);
            }}
          >
            완료된 거래
          </h1>
        </div>
      </div>
      {selected === 0 && (
        // 드롭다운
        <div className="fixed top-100px w-full z-50 bg-white">
          <Menu as="div" className="flex p-2 justify-end">
            <div>
              <Menu.Button
                className="flex w-40 h-12 justify-between items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                style={{ border: "3px solid #2E8B57" }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="pl-2">{selectedItem}</div>
                <div className="flex items-center justify-center">
                  <img
                    src={isOpen ? Up : Dropdown}
                    alt=""
                    style={{
                      width: isOpen ? 32 : 24,
                      height: isOpen ? 32 : 24,
                    }}
                    className="mt-0.5"
                  />
                </div>
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
              <Menu.Items className="absolute mt-14 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {["전체", "입금 대기중", "입금 완료", "배송중"].map((item) => (
                    <Menu.Item key={item}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } block px-4 py-2 text-sm`}
                          onClick={(e) => {
                            setSelectedItem(item);
                            setIsOpen(false);
                          }}
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
      )}
    </>
  );
}
