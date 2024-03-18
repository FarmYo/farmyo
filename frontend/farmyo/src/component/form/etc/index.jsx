export default function Pesticide({ onRegister }){
  return(
    <div className="pt-10" style={{ position:'relative' }}>
     <div style={{border:'1px solid gray'}} className="rounded-md">
        <div className="p-6">
          <label className="form-control w-full max-w-xs">
          <textarea className="textarea textarea-bordered" placeholder="직접입력" style={{ height:'100px'}}></textarea>
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