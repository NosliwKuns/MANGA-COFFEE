import React, { PropsWithChildren, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppDispatch } from "../../../app/hooks";
import { siOrNot, userLog } from "../../../features/user/userSlice";
import Verificate from "../../Verificate";
import "../../../scss/User/TableAllUsers.scss"
type inputPropsSiOrNot = {
  email : string ,
  password : string ,
  user : string
}
type Props = {
  input: SetStateAction<inputPropsSiOrNot>;
};

const SiOrNot = ({ input }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  return (
    <div className="si_or_not_container">
      <h4>This email is already registered, do you want to get it back? </h4>
      <button
       className="si_si_or_not"
        onClick={async () => {
          const verificated : any = await   dispatch(siOrNot(input, true));
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
        }}
      >
        Si
      </button>
      <button
      className="not_si_or_not"
        onClick={async () => {
          const verificate = await dispatch(siOrNot(input, false));
          await dispatch (userLog(verificate))
          navigate("/")
        }}
      >
        No
      </button>
    </div>
  );
};

export default SiOrNot;
