import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { deleteAcount, logOutUser } from "../../../features/user/userSlice";
import "../../../scss/User/UserSection.scss";
import "../../../scss/User/MyInformation.scss";
import "../../../scss/User/FormsAdmin.scss";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const DeleteAccount = () => {
  const [switchButton, setSwitchB] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    token,
    email,
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
      <div className="span_msg_delete_account">
        <span>
          Are you sure of your decision? if so, copy the email with which the
          account is linked
        </span>
      </div>
      <div className="input_forms_admin_interface_delete_view">
        <input
          className="input_forms_admin_interface_delete"
          type={switchButton ? "text" : "password"}
          value={input}
          name="password"
          placeholder="***********"
          onChange={handleChange}
        />
        <div
          className="input_forms_delete_view"
          onClick={() => setSwitchB(!switchButton)}
        >
          👀
        </div>
      </div>

      <button
        className="button_delete_account_user_detail_delete"
        onClick={async () => {
          if (input !== email) {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
              html: (
                <>
                  <h1>The email you`ve entered doesn`t match any accaunt</h1>
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

          const verificated :any = await dispatch(deleteAcount(headers));
          const MySwal = withReactContent(Swal);
            MySwal.fire({
              html: (
                <>
                  <h1>{verificated}</h1>
                </>
              ),
              position: "center",
              icon: "success",
              title: "We will miss you!",
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
          navigate("/");
          await dispatch(logOutUser());
        }}
      >
        DELETE
      </button>
    </div>
  );
};

export default DeleteAccount;
