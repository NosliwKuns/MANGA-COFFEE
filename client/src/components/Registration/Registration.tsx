import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { CreateUser, signUp, singUpUser } from "../../features/user/userSlice";
import { validate } from "../Logeo/func/validate";
import "../../scss/User/Registration.scss";
import SiOrNot from "./SiOrNot";
import { gridAnimation } from './../../Animation';
import { motion } from 'framer-motion';
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";

type Props = {
  setMove: React.Dispatch<React.SetStateAction<boolean>>
}

const Registration = ({ setMove } : Props) => {

  const space: any = useRef(null);

  const [input, setInput] = useState<CreateUser>({
    email: "", 
    password: "", 
    user: "",
  });
  const [errors, setErrors] = useState<CreateUser>({
    email: "",
    password: "",
    user: "",
  });

  const [error, setError] = useState <any>()

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [switchButton, setSwitchB] = useState<boolean>(false);

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
    setError('')
    // dispatch (idUser)  'qqwwq12123444sadas'  // aqui insertar funcion
    // ? no te olvides enviar el user name modificado en el reducer
    try {
  //  dispatch(signUp(input.email ,input.password))
    const verificate: any = await dispatch(singUpUser(input));

    if ( verificate === "Usuario existente") return setError(verificate);
    if ( verificate === "Este correo tiene una cuenta vinculada, desea recuperarla") return setError(<SiOrNot input={input}/>);

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your account was created successfully',
      background: "#212429",
      color: '#fff',
      showConfirmButton: false,
      timer: 1500,
    })
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500)
    setInput({
      email: "", // segio@
      password: "", // sds2
      user: "",
    });
    setErrors({
      email: "",
      password: "",
      user: "",
    });
    } catch(e:any){
      if(e.code === 'auth/inter-error') {
        setError('Correo invalido')
      }
      setError(e.message)
    }
    
  };

  return (
    <div className="form-wrapper">
      {error && <div>{error}</div>}
      <motion.form 
        variants={gridAnimation}
        animate="show"
        exit="hide"
        ref={space}
        onSubmit={handleSubmit} 
        className="form-content"> 
        
        <h3>Welcome</h3>
        <div className="form-container">
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              id="nickname"
              name="user"
              placeholder=" "
              value={input.user}
              onChange={handleChange}
            />
            <label htmlFor="nickname" className="form-label">
              NickName:
            </label>
            <div className="error">
              <p>{errors.user}</p>
            </div>
          </div>
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
            >👀
            </div>
            <div className="error">
              <p>{errors.password}</p>
            </div>
          </div>
          <div>
            <button>Sign Up</button>
          </div>
          <div className="sign-up">
            <span>Already have an Account?</span>
            <span 
              className="color-link"
              onClick={() => setMove(true)}
            > LogIn
            </span>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default Registration;