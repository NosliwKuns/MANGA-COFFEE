import React, { useEffect, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { preViewhistoryBuy } from "../../../features/user/userSlice";
import NotFavOrWish from "../../User/NotFavOrWish";
import '../../../scss/User/Favorites.scss';
import "../../../scss/User/TableAllUsers.scss"

interface ElementBuy {
  date: string;
  id: string;
  products: string;
  total: number;
}

const HistoryBuy = () => {
  const [history, setHistory] = useState([]);
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
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
      {
      history.length ?
      history.map((e: ElementBuy, i: number) => {
        return (
          <div className="celda_user_table_users_admin" key={`elment_history_buy_${i}`}>
            <h3 className="celda_user_email">{e.products}</h3>
            <h3 className="celda_user_name_user">{`$/. ${e.total / 100}`}</h3>
            <h3 className="celda_user_name_user">{e.date}</h3>
            <Link to={`/detailElementBuy/${e.id}`}>
              <button className="button_true_table_user">detail</button>
            </Link>
          </div>
        );
      }):(
        <div className="notFavOrWish"> 
                <BsFillInfoCircleFill size={55}/>
                <h1>You have no Products in your Purchese Buy.</h1>
                <h3>Looking for your favorites Products?</h3>
                <Link to='/shop'><button className="addButton">Add some!</button></Link>
                </div>
      )
      }
    </div>
  );
};

export default HistoryBuy;