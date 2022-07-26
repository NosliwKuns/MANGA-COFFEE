import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useHeaders from "../../app/headers";
import { useAppDispatch } from "../../app/hooks";
import {
  deleteAcount,
  editProfileAction,
  logOutUser,
  setDetailUser,
} from "../../features/user/userSlice";
import DeleteAccount from "./DeleteAccount";
import UsersTable from "./TableUser";

const UserDetail = () => {
  const [input, setInput] = useState("");

  const [editBanner, setEditBanner] = useState();
  const [editImage, setEditImage] = useState();

  const [switchButton, setSwitchB] = useState<boolean>(false);
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const [editProfile, setEditProfile] = useState(false);

  const {
    token,
    user,
    admin,
    user_image,
    user_banner,
    user_description,
    telephone,
    name,
    lastname,
    address: { country, direction, postalCode, reference },
  } = JSON.parse(userCopy);

  const description = user_description.length
    ? user_description
    : "you still don't have a description of your profile ! Create a description to tell a little more about yourself so you can connect with more people who love manga like you.";
  const emailStorage: any = window.localStorage.getItem("copySliceUser");
  const [inputEdit, setInputEdit] = useState<any>({
    users: "",
    description: "",
  });
  const { email } = JSON.parse(emailStorage);
  const defaultPic = <FaUserCircle size={70} color={"white"} />;
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  const navigate = useNavigate();
  const handleEditBanner = (e: any) => {
    setEditBanner(e.target.files);
  };
  const handleEditImage = (e: any) => {
    setEditImage(e.target.files);
  };
  let banner_image = user_banner.length
    ? user_banner
    : "https://img.freepik.com/vector-gratis/plantilla-detallada-banner-anime_52683-66691.jpg?w=2000";
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  const handleChangeEdit = (e: any) => {
    setInputEdit({
      ...inputEdit,
      [e.target.name]: [e.target.value],
    });
  };

  //! ========================================
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const verificate = await dispatch(
      editProfileAction(headers, inputEdit, editImage, editBanner, token)
    );
    window.localStorage.setItem("copySliceUser", JSON.stringify(verificate));
    window.location.reload();
  };
  //! ========================================
  useEffect(() => {
    dispatch(setDetailUser(headers));
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="banner_user_detail_s_contain">
          <div className="images_container_user_detail">
            <div>
              <img
                src={banner_image}
                alt="banner_image"
                className="banner_user_detail_s"
              />
            </div>

            <div className="banner_user_detail_s_contain_icon">
              {user_image.length ? (
                <img src={user_image} alt="user_image" />
              ) : (
                defaultPic
              )}
            </div>
          </div>

          <div>
            {editProfile && (
              <div>
                Banner : <input type={"file"} onChange={handleEditBanner} />
              </div>
            )}
            {editProfile && (
              <div>
                Image User : <input type={"file"} onChange={handleEditImage} />{" "}
              </div>
            )}

            <div
              className="button_edit_profile_user_detail"
              onClick={() => {
                setEditProfile(!editProfile);
              }}
            >
              <AiFillEdit size={30} color={"#64666c"} />
              {/* <p>edit profile</p>  */}
            </div>
          </div>
        </div>
        <div className="user_profile_tile_description_container">
          {editProfile ? (
            <input
              type={"text"}
              name="users"
              value={inputEdit.users}
              placeholder={user}
              onChange={handleChangeEdit}
            />
          ) : (
            <h1 className="name_user_user_detail_h1">{user}</h1>
          )}
          <div>
            {/* <label>Description:</label> */}
            {editProfile ? (
              <input
                type={"text"}
                name="description"
                value={inputEdit.description}
                placeholder={description}
                onChange={handleChangeEdit}
              />
            ) : (
              <p className="user_description_user_detail_p">{description}</p>
            )}
          </div>
        </div>

        {editProfile && <button>Edit</button>}
      </form>
      <div>
        <UsersTable />
        <button
          className="button_delete_account_user_detail"
          onClick={() => setSwitchB(!switchButton)}
        >
          Delete Account
        </button>
        {switchButton && <DeleteAccount />}
      </div>
    </div>
  );
};

export default UserDetail;
