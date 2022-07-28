import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { renameEmail } from "../../../../features/user/userSlice";
import { validate } from "./func/validate";
import "../../../../scss/User/RenamePass.scss";
import "../../../../scss/User/FormsAdmin.scss";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const RenamePassword = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("copy your email");
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setInput(e.target.value);
    setError(validate(e.target.value));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (error.length){
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
    // dispatch
    const validate: any = await dispatch(renameEmail(input));
    if (validate === "this user does not exist") {
      const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <>
          <h1>{validate}</h1>
        </>
      ),
      position: "center",
      icon: "error",
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
    } else {
      const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <>
          <h1>Check your email, We've sent password reset instruction, if it doesn`t arrive soon, check your spam folder.</h1>
        </>
      ),
      position: "center",
      icon: "success",
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
    }
  };
  // "Check your email, We've sent password reset instruction, if it doesn`t arrive soon, check your spam folder."

  return (
    <div className="admin_interface_container">
      <div>
        <div className="span_adv_emial">
          <span>Enter your email to be sent an email where you will be given a link to recover your account</span>
        </div>

        <form onSubmit={handleSubmit}>
          <h3> Email : </h3>
          <input
            className="input_forms_admin_interface_delete"
            type={"text"}
            name="email"
            value={input}
            onChange={handleChange}
          />
          {error && <h4 className="error_form_admin_interface">{error}</h4>}
          <button className="button_forms_send_admin_interface">Send</button>
        </form>
      </div>
    </div>
  );
};

export default RenamePassword;
