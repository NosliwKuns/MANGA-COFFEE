import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { CreateUser, signUp, singUpUser } from "../../features/user/userSlice";
import { validate } from "../Logeo/func/validate";
import "../../scss/User/Registration.scss";
const Registration = () => {
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

  const [error, setError] = useState <string>('')

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

    if (typeof verificate === "string") return alert("existe");

    alert("Your count was created");
    navigate("/", { replace: true });
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

  const passwordText = () => {
    setSwitchB(!switchButton);
  };

  return (
    <div className={"form_Registration_container"}>
      {error && <div> <span>{error}</span></div>}
      <form onSubmit={handleSubmit}>
        <div className="form_Registration_title">
          <h1>Welcome</h1>
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

          {errors.email.length > 1 && <div>{errors.email}</div>}
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
            <div onClick={passwordText} className="form_Registration_view">
              👀
            </div>
          </div>
          {errors.password.length > 1 && <div>{errors.password}</div>}
        </div>

        <div className="form_Registration_input">
          <label htmlFor="user"> NickName :</label>
          <input
            name="user"
            type="text"
            placeholder="user"
            onChange={handleChange}
            value={input.user}
          />

          {errors.user.length > 1 && <div>{errors.user}</div>}
        </div>
        <div>
          <input type="submit" value={"Sign In"} />
        </div>
      </form>
    </div>
  );
};

export default Registration;
