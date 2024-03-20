import React from 'react'
import { useLocation } from 'react-router-dom';
import Router from './router'
import BottomBar from './component/common/bottombar'

function App() {
  const location = useLocation()

  const shouldHideBottomBar = () => {
    // 숨겨야 하는 경로를 정규 표현식으로 정의합니다.
    const hidePatterns = [/^\/mypage\/edit$/, /^\/chat\/\d+$/];

    // 현재 경로가 숨겨야 하는 경로 중 하나와 일치하는지 확인합니다.
    return hidePatterns.some(pattern => pattern.test(location.pathname));
  };

  return (
    <div >
      <Router />
      {!shouldHideBottomBar() && <BottomBar />}
    </div>
  );
}

export default App;
