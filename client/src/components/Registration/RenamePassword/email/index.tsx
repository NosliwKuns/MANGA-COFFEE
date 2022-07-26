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
   if(validate === "this user does not exist"){
    alert (validate)
   } else {
    alert("Check your email, We've sent password reset instruction, if it doesn`t arrive soon, check your spam folder.")
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
