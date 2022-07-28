import { useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import useHeaders from "../../app/headers";
import { useAppDispatch } from "../../app/hooks";
import { verificatedUser } from "../../features/user/userSlice";
import "../../scss/User/Verificate.scss";
import "../../scss/User/FormsAdmin.scss";

const Verificate = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  console.log(id);
  useEffect(() => {
    dispatch(verificatedUser(id));
  }, []);
  return (
    <div className="container_verificate_account">
      <div className="container_verificate_account_content">
        <div>
          <BsFillCheckCircleFill className="icon_verificate" />
          <h1>WELCOME !</h1>
          <p>Thank you for verifying your account; enjoy new features. </p>
          <button className="button_forms_send_admin_interface" onClick={()=>{
            navigate("/")
          }}>
            Enjoy MANGA COFFEE
          </button>
        </div>
      </div>
    </div>
  );
};
////////////////////////////////////////////////
export default Verificate;
