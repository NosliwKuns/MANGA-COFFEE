import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InitialState, logOut } from "../../features/user/userSlice";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../../scss/User/UserSection.scss";

const User = () => {
  const user: InitialState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultPic = <FaUserCircle size={69} color={"white"} />;

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
          className="btn"
            onClick={() => {
              navigate("/logeo", { replace: true });
            }}
          >
            Log in
          </button>
        ) : pathname === "/userDetail" ? (
          ''
        ) : (
          <>
            <button
              className="btn"
              onClick={() => {
                navigate("/userDetail", { replace: true });
              }}
            >
              Perfil
            </button>
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
