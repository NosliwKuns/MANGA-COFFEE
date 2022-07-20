import React, { PropsWithChildren, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { siOrNot, userLog } from "../../../features/user/userSlice";
import Verificate from "../../Verificate";
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
    <div>
      <h4>Este correo tiene una cuenta vinculada, desea recuperarla</h4>
      <button
        onClick={async () => {
          const verificate = await   dispatch(siOrNot(input, true));
          alert(verificate)
        }}
      >
        Si
      </button>
      <button
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
