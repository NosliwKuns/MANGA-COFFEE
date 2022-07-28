import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { renamePassword } from "../../../../features/user/userSlice";
import { validatePass } from "./func/validate";
import "../../../../scss/User/RenamePass.scss";
import "../../../../scss/User/FormsAdmin.scss";
import "../../../../scss/User/UserSection.scss";
import "../../../../scss/User/MyInformation.scss";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const RenamePass = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("copy a new password");
  const [switchButton, setSwitchB] = useState<boolean>(false);
  const { idUser } = useParams();
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setInput(e.target.value);
    setError(validatePass(e.target.value));
  };
  const passwordText = () => {
    setSwitchB(!switchButton);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (error.length) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: (
          <>
            <h1>Please fill in all the spaces correctly</h1>
          </>
        ),
        position: "center",
        icon: "error",
        title: "Oops...",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        buttonsStyling: false,
        customClass: {
          confirmButton: "confirmButton",
        },
      });

      return;
    }
    const validate = await dispatch(renamePassword(input, idUser));

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <>
          <h1>{validate}</h1>
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
  };

  return (
    <div className="admin_interface_container">
      <div>
        <div className="span_adv_emial">
          <span>Enter your new password</span>
        </div>

        <form onSubmit={handleSubmit}>
          <h3> Password : </h3>
          <div className="input_forms_admin_interface_delete_view">
            <input
              className="input_forms_admin_interface_delete"
              type={switchButton ? "text" : "password"}
              name="password"
              value={input}
              onChange={handleChange}
            />
            <div onClick={passwordText} className="input_forms_delete_view">
              👀
            </div>
          </div>
          {error && <span className="error_form_admin_interface">{error}</span>}
          <button className="button_forms_send_admin_interface">Send</button>
        </form>
      </div>
    </div>
  );
};

export default RenamePass;
