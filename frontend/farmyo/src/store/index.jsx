import { useState, useEffect } from 'react';
import api from "../api/api";

const BankNameList = () => {
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    api.get('banks')
    .then((res) => {
      console.log('은행 리스트 받아오기 성공')
      setBankList(res.data.dataBody)
    })
    .catch((err) => {
      console.log('은행 리스트 받아오기 실패', err)
    })
  }, [])
  return bankList.dataBody
}

export default BankNameList;
