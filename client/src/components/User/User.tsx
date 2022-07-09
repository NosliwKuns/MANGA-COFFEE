import {useAppSelector} from '../../app/hooks'
import { InitialState } from '../../features/user/userSlice'
const User = () => {
  const user :InitialState = useAppSelector((state)=>state.user)
  console.log(user)
  return (
    <div>{user.email}</div>
  )
}

export default User