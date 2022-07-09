import { Target, ValueTarget } from "framer-motion";
import { KeyboardEventHandler, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../features/user/userSlice";
import { InitialState } from "../../features/user/userSlice";
import { validate } from "./func/validate";

const Logeo = () => {
  const [input, setInput] = useState<InitialState>({
    id: "",
    email: "", // segio@
    password: "", // sds2
    loged: false,
    user : ''
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
    dispatch(loginUser(input)); //
    alert("Your count was created");
    setInput({
      id: "",
      email: "", // segio@
      password: "", // sds2
      loged: false,
      user:''
    })
    setErrors({
      email: "",
      password: "",
      loged: false,
    });
  };

  console.log(errors)
  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome Back</h1>
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
  );
};

export default Logeo;
