import Ex from '../../../image/component/ex.png'

export default function Form( props ){

  return(
    <div>
      <div style={{height: 160}} className="p-5 pt-0  border-b-2 border-gray-100">
        <div className='flex justify-end'><img src={Ex} alt="" style={{ width:30 ,height:30 }}
        onClick={props.onCloseForm}/></div>
        {/* ****판매게시판이면 안보이고 구매게시판이면 보이는것*******     */}
        <label htmlFor="nickname"className="block text-sm leading-6 text-gray-900">작물명</label>
        <div>
          <input id="nickname" name="nickname" type="text" placeholder="작물명을 입력하세요" autoComplete="text" 
            className="block h-7 w-full rounded-md sm:text-sm sm:leading-6 pl-3"
            style={{ border: '2px solid #1B5E20'}}/>
        </div>
        {/* ************************************************ */}
        <div className="flex justify-around mt-2">
          <div>
            <label htmlFor="nickname"className="block text-sm leading-6 text-gray-900">수량</label>
            <div>
              <input id="nickname" name="nickname" type="number" placeholder="kg" autoComplete="text" 
                className="block h-7 rounded-md w-20 text-gray-900  sm:text-sm sm:leading-6 pl-3"
                style={{ border: '2px solid #1B5E20'}}/>
            </div>
          </div>
          <div>
            <label htmlFor="nickname"className="block text-sm leading-6 text-gray-900">kg당 가격</label>
            <div>
              <input id="nickname" name="nickname" type="number" placeholder="원" autoComplete="text" 
                className="block h-7  rounded-md w-32 sm:text-sm sm:leading-6 pl-3"
                style={{ border: '2px solid #1B5E20'}}/>
            </div>
          </div>
          <div className='flex items-end'>
            <button className="btn btn-sm" style={{ backgroundColor: '#1B5E20'}}> 
              <div className="font-bold text-md" style={{ color:'white' }}
              onClick={props.onFormSubmit}>주문전송</div>
            </button>
          </div>
        </div>
      </div>    
    </div>
  )
}