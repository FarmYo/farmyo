import { useState, useEffect } from 'react'
import SellBoardList from '../../../component/board/sellboard'
import BuyBoardList from '../../../component/board/buyboard'
import { useLocation } from 'react-router-dom'
import Headerbar from '../../../component/common/headerbar/index.jsx'
import ToggleButtons from '../../../component/board/toggleButton/index.jsx'

export default function BoardNav(){
  const location = useLocation()
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [searchName, setSearchName] = useState("")

  const [selectedItem, setSelectedItem] = useState('전체');
  const [selected,setSelected] = useState(null) // 팝니다클릭 or 삽니다클릭



  useEffect(()=>{
    // url의 상태확인하고 selected상태 설정
    const stateSelected = location.state?.selected;
    if(stateSelected !== undefined) {
      setSelected(stateSelected);
    } else {
      setSelected(0); // 기본값
    }
  }, [location])

  useEffect(() => {
    const { value, search } = location.state || { value: '전체', search: '' }
    setSelectedItem(value || '전체')
    setSearchName(search || '')
    console.log(selectedItem, searchName)
  }, [location])

  return(
    <div>

      {/* 헤더 */}
      <Headerbar title={"팜&삼"}></Headerbar>

      {/* 셀렉트 박스 */}
      <ToggleButtons selected={selected} setSelected={setSelected} selectedItem={selectedItem} setSelectedItem={setSelectedItem} searchName={searchName} setSearchName={setSearchName} />

      {/* 게시물 리스트 */}
      <div style={{ paddingTop: '192px'}}>
        {selected === 0 && <SellBoardList value={selectedItem} search={searchName} />}
        {selected === 1 && <BuyBoardList value={selectedItem} search={searchName} />}
      </div>
    
    </div>
  )                                                       
}