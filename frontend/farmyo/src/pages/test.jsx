import { useEffect, useState } from "react"

export default function TestPage() {
  const [someList,setSomeList] = useState([])

  useEffect(() => {
    setSomeList([
      {id: 1, name: '감자', cropId: 10},
      {id:2, name: '고구마', cropId: 11},
      {id: 3, name: '딸기', cropId: 12},
      {id: 4, name: '배', cropId: 13},
      {id: 5, name: '사과', cropId: 14},
      {id: 6, name: '밤', cropId: 15},
    ])
  }, [])
  
  const filterList = someList.filter((crop) => 
    crop.name === '딸기'
  )
  
  console.log(filterList)
  return(
    <div>
      {filterList.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>ID: {item.id}</p>
          <p>Crop ID: {item.cropId}</p>
        </div>
      ))}
    </div>
  )
}


