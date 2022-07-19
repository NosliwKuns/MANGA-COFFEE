import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { renameEmail } from "../../../../features/user/userSlice";
import { validate } from "./func/validate";

const RenamePassword = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch()

  const handleChange = (e: any) => {
    setInput(e.target.value);
    setError(validate(e.target.value));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (error.length) return;
    // dispatch
   const validate : any = await dispatch(renameEmail(input))
   if(validate === "El usuario no existe"){
    alert (validate)
   } else {
    alert("revise su correo electronico en breve le lleagra una link para cambiar su contrasenia")
   }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email"> Email : </label>
      <input type={"text"} name="email" value={input} onChange={handleChange} />
      {error && <span>{error}</span>}
      <button>Send</button>
    </form>
  );
};

export default RenamePassword;
