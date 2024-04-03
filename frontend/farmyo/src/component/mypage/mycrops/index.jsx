import Next from "../../../image/component/next.png"
import Vet from "../../../image/component/vet.png"
import Harvest from "../../../image/component/harvest.png"
import Gumsa from "../../../image/component/gumsa.png"
import Inz from "../../../image/component/inz.png"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import React,{ useState,useEffect,useRef} from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ko from 'date-fns/locale/ko'
import Pesticide from '../../form/pesticide'
import Award from '../../form/award'
import '../../../css/liferecord.css'
import api from "../../../api/api"
import '../../../css/pagenation.css'
import Web3 from "web3"
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom"
import CropStanby from "../../../image/component/cropstanby.gif"
import Gallery from "../../../image/component/gallery.png"
import Swal from "sweetalert2"
import BeforeHarvest from '../../../image/component/beforeharvest.png'
import Daegi from '../../../image/component/daegi.gif'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function MyCrops(props) {
  const navigate = useNavigate()
  const loginId = jwtDecode( localStorage.getItem("access") ).loginId

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
  
  const [selected,setSelected] = useState('')
  const [cropList,setCropList] = useState([]) // 작물등록시 작물 리스트
  const [cropsList,setCropsList] = useState([]) // 농부가 등록한 작물조회시 담길 리스트
  const [cropId,setCropId] = useState(null)
 
  
  const [lifeCycleList,setLifeCycleList] = useState([])

  //작물 블록체인 기록 조회
  //새로운 web3객체생성
  const web3 = new Web3('https://rpc2.sepolia.org'); // 이더리움 노드 주소를 설정합니다.
  // solidity로 배포한 파일 정보 기록
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_contestName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_awardDetails",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_eventDate",
          "type": "uint256"
        }
      ],
      "name": "addContestInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_eventDate",
          "type": "uint256"
        }
      ],
      "name": "addHarvestInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_cropName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_land",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_eventDate",
          "type": "uint256"
        }
      ],
      "name": "addPlantingInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_pesticideName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_pesticideType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_eventDate",
          "type": "uint256"
        }
      ],
      "name": "addUsageInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "contestInfos",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "infoType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "contestName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "awardDetails",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "eventDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        }
      ],
      "name": "getContestInfos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "infoType",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "contestName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "awardDetails",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "eventDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct CropData.ContestInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        }
      ],
      "name": "getHarvestInfos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "infoType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "eventDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct CropData.HarvestInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        }
      ],
      "name": "getPlantingInfos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "infoType",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "cropName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "land",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "eventDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct CropData.PlantingInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropPK",
          "type": "uint256"
        }
      ],
      "name": "getUsageInfos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "infoType",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "pesticideName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "pesticideType",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "eventDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct CropData.UsageInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "harvestInfos",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "infoType",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "eventDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "plantingInfos",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "infoType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "cropName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "land",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "eventDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "usageInfos",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "infoType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "pesticideName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "pesticideType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "eventDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  //접근할 계약 주소
  const contractAddress = '0xE8448EEB2629E3e96f96f8EBedc9Fd2faa6fe20c';
  //계약 객체 생성
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  //모든 정보 호출하여 데이터 가져와서 시간 순으로 정렬
  async function fetchData(cropPK) {
    setIsLoading(true);
    try {
      const plantingInfo = await contract.methods.getPlantingInfos(cropPK).call();
      const usageInfos = await contract.methods.getUsageInfos(cropPK).call();
      const contestInfos = await contract.methods.getContestInfos(cropPK).call();
      const harvestInfos = await contract.methods.getHarvestInfos(cropPK).call();

      let allInfos = [];

      // 작물 재배 정보 추가 (단일 객체일 경우 배열에 직접 추가)
      if (plantingInfo && plantingInfo.eventDate !== undefined) {
        allInfos.push({
          ...plantingInfo,
          infoType: Number(plantingInfo.infoType),
          eventDate: Number(plantingInfo.eventDate)
        });
      }

      // 작물 사용 정보 추가
      usageInfos.forEach(info => {
        if (info.eventDate !== undefined) {
          allInfos.push({
            ...info,
            infoType: Number(info.infoType),
            eventDate: Number(info.eventDate)
          });
        }
      });

      // 작물 대회 정보 추가
      contestInfos.forEach(info => {
        if (info.eventDate !== undefined) {
          allInfos.push({
            ...info,
            infoType: Number(info.infoType),
            eventDate: Number(info.eventDate)
          });
        }
      });

      // 작물 수확 정보 추가 (배열일 경우 각 항목을 처리)
      harvestInfos.forEach(info => {
        if (info.eventDate !== undefined) {
          allInfos.push({
            ...info,
            infoType: Number(info.infoType),
            eventDate: Number(info.eventDate)
          });
        }
      });

      // eventDate를 기준으로 정렬
      const sortedInfos = allInfos.sort((a, b) => a.eventDate - b.eventDate);
      setLifeCycleList(sortedInfos)
      console.log(lifeCycleList)

      return sortedInfos;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }finally {
      setIsLoading(false); // 로딩 완료
    }
  }

  // const cropPK = 32; // 예시 CropPK
  // fetchData(cropPK).then(sortedInfos => {
  //   console.log(sortedInfos); // 정렬된 정보 출력
  // }).catch(error => {
  //   console.error('Error fetching data:', error);
  // });

   //작물 리스트 5개단위로 페이지네이션
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 3
   //전체 페이지수 계산
   const totalItems = cropsList.length;
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   const groupSize = 3; // 페이지 그룹당 최대 페이지 수
   const [currentGroup, setCurrentGroup] = useState(1); // 현재 페이지 그룹
  // currentPage에 따라 보여줄 항목 계산
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = cropsList.slice(indexOfFirstItem, indexOfLastItem)


  // 현재 페이지 그룹에 따라 보여줄 페이지 번호 계산
  const firstPageInGroup = (currentGroup - 1) * groupSize + 1;
  const lastPageInGroup = Math.min(firstPageInGroup + groupSize - 1, totalPages);


   // 페이지 변경 함수
  //  const goToNextPage = () => {
  //   setCurrentPage(currentPage => {
  //     if (currentPage < totalPages) return currentPage + 1;
  //     return currentPage;
  //   });
  // };
  //  const goToPrevPage = () => setCurrentPage(page => page > 1 ? page - 1 : page);

   const pageNumbers = [];
  for (let i = firstPageInGroup; i <= lastPageInGroup; i++) {
    pageNumbers.push(i);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const goToNextGroup = () => setCurrentGroup(group => Math.min(group + 1, Math.ceil(totalPages / groupSize)));
  const goToPrevGroup = () => setCurrentGroup(group => Math.max(group - 1, 1));

  const [flag,setFlag] = useState(false)

  useEffect(()=>{
    setSelected('농약사용')
    // 작물 리스트 조회
    if (!props.profileId) {
      api.get(`crops/list/${loginId}`)
      .then((res)=>{
        console.log(res)
        setCropsList(res.data.dataBody)
      })
      .catch((err)=>{
        console.log(err)
      })
    }else{
      api.get(`crops/list/${props.profileId}`)
      .then((res)=>{
        console.log(res)
        setCropsList(res.data.dataBody)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    // 작물 카테고리 조회
    api.get('crops/category')
    .then((res)=>{
      // console.log(res)
      setCropList(res.data.dataBody)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[flag])
  

  const [open,setOpen] = useState(false)
  const [infoOpen,setInfoOpen] = useState(false)
  const [info2Open,setInfo2Open] = useState(false)
  const [addRecord,setAddRecord] = useState(false)
  const [harvestOpen,setHarvestOpen] = useState(false)
  const [apiOpen,setApiOpen] = useState(false)
  const [testOpen,setTestOpen] = useState(false)
  const [certificationOpen,setCertificationOpen] = useState(false)
  const [lifeRecordOpen,setLifeRecordOpen] = useState(false)
  // 농산물 상세정보 데이터
  const [cropName,setCropName] = useState('')
  const [cropPlantingDate,setCropPlantingDate] = useState('')
  const [cropCultivationSite,setCropCultivationSite] = useState('')
  const [cropHarvestDate,setCropHarvestDate] = useState('')
  const [cropImgUrl,setCropImgUrl] = useState('')


  //작물등록모달 오픈
  const onOpenModal = () => {
    setOpen(true);
  };

  //작물 등록에 필요한 값
  const [selectedCrop, setSelectedCrop] = useState({ id: null, categoryName: '작물을 선택하세요' })
  const [cultivation,setCultivation] = useState('') // 재배지
  const [plantingDate,setPlantingDate] = useState('') // 심은날짜
  const [cropStatus,setCropStatus] = useState('')

  const onCloseModal = () => {
    setOpen(false)
  };


  // 농산물정보보기모달(수확전)
  const infoOpenModal = (crop_id) => {
    console.log(loginId)
    console.log(props.profileId)
    console.log(crop_id)
    setInfoOpen(true);
    api.get(`crops/${crop_id}`) // crop_id 변수를 URL에 삽입
    .then((res)=>{
      console.log(res)
      console.log('농산물 상세정보(수확전)조회성공')
      setCropName(res.data.dataBody.cropName)
      setCropPlantingDate(res.data.dataBody.cropPlantingDate)
      setCropCultivationSite(res.data.dataBody.cropCultivationSite)
      setCropId(res.data.dataBody.id)

    })
    .catch((err)=>{
      console.log(err)
    })
  };
  
 
 // 작물등록하기
  const handelRegisterCrop = async () => {
    try {
      // 대기 화면으로 이동
      navigate('/stanby/crop');
      const res = await api.post('crops', {
        cropCategoryId: selectedCrop.id,
        cultivation: cultivation,
        plantingDate: plantingDate,
      });
  
      console.log('작물등록성공');
      console.log(res);
      Swal.fire({
        html: '<h1 style="font-weight: bold;">작물이 등록되었습니다</h1>',
        icon: 'success',
        showConfirmButton: false,
      });
      setSelectedCrop({ id: null, categoryName: '작물을 선택하세요' });
      setCultivation('');
      setPlantingDate('');
      navigate('/mypage/seller',{ state: { selectedTabIndex: 1 } })


    } catch (err) {
      console.log(err);
    }
  };
  
  const infoCloseModal = () => {
    setInfoOpen(false);
  };

  // 농산물정보보기모달(수확후)
  const info2OpenModal = (crop_Id) => {
    setInfo2Open(true);
    api.get(`crops/${crop_Id}`)// crop_id 변수를 URL에 삽입
    .then((res)=>{
      console.log(res)
      setCropName(res.data.dataBody.cropName)
      setCropPlantingDate(res.data.dataBody.cropPlantingDate)
      setCropCultivationSite(res.data.dataBody.cropCultivationSite)
      setCropHarvestDate(res.data.dataBody.cropHarvestDate)
      setCropImgUrl(res.data.dataBody.cropImgUrl)
      setCropStatus(res.data.dataBody.cropStatus) // 0이면 수확전 1이면 수확후
      setCropId(crop_Id)
      
    })
    .catch((err)=>{
      console.log(err)
    })
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

  // 생애기록 모달(블록체인)
  const LifeRecordOpenModal = () => {
    fetchData(cropId)
    if (!isLoading) {
    setLifeRecordOpen(true)
    }
  };

  const LifeRecordCloseModal = () => {
    setLifeCycleList([])
    setLifeRecordOpen(false);
  };

  const [stanbyModal,setStanbyModal] = useState(false)

  const stanbyOpenModal = () => {
    setStanbyModal(true);
  };

  const stanbyCloseModal = () => {
    setStanbyModal(false);
  };

  
  // 수확하기 블록체인저장
  const handleRegister = () => {
    // 대기 모달오픈
    stanbyOpenModal()
    api.post(`crops/${cropId}`,{
      type:3,
      eventDate:cropHarvestDate
    })
    .then((res)=>{
      console.log(res)
      console.log('수확정보 블록체인저장 성공')
      stanbyCloseModal()
      harvestCloseModal() // 수확모달닫기
      Swal.fire({
        html: '<h1 style="font-weight: bold;">수확성공!<br/>사진을 등록해주세요</h1>',
        icon: 'success',
        showConfirmButton: false,
      });
      infoCloseModal()
      info2OpenModal()

    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const [harvestImage,setHarvestImage] = useState(null)
  const [selectImage,setSelectImage] = useState('')

  const handleFileInputClick = () => {
    // 숨겨진 file input을 클릭
    document.getElementById('hiddenFileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 단일 파일만 선택
    if (file) {
      setHarvestImage(file)
        const reader = new FileReader();
        reader.onload = (e) => {
            // 파일 읽기가 완료되면 미리보기 URL을 상태에 설정
            setSelectImage(e.target.result);
        };
        
        reader.readAsDataURL(file);
    }

  }

  // 수확후 단일사진저장하기
  const handleUpload = () =>{
    console.log(cropId)
    const formData = new FormData()
    if (harvestImage) {
      formData.append('cropImg',harvestImage)
    }
    api.patch(`crops/${cropId}`,formData)
    .then((res)=>{
      console.log(res)
      console.log('수확사진저장성공')
      Swal.fire({
        html: '<h1 style="font-weight: bold;">사진저장성공!</h1>',
        icon: 'success',
        showConfirmButton: false,
      });
      setFlag(!flag)
    })
    .catch((err)=>{
      console.log(err)
    })
  }  




  return(
    // "작물없으면 등록한 작물이 없습니다"노출
    <div style={{ position:'relative',height:'410px'}}>
      {cropsList.length > 0 ?(
        <>
      {/* 아래의 디브가 작물이 추가될 때마다 반복됨  */}
      {currentItems.map((crop,index)=>(
      <div  key={crop.id} className="flex"
            onClick={crop.cropHarvestDate == null ? () => infoOpenModal(crop.id) : () => info2OpenModal(crop.id)}>
        {/* <div style={{backgroundColor:'#bbbbbb',width:80}}></div> */}
        {crop.cropHarvestDate ? (
      <img src={crop.cropImgUrl} alt="Crop Image" style={{width:80, height: 70, objectFit: 'cover'}} />
    ) : (
      <img src={BeforeHarvest} alt="" style={{width:80,height:70,border: '1px solid gray'}}/> // 수확전사진 넣기
    )}
      <div className="p-2">
        <h1 className="font-bold">{crop.cropName}</h1>
        {crop.cropHarvestDate && <h1 className="text-sm">수확날짜 : {crop.cropHarvestDate}</h1>}
      </div>
        <div className="ml-auto flex items-center p-5"
        >
          <img src={Next} alt="" style={{width:30,height:30}}/>
        </div>
      </div>
      ))}
      
      <div style={{ position: 'fixed', bottom: '130px', left: '50%', transform: 'translateX(-50%)' }}>
        <div className="join flex justify-center">
          {/* 이전 페이지 그룹으로 이동: 현재 페이지 그룹이 첫 번째 그룹보다 큰 경우에만 버튼 표시 */}
          {currentGroup > 1 && (
            <button className="join-item btn" onClick={goToPrevGroup}>«</button>
          )}
          {pageNumbers.map(number => (
            <button key={number}
              className={`join-item btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
          {/* 다음 페이지 그룹으로 이동: 현재 페이지 그룹이 마지막 그룹보다 작은 경우에만 버튼 표시 */}
          {currentGroup < Math.ceil(totalPages / groupSize) && (
            <button className="join-item btn" onClick={goToNextGroup}>»</button>
          )}
        </div>
      </div>

      </>
      ) :
      (
       <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        등록한 작물이 없습니다.
      </div>  
      )}
  
      { !props.profileId && (
      <div style={{ position: 'fixed', bottom: '130px', right: '15px'}}>
        <div style={{backgroundColor:'#1B5E20',borderRadius: '50%', width: '50px', height: '50px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '40px' }}
          onClick={onOpenModal}>
            +</div>
        </div>
      </div>
      )}
      

      {/* ********모달모음************ */}
      {/* ******농산물 등록모달창***** */}
      <Modal open={open} onClose={onCloseModal} styles={styles}>
        <div className="flex justify-center items-center pt-12">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md
          bg-white px-12 py-2 text-xl text-gray-900 font-semibold
            ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedCrop.categoryName}
            <ChevronDownIcon className="mr-1 h-2 w-5 text-gray-400" aria-hidden="true" />
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
          >
            <div className="py-1 grid grid-cols-3 gap-4">
              {cropList.map((crop,index)=>(
              <Menu.Item key={crop.id} onClick={() => setSelectedCrop({ id: crop.id, categoryName: crop.categoryName })}> 
                {({ active }) => (
                  <button
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-1  text-left text-xl'
                      
                    )}
                  >
                    {crop.categoryName}
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
              placeholder="재배지를 입력하세요"
              onChange={(e) => setCultivation(e.target.value)}/>
              <div class="absolute inset-y-0 right-0 flex items-center">
              </div>
            </div>
          </div>
          <div className="px-8">
            <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
            <div class="relative mt-2 rounded-md shadow-sm">
            <DatePicker
              locale={ko}
              selected={plantingDate ? new Date(plantingDate) : null}
              dateFormat="yyyy-MM-dd"
              onChange={date => setPlantingDate(date.toISOString().slice(0, 10))}
              className="block h-12 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholderText="날짜를 선택하세요"
            />
            </div>
            <div style={{width: '100%', height: '50px', backgroundColor: '#1B5E20' }}
              className="flex justify-center items-center rounded-md mt-16"
              onClick={handelRegisterCrop}>
              <h1 style={{color:'white'}} className="text-2xl">등록</h1>
            </div>
          </div>
        
      </Modal>
      {/* *******농산물정보보기모달(수확전)****** */}
      <Modal open={infoOpen} onClose={infoCloseModal} styles={styles}>
        <div className="mt-16">
        <div className="px-8">
          <label for="price" class="block text-xl font-medium leading-6 text-gray-900">작물명</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropName} disabled/>
          </div>
        </div>
        <div className="px-8 mt-4">
          <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropCultivationSite} disabled/>
          </div>
        </div>
        <div className="px-8 mt-4">
          <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
          <div class="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" class="block h-12 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropPlantingDate} disabled />
          </div>
        </div>
        <div className="px-8 mt-10">
          <button className="btn w-full flex justify-around" 
          style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}
          onClick={LifeRecordOpenModal}>
            <img src={Vet} alt="" style={{width:40,height:30}}/>
            <div className="font-bold">농산물 생애기록 보기</div>
          </button>
        </div>
        {/* 아래부분은 판매자만보이게 */}
        { (!props.profileId || props.profileId === loginId)  && (
        <div>
          <div className="px-8 flex justify-end mt-3 mr-3">
            <p className="text-md font-bold" onClick={addRecordModal}>+생애기록 추가하기</p>
          </div>
          <div className="px-8 mt-10" onClick={harvestOpenModal}>
            <button className="btn w-full flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
              <img src={Harvest} alt="" style={{width:30,height:30}}/>
              <div className="mr-5 font-bold">수확하기</div>
            </button>
          </div>
        </div>)}
        </div>
      </Modal>
      {/* 농산물 생애기록보기(블록체인) 모달 */}
      <Modal open={lifeRecordOpen} onClose={LifeRecordCloseModal} styles={styles}>
       { isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div><img src={Daegi} alt="대기 이미지" style={{width:200}}/></div>
          <div className="font-bold text-lg">
            <h1>생애기록 불러오는중 ...</h1>
          </div>
        </div>
    
       ) : (
        <ul class="timeline-vertical">
        {lifeCycleList.map((item, index) => {
          switch (item.infoType) {
            //심은날 정보일 때
            case 0:
              return (
                <li>
                  <div className="flex" style={{borderLeft: "2px solid #1B5E20"}} >
                    <div class="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box space-y-2">
                      <time className="font-mono italic font-bold">{item.eventDate}</time>
                      <div className="text-lg font-black">재배</div>
                      <div>작물이름 : {item.cropName}</div>
                      <div>재배지 : {item.land}</div>
                    </div>
                  </div>
                </li>
              )

            // 농약 기록일 때
            case 1:
              return (
                <li>
                  <div className="flex" style={{borderLeft: "2px solid #1B5E20"}} >
                    <div class="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box space-y-2">
                      <time className="font-mono italic font-bold">{item.eventDate}</time>
                      <div className="text-lg font-black">농약사용</div>
                      <div>농약 이름 : {item.pesticideName}</div>
                      <div>농약 종류 : {item.pesticideType}</div>
                    </div>
                  </div>
                </li>
              )

            // 대회 기록일 때
            case 2:
              return (
                <li>
                  <div className="flex" style={{borderLeft: "2px solid #1B5E20"}} >
                    <div class="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box space-y-2">
                      <time className="font-mono italic font-bold">{item.eventDate}</time>
                      <div className="text-lg font-black">수상 정보</div>
                      <div>대회 이름 : {item.pesticicontestNamedeName} </div>
                      <div>수상내역 : {item.awardDetails}</div>
                    </div>
                  </div>
                </li>

              )

              //수확날
              case 3:
                return (
                  <li>
                    <div className="flex" style={{borderLeft: "2px solid #1B5E20"}} >
                      <div class="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                      </div>
                      <div className="timeline-end timeline-box space-y-2">
                        <time className="font-mono italic font-bold">{item.eventDate}</time>
                        <div className="text-lg font-black">수확</div>
                      </div>
                    </div>
                  </li>
                )
         
            default:
              return null;
          }
          
        })}
        </ul>
      )}
      </Modal>

       {/* *******농산물정보보기모달(수확후)****** */} 
        <Modal open={info2Open} onClose={info2CloseModal} styles={styles}>
        <div className="pt-12">
          <div className="px-8">  
            <div className="flex justify-center w-64 h-32">
              { selectImage? (<img src={selectImage} alt="Selected crop" style={{ height: '100%', width: 'auto' }} />
              ) : (  <img src={cropImgUrl} alt="Crop" style={{ height: '100%', width: 'auto' }} />)}    
            </div>
            <div className="flex justify-around mt-2">
              <div className="flex justify-center" onClick={handleFileInputClick}>
                <div className="text-center mr-2 flex items-center font-bold">+수확사진등록</div>
                <div className="flex items-center mt-2"><img src={Gallery} alt="" style={{ width:20 }}/></div>
              </div>
              <div onClick={handleUpload}>
                <div className="btn btn-sm flex items-center">저장</div>
              </div>
            </div>
          </div>
          <input
            type="file"
            id="hiddenFileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
            
          <div className="px-8 mt-6">
            <label for="price" class="block text-lg font-medium leading-6 text-gray-900">작물명</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropName} disabled/>
            </div>
          </div>
          <div className="px-8 mt-4">
            <label for="price" class="block text-lg font-medium leading-6 text-gray-900">재배지</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropCultivationSite} disabled/>
            </div>
          </div>
          <div className="px-8 mt-4">
            <label for="date" class="block text-lg  font-medium leading-6 text-gray-900">심은날짜</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropPlantingDate} disabled />
            </div>
          </div>
          <div className="px-8 mt-4">
            <label for="date" class="block text-lg  font-medium leading-6 text-gray-900">수확날짜</label>
            <div class="relative mt-2 rounded-md">
              <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropHarvestDate} disabled />
            </div>
          </div>
          <div className="px-8 mt-10 flex justify-center">
            <button className="btn w-56 flex justify-around" style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}>
              <img src={Vet} alt="" style={{width:40,height:30}}/>
              <div className="font-bold" onClick={LifeRecordOpenModal}>농산물 생애기록 보기</div>
            </button>
          </div>
          {/* 검사및인증정보보는 버튼 */}
          {/* <div className="px-8 mt-5 flex justify-center">
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
          </div> */}
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
      <div className="flex justify-center items-center pt-16">
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
          { selected ==='농약사용' && <Pesticide cropId={cropId} onRegister={addRecordCloseModal}/>}
          { selected ==='지역대회수상' && <Award  cropId={cropId} onRegister={addRecordCloseModal}/>}
          </Modal>
          
          {/* 수확하기모달폼 */}      
          <Modal open={harvestOpen} onClose={harvestCloseModal} styles={styles}>
            <div className="mt-12">
            <div className="px-8 mt-4">
              <label for="price" class="block text-xl font-medium leading-6 text-gray-900">작물명</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropName} disabled/>
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="price" class="block text-xl font-medium leading-6 text-gray-900">재배지</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropCultivationSite} disabled/>
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="date" class="block text-xl font-medium leading-6 text-gray-900">심은날짜</label>
              <div class="relative mt-2 rounded-md">
                <input type="text" name="price" id="price" class="block h-10 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={cropPlantingDate} disabled />
              </div>
            </div>
            <div className="px-8 mt-4">
              <label for="date" class="block text-xl font-medium leading-6 text-gray-900">수확날짜</label>
              <div class="relative mt-2 rounded-md">
                <DatePicker
                locale={ko}
                selected={cropHarvestDate ? new Date(cropHarvestDate) : null}
                dateFormat="yyyy-MM-dd"
                onChange={date => setCropHarvestDate(date.toISOString().slice(0, 10))}
                className="block h-10 w-full rounded-md 
                 py-1.5 pl-7 pr-20
                sm:text-sm sm:leading-6"
                style={{border: '1px solid #1B5E20'}}
                placeholderText="날짜를 선택하세요"
                />
              </div>
            </div>
            {/* <div className="px-8 mt-10">
              <button className="btn w-full flex justify-around" style={{ border:'1px solid #bbbbbb', backgroundColor: 'transparent'}}>
                <div className="font-bold text-sm" onClick={ApiOpenModal}>+검사 및 인증정보 등록하기</div>
              </button>
            </div> */}
            <div className="px-8 mt-10">
              <button className="btn w-full flex justify-around" style={{ backgroundColor: '#1B5E20'}}
              onClick={handleRegister}>
                <div className="font-bold text-xl" style={{color:'white'}} >수확하기</div>
              </button>
            </div>
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

           {/* 수확시 대기화면모달 */}
          <Modal open={stanbyModal} onClose={stanbyCloseModal} styles={styles} closeIcon={null}>
            <div className="flex flex-col items-center justify-center min-h-screen">
              <div><img src={CropStanby} alt="" style={{width:200}}/></div>
              <div className="font-bold text-lg">
                <h1 className="text-center">수확정보가 블록체인에 등록되고있어요</h1>
                <h1 className="text-center">잠시만 기다려 주세요</h1>
              </div>
            </div>
          </Modal>

    </div> 
  )
}