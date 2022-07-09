import {useAppSelector} from '../../app/hooks'
import { InitialState } from '../../features/user/userSlice'
const User = () => {
  const user :InitialState = useAppSelector((state)=>state.user)
  console.log(user)
  return (
    <div>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <p>{user.loged}</p>
      <p>{user.user}</p>
      <p>{user.token}</p>
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