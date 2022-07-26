import { useEffect, useState } from "react";
import useHeaders from "../../../app/headers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchAllUser } from "../../../features/admin/adminSlice";
import Celdas from "../../Admin/usersTable/Celdas";
import Advertising from "../../Admin/Advertising/Advertising";
import CreateManga from "../../Admin/CreateManga";
import CreateProduct from "../../Admin/CreateProduct";
import AdminTable from "../AbminTable";
import MyInformation from "../MyInformation";
import HistoryBuy from "../HistoryBuy";

const UsersTable = () => {
  const pagAdmin: any = window.localStorage.getItem("pagAdmin");
  console.log(pagAdmin);
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token, admin } = JSON.parse(userCopy);
  const headers = useHeaders(token);
  const { allUsers }: any = useAppSelector((state) => state.admin);
  const [pag, setPag] = useState(pagAdmin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUser(headers));
  }, []);
  let InterfaceUser;
  if (pag === "1") {
    InterfaceUser = <MyInformation/>;
  }
  if (pag === "2") {
    InterfaceUser = <HistoryBuy/>;
  }
  if (pag === "3") {
    InterfaceUser = allUsers.map((e: any) => {
      return (
        <Celdas
          email={e.email}
          users={e.users}
          status={e.status}
          admin={e.admin}
          block={e.block}
          id={e._id}
        />
      );
    });
  }
  if (pag === "4") {
    InterfaceUser = <Advertising />;
  }
  if (pag === "5") {
    InterfaceUser = <CreateManga />;
  }
  if (pag === "6") {
    InterfaceUser = <CreateProduct />;
  }

  useEffect(() => {}, [pagAdmin]);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            window.localStorage.setItem("pagAdmin", "1");
            setPag("1");
          }}
        >
          My Information
        </button>
        <button
          onClick={() => {
            window.localStorage.setItem("pagAdmin", "2");
            setPag("2");
          }}
        >
          Purchese History
        </button>
        {admin && <AdminTable setPag={setPag} />}
      </div>

      <div>{InterfaceUser}</div>
    </div>
  );
};

export default UsersTable;
