import React, { useState } from 'react'

const Celdas = (e : any) => {
    const [status,setStatus] = useState(e.status)
    const [admin , setAdmin] = useState(e.admin)
    const [block , setBlock] = useState(e.block)
   return (
   <div>
    <h2>{e.users}</h2>
    <h3>{e.email}</h3>
    <button onClick={()=>{setStatus(!status)}}>{`status ${status}`}</button>
    <button onClick={()=>{setAdmin(!admin)}}>{`admin ${admin}`}</button>
    <button onClick={()=>{setBlock(!block)}}>{`block ${block}`}</button>
    <div>✉</div>
    </div>
    )
}

export default Celdas