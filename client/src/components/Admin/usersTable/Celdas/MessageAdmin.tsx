import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHeaders from "../../../../app/headers";
import { useAppDispatch } from "../../../../app/hooks";
import { sendMessageUser } from "../../../../features/admin/adminSlice";

const MessageAdmin = () => {
  const { idUser } = useParams();
  const [input, setInput] = useState({
    subject: "",
    msg: "",
  });
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const headers = useHeaders (token) ;
  const handleOnChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //!==============================================
    const verificated = await dispatch(sendMessageUser(headers ,idUser ,input))
    alert(verificated)
    navigate("/userDetail");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject :</label>
          <input
            type="text"
            value={input.subject}
            name="subject"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="message">Message :</label>
          </div>
          <div>
            <textarea value={input.msg} name="msg" onChange={handleOnChange} />
          </div>
        </div>

        <button>Send</button>
      </form>
    </div>
  );
};

export default MessageAdmin;
