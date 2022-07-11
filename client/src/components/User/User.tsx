import {useAppSelector} from '../../app/hooks'
import { InitialState } from '../../features/user/userSlice'
import {FaUserCircle} from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
const User = () => {
  const user :InitialState = useAppSelector((state)=>state.user)
  const navigate = useNavigate()
  const {pathname} = useLocation()
  console.log(user)
  
  return (
    <div>
      <FaUserCircle size={44} color={'white'}/>
      <p>{user.user}</p>
      {
        pathname === '/userDetail'  ? 
        <span/>
        : <button
        onClick={()=>{ navigate("/userDetail", { replace: true })}}
        >Detail</button>
      }
     
    </div>
  )
}

export default User

// id: "",
//   email: "",
//   password: "",
//   loged: false,
//   user: "",
//   token: "",
//   favorites :[]