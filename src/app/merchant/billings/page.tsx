import Sidebar from '@/comp/Sidebar'
import React from 'react'

const Page = () => {
  return (
    <div className=" flex  min-h-screen   w-full overflow-hidden"> 

    <div className="   fixed"> 

   
   <Sidebar />
   </div>

   <div className="    lg:ml-60   md:ml-16 relative w-full overflow-x-auto  "> 

    </div>
    </div>

  )
}

export default Page