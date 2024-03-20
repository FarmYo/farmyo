import { useState } from "react"

export default function Articlelist() {
  const [articles, setArticles] = useState([
    { id: 1, title: '감자팝니다', date: '2024/02/02' },
    { id: 2, title: '감자감자팔아요', date: '2024/02/10' },
    // 여기에 더 많은 게시글을 추가할 수 있습니다.
  ]);


  return(
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {articles.map((article) => ( // 게시글 목록을 반복하여 테이블 행을 생성합니다.
              <tr key={article.id} style={{ height: 80 }}>
                <td className="font-bold pl-8 text-lg">{article.title}</td>
                <td>{article.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}