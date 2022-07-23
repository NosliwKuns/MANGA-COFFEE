import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useHeaders from '../../../app/headers';
import { useAppDispatch } from '../../../app/hooks';
import { sendAdvertising } from '../../../features/admin/adminSlice';

const Advertising = () => {
    const [input, setInput] = useState({
        subject: "",
        msg: "",
      });
    const [image , setImage] = useState()
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
        const verificated = await dispatch(sendAdvertising(headers,input ,image))
        alert(verificated)
        navigate("/userDetail");
      };
      const handleImage = (e:any) => {
        setImage(e.target.files)
      }
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
        {/* <img src={input.image} alt="copy at URL"/> */}
        <input
            type="file"
            onChange={handleOnChange}
            accept="image/*"
          />
        </div>
        <div>
          <div>
            <label htmlFor="message">Message :</label>
          </div>
          <div>
            <textarea value={input.msg} name="msg" onChange={handleImage} />
          </div>
        </div>

        <button>Send</button>
      </form>
    </div>
  )
}

export default Advertising