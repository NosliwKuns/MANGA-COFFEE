import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useHeaders from "../../app/headers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllUser } from "../../features/admin/adminSlice";
import {
  deleteAcount,
  logOutUser,
  setDetailUser,
} from "../../features/user/userSlice";
import UsersTable from "./TableUser";

const UserDetail = () => {
  const [input, setInput] = useState("");
  const [switchButton, setSwitchB] = useState<boolean>(false);
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token, user, admin, user_image } = JSON.parse(userCopy);
  console.log(token, user, admin);
  const emailStorage: any = window.localStorage.getItem("copySliceUser");
  const { email } = JSON.parse(emailStorage);
  const defaultPic = <FaUserCircle size={70} color={"white"} />;
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    dispatch(setDetailUser(headers));
  });
  return (
    <div>
      <div className="banner_user_detail_s_contain">
        <img
          src={
            "https://img.freepik.com/vector-gratis/plantilla-detallada-banner-anime_52683-66691.jpg?w=2000"
          }
          alt="banner_image"
          className="banner_user_detail_s"
        />
        <div className="banner_user_detail_s_contain_icon">
          {user_image.length ? (
            <img src={user_image} alt="user_image" />
          ) : (
            defaultPic
          )}
        </div>
      </div>
<div>
<h1>{user}</h1>

      <UsersTable />

      <input
        type={switchButton ? "text" : "password"}
        value={input}
        name="password"
        placeholder="******"
        onChange={handleChange}
      />
      <div onClick={() => setSwitchB(!switchButton)}>👀</div>

      <button
        onClick={async () => {
          if (input !== email) return alert("el email del usuario no coincide");
          const verificated = await dispatch(deleteAcount(headers));
          alert(verificated);
          navigate("/");
          await dispatch(logOutUser());
        }}
      >
        delete account
      </button>
</div>
      
    </div>
  );
};

export default UserDetail;
