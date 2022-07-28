import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InitialState, logOut } from "../../features/user/userSlice";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { logOutUser } from "../../features/user/userSlice";
import "../../scss/User/UserSection.scss";

const User = () => {
  const user: InitialState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const btnLogOut = async () => {
    navigate("/", { replace: true });
    try {
      await dispatch(logOutUser());
      await dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };

  const defaultPic = <FaUserCircle size={70} color={"white"} />;
  const btn = <button onClick={btnLogOut}>Log Out</button>;

  return (
    <div className="user-container">
      <div className="banner">
        {/* {
          !user ? <section></section> : !user.user_banner ? <section></section> : <img src={user.user_banner} alt="123123123"/>
        } */}
        <div className="photo">
          {!user ? (
            defaultPic
          ) : !user.user_image ? (
            defaultPic
          ) : (
            <img
              src={user.user_image}
              alt="image_user"
              className="image_user_icon"
            />
          )}
        </div>
      </div>
      {user ? (
        <div className="user-info">
          <span>{user.user}</span>
        </div>
      ) : (
        ""
      )}
      <div className="btn-section">
        {!user.token ? (
          <button
            onClick={() => {
              navigate("/logeo", { replace: true });
            }}
          >
            Log in
          </button>
        ) : pathname === "/userDetail" ? (
          btn
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/userDetail", { replace: true });
              }}
            >
              Detail
            </button>
            {btn}
          </>
        )}
      </div>
    </div>
  );
};

export default User;

// id: "",
//   email: "",
//   password: "",
//   loged: false,
//   user: "",
//   token: "",
//   favorites :[]
