import React, { useCallback, useState } from 'react'
import TextInput from '../ui/TextInput'


function ParentLogin({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [data, setData] = useState<{email:string;password:string}>({password:'',email:""})

   const handelLogin = useCallback( async()=>{

   },[])
  return (
    <div className='flex flex-col gap-1 bg-gray-700 justify-center items-center w-screen min-h-screen'>
      <div className='flex flex-col w-96  px-4 py-6 rounded-2xl'>
        <TextInput value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className='' label='Email' color='blue' type='email' />
        <TextInput value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} className='' label='Password' color='blue' type='password' />
        <button className='px-4 py-2 bg-blue-400 rounded-2xl' onClick={handelLogin}>Register</button>
        <p className=' cursor-pointer text-blue-300 text-right' onClick={handelSwitcher}>Dont have an account</p>
      </div>
    </div>
  )
}

export default ParentLogin