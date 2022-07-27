import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHeaders from "../../app/headers";
import { useAppDispatch } from "../../app/hooks";
import { verificatedUser } from "../../features/user/userSlice";
import "../../scss/User/Verificate.scss";

const Verificate = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  console.log(id);
  useEffect(() => {
    dispatch(verificatedUser(id));
  }, []);
  return (
    <div className="container_verificate_account">
      <div>
        <h1>Verificate</h1>
      </div>
    </div>
  );
};
////////////////////////////////////////////////
export default Verificate;
