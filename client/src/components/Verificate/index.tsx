import  { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useHeaders from '../../app/headers'
import { useAppDispatch } from '../../app/hooks'
import { verificatedUser } from '../../features/user/userSlice'

const Verificate = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    console.log(id)
    useEffect(()=>{
        dispatch(verificatedUser(id))
    },[])
  return (
    <h1>Verificate</h1>
  )
}

export default Verificate