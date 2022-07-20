import { useEffect, useState } from "react";
import useHeaders from "../../app/headers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteAcount, logOut, setDetailUser } from "../../features/user/userSlice";

const UserDetail = () => {
  const { token, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  console.log(input , "input --------")
  const [switchButton, setSwitchB] = useState<boolean>(false);
  const headers = useHeaders(token);
  const handleChange = (e: any) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    dispatch(setDetailUser(headers));
  });
  return (
    <div>
      <h1>{user}</h1>
      <input
        type={switchButton ? "text" : "password"}
        value={input}
        name="password"
        placeholder="******"
        onChange={handleChange}
      />
      <div onClick={() => setSwitchB(!switchButton)}>👀</div>

      <button
        onClick={ async() => {
         const verificated = await dispatch(deleteAcount(headers, input));
         alert(verificated)
         dispatch(logOut())
        }}
      >
        delete account
      </button>
    </div>
  );
};

export default UserDetail;
