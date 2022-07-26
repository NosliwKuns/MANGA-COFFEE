import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useHeaders from "../../../../app/headers";
import { useAppDispatch } from "../../../../app/hooks";
import {
  switchAdmin,
  switchBlock,
  switchStatus,
} from "../../../../features/admin/adminSlice";
import "../../../../scss/User/TableAllUsers.scss";

const Celdas = (e: any) => {
  const [status, setStatus] = useState(e.status);
  const [admin, setAdmin] = useState(e.admin);
  const [block, setBlock] = useState(e.block);
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const { token } = JSON.parse(userCopy);
  const headers = useHeaders(token);
  const dispatch = useAppDispatch();
  return (
    <div className="celda_user_table_users_admin">
      <div className="celda_user_name_user">
        <h3>{e.users}</h3>
      </div>
      <div className="celda_user_email">

      <p>{e.email}</p>
      </div>
      <button
      className={status ? "button_true_table_user":"button_false_table_user"}
        onClick={async () => {
          console.log(headers);
          setStatus(!status);
          const verificated: any = await dispatch(switchStatus(headers, e.id));
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
      // >{`status ${status}`}</button>
      >{`status`}</button>
      <button
      className={admin ? "button_true_table_user":"button_false_table_user"}
        onClick={async () => {
          setAdmin(!admin);
          const verificated: any = await dispatch(switchAdmin(headers, e.id));
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
      // >{`admin ${admin}`}</button>
      >{`admin`}</button>
      <button
      className={block ? "button_true_table_user":"button_false_table_user"}
        onClick={async () => {
          setBlock(!block);
          const verificated: any = await dispatch(switchBlock(headers, e.id));
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
      // >{`block ${block}`}</button>
      >{`block`}</button>
      <Link to={`/admin/msg/${e.id}`}>
        <button>✉</button>
      </Link>
    </div>
  );
};

export default Celdas;
