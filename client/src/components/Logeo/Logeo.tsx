import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logIn,
  loginUser,
  loginWithGoogle,
  userLog,
  Verificated,
} from "../../features/user/userSlice";
import { motion, AnimateSharedLayout } from "framer-motion";
import { validate } from "./func/validate";
import "../../scss/User/Registration.scss";
import { cardAnimation, gridAnimation } from "../../Animation";
import { FcGoogle } from "react-icons/fc";
import Registration from "./../Registration/Registration";
import "../../scss/User/FormsAdmin.scss";

const Logeo = () => {
  const space: any = useRef(null);

  const [input, setInput] = useState<Verificated>({
    email: "", // segio@
    password: "", // sds2
  });

  const [errors, setErrors] = useState<Verificated>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [move, setMove] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user);
  const [switchButton, setSwitchB] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event: any) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (errors.email || errors.password || !input.email || !input.password)
      return;
    setError("");
    // dispatch (idUser)  'qqwwq12123444sadas'  // aqui insertar funcion
    // ? no te olvides enviar el user name modificado en el reducer
    try {
      await dispatch(userLog(input));
      navigate("/", { replace: true });
      setInput({
        email: "", // segio@
        password: "", // sds2
      });
      setErrors({
        email: "",
        password: "",
      });
    } catch (e: any) {
      setError(e.response.data);
    }
  };

  const btnClose =  <button
                      className="btn-close"
                      onClick={() => navigate("/", { replace: true })}
                    >
                      X
                    </button>

  const handleGoogleSignin = async () => {
    try {
      await dispatch(loginWithGoogle());
      navigate("/", { replace: true });
    } catch (e: any) {
      setError(e.response.data);
    }
  };

  return (
    <div className="modal-exterior">
      <motion.div
        variants={gridAnimation}
        animate="show"
        exit="hide"
        className="modal-container"
        ref={space}
      >
        <motion.div
          className={"form_Registration_container"}
          variants={cardAnimation}
        >
          <section></section>
          {move ? (
            <motion.form
              variants={gridAnimation}
              animate="show"
              exit="hide"
              ref={space}
              onSubmit={handleSubmit}
              className="form-content"
            >
              {
                btnClose
              }
              <h3>Sign In</h3>
              {error && <div className="span_msg_error_info"> {error}</div>}

              <div className="form-container">
                <div className="form-group">
                  <input
                    className="form-input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={input.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <div className="error">
                    <p>{errors.email}</p>
                  </div>
                </div>

                <div className="form-group show-password">
                  <input
                    className="form-input"
                    type={switchButton ? "text" : "password"}
                    id="password"
                    value={input.password}
                    name="password"
                    placeholder=" "
                    onChange={handleChange}
                  />
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <div
                    className="eyes"
                    onClick={() => setSwitchB(!switchButton)}
                  >
                    👀
                  </div>
                  <div className="error">
                    <p>{errors.password}</p>
                  </div>
                </div>
                <div>
                  <button>Sign In</button>
                </div>
                <div className="forgot-password">
                  <Link to={"/rename"}>Forgot Password</Link>
                </div>
                <div className="sign-up">
                  <span>Not a member? </span>
                  <span className="color-link" onClick={() => setMove(false)}>
                    {" "}
                    Sign Up
                  </span>
                </div>
                <div className="line">
                  <span></span> <h4>or</h4> <span></span>
                </div>
                <div className="google-sign-in" onClick={handleGoogleSignin}>
                  <FcGoogle size={30} />
                  <h5>Sign In with Google</h5>
                </div>
              </div>
            </motion.form>
          ) : (
            <Registration 
            setMove={setMove} 
            btnClose={btnClose} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Logeo;
