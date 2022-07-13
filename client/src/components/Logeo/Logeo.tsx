import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logIn, loginUser, loginWithGoogle, userLog } from "../../features/user/userSlice";
import { InitialState } from "../../features/user/userSlice";
import { validate } from "./func/validate";
import "../../scss/User/Registration.scss";

const Logeo = () => {
  const [input, setInput] = useState<InitialState>({
    id: "",
    email: "", // segio@
    password: "", // sds2
    loged: false,
    user: "",
    token: "",
    favorites: [],
  });

  const [errors, setErrors] = useState<any>({
    email: "",
    password: "",
    loged: false,
  });

  const [error, setError] = useState <string>('')
  const user = useAppSelector((state) => state.user);
  const [switchButton , setSwitchB] = useState<boolean>(false)
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

  const handleSubmit =async (e: any) => {
    e.preventDefault();
    if (errors.email || errors.password || !input.email || !input.password)
      return;
      setError('')
    // dispatch (idUser)  'qqwwq12123444sadas'  // aqui insertar funcion
    // ? no te olvides enviar el user name modificado en el reducer
    try {
      await dispatch(logIn(input.email,input.password))
      dispatch(userLog(input)); //
      alert("acces");
      navigate("/", { replace: true });
      setInput({
        id: "",
        email: "", // segio@
        password: "", // sds2
        loged: false,
        user: "",
        token: "",
        favorites: [],
      });
      setErrors({
        email: "",
        password: "",
        loged: false,
      });
    } catch (e :any) {
      if(e.code === 'auth/user-not-found') {
        setError('Correo invalido')
      }
      setError('Correo invalido')
    }
  };

  const handleGoogleSignin = async () =>{
    try{
      await dispatch (loginWithGoogle())
      navigate("/", { replace: true });
    } catch(e :any){
      setError(e.message)
    }
  
  }

  return (
    <div className={"form_Registration_container"}>
      <form onSubmit={handleSubmit}>
       {error && <div className="form_Registration_span"> <span>{error}</span></div>}
        <div className="form_Registration_title">
          <h1>Welcome Back !</h1>
        </div>

        <div className="form_Registration_input">
          <label htmlFor="emial">Email :</label>
          <input
            name="email"
            type="text"
            placeholder="youremail@company.ldt"
            onChange={handleChange}
            value={input.email}
          />

          {errors.email.length > 1 && <p>{errors.email}</p>}
        </div>

        <div className="form_Registration_input">
        <div className="form_Registration_view_password">

          <label htmlFor="password">Password :</label>
          <input
            name="password"
            type={switchButton ? "text" : "password"}
            placeholder="**********"
            onChange={handleChange}
            value={input.password}
          />
          <div onClick={()=>setSwitchB(!switchButton)}>👀</div>
        </div>
          {errors.password.length > 1 && <p>{errors.password}</p>}
        </div>
        <div>
        <button>Log in</button>

        </div>
        <span>------------------------------------------</span>
        <div onClick={handleGoogleSignin}>
          <h5>Google Login</h5>
        </div>
      </form>
    </div>
  );
};

export default Logeo;
