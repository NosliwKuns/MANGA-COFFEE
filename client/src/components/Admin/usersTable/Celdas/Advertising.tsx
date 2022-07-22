import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useHeaders from '../../../../app/headers';
import { useAppDispatch } from '../../../../app/hooks';
import { sendAdvertising } from '../../../../features/admin/adminSlice';

const Advertising = () => {
    const [input, setInput] = useState({
        subject: "",
        msg: "",
        image : ""
      });
    const userCopy: any = window.localStorage.getItem("copySliceUser");
    const { token } = JSON.parse(userCopy);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const headers = useHeaders (token) ;
    const handleOnChange = (e: any) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        const verificated = await dispatch(sendAdvertising(headers,input))
        alert(verificated)
        navigate("/userDetail");
      };
  return (
    <div>
 <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject :</label>
          <input
            type="text"
            value={input.subject}
            name="subject"
            onChange={handleOnChange}
          />
        </div>
        <div>
        <label htmlFor="image">Image :</label>
        <img src={input.image} alt="copy at URL"/>
        <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="message">Message :</label>
          </div>
          <div>
            <textarea value={input.msg} name="msg" onChange={handleOnChange} />
          </div>
        </div>

        <button>Send</button>
      </form>
    </div>
  )
}

export default Advertising