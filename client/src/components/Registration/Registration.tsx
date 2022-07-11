import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { singUpUser } from "../../features/user/userSlice";
import { validate } from "../Logeo/func/validate";
import "../../scss/User/Registration.scss";
const Registration = () => {
  const [input, setInput] = useState({
    id: "",
    email: "", // segio@
    password: "", // sds2
    loged: false,
    user: "",
    token: "",
    favorites: [],
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    loged: false,
    user: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [switchButton , setSwitchB] = useState<boolean>(false)

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
    // dispatch (idUser)  'qqwwq12123444sadas'  // aqui insertar funcion
    // ? no te olvides enviar el user name modificado en el reducer

    const verificate: any = await dispatch(singUpUser(input));
    console.log(verificate);
    if (typeof verificate === "string") {
      alert("existe");
    } else {
      alert("Your count was created");
    }
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
      user: "",
    });

    navigate("/", { replace: true });
  };

  return (
    <div className={"form_Registration_container"}>
      <form onSubmit={handleSubmit}>
        <div className="form_Registration_title">
          <h1>Welcome</h1>
        </div>
        <div className="form_Registration_input">
          <label htmlFor="emial">Email :</label>
          <input
            name="email"
            type="text"
            placeholder="email"
            onChange={handleChange}
            value={input.email}
          />

          {errors.email.length > 1 && <div>{errors.email}</div>}
        </div>

        <div className="form_Registration_input">
          <label htmlFor="password">Password :</label>
          <input
            name="password"
            type={switchButton ? "text" : "password"}
            placeholder="password"
            onChange={handleChange}
            value={input.password}
          />
          <button onClick={()=>setSwitchB(!switchButton)}>👀</button>
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
          <button>Log in</button>
        </div>
        <span>------------------------------------------</span>
        <div>
          <h5>Logeo con Google</h5>
        </div>
      </form>
    </div>
  );
};

export default Registration;

// ! login
// Email :
// -------------------
// password :
// -------------------
//             olvidaste
// ||||||||||||||||||
// google

// ! Registration

// Email :
// -------------------
// password :
// -------------------
