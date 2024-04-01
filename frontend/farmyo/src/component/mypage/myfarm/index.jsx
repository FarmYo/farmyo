import React, { useState,useEffect } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Gallery from "../../../image/component/gallery.png"
import { jwtDecode } from 'jwt-decode';
import api from "../../../api/api"
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

export default function MyFarm(props) {
  const navigate = useNavigate()
  const loginId = jwtDecode( localStorage.getItem("access") ).loginId 
  const [farmList,setFarmList] = useState([]) //마이팜 게시물 조회시 담기는 리스트
  const [selectImage,setSelectImage] = useState([]) //게시물 생성시 선택한 이미지 리스트
  const [fileList,setFileList] = useState([])
  const [content,setContent] = useState('')
  const [flag, setFlag] = useState(false);

  // 마이팜 게시물 불러오기
   useEffect(()=>{
    console.log(loginId)
    console.log(props.profileId)
    const paramsLoginId = props.profileId !== undefined ? props.profileId : loginId;
    api.get('farms/list',{
      params:{
        loginId: paramsLoginId
      }
    })
    .then((res)=>{
      console.log(res)
      console.log('마이팜게시글조회 성공')
      setFarmList(res.data.dataBody)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[flag])

  const settings = {
    dots: true, // 하단에 점으로 페이지 표시 여부
    infinite: true, // 무한으로 반복
    speed: 500, // 넘어가는 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 스크롤할 때 넘어가는 슬라이드 수
    adaptiveHeight: true
  };



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

  const goMyfarmDeail = (farmId) =>{
    navigate(`/mypage/myfarm/${farmId}`,{ state: { profileId: props.profileId } })
  }

  
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

  const handleFileInputClick = () => {
    // 숨겨진 file input을 클릭
    document.getElementById('hiddenFileInput').click();
  };

  
  const handleFileChange = (event) => {
    setFileList([...event.target.files]) // 선택된 모든 파일을 저장 
    const files = event.target.files;
    if (files.length > 0) {
      const fileReaders = [];
      const urls = [];
  
      // 각 파일에 대해 FileReader를 생성하고, 이를 통해 DataURL을 얻음
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
  
        // 파일 읽기가 완료되면 urls 상태에 DataURL을 추가
        reader.onload = (e) => {
          urls.push(e.target.result);
  
          // 모든 파일의 읽기가 완료되었는지 확인
          if (urls.length === files.length) {
            setSelectImage(urls);
          }
        };
  
        reader.readAsDataURL(files[i]);
        fileReaders.push(reader);
      }
      // console.log(selectImage)
    }
  }


   // 마이팜게시물 생성
   const handleUpload = () =>{
    const formData = new FormData()
    formData.append('loginId',loginId)
    formData.append('content',content)

    const orders = fileList.map((file, index) => index + 1) //int형식

    fileList.forEach((file,index) => {
      formData.append('files',file)
      formData.append('orders',index+1)
    })
      // 'orders' 배열을 JSON 문자열로 변환하여 'orders' 필드에 추가


    api.post('farms',formData)
    .then((res)=>{
      console.log(res)
      console.log('생성성공')
      onCloseModal()
      setFlag(!flag)
    })
    .catch((err)=>{
      console.log(err)
    })
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
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 세 개의 컬럼으로 나눕니다.
    }} className='mt-2'>
      {farmList.map((farm, index) => (
        <img key={index} src={farm.imgUrl} alt="Farm" style={{width:'100%', height:'120px'}}
        onClick={()=>goMyfarmDeail(farm.id)}/>
      ))}
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
    <div className='pt-16'>
      {/* 미리보기사진위치 */}
      <Slider {...settings} className="sliderTwo mb-10">
        {selectImage.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Preview ${index}`} style={{ width: "100%",height:'150px'}} />
          </div>
        ))}
      </Slider>


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
                  
    {/* 마이팜게시물생성 사진불러오기 */}
    <div className='flex items-center justify-between'>
      <div className='flex' onClick={handleFileInputClick}>
        <h1 className='font-bold'>+</h1>
        <img src={Gallery} alt="" style={{ width:40 }} className='mr-3'/>
      </div>
    </div>
    <input
        type="file"
        id="hiddenFileInput"
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />

      </div>
      <textarea className="textarea w-full h-28 textarea-bordered mt-10" 
      placeholder="내용을 입력하세요"
      onChange={(e)=>setContent(e.target.value)}></textarea>    
      <button class="btn h-10 w-full rounded-md mt-5" style={{ backgroundColor:'#1B5E20'}}
      onClick={handleUpload}>
        <h1 style={{ color:'white' }} className="text-lg"
        >등록</h1>
      </button>
      </div>
    </Modal>
  </div>
 )
}
