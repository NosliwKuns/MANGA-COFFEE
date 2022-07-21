import { useEffect, useState } from "react";
import useHeaders from "../../../app/headers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchAllUser } from "../../../features/admin/adminSlice";
import Celdas from "./Celdas";

const UsersTable = () => {
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const { allUsers }: any = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  console.log(allUsers, "token-----------------------");
  useEffect(() => {
    dispatch(fetchAllUser(headers));
  }, []);
  return (
    <div>
      {allUsers.map((e: any) => {
       return (<Celdas
          email={e.email}
          users={e.users}
          status={e.status}
          admin={e.admin}
          block={e.block}
        />)
      })}
    </div>
  );
};

export default UsersTable;
