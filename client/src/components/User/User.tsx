import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InitialState, logOut } from "../../features/user/userSlice";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { logOutUser } from "../../features/user/userSlice";
const User = () => {
  const user: InitialState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  console.log(user.user_image , 'userIMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');

  return (
    <div>
      {
        user.user_image ?
        <img src={user.user_image} alt="123123123"/>
        : <FaUserCircle size={44} color={"white"} />
      }
      {user.token ? (
        <div>
         
          <p>{user.user}</p>
          {pathname === "/userDetail" ? (
            <span />
          ) : (
            <button
              onClick={() => {
                navigate("/userDetail", { replace: true });
              }}
            >
              Detail
            </button>
          )}

          <button
            onClick={async () => {
              navigate("/", { replace: true });
              try {
                await dispatch(logOutUser());
                await dispatch(logOut());
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              navigate("/logeo", { replace: true });
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate("/registration", { replace: true });
            }}
          >
            Log In
          </button>
        </div>
      )}
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
