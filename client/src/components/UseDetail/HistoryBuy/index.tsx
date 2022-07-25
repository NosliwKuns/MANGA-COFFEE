import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { preViewhistoryBuy } from "../../../features/user/userSlice";

interface ElementBuy {
  date: string;
  id: string;
  products: string;
  total: number;
}

const HistoryBuy = () => {
  const [history, setHistory] = useState([]);
  console.log(history, "historyyyyyyyyyyyyyyyyyy");
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  async function updateHistory() {
    const verificated: any = await dispatch(preViewhistoryBuy(headers));
    setHistory(verificated);
  }
  useEffect(() => {
    updateHistory();
  }, []);

  return (
    <div>
      {history.map((e: ElementBuy, i: number) => {
        return (
          <div key={`elment_history_buy_${i}`}>
            <h3>{e.products}</h3>
            <h3>{`$/. ${e.total / 100}`}</h3>
            <h3>{e.date}</h3>
            <Link to={`/detailElementBuy/${e.id}`}>
              <button>detail</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryBuy;
///////////////////////////////////////////////////////////////