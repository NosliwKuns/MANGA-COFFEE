import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { renamePassword } from "../../../../features/user/userSlice";
import { validatePass } from "./func/validate";

const RenamePass = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [switchButton, setSwitchB] = useState<boolean>(false)
  const { idUser } = useParams()
  const dispatch = useAppDispatch()


  const handleChange = (e: any) => {
    setInput(e.target.value);
    setError(validatePass(e.target.value));
  };
  const passwordText = () => {
    setSwitchB(!switchButton);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (error.length) return;
   const validate = await dispatch(renamePassword(input , idUser))
   alert(validate)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="password"> Password : </label>
      <input
        type={switchButton ? "text" : "password"}
        name="password"
        value={input}
        onChange={handleChange}
      />
      <div onClick={passwordText} className="form_Registration_view">
              👀
            </div>
      {error && <span>{error}</span>}
      <button>Send</button>
    </form>
  );
};

export default RenamePass;
