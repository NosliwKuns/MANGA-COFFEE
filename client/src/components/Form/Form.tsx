import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {loginUser} from '../../features/user/userSlice'

const Form = () => {
  const [userName, setUserName] = useState({
    user: "",
    password: "",
  });

  const {user} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleChange = ( e : any) => {
    e.preventDefault();
    setUserName({
      ...userName,
      [e.target.userName]: e.target.value,
    });
  };

  const handleSubmit = ( e : any ) =>{
    e.preventDefault();
    // dispatch(loginUser(userName))
  }

  return (
    <form>
      <label htmlFor="user">User :</label>
      <input
        name="user"
        type="text"
        placeholder="user"
        onChange={handleChange}
        value={userName.user}
      />
      <label htmlFor="password">Password :</label>
      <input
        name="password"
        type="text"
        placeholder="password"
        onChange={handleChange}
        value={userName.password}
      />
    </form>
  );
};

export default Form;
