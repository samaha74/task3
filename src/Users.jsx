import React from 'react'

export default function Users({id, name, email}) {
  return (
    <div className='grid grid-cols-3 gap-4 bg-cyan-950 text-white p-4 rounded-lg'>
        <div>ID: {id}</div>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
    </div>
  )
}
