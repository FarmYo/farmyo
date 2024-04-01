import Three from "../../../../image/component/three.png"
import Trash from "../../../../image/component/trash.png"
import Edit from "../../../../image/component/edit.PNG"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import BackArrow from "../../../../image/component/trade/backarrow.png"
import WBackArrow from "../../../../image/component/trade/wbackarrow.png"
import { useEffect,useState } from "react"
import api from '../../../../api/api'
import { useNavigate,useParams } from "react-router-dom"
import React from "react"
import Slider from "react-slick";
import "../../../../css/slick.css"
import { useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import Gallery from '../../../../image/component/gallery.png'

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
  const { state } = useLocation()
  const { profileId } = state || {}
  const navigate = useNavigate()
  const param = useParams()
  const farmId= param.farmId
  const [writer,setWriter] = useState('')
  const [writeTime,setWriteTime] = useState('')
  const [farmContent,setFarmContent] = useState('')
  const [imageList,setImageList] = useState([])
  const [updateList,setUpdateList] = useState([])
  const [isImageUpdated, setIsImageUpdated] = useState(false)
  const [flag, setFlag] = useState(false);


  const [open,setOpen] = useState(false)
  const onOpenModal = () => {
    setOpen(true)
  };

  const onCloseModal = () => {
    setOpen(false);
  };

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




  //마이팜 상세 조회
  useEffect(()=>{
    // console.log(farmId)
    api.get('farms',{
      params :{
        id : farmId
      }
    })
    .then((res)=>{
      console.log(res)
      console.log('마이팜상세 조회성공')
      setWriter(res.data.dataBody.nickname)
      setWriteTime(res.data.dataBody.updatedAt)
      setFarmContent(res.data.dataBody.farmContent)
      setImageList(res.data.dataBody.myfarmImageDtoList)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[flag])

  // 뒤로가기
  const goBack = () => {
    const destination = profileId === undefined ? '/mypage/seller' : `/mypage/seller/${profileId}`;
    navigate(destination);
  }

  const settings = {
    dots: true, // 하단에 점으로 페이지 표시 여부
    infinite: true, // 무한으로 반복
    speed: 500, // 넘어가는 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 스크롤할 때 넘어가는 슬라이드 수
    adaptiveHeight: true
  };

  // 마이팜게시글 삭제하기
  const farmDelete = () =>{
    api.delete('farms',{
      params:{
        id:farmId
      }
    })
    .then((res)=>{
      console.log(res)
      console.log('삭제성공')
      Swal.fire({
        html: '<h1 style="font-weight: bold;">게시글이 삭제되었습니다</h1>',
        icon: 'success',
        showConfirmButton: false,
      });
      goBack()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

 // 마이팜게시물 수정
  const handleUpdate = () =>{
    console.log(imageList)
    console.log(updateList)
    const formData = new FormData();
    formData.append('id', farmId);
    formData.append('content', farmContent);
 
    // 이미지가 수정되었다면, 수정된 이미지 정보만 서버에 전송
    if (isImageUpdated) {
      const orders = updateList.map((file, index) => index + 1); // int 형식
      updateList.forEach((file, index) => {
        formData.append('files', file);
        formData.append('orders', index + 1);
      });
      api.put('farms/image',formData)
      .then((res)=>{
        console.log('수정성공')
        setFlag(!flag)
        Swal.fire({
          html: '<h1 style="font-weight: bold;">게시글이 수정되었습닌다</h1>',
          icon: 'success',
          showConfirmButton: false,
        });
        onCloseModal()
      })
      .catch((err)=>{
        console.log(err)
      })

    }
    // else{
    //   api.patch('farms',formData)




    // }
    
   

  }
  

  const handleFileInputClick = () => {
    // 숨겨진 file input을 클릭
    document.getElementById('hiddenFileInput').click();
  };

  const handleFileChange = (event) =>{
    const files = [...event.target.files];
    setUpdateList(files); // updateList 상태 업데이트
    setIsImageUpdated(true); // 이미지 업데이트 여부를 true로 설정
    
  }

  return(
    <div>
      <div style={{height:50,backgroundColor:'#1B5E20'}}>
        <div className="p-2 flex justify-between">
          <img src={WBackArrow} alt="" style={{ width:30,height:30}} onClick={goBack}/>
        </div>
      </div>
      {/* 마이팜사진위치 */}
        <Slider {...settings}  style={{ minHeight: '350px' }} className="sliderOne">
          {imageList.map((image, index) => (
            <div key={index}>
              <img src={image.imageUrl} alt={`slide-${index}`}/>
            </div>
          ))}
        </Slider>
  
      <div className="p-5 flex justify-between">
        <div>
          <h1 className='font-bold text-lg'>{writer}</h1>
          <h1 className=''>{writeTime}</h1>
        </div>
        <Menu as="div" className="text-left flex items-center">
          <div className="relative">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img src={Three} alt="" className="w-1"/>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item className="flex" onClick={onOpenModal}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <img src={Edit} alt="" style={{width:20}}
                   />수정하기
                  </a>
                
                )}
           
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item className='flex' onClick={farmDelete}>
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
        </div>
      </Menu>
    </div>
    {/* 마이팜작성글위치 */}
    <div className="p-5 pt-3 border-t-2 border-gray-200">
      <h1>{farmContent}</h1>
    </div>


    {/* ******마이팜게시글 수정하기모달******** */}
    <Modal open={open} onClose={onCloseModal} styles={styles}>
    <div className='pt-16'>
      {/* 미리보기사진위치 */}
      <Slider {...settings} className="sliderTwo mb-10">
        {isImageUpdated ? 
          updateList.map((file, index) => (
            <div key={index}>
              {/* 파일 객체로부터 URL 생성 및 이미지 태그의 src 속성에 사용 */}
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Preview ${index}`} 
                style={{ width: "100%", height: '150px' }} 
              />
            </div>
          ))
        :
          imageList.map((image, index) => (
            <div key={index}>
              {/* 서버로부터 받은 이미지 URL 사용 */}
              <img 
                src={image.imageUrl} 
                alt={`Image ${index}`} 
                style={{ width: "100%", height: '150px' }} 
              />
            </div>
          ))
        }
      </Slider>


















      <div className='flex justify-between'>
      <div>
      {/* <Menu as="div" className="relative inline-block text-left">
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
    </Menu> */}
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
      placeholder="내용을 입력하세요" value={farmContent}
      onChange={(e)=>setFarmContent(e.target.value)}></textarea>    
      <button class="btn h-10 w-full rounded-md mt-5" style={{ backgroundColor:'#1B5E20'}}
      onClick={handleUpdate}>
        <h1 style={{ color:'white' }} className="text-lg"
        >수정</h1>
      </button>
      </div>
    </Modal>















  </div>
  )
}



