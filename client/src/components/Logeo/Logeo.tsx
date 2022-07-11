
import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser, userLog } from "../../features/user/userSlice";
import { InitialState } from "../../features/user/userSlice";
import { validate } from "./func/validate";
import {Link} from 'react-router-dom'

const Logeo = () => {
  const [input, setInput] = useState<InitialState>({
    id: "",
    email: "", // segio@
    password: "", // sds2
    loged: false,
    user : "",
    token :"",
    favorites :[]
  });

  const [errors, setErrors] = useState<any>({
    email: "",
    password: "",
    loged: false,
  });

  const user = useAppSelector((state) => state.user);
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (errors.email || errors.password || !input.email || !input.password)
      return;
    // dispatch (idUser)  'qqwwq12123444sadas'  // aqui insertar funcion
    // ? no te olvides enviar el user name modificado en el reducer
    dispatch(userLog(input)); //
    alert("acces");
    setInput({
      id: "",
      email: "", // segio@
      password: "", // sds2
      loged: false,
      user:"",
      token: "",
      favorites :[]
    })
    setErrors({
      email: "",
      password: "",
      loged: false,
    });
    navigate("/", { replace: true })
  };

  return (
    <div>

    <form onSubmit={handleSubmit}>
      <h1>Welcome Back !</h1>
      <label htmlFor="emial">Email :</label>
      <input
        name="email"
        type="text"
        placeholder="email"
        onChange={handleChange}
        value={input.email}
      />

      {errors.email.length>1 && <label>{errors.email}</label>}

      <label htmlFor="password">Password :</label>
      <input
        name="password"
        type="text"
        placeholder="password"
        onChange={handleChange}
        value={input.password}
      />
      {errors.password.length >1 && <p>{errors.password}</p>}
      <button>Log in</button>
    </form>
    </div>
    
  );
};

export default Logeo;
