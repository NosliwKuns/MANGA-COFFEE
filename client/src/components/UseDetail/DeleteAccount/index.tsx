import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useHeaders from '../../../app/headers';
import { useAppDispatch } from '../../../app/hooks';
import { deleteAcount, logOutUser } from '../../../features/user/userSlice';

const DeleteAccount = () => {
    const [switchButton, setSwitchB] = useState<boolean>(false);
    const [input, setInput] = useState("");
    const userCopy: any = window.localStorage.getItem("copySliceUser");
    const [editProfile, setEditProfile] = useState(false);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
      token,
      email ,
      user,
      admin,
      user_image,
      user_banner,
      user_description,
      telephone,
      name,
      lastname,
      address: { country, direction, postalCode, reference },
    } = JSON.parse(userCopy);
    const headers = useHeaders(token);
    const handleChange = (e: any) => {
        setInput(e.target.value);
      };
  return (
    <div>
                <input
          type={switchButton ? "text" : "password"}
          value={input}
          name="password"
          placeholder="******"
          onChange={handleChange}
        />
        <div onClick={() => setSwitchB(!switchButton)}>👀</div>

        <button
          onClick={async () => {
            if (input !== email)
              return alert("the email you`ve entered doesn`t match any accaunt");
            const verificated = await dispatch(deleteAcount(headers));
            alert(verificated);
            navigate("/");
            await dispatch(logOutUser());
          }}
        >
          delete account
        </button>
    </div>
  )
}

export default DeleteAccount