import { useState } from "react";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { editInformation } from "../../../features/user/userSlice";
import { validate } from "./func/validate";
import "../../../scss/User/MyInformation.scss";
import { AiFillEdit } from "react-icons/ai";

const MyInformation = () => {
  const userCopy: any = window.localStorage.getItem("copySliceUser");
  const {
    token,
    user,
    admin,
    user_image,
    user_banner,
    user_description,
    telephone,
    name,
    lastname,
    address: { country, direction, postalCode, reference: reference_user },
  } = JSON.parse(userCopy);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  const headers = useHeaders(token);
  const phone = telephone ? telephone : "What's your phone number?";
  const name_user = name.length ? name : "What's your name ?";
  const last_user = lastname.length ? lastname : "What's your surname ?";
  const country_user = country.length ? country : "Where are you from ?";
  const direction_user = direction.length ? direction : "What's your adress ?";
  const postal_code = postalCode.length
    ? postalCode
    : "What's your postal code ?";
  const reference = reference_user.length
    ? reference_user
    : "can you give us a reference? it would help us a lot !";
  const [input, setInput] = useState({
    phone: "",
    name_user: "",
    last_user: "",
    country_user: "",
    direction_user: "",
    postal_code: "",
    reference: "",
  });
  const [error, setError] = useState({
    phone: "",
    name_user: "",
    last_user: "",
    country_user: "",
    direction_user: "",
    postal_code: "",
    reference: "",
  });
  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: [e.target.value],
    });
    setError(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const verificated = await dispatch(editInformation(headers, input, token));
    console.log(verificated);
    window.localStorage.setItem("copySliceUser", JSON.stringify(verificated));
    window.location.reload();
  };
  return (
    <div className="container_user_detail_information">
      <div
        className="container_user_detail_btn_edit"
        onClick={() => setEdit(!edit)}
      >
        <AiFillEdit size={30} color={"#64666c"} />
      </div>
      <form onSubmit={handleSubmit}>
       {edit && <div className="span_msg_edit_info">
          <span>
            This information is only visible to you; by filling it out you help
            us to improve your user experience.
          </span>
        </div>}

        <div className="user_detail_edit_information_container">
          <div>
          <h5>Phone Number</h5>
            {edit ? (
              <input
                className="user_detail_edit_information_input"
                type="text"
                name="phone"
                value={input.phone}
                placeholder={phone}
                onChange={handleChange}
              />
            ) : (
              <div>
                <p className="user_detail_information">{phone}</p>
              </div>
            )}
          </div>
          {error.phone && <div>{error.phone}</div>}
          <div>
          <h5>Name</h5>
            {edit ? (
              <input
                className="user_detail_edit_information_input"
                type="text"
                name="name_user"
                value={input.name_user}
                placeholder={name_user}
                onChange={handleChange}
              />
            ) : (
              <p className="user_detail_information">{name_user}</p>
            )}
          </div>
          <div>
            <h5>Last Name</h5>
            {edit ? (
              <input
                className="user_detail_edit_information_input"
                type="text"
                name="last_user"
                value={input.last_user}
                placeholder={last_user}
                onChange={handleChange}
              />
            ) : (
              <p className="user_detail_information">{last_user}</p>
            )}
          </div>
          <div>
            <h5>Country:</h5>
            {edit ? (
              <input
                className="user_detail_edit_information_input"
                type="text"
                name="country_user"
                value={input.country_user}
                placeholder={country_user}
                onChange={handleChange}
              />
            ) : (
              <p className="user_detail_information">{country_user}</p>
            )}
          </div>
          <div>
            <h5>Direction</h5>
            {edit ? (
              <input
                className="user_detail_edit_information_input"
                type="text"
                name="direction_user"
                value={input.direction_user}
                placeholder={direction_user}
                onChange={handleChange}
              />
            ) : (
              <p className="user_detail_information">{direction_user}</p>
            )}
          </div>
          <div>
            <h5>Postal Code</h5>
            {edit ? (
              <input
                className="user_detail_edit_information_input"
                type="text"
                name="postal_code"
                value={input.postal_code}
                placeholder={postal_code}
                onChange={handleChange}
              />
            ) : (
              <div>
                <p className="user_detail_information">{postal_code}</p>
              </div>
            )}
          </div>
          {error.postal_code && <div>{error.postal_code}</div>}
          <div>
            <h5>Reference :</h5>
            {edit ? (
              <textarea
                className="user_detail_edit_information_input"
                name="reference"
                value={input.reference}
                placeholder={reference}
                onChange={handleChange}
              />
            ) : (
              <p className="user_detail_information">{reference}</p>
            )}
          </div>
        </div>

        {edit && <button className="button_edit_info_user_detail">edit</button>}
      </form>
    </div>
  );
};

export default MyInformation;
////
