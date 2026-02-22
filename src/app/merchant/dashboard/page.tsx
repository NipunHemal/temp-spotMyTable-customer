'use client'
import Sidebar from '@/comp/Sidebar'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const Page = () => {



 

  const data = [
    { name: 'Jan', reservations: 30 },
    { name: 'Feb', reservations: 20 },
    { name: 'Mar', reservations: 27 },
    { name: 'Apr', reservations: 23 },
    { name: 'May', reservations: 34 },
    { name: 'Jun', reservations: 45 },
    { name: 'Jul', reservations: 40 },
    { name: 'Aug', reservations: 50 },
    { name: 'Sep', reservations: 33 },
    { name: 'Oct', reservations: 42 },
    { name: 'Nov', reservations: 38 },
    { name: 'Dec', reservations: 48 },
  ];



  return (
    <div className=" flex  min-h-screen   w-full overflow-hidden"> 

    <div className="   fixed"> 

   
   <Sidebar />
   </div>

   <div className="    lg:ml-60   md:ml-16 relative w-full overflow-x-auto  "> 

    

    <div className=' w-full p-4 grid md:grid-cols-3  grid-cols-1 gap-4'>

      <Card className='  flex flex-col gap-2 '>
  <CardHeader>
    <CardTitle className=' text-lg text-center  text-slate-700 font-poppinssemi'>TODAY RESERVATIONS</CardTitle>
  
  </CardHeader>
  <CardContent>
    <p className='text-center   font-robotosemi text-[#FF385C] text-5xl'>14</p>
  </CardContent>

</Card>

<Card className='  flex flex-col gap-2 '>
  <CardHeader>
    <CardTitle className=' text-lg text-center text-slate-700 font-poppinssemi'>YESTERDAY RESERVATIONS</CardTitle>
  
  </CardHeader>
  <CardContent>
    <p className='text-center  font-robotosemi text-[#FF385C] text-5xl'>16</p>
  </CardContent>

</Card>

<Card className='  flex flex-col gap-2 '>
  <CardHeader>
    <CardTitle className=' text-lg  text-center text-slate-700 font-poppinssemi'>RESERVATIONS THIS MONTH</CardTitle>
  
  </CardHeader>
  <CardContent>
    <p className='text-center  font-robotosemi text-[#FF385C] text-5xl'>74</p>
  </CardContent>

</Card>


 

    </div>


    <div className=' border-b mt-4'> </div>

  


      <div className=' w-full p-4'> 

        <h1 className=' font-robotosemi text-xl text-slate-700'>  TOTAL RESERVATIONS </h1>
        <div className=' -ml-8'> 
      <ResponsiveContainer className="mt-5" width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar barSize={40} dataKey="reservations" fill="#FF385C" />
      </BarChart>
    </ResponsiveContainer>

    </div>

</div>


<div className=' border-b mt-4'> </div>


<div className='  p-4 grid grid-cols-1 md:grid-cols-3 gap-4'> 
 
<Card className=" w-full border-2">
      <CardHeader className=' flex flex-col gap-2'>
        <CardTitle className='  font-poppinsreg5  text-lg'>Payments</CardTitle>
        <CardDescription className=' font-poppinsreg text-slate-400 text-sm'>A glance of all your payment info</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid mt-3 w-full items-center gap-4">
            <div className="flex flex-col p-1 rounded-md border border-slate-300 ">
              <h1 className='  font-poppinsreg text-slate-400'> Pending Payout </h1>
              <p className=' font-robotosemi  text-green-700'>  LKR 32,000 </p>
            </div>
            <div className="flex flex-col  p-1 rounded-md border border-slate-300  ">
              <h1 className='  font-poppinsreg text-slate-400'> Last Payout </h1>
              <p className=' font-robotosemi text-green-700'>  LKR 32,000 </p>
            </div>

            <div className="flex flex-col  p-1 rounded-md border border-slate-300  ">
              <h1 className='  font-poppinsreg text-slate-400'> Next Payout </h1>
              <p className=' font-robotosemi text-green-700'>  15.07.2024 </p>
            </div>
          </div>
        </form>
      </CardContent>

    </Card>

    <Card className=" w-full  border-2">
      <CardHeader className=' flex flex-col gap-2'>
        <CardTitle className='font-robotosemi'>Completed Reservations</CardTitle>
        <CardDescription className=' font-poppinsreg text-slate-400 text-sm'>Reservations completed lastly</CardDescription>
      </CardHeader>
      <CardContent>
    
          <div className="grid mt-5 w-full items-center gap-4">
            <div className="flex flex-col p-1 gap-[3px] rounded-md  bg-[#0f402f]   ">
              <h1 className='  font-robotosemi  text-gray-100'> M.M. SHANTHAN </h1>
              <p className='  font-poppinsreg text-sm text-gray-100 '>  Res-Date : 28.07.2024 </p>
              <p className=' font-poppinsreg text-sm  text-gray-100'> Table : 04  (Max-Seat-Cap 06) </p>
            </div>
            <div className="flex flex-col p-1 gap-[3px] rounded-md  bg-[#0f402f]  ">
              <h1 className='  font-robotosemi  text-gray-100'> M.M. SHANTHAN </h1>
              <p className='  font-poppinsreg text-sm text-gray-100 '>  Res-Date : 28.07.2024 </p>
              <p className=' font-poppinsreg text-sm  text-gray-100'> Table : 04  (Max-Seat-Cap 06) </p>
            </div>
          

          

          
          </div>
      
      </CardContent>

    </Card>

    <Card className=" w-full  border-2">
      <CardHeader className=' flex flex-col gap-2'>
        <CardTitle className='font-robotosemi'>Pending Reservations</CardTitle>
        <CardDescription className=' font-poppinsreg text-slate-400 text-sm'>Reservations pending approval</CardDescription>
      </CardHeader>
      <CardContent>
    
          <div className="grid mt-5 w-full items-center gap-4">
            <div className="flex flex-col p-1 gap-[3px] rounded-md  bg-[#1e3989]  ">
              <h1 className='  font-robotosemi  text-gray-100'> M.M. SHANTHAN </h1>
              <p className='  font-poppinsreg text-sm text-gray-100 '>  Res-Date : 28.07.2024 </p>
              <p className=' font-poppinsreg text-sm  text-gray-100'> Table : 04  (Max-Seat-Cap 06) </p>
            </div>
            <div className="flex flex-col p-1 gap-[3px] rounded-md  bg-[#1e3989]  ">
              <h1 className='  font-robotosemi  text-gray-100'> M.M. SHANTHAN </h1>
              <p className='  font-poppinsreg text-sm text-gray-100 '>  Res-Date : 28.07.2024 </p>
              <p className=' font-poppinsreg text-sm  text-gray-100'> Table : 04  (Max-Seat-Cap 06) </p>
            </div>
          

          

          
          </div>
      
      </CardContent>

    </Card>


</div>



    </div>
    </div>

  )
}

export default Page