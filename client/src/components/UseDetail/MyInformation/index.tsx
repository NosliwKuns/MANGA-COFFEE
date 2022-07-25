import { useState } from "react";
import useHeaders from "../../../app/headers";
import { useAppDispatch } from "../../../app/hooks";
import { editInformation } from "../../../features/user/userSlice";
import { validate } from "./func/validate";

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
    address: { country, direction, postalCode, reference :reference_user },
  } = JSON.parse(userCopy);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch()
  const headers = useHeaders(token)
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
    phone,
    name_user,
    last_user,
    country_user,
    direction_user,
    postal_code,
    reference ,
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

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const userCopy: any = window.localStorage.getItem("copySliceUser");
    const copyUser = JSON.parse(userCopy);
    copyUser.telephone= input.phone[0]
    copyUser.name= input.name_user[0]
    copyUser.lastname= input.last_user[0]
    copyUser.address.country= input.country_user[0]
    copyUser.address.direction= input.direction_user[0]
    copyUser.address.postalCode= input.postal_code[0]
    copyUser.address.reference= input.reference[0]

    const verificated = await dispatch(editInformation(headers,input,token))
    //
    window.localStorage.setItem("copySliceUser", JSON.stringify(verificated));
    window.location.reload();
  }
  return (
    <div>
      <button onClick={() => setEdit(!edit)}>edit your information</button>
      <form onSubmit={handleSubmit}>
        <span>
          This information is only visible to you; by filling it out you help us
          to improve your user experience.
        </span>
        <div>
          {edit ? (
            <input
              type="text"
              name="phone"
              value={input.phone}
              onChange={handleChange}
            />
          ) : (
            <div>
              <p>{phone}</p>

              
            </div>
          )}
          
        </div>
        {error.phone && <div>{error.phone}</div>}
        <div>
          {edit ? (
            <input
              type="text"
              name="name_user"
              value={input.name_user}
              onChange={handleChange}
            />
          ) : (
            <p>{name_user}</p>
          )}
        </div>
        <div>
          {edit ? (
            <input
              type="text"
              name="last_user"
              value={input.last_user}
              onChange={handleChange}
            />
          ) : (
            <p>{last_user}</p>
          )}
        </div>
        <div>
          {edit ? (
            <input
              type="text"
              name="country_user"
              value={input.country_user}
              onChange={handleChange}
            />
          ) : (
            <p>{country_user}</p>
          )}
        </div>
        <div>
          {edit ? (
            <input
              type="text"
              name="direction_user"
              value={input.direction_user}
              onChange={handleChange}
            />
          ) : (
            <p>{direction_user}</p>
          )}
        </div>
        <div>
        {edit ? (
            <input
              type="text"
              name="postal_code"
              value={input.postal_code}
              onChange={handleChange}
            />
          ) : (
            <div>
              <p>{postal_code}</p>

              
            </div>
          )}
        </div>
        {error.postal_code && <div>{error.postal_code}</div>}
        <div>
          {edit ? (
            <textarea
              name="reference"
              value={input.reference}
              onChange={handleChange}
            />
          ) : (
              <p>{reference}</p>

          )}
        </div>
        {edit && <button>edit</button>}
      </form>
    </div>
  );
};

export default MyInformation;
////