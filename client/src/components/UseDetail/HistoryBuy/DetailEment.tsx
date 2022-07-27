import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { detailElementBuy } from "../../../features/user/userSlice";
import "../../../scss/User/DetailBuy.scss";

interface Adrress {
  country: string;
  direction: string;
  postalCode: string;
  reference: string;
}

interface Produtcs {
  idProduct: string;
  name: string;
  price: number;
  quantity: number;
}

interface DetailElement {
  adrress: Adrress;
  date: string;
  email: string;
  idCompra: string;
  lastName: string;
  method: string;
  name: string;
  produtcs: Array<Produtcs>;
  telephone: string;
  total: number;
}

const DetailEment = () => {
  const { idElement } = useParams();
  const [detailElement, setDetailElement] = useState<DetailElement>({
    adrress: {
      country: "",
      direction: "",
      postalCode: "",
      reference: "",
    },
    date: "",
    email: "",
    idCompra: "",
    lastName: "",
    method: "",
    name: "",
    produtcs: [
      {
        idProduct: "",
        name: "",
        price: 0,
        quantity: 0,
      },
    ],
    telephone: "",
    total: 0,
  });
  console.log(
    detailElement,
    111111111111111111111111111111111111111111111111111111111111111111111111111111
  );
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  async function updateHistory() {
    const verificated: any = await dispatch(
      detailElementBuy(headers, idElement)
    );
    setDetailElement(verificated[0]);
  }
  useEffect(() => {
    updateHistory();
  }, []);
  return (
    <div className="containe_detail_buy">
      <div>
        <div>
          <h3 className="detail_buy_title">
            {` INVOICE ${detailElement.idCompra}`}
          </h3>
        </div>
        <div>
          <h4>Name:</h4>
          <h3 className="detail_buy">{detailElement.name}</h3>
        </div>
        <div>
          <h4>Last Name:</h4>
          <h3 className="detail_buy">{detailElement.lastName}</h3>
        </div>
        <div>
          <h4>Telephone:</h4>
          <h3 className="detail_buy">{detailElement.telephone}</h3>
        </div>
        <div>
          <h4>Email:</h4>
          <h3 className="detail_buy">{detailElement.email}</h3>
        </div>
        <div>
          <h4>Method:</h4>
          <h3 className="detail_buy">{detailElement.method}</h3>
        </div>
        <div>
          <h4>Date:</h4>
          <h3 className="detail_buy">{detailElement.date}</h3>
        </div>
        <div>
          <h4>Country:</h4>
          <h3 className="detail_buy">{detailElement.adrress.country}</h3>
        </div>
      </div>
      <div>
        <div>
          <h4>Direction:</h4>
          <h3 className="detail_buy">{detailElement.adrress.direction}</h3>
        </div>
        <div>
          <h4>Postal Code:</h4>
          <h3 className="detail_buy">{detailElement.adrress.postalCode}</h3>
        </div>
        <div>
          <h4>Reference:</h4>
          <h3 className="detail_buy">{detailElement.adrress.reference}</h3>
        </div>
        <div>
          <h4>Products:</h4>
          {detailElement.produtcs.map((e: Produtcs, i: number) => {
            console.log(e);

            return (
              <div className="detail_buy_product_copntainer">
                <h5>Product:</h5>
                <h4 className="detail_buy">{e.name}</h4>
                <h5>Price:</h5>
                <h4 className="detail_buy">{`$/.${e.price}`}</h4>
                <h5>Quantity:</h5>
                <h4 className="detail_buy">{e.quantity}</h4>
              </div>
            );
          })}
        </div>
        <div>
          <h2>TOTAL :</h2>
          <h1 className="detail_buy">{`$/.${detailElement.total / 100}`}</h1>
        </div>
      </div>
    </div>
  );
};

export default DetailEment;
