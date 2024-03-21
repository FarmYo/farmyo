import Next from "../../../image/component/next.png"
import Vet from "../../../image/component/vet.png"
import Harvest from "../../../image/component/harvest.png"
import Gumsa from "../../../image/component/gumsa.png"
import Inz from "../../../image/component/inz.png"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import React,{ useState,useEffect } from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ko from 'date-fns/locale/ko'
import Pesticide from '../../form/pesticide'
import Award from '../../form/award'
import '../../../css/liferecord.css'
import axios from 'axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MyCrops() {
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
  

  const [startDate,setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selected,setSelected] = useState('')
  const cropList = ['감자','호박','고추','오이','사과']  // 작물등록시 작물 리스트
  const [selectedCrop, setSelectedCrop] = useState('작물을 선택하세요')
  const [cropsList,setCropsList] = useState([]) // 작물조회시 담길 리스트

  
  useEffect(()=>{
    setSelected('구분')
    // 작물 리스트 조회
    axios({
      url:'http;//192.168.100.116/api/crops/ssafy1',
      method:'get'
    })
    .then((res)=>{
      console.log(res)
      setCropsList(res.data.dataBody)
    })
    .catch((err)=>{
      console.log(err)
    })
    // 작물 카테고리 조회
    // axios({
    //   url:'https://j10d209.p.ssafy.io/api/crops/category',
    //   method:'get'
    // })
    // .then((res)=>{
    //   console.log(res)
    //   setCropsList(res.data.dataBody)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  },[])
  

  const [open,setOpen] = useState(false)
  const [infoOpen,setInfoOpen] = useState(false)
  const [info2Open,setInfo2Open] = useState(false)
  const [addRecord,setAddRecord] = useState(false)
  const [harvestOpen,setHarvestOpen] = useState(false)
  const [apiOpen,setApiOpen] = useState(false)
  const [testOpen,setTestOpen] = useState(false)
  const [certificationOpen,setCertificationOpen] = useState(false)
  const [lifeRecordOpen,setLifeRecordOpen] = useState(false)


  //농산물등록모달
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };
  // 농산물정보보기모달(수확전)
  const infoOpenModal = () => {
    setInfoOpen(true);
  };

  const infoCloseModal = () => {
    setInfoOpen(false);
  };
  // 농산물정보보기모달(수확후)
  const info2OpenModal = () => {
    setInfo2Open(true);
  };

  const info2CloseModal = () => {
    setInfo2Open(false);
  };

  //농산물생애기록추가모달
  const addRecordModal = () => {
    setAddRecord(true);
  };

  const addRecordCloseModal = () => {
    setAddRecord(false);
  };
  //수확하기 모달
  const harvestOpenModal = (event) => {
    setHarvestOpen(true);
  };

  const harvestCloseModal = () => {
    setHarvestOpen(false);
  };

  //검사및 인증정보 불러오기
  const ApiOpenModal = () => {
    setApiOpen(true);
  };

  const ApiCloseModal = () => {
    setApiOpen(false);
  };

  // 검사정보 모달
  const TestOpenModal = () => {
    setTestOpen(true);
  };

  const TestCloseModal = () => {
    setTestOpen(false);
  };

  // 인증정보 모달
  const CertificationOpenModal = () => {
    setCertificationOpen(true);
  };

  const CertificationCloseModal = () => {
    setCertificationOpen(false);
  };

  // 생애기록 모달
  const LifeRecordOpenModal = () => {
    setLifeRecordOpen(true);
  };

  const LifeRecordCloseModal = () => {
    setLifeRecordOpen(false);
  };
  
  


  return(
    // "작물없으면 등록한 작물이 없습니다"노출
    <div style={{ position:'relative',height:'400px'}}>
      {/* 아래의 디브가 작물이 추가될 때마다 반복됨  */}
      {/* {cropsList.map((crop)=>{
      <div  key={crop.id} className="flex">
        <div style={{backgroundColor:'#bbbbbb',width:80}}></div>
        <div className="p-5">
          <h1 className="font-bold">{crop.cropName}</h1>
          {crop.cropHarvestDate && <h1 className="text-sm">{crop.cropHarvestDate}</h1>}
        </div>
        <div className="ml-auto flex items-center p-5" onClick={infoOpenModal}>
          <img src={Next} alt="" style={{width:30,height:30}}/>
        </div>
      </div>
      })} */}
      
  
      <div style={{ position: 'absolute', bottom: 0, right: 10}}>
        <div style={{backgroundColor:'#1B5E20',borderRadius: '50%', width: '50px', height: '50px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '40px' }}
          onClick={onOpenModal}>
            +</div>
        </div>
      </div>
     

      {/* ********모달모음************ */}
      {/* ******농산물 등록모달창***** */}
      <Modal open={open} onClose={onCloseModal} styles={styles}>
        <div className="flex justify-center items-center pt-32">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md
          bg-white px-12 py-3 text-xl text-gray-900 font-semibold
            ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedCrop}
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
              {cropList.map((crop,index)=>(
              <Menu.Item onClick={() => setSelectedCrop(crop)}> 
                {({ active }) => (
                  <button
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-12 py-2 text-xl'
                      
                    )}
                  >
                    {crop}
                  </button>
                )}
                </Menu.Item>
                ))}
                </div>
              </Menu.Items>
            </Transition>   
          </Menu>
          </div>
          <div className="px-8 py-16 ">
            <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              placeholder="재배지를 입력하세요"/>
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
            </div>
            <div style={{width: '100%', height: '50px', backgroundColor: '#1B5E20' }}
              className="flex justify-center items-center rounded-md mt-16"
              onClick={onCloseModal}>
              <h1 style={{color:'white'}} className="text-2xl">등록</h1>
            </div>
          </div>
        
      </Modal>
      {/* *******농산물정보보기모달(수확전)****** */}
      <Modal open={infoOpen} onClose={infoCloseModal} styles={styles}>
        <div className="mt-28">
        <div className="px-8">
          <label for="price" class="block text-xl font-medium leading-6 text-gray-900">작물명</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="작물명입력됨" disabled/>
          </div>
        </div>
        <div className="px-8 mt-4">
          <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="재배지입력됨" disabled/>
          </div>
        </div>
        <div className="px-8 mt-4">
          <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="날짜입력됨" disabled />
          </div>
        </div>
        <div className="px-8 mt-10">
          <button className="btn w-full flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
            <img src={Vet} alt="" style={{width:40,height:30}}/>
            <div className="font-bold" onClick={LifeRecordOpenModal}>농산물 생애기록 보기</div>
          </button>
        </div>
        {/* 아래부분은 판매자만보이게 */}
        <div className="px-8 flex justify-end mt-3">
          <p className="text-md font-bold" onClick={addRecordModal}>+생애기록 추가하기</p>
        </div>
        <div className="px-8 mt-10" onClick={harvestOpenModal}>
          <button className="btn w-full flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
            <img src={Harvest} alt="" style={{width:40,height:30}}/>
            <div className="mr-5 font-bold">수확하기</div>
          </button>
        </div>
        </div>
      </Modal>
      {/* 농산물 생애기록보기 모달 */}
      <Modal open={lifeRecordOpen} onClose={LifeRecordCloseModal} styles={styles}>
        <div class="timeline">
          <div class="event">
            <div class="text-xl font-bold">2023-05-10</div>
            <div class="event-circle"></div>
            <div className="font-bold mt-5">심은날짜</div>    
            <div>2022-10-2</div>
            <div className="font-bold mt-5">재배지</div>    
            <div>경상북도 고령군 대가야읍</div>
          </div>
        </div>               
      </Modal>

       {/* *******농산물정보보기모달(수확후)****** */} 
       <Modal open={info2Open} onClose={info2CloseModal} styles={styles}>
        <div className="pt-5">
          <div className="px-8">
          <div style={{ height:100, backgroundColor:'#bbbbbb'}}>
            사진있음
          </div>
          </div>
          <div className="px-8 mt-4">
            <label for="price" class="block text-lg font-medium leading-6 text-gray-900">작물명</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="작물명입력됨" disabled/>
            </div>
          </div>
          <div className="px-8 mt-4">
            <label for="price" class="block text-lg font-medium leading-6 text-gray-900">재배지</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="재배지입력됨" disabled/>
            </div>
          </div>
          <div className="px-8 mt-4">
            <label for="date" class="block text-lg  font-medium leading-6 text-gray-900">심은날짜</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="날짜입력됨" disabled />
            </div>
          </div>
          <div className="px-8 mt-4">
            <label for="date" class="block text-lg  font-medium leading-6 text-gray-900">수확날짜</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="날짜입력됨" disabled />
            </div>
          </div>
          <div className="px-8 mt-10 flex justify-center">
            <button className="btn w-56 flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
              <img src={Vet} alt="" style={{width:40,height:30}}/>
              <div className="font-bold" onClick={LifeRecordOpenModal}>농산물 생애기록 보기</div>
            </button>
          </div>
          <div className="px-8 mt-5 flex justify-center">
            <button className="btn w-56 flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}
            onClick={TestOpenModal}>
              <img src={Gumsa} alt="" style={{width:40,height:30}}/>
              <div className="font-bold">농산물 검사정보 확인</div>
            </button>
          </div>
          <div className="px-8 mt-5 flex justify-center">
            <button className="btn w-56 flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}
            onClick={CertificationOpenModal}>
              <img src={Inz} alt="" style={{width:40,height:30}}/>
              <div className="font-bold" >농산물 인증정보 확인</div>
            </button>
          </div>
        </div>
      </Modal>
      {/* ******농산물검사정보모달******* */}
      <Modal open={testOpen} onClose={TestCloseModal} styles={styles}>
        <div style={{ position:'fixed',top:0,left:0, width: '100%', height: '50px', backgroundColor: '#1B5E20'}}
          className="flex justify-center items-center">
          <h1 style={{color:'white'}} className="text-2xl">검사정보</h1>
        </div>
        {/* 아래가 반복됨 */}
        <div className="pt-10">
          <div className="flex justify-start"><h1 className="text-lg font-bold">2024.04.01</h1></div>
          <div style={{border:'1px solid gray'}} className="rounded-md">
            <div className="flex justify between">
              <div className="px-4 mt-4">
                <label for="price" class="block text-lg font-medium leading-6 text-gray-900">검사명</label>
                <div class="relative mt-2 rounded-md">
                  <input type="text" name="price" id="price" class="block h-10 pl-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="잔류농약검사" disabled/>
                </div>
              </div>
              <div className="mt-4">
                <label for="price" class="block text-lg font-medium leading-6 text-gray-900">검사번호</label>
                <div class="relative mt-2 rounded-md">
                  <input type="text" name="price" id="price" class="block h-10 pl-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="30" style={{ width:80}}disabled/>
                </div>
              </div>
            </div>
            <div className="px-4 mt-4">
              <label for="price" class="block text-lg font-medium leading-6 text-gray-900">검사결과</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="불검출" disabled/>
              </div>
            </div>
            <div className="px-4 mt-4 mb-4">
              <label for="price" class="block text-lg font-medium leading-6 text-gray-900">검사기관명</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="농산물품질관리원경기지원" disabled/>
              </div>
            </div>
          </div>
        </div>
      </Modal>

       {/* ******농산물인증정보모달******* */}
       <Modal open={certificationOpen} onClose={CertificationCloseModal} styles={styles}>
        <div style={{ position:'fixed',top:0,left:0, width: '100%', height: '50px', backgroundColor: '#1B5E20'}}
          className="flex justify-center items-center">
          <h1 style={{color:'white'}} className="text-2xl">인증정보</h1>
        </div>
        {/* 아래가 반복됨 */}
        <div className="pt-10">
          <div className="flex justify-start"><h1 className="text-lg font-bold">2024.04.01</h1></div>
          <div style={{border:'1px solid gray'}} className="rounded-md">
            <div className="px-4 mt-4">
              <label for="price" class="block text-lg font-medium leading-6 text-gray-900">인증/표시명</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 pl-2 rounded-md border-0 w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="GAP인증" disabled/>
              </div>
            </div>
            <div className="px-4 mt-4">
              <label for="price" class="block text-lg font-medium leading-6 text-gray-900">인증/표시번호</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 pl-2 rounded-md w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="021-1009-001" disabled/>
              </div>
            </div>
         
            <div className="px-4 mt-4 mb-4">
              <label for="price" class="block text-lg font-medium leading-6 text-gray-900">인증기관명</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="(주)논산농산물수출물류센타" disabled/>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ******생애기록추가모달******** */}
      <Modal open={addRecord} onClose={addRecordCloseModal} styles={styles}>
      <div className="flex justify-center items-center pt-28">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md
          bg-white px-12 py-3 text-xl text-gray-900 font-semibold
            ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selected}
            <ChevronDownIcon className="ml-5 h-8 w-8 text-gray-400" aria-hidden="true" />     
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
          style={{width:'15rem'}}>
            <div className="py-1">
              <Menu.Item onClick={()=>setSelected('농약사용')}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-10 py-2 text-lg' 
                    )}
                  >
                  농약사용
                  </a>
                )}
                </Menu.Item>
                <Menu.Item onClick={()=>setSelected('지역대회수상')}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-10 py-2 text-lg'
                      )}
                    >
                      지역대회수상
                    </a>
                  )}
                </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>   
          </Menu>
          </div>
          {/* 추가모달폼 */}
          { selected ==='농약사용' && <Pesticide onRegister={addRecordCloseModal}/>}
          { selected ==='지역대회수상' && <Award onRegister={addRecordCloseModal}/>}
          </Modal>
          
          {/* 수확하기모달폼 */}
          
          <Modal open={harvestOpen} onClose={harvestCloseModal} styles={styles}>
            <div className="pt-10">
            <div className="px-8">
              <div style={{ backgroundColor:'#bbbbbb',height:150,width:250 }} className="flex justify-center items-center">
                <h1>+수확사진추가</h1>
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="price" class="block text-xl font-medium leading-6 text-gray-900">작물명</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="작물명입력됨" disabled/>
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="재배지입력됨" disabled/>
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="날짜입력됨" disabled />
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="date" class="block text-xl font-medium leading-6 text-gray-900">수확날짜</label>
              <div class="relative mt-2 rounded-md">
                <DatePicker
                locale={ko}
                selected={endDate}
                dateFormat="yyyy년 MM월 dd일"
 
                onChange={date => setEndDate(date)}
                className="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholderText="날짜를 선택하세요"
                />
              </div>
            </div>
            <div className="px-8 mt-10">
              <button className="btn w-full flex justify-around" style={{ border:'1px solid #bbbbbb', backgroundColor: 'transparent'}}>
                <div className="font-bold text-sm" onClick={ApiOpenModal}>+검사 및 인증정보 불러오기</div>
              </button>
            </div> 
            </div>
            <div style={{ position:'fixed', bottom: 0, left: 0, width: '100%', height: '75px', backgroundColor: '#1B5E20'}}
              className="flex justify-center items-center"
              onClick={harvestCloseModal}>
              <h1 style={{color:'white'}} className="text-2xl">저장</h1>
            </div>
          </Modal>

          {/* 검사 및 인증정보 불러오기 모달 */}
          
          <Modal open={apiOpen} onClose={ApiCloseModal} styles={styles}>
            <div className="pt-32">
              <div className="px-8 mt-4">
                <label for="price" class="block text-xl font-medium leading-6 text-gray-900">이력관리번호</label>
                <div class="relative mt-2 rounded-md">
                  <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0  text-gray-900 ring-1 pl-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="이력관리번호를 입력하세요" />
                </div>
              </div>
              <div className="px-8 mt-4">
                <label for="date" class="block text-xl font-medium leading-6 text-gray-900">상품일련번호</label>
                <div class="relative mt-2 rounded-md">
                  <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0  pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="상품일련번호를 입력하세요" />
                </div>
              </div>
              <div className="px-8 mt-10">
                <div class="relative mt-2 rounded-md">
                  <button class="btn h-10 w-full rounded-md border-0 " style={{ backgroundColor:'#1B5E20'}}
                  onClick={ApiCloseModal}>
                    <h1 style={{ color:'white' }} className="fo">확인</h1>
                  </button>
                </div>
              </div>      
            </div>
          </Modal>

    </div> 
  )
}