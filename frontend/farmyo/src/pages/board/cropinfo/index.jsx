import WBackArrow from "../../../image/component/trade/wbackarrow.png"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Vet from '../../../image/component/vet.png'
import api from '../../../api/api'
import { Modal } from "react-responsive-modal"
import Daegi from "../../../image/component/daegi.gif"
import Web3 from "web3"

export default function CropInfo(){
  const location = useLocation()
  const param = useParams()
  const cropId = Number(param.cropId)
  const navigate = useNavigate()
  const { boardId } = location.state?.boardId 
  // 수확후 정보담기
  const [cropName,setCropName] = useState('')
  const [cropPlantingDate,setCropPlantingDate] = useState('')
  const [cropCultivationSite,setCropCultivationSite] = useState('')
  const [cropHarvestDate,setCropHarvestDate] = useState('')
  const [cropImgUrl,setCropImgUrl] = useState('')

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

  // 수확후 상세정보 불러오기
  useEffect(()=>{
    // console.log(cropId)
    api.get(`crops/${cropId}`)// crop_id 변수를 URL에 삽입
    .then((res)=>{
      console.log(res)
      setCropName(res.data.dataBody.cropName)
      setCropPlantingDate(res.data.dataBody.cropPlantingDate)
      setCropCultivationSite(res.data.dataBody.cropCultivationSite)
      setCropHarvestDate(res.data.dataBody.cropHarvestDate)
      setCropImgUrl(res.data.dataBody.cropImgUrl)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const goBack = ()=>{   
    // navigate(`/board/sell/${boardId}/detail`)
    navigate(-1)
  }

  const [lifeRecordOpen,setLifeRecordOpen] = useState(false)
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

  //블록체인 코드

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




  return(
    <div>
       <div style={{height:50,backgroundColor:'#1B5E20'}}>
          <div className="p-2 flex justify-between"
          onClick={goBack}>
            <img src={WBackArrow} alt="" style={{ width:30,height:30}}/>
          </div>
        </div>


        <div className="pt-12">
          <div className="px-8 flex justify-center">  
            <div className="flex justify-center w-32 h-28" >
              <img src={cropImgUrl} alt="Crop"  style={{ height: '100%', width: '100%', objectFit: 'cover' }}/>  
            </div>
          </div>
      
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
            <button className="btn w-56 flex justify-around"
             style={{ border:'3px solid #81C784',backgroundColor: 'transparent'}}
             onClick={LifeRecordOpenModal}>
              <img src={Vet} alt="" style={{width:40,height:30}}/>
              <div className="font-bold">농산물 생애기록 보기</div>
            </button>
          </div>
        </div>
      
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

            // 인증 기록일 때
            case 2:
              return (
                <li>
                  <div className="flex" style={{borderLeft: "2px solid #1B5E20"}} >
                    <div class="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box space-y-2">
                      <time className="font-mono italic font-bold">{item.eventDate}</time>
                      <div className="text-lg font-black">인증 정보</div>
                      <div>인증 내역 : {item.CertName} </div>
                      <div>인증 기관 : {item.CertCorp}</div>
                    </div>
                  </div>
                </li>

              )

              //검사 정보 일 때
              case 3:
                return (
                  <li>
                    <div className="flex" style={{borderLeft: "2px solid #1B5E20"}} >
                      <div class="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
                      </div>
                      <div className="timeline-end timeline-box space-y-2">
                        <time className="font-mono italic font-bold">{item.eventDate}</time>
                        <div className="text-lg font-black">검사 정보</div>
                        <div>검사 종류 : {item.inspectName} </div>
                        <div>검사 결과 : {item.inspectResult} </div>
                        <div>검사 기관 : {item.inspectCorp}</div>
                      </div>
                    </div>
                  </li>
  
                )


              //수확날
              case 4:
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


    </div>
  )
}