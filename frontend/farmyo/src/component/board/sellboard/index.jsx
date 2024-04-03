import { useEffect, useState, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { Modal } from "react-responsive-modal";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Gallery from "../../../image/component/gallery.png";
import Chatting from "../../../image/component/chatting.png";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export default function SellBoardList({ value, search }) {
  const im = jwtDecode(localStorage.getItem("access")).userJob;
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // 무한스크롤 부분
  // const [page, setPage] = useState(0)
  // const observer = useRef(null)
  // const [haveMore, setHaveMore] = useState(true)
  // const handleIntersection = (articles) => {
  //   articles.forEach((article) => {
  //     if (haveMore && article.isIntersecting && article.target.className === 'trigger') {
  //       BoardInfo()
  //     }
  //   })
  // }

  // useEffect(() => {
  //   observer.current = new IntersectionObserver(handleIntersection, {
  //     threshold : 0.7,
  //   })
  //   const observeTarget = document.querySelector('.trigger');
  //   observer.current.observe(observeTarget);
  //   return () => {
  //     observer.current.disconnect()
  //   }
  // }, [])

  // const BoardInfo = (() => {
  //   api.get(`boards?type=0&page=${page}&size=6`)
  //   .then((res) => {
  //     if (res.data.dataBody.length > 0) {
  //       setBoardInfo([...boardInfo, ...res.data.dataBody])
  //       console.log('게시글 불러오기 성공', res)
  //       setPage((prevPage) => prevPage + 1);
  //       console.log(res.data.dataBody, boardInfo, page)
  //     } else {
  //       setHaveMore(false)
  //       console.log('더이상의 데이터가 없습니다.', res)
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('게시글 불러오기 실패', err)
  //   })
  // })

  useEffect(() => {
    setCropId(selectedCrop.id);
  }, []);

  // 무한스크롤 부분
  const [boardInfo, setBoardInfo] = useState([]);
  const [page, setPage] = useState(0);
  const obsRef = useRef(null);
  const preventRef = useRef(true);
  const [haveMore, setHaveMore] = useState(true);
  const size = 6;

  const obsHandler = (entries) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (haveMore && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false;
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const getBoard = () => {
    api
      .get(`boards?type=0&page=${page}&size=${size}`)
      .then((res) => {
        if (res.data.dataBody.length < size) {
          setHaveMore(false);
          setBoardInfo((prevBoardInfo) => [...prevBoardInfo, ...res.data.dataBody]);
          console.log("더이상의 데이터가 없습니다.", res);
          console.log(res.data.dataBody, boardInfo, page);
        } else {
          setBoardInfo((prevBoardInfo) => [...prevBoardInfo, ...res.data.dataBody]);
          //불러올 때마다 다시 중복방지값 true로 변환
          preventRef.current = true;
          console.log("무한스크롤 되는중");
        }
      })
      .catch((err) => {
        console.log("게시글 불러오기 실패", err);
      });
  };

  useEffect(() => {
    getBoard();
  }, [page]);

  const [newBoardInfo, setNewBoardInfo] = useState([]);

  useEffect(() => {
    const filteredList = boardInfo.filter((article) => {
      if (value === "전체") return true;
      else if (value === "농산물") return article.cropCategory === search;
      else if (value === "제목") return article.title.includes(search);
      else if (value === "작성자") return article.userNickname.includes(search);
    });
    setNewBoardInfo(filteredList);
  }, [value, search, boardInfo]);

  const [files, setFiles] = useState([]);
  const [cropId, setCropId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // multipart/form-data로 보내기(json형식 아님)
  const makeArticle = () => {
    if (cropId && title && content && quantity && price) {
      const formData = new FormData();
      formData.append("cropId", cropId);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("quantity", quantity);
      formData.append("price", price);
      if (files) {
        if (files.length < 6) {
          // for (const file of files) {
          //   formData.append('images', file);
          // }
          files.forEach((file, index) => {
            formData.append(`images`, file);
          });
          console.log("formData : ", formData);
        } else {
          Swal.fire({
            title: "사진은 5장 이내로<br>업로드 할 수 있습니다.",
            confirmButtonColor: "#1B5E20",
          });
        }
      }
      if (formData) {
        api
          .post("boards/sell", formData)
          .then((res) => {
            console.log("팝니다 게시글 생성 완료", res.data.dataBody);
            Swal.fire({
              title: "팝니다 게시글이 생성되었습니다.",
              confirmButtonColor: "#1B5E20",
            });
            sellCloseModal();
            navigate(`/board/sell/${res.data.dataBody}/detail`);
          })
          .catch((err) => {
            console.log("게시글 생성 실패", err);
            if (err.response.data.dataHeader.resultCode === "C-002") {
              console.log("작물카테고리→ cropCategoryId에 해당하는 작물이 없을 때");
              Swal.fire({
                title: "존재하지 않는 작물 카테고리<br> 생성되었습니다.",
                confirmButtonColor: "#1B5E20",
              });
            } else if (err.response.data.dataHeader.resultCode === "U-001") {
              console.log("토큰에 적힌 id값의 유저가 없을 때");
              navigate("/login");
              Swal.fire({
                title: "다시 로그인<br>해주세요.",
                confirmButtonColor: "#1B5E20",
              });
            } else if (err.response.data.dataHeader.resultCode === "B-005") {
              console.log("수량이 0초과가 아닐 때");
              Swal.fire({
                title: "수량은 1 이상<br>입력해주세요.",
                confirmButtonColor: "#1B5E20",
              });
            } else if (err.response.data.dataHeader.resultCode === "B-006") {
              console.log("가격이 0초과가 아닐 때");
              Swal.fire({
                title: "가격은 1원 이상<br>입력해주세요.",
                confirmButtonColor: "#1B5E20",
              });
            } else if (err.response.data.dataHeader.resultCode === "B-012") {
              console.log("이미 해당 작물로 게시글이 있을 때");
              Swal.fire({
                title: "이미 해당 작물의 글이<br> 존재합니다.",
                html: "작물당 하나의 글 작성만 가능합니다.",
                confirmButtonColor: "#1B5E20",
              });
            } else {
              console.log("내용이나 제목 없을때");
              Swal.fire({
                title: "제목과 내용을<br>확인해주세요.",
                confirmButtonColor: "#1B5E20",
              });
            }
          });
      } else {
        if (files.length > 5) {
          Swal.fire({
            title: "5개만 선택할 수 있습니다.",
            confirmButtonColor: "#1B5E20",
          });
        }
        console.log(
          "formData 형성 실패",
          "cropId : ",
          cropId,
          "files : ",
          files,
          "title : ",
          title,
          "content : ",
          content,
          "quantity : ",
          quantity,
          "price : ",
          price
        );
      }
    } else {
      if (!quantity) {
        Swal.fire({
          title: "수량은 1 이상<br>입력해주세요.",
          confirmButtonColor: "#1B5E20",
        });
      } else if (!price) {
        Swal.fire({
          title: "가격은 1원 이상<br>입력해주세요.",
          confirmButtonColor: "#1B5E20",
        });
      } else {
        Swal.fire({
          title: "정보를 입력해주세요.",
          confirmButtonColor: "#1B5E20",
        });
      }
    }
  };

  const [fileUrl, setFileUrl] = useState([]);
  const [cropList, setCropList] = useState([]); // 작물등록시 작물 리스트
  const [selectedCrop, setSelectedCrop] = useState({ id: null, cropName: "작물을 선택하세요", harvestDate: null });
  const settings = {
    dots: true, // 하단에 점으로 페이지 표시 여부
    infinite: true, // 무한으로 반복
    speed: 500, // 넘어가는 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 스크롤할 때 넘어가는 슬라이드 수
    adaptiveHeight: true,
  };
  const checkPhoto = (file) => {
    console.log(file);
    if (file.length > 5) {
      Swal.fire({
        title: "5개만 선택할 수 있습니다.",
        confirmButtonColor: "#1B5E20",
      });
    } else {
      const promises = [];
      for (const readFile of file) {
        const reader = new FileReader();
        promises.push(
          new Promise((resolve) => {
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(readFile);
          })
        );
      }
      Promise.all(promises).then((urls) => {
        setFileUrl([...fileUrl, ...urls]);
      });
      setFiles([...file]);
    }
  };

  const [sellOpen, setSellOpen] = useState(false);

  const styles = {
    modal: {
      maxWidth: "100%",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      margin: "0",
    },
  };

  //삽니다게시글모달
  const sellOpenModal = () => {
    setSellOpen(true);
  };

  const sellCloseModal = () => {
    setSellOpen(false);
  };

  useEffect(() => {
    const myId = jwtDecode(localStorage.getItem("access")).loginId;
    // 작물 카테고리 조회
    api
      .get(`crops/list/${myId}/harvest`)
      .then((res) => {
        console.log(res.data.dataBody);
        setCropList(res.data.dataBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: "420px", position: "relative" }}>
      {/* 팝니다 게시글 목록 */}

      <div className="pb-12">
        {newBoardInfo.map((article, index) => (
          <div className="p-3 flex" key={index} onClick={() => navigate(`sell/${article.boardId}/detail`)}>
            <div className="w-32 h-28 overflow-hidden">
              <img src={article.imgUrl} alt="작물이미지" className="w-full h-full object-contain" />
            </div>
            <div className="w-full ml-2">
              <h1 className="text-lg font-bold">{article.title}</h1>
              <h1 className="text-sm">{article.userNickname}</h1>
              <h1 style={{ color: "#1B5E20" }} className="font-bold">
                {article.quantity}kg
              </h1>
              <div className="flex justify-between">
                <h1 style={{ color: "#1B5E20" }} className="font-bold">
                  {article.price}원/kg
                </h1>
                <img src={Chatting} alt="" style={{ width: 30 }} />
              </div>
            </div>
          </div>
        ))}
        {/* {haveMore && <div className="trigger"></div>} */}
        <div ref={obsRef}>
          <br />
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "130px", right: "15px" }}>
        {im === 0 && (
          <div
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "40px",
              }}
              onClick={() => sellOpenModal()}
            >
              +
            </div>
          </div>
        )}
      </div>

      {/* 팝니다게시글생성모달 */}
      <Modal open={sellOpen} onClose={sellCloseModal} styles={styles}>
        <div className="mt-10">
          <Slider {...settings} className="sliderOne">
            {fileUrl?.map((img, index) => (
              <div key={index} style={{ height: 240 }}>
                <img src={img} alt={`slide-${index}`} />
              </div>
            ))}
          </Slider>

          <div className="flex justify-between mt-4">
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  {selectedCrop.harvestDate ? (
                    <Menu.Button className="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {selectedCrop.cropName}({selectedCrop.harvestDate})
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  ) : (
                    <Menu.Button className="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {selectedCrop.cropName}
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  )}
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
                  <Menu.Items
                    className="absolute right-0 z-10 w-full px-4 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60"
                    style={{ width: "16rem" }}
                  >
                    <div className="py-1">
                      {cropList.map((crop, index) => (
                        <Menu.Item
                          key={crop.id}
                          onClick={() => {
                            setSelectedCrop({ id: crop.id, cropName: crop.name, harvestDate: crop.harvestDate });
                            setCropId(crop.id);
                          }}
                        >
                          {({ active }) => (
                            <button
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block px-12 py-2 text-xl"
                              )}
                            >
                              {crop.name}({crop.harvestDate})
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <h1 className="font-bold">+</h1>
                <label htmlFor="img">
                  <img src={Gallery} alt="사진 추가하기" style={{ width: 30 }} className="mr-3" />
                </label>
                <input
                  type="file"
                  id="img"
                  autoComplete="img"
                  accept="image/*"
                  multiple
                  onChange={(event) => checkPhoto(event.target.files)}
                  // capture="camera"
                  // react-native-image-picker 라이브러리 사용해도 됨
                  hidden
                />
                {/* <img src={Gallery} alt="" style={{ width:30 }} className='mr-3'/> */}
              </div>
            </div>
          </div>

          <label htmlFor="price" className="block text-md leading-6 mt-4 text-gray-900">
            수량
          </label>
          <div className="relative rounded-md mt-1">
            <input
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              type="number"
              name="price"
              id="price"
              className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="수량을 입력하세요(kg)"
            />
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">
            가격
          </label>
          <div className="relative rounded-md mt-1">
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="number"
              name="price"
              id="price"
              className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="가격을 입력하세요(/kg)"
            />
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">
            제목
          </label>
          <div className="relative rounded-md mt-1">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              name="price"
              id="price"
              className="block h-12 w-full rounded-md border-0 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="제목을 입력하세요"
            />
          </div>
          <label htmlFor="price" className="block text-md mt-2 leading-6 text-gray-900">
            내용
          </label>
          <div className="relative rounded-md mt-1">
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="textarea textarea-bordered w-full h-24"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
          <div className="mt-10">
            <button
              onClick={() => {
                makeArticle();
              }}
              className="btn w-full flex justify-around"
              style={{ backgroundColor: "#1B5E20" }}
            >
              <div className="font-bold text-lg" style={{ color: "white" }}>
                생성
              </div>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
