import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHeaders from "../../app/headers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllUser } from "../../features/admin/adminSlice";
import { deleteAcount,  logOutUser, setDetailUser } from "../../features/user/userSlice";
import UsersTable from "../Admin/usersTable";

const UserDetail = () => {
  const [input, setInput] = useState("");
  const [switchButton, setSwitchB] = useState<boolean>(false);
  const userCopy : any = window.localStorage.getItem("copySliceUser")
  const { token, user ,admin } = JSON.parse(userCopy)
  console.log(token, user ,admin)
  const emailStorage :any = window.localStorage.getItem("copySliceUser")
  const {email} = JSON.parse(emailStorage)
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    dispatch(setDetailUser(headers));
  });
  return (
    <div>
      <h1>{user}</h1>
      {
        admin && <UsersTable/>
      }
      <input
        type={switchButton ? "text" : "password"}
        value={input}
        name="password"
        placeholder="******"
        onChange={handleChange}
      />
      <div onClick={() => setSwitchB(!switchButton)}>👀</div>

      <button
        onClick={ async() => {
          if(input !== email) return alert("el email del usuario no coincide")
          const verificated = await dispatch(deleteAcount(headers));
          alert(verificated)
          navigate("/")
          await dispatch(logOutUser())
        }}
      >
        delete account
      </button>
    </div>
  );
};

export default UserDetail;
