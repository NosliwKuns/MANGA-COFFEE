import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { sendAdvertising } from "../../../features/admin/adminSlice";
import "../../../scss/User/FormsAdmin.scss";

const Advertising = () => {
  const [input, setInput] = useState({
    subject: "",
    msg: "",
  });
  const [image, setImage] = useState();
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const headers = useHeaders(token);
  const handleOnChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    console.log(image);
    console.log(input);
    e.preventDefault();
    const verificated: any = await dispatch(
      sendAdvertising(headers, input, image)
    );
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <>
          <h1>{verificated}</h1>
        </>
      ),
      position: "center",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      showCloseButton: true,
      focusConfirm: false,
      background: "#212429",
      buttonsStyling: false,
      customClass: {
        confirmButton: "confirmButton",
      },
    });
    navigate("/userDetail");
  };
  const handleImage = (e: any) => {
    setImage(e.target.files);
  };
  return (
    <div className="admin_interface_container">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Subject :</h3>
          <input
            className="input_forms_admin_interface"
            type="text"
            value={input.subject}
            name="subject"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <div>
            <h3>Message :</h3>
          </div>
          <div>
            <textarea
              className="input_forms_admin_interface_text"
              value={input.msg}
              name="msg"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <h3>Image :</h3>
          <input
            className="input_file_forms_admin_interface"
            type="file"
            onChange={handleImage}
            accept="image/*"
          />
        </div>
        <button className="button_forms_send_admin_interface">Send</button>
      </form>
    </div>
  );
};

export default Advertising;
