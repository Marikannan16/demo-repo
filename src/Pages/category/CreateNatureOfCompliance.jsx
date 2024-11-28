import React from 'react'
import { Link } from 'react-router-dom'

const NatureofCompliance = () => {
  return (
   <>
       <div className='flex  w-full justify-between  items-center p-5' >
                <h2 className=' w-full font-semibold text-lg'>Create Nature Of Compliance</h2>
                <Link to="/naturecompliancelist"><button className='w-64 text-white  py-2 sm:text-center   rounded-md bg-primary'> Nature Of Compliance List </button> </Link>
       </div>
       <div className='m-10 mb-5'>
                <h4 className='font-semibold'> Nature of compliance </h4> 
                <input type='text' className=' focus-visible focus-visible:outline-none  mt-3  bg-selectbg border text-sm border-bordergray w-full lg:w-1/2 px-3 py-2  rounded-md' placeholder='Statutory Payment'></input>
       </div>
       <div className='flex justify-center mt-80 gap-5'>
       <button className=' rounded-md border border-black py-2 w-36'>Cancel</button>
       <Link to="/naturecompliancelist"><button className='text-white rounded-md py-2 w-36 bg-primary'> Save </button> </Link>
       </div>
   
   
   </>
  )
}

export default NatureofCompliance
