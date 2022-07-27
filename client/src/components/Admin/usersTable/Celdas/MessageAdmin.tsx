import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import useHeaders from "../../../../app/headers";
import { useAppDispatch } from "../../../../app/hooks";
import { sendMessageUser } from "../../../../features/admin/adminSlice";
import Swal from 'sweetalert2'
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
    const verificated :any = await dispatch(sendMessageUser(headers ,idUser ,input))
    const MySwal = withReactContent(Swal)
        MySwal.fire({
          html: <><h1>{verificated}</h1></>,
            position: 'center',
           icon: 'success',
           showConfirmButton: false,
           timer: 1500 ,
          showCloseButton: true,
          focusConfirm: false,
          background: "#212429",
          buttonsStyling: false,
          customClass: {
            confirmButton: 'confirmButton'
          }
        })
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
