export default function Award({ onRegister }){
  return(
    <div className="pt-10" style={{ position:'relative' }}>
     <div style={{border:'1px solid gray'}} className="rounded-md">
        <div className="p-6">
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">대회명</span>
          </div>
          <input type="text" placeholder="대회명을 입력해주세요" className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">수상내역</span>
          </div>
          <input type="text" placeholder="수상내역을 입력해주세요" className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">수상날짜</span>
          </div>
          <input type="text" placeholder="날짜를 입력해주세요" className="input input-bordered w-full max-w-xs" />
          </label>
      </div>
      <div style={{bottom: 0, left: 0, width: '100%', height: '50px', backgroundColor: '#1B5E20' }}
            className="flex justify-center items-center rounded-bl-md rounded-br-md"
            onClick={onRegister}>
          <h1 style={{color:'white'}} className="text-2xl">등록</h1>
      </div>  
     </div>
    </div>
  )
}