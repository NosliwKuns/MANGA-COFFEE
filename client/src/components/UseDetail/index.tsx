import { useEffect } from 'react'
import useHeaders from '../../app/headers'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setDetailUser } from '../../features/user/userSlice'

const UserDetail = () => {
    const { token , user} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const headers = useHeaders(token)
    useEffect (()=>{
       dispatch (setDetailUser( headers))
    })
  return (
    <div>
<h1>{user}</h1>
    </div>
  )
}

export default UserDetail