import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { AppThunk } from "../../app/store";
import { createUser, singUpUser } from "../../features/user/userSlice";
import { validate } from "../Logeo/func/validate";

const Registration = () => {
  const [input, setInput] = useState({
    id: "",
    email: "", // segio@
    password: "", // sds2
    loged: false,
    user: "",
    token : "",
    favorites : []
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    loged: false,
    user: "",
  });

  const dispatch = useAppDispatch();

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
 
    if (typeof verificate === 'string') {
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
      token : "",
      favorites : []
    });
    setErrors({
      email: "",
      password: "",
      loged: false,
      user: "",
    });
  };

  console.log(input);
  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome</h1>
      <label htmlFor="emial">Email :</label>
      <input
        name="email"
        type="text"
        placeholder="email"
        onChange={handleChange}
        value={input.email}
      />

      {errors.email.length > 1 && <label>{errors.email}</label>}

      <label htmlFor="password">Password :</label>
      <input
        name="password"
        type="text"
        placeholder="password"
        onChange={handleChange}
        value={input.password}
      />
      {errors.password.length > 1 && <p>{errors.password}</p>}

      <label htmlFor="user"> NickName :</label>
      <input
        name="user"
        type="text"
        placeholder="user"
        onChange={handleChange}
        value={input.user}
      />

      {errors.user.length > 1 && <label>{errors.user}</label>}

      <button>Log in</button>
    </form>
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
