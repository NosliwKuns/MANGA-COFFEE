import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { detailElementBuy } from "../../../features/user/userSlice";

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
  console.log(detailElement , 111111111111111111111111111111111111111111111111111111111111111111111111111111)
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
    <div>
      <h2>{detailElement.name}</h2>
      <h2>{detailElement.lastName}</h2>
      <h2>{detailElement.telephone}</h2>
      <h2>{detailElement.email}</h2>
      <h2>{detailElement.method}</h2>
      <h2>{detailElement.date}</h2>
      <h2>{detailElement.adrress.country}</h2>
      <h2>{detailElement.adrress.direction}</h2>
      <h2>{detailElement.adrress.postalCode}</h2>
      <h2>{detailElement.adrress.reference}</h2>
      {detailElement.produtcs.map((e: Produtcs, i: number) => {
        console.log(e)

        return (
          <div>
            <h3>{e.name}</h3>
            <h3>{e.price}</h3>
            <h3>{e.quantity}</h3>
          </div>
        );
      })}
      <h2>{`$/.${detailElement.total/100}`}</h2>
    </div>
  );
};

export default DetailEment;
