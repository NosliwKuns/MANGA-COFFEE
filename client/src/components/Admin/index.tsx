import { useEffect, useState } from "react";
import useHeaders from "../../app/headers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllUser } from "../../features/admin/adminSlice";
import Celdas from "./usersTable/Celdas";
import Advertising from "./Advertising/Advertising";
import CreateManga from "./CreateManga";

const UsersTable = () => {
  const pagAdmin: any = window.localStorage.getItem("pagAdmin");
  
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const headers = useHeaders(token);
  const { allUsers }: any = useAppSelector((state) => state.admin);
  const [pag, setPag] = useState(pagAdmin);
  const dispatch = useAppDispatch();
  console.log(allUsers, "token-----------------------");
  useEffect(() => {
    dispatch(fetchAllUser(headers));
  }, []);
  let adminPag;
  if (pag === '1') {
    adminPag = allUsers.map((e: any) => {
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
  if ( pag ==='2' ){
    adminPag = <Advertising/>
  }
  if ( pag ==='3' ){
    adminPag = <CreateManga/>
  }


  useEffect(()=> {
  },[pagAdmin])
  return( <div>
    <button onClick={()=>{ 
      window.localStorage.setItem("pagAdmin","1")
      setPag("1")}}>All Users</button>
    <button onClick={()=> {
      window.localStorage.setItem("pagAdmin","2")
      setPag("2")}}>Advertising</button>
      <button onClick={()=> {
      window.localStorage.setItem("pagAdmin","3")
      setPag("3")}}>Create Manga</button>
    {adminPag}
    </div>);
};

export default UsersTable;
