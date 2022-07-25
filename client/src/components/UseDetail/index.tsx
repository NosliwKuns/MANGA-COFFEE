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
  const { token, user, admin, user_image, user_banner , user_description , telephone , name , lastname , address: {country , direction ,postalCode ,  reference}} = JSON.parse(userCopy);
  const description = user_description.length
  ? user_description
  : "you still don't have a description of your profile ! Create a description to tell a little more about yourself so you can connect with more people who love manga like you.";
  const emailStorage: any = window.localStorage.getItem("copySliceUser");
  const { email } = JSON.parse(emailStorage);
  const defaultPic = <FaUserCircle size={70} color={"white"} />;
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  const navigate = useNavigate();
  let banner_image = user_banner.length
    ? user_banner
    : "https://img.freepik.com/vector-gratis/plantilla-detallada-banner-anime_52683-66691.jpg?w=2000";
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
          src={banner_image}
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
        <label>Description :</label>
      <p>{description}</p>

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
            if (input !== email)
              return alert("el email del usuario no coincide");
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
