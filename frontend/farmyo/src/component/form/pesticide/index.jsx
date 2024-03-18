export default function Pesticide({ onRegister }){
  return(
    <div className="pt-10" style={{ position:'relative' }}>
     <div style={{border:'1px solid gray'}} className="rounded-md">
        <div className="p-6">
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">사용날짜</span>
          </div>
          <input type="text" placeholder="날짜를 입력해주세요" className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">약품명</span>
          </div>
          <input type="text" placeholder="약품명을 입력해주세요" className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-md">약품분류</span>
          </div>
          <input type="text" placeholder="약품분류를 입력해주세요" className="input input-bordered w-full max-w-xs" />
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