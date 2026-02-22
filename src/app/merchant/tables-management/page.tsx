'use client'
import Sidebar from '@/comp/Sidebar'
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState } from 'react'

import { motion ,  AnimatePresence } from 'framer-motion'

const Page = () => {

 

  const tables = [
    {
      num : "01",
      max : "04",
      img: "/res1.webp"
    },
    {
      num : "02",
      max : "02",
      img: "/res2.webp"
    },

    {
      num : "03",
      max : "04",
      img: "/res4.webp"
    },

    {
      num : "04",
      max : "04",
      img: "/res3.avif"
    },

    {
      num : "05",
      max : "08",
      img: "/res5.jpg"
    },

    {
      num : "06",
      max : "04",
      img: "/res4.webp"
    },

    {
      num : "07",
      max : "02",
      img: "/res2.webp"
    },

    {
      num : "08",
      max : "04",
      img: "/res1.webp"
    },

    {
      num : "09",
      max : "08",
      img: "/res5.jpg"
    },

    
    {
      num : 10,
      max : "04",
      img: "/res3.avif"
    },
    

  ]


  const [loading, setLoading] = useState(false);
const [showproductpopup, setshowproductpopup] = useState(false)
const [editProductPopup, seteditProductPopup] = useState(false)


  return (
    <>
    <div className=" flex  min-h-screen   w-full overflow-hidden"> 

    <div className="   fixed"> 

   
   <Sidebar />
   </div>

   <div className="    lg:ml-60   md:ml-16 relative w-full overflow-x-auto  "> 

      

      <div className=' border-b p-4'> 

        <Button onPress={() => setshowproductpopup(true)} className='bg-[#FF385C]  text-white px-6  font-poppinsreg'> Add Table </Button>

      </div>


      <div className=" grid gap-y-5 gap-x-3 grid-cols-2 md:grid-cols-3 p-4  lg:grid-cols-4">

       

{
   tables.map( (food:any , index:number) => (

    <div
    // key={food?.id}
    key={index}
    // onClick={() =>  { SingleProductClicked(food?.id)  ; setshowSingleProduct(true)      }     }
    className=" relative  hover:scale-[1.01] cursor-pointer transition-transform delay-100 duration-300 bg-[#e8e8eb] w-full gap-1  flex flex-col mx-auto rounded-lg p-[4px]">

    <Image src={food?.img} alt="food" width={500} height={500} className=" rounded-lg    2xl:h-[300px] h-[150px] w-full  object-cover" />  
     
     <div className="px-1"> 

   
     <h1 className=" text-slate-700 text-lg   font-poppinsreg5"> Table {food.num}  </h1>
     
     <h1 className="  font-poppinsreg text-slate-500"> Max-Seat-Cap {food.max}  </h1>

     <div className=' flex  justify-between w-full'> 

     {/* <h1 className={` w-fit px-[3px] py-[1px] uppercase text-xs mt-[2px]   font-semibold ${food?.availability ? "text-green-900 bg-green-200" : "text-red-900 bg-red-200" }`}> {food?.availability ? "Available" : "Unavailable"}  </h1> */}
      
      
    
     {/* checked */}
   
   
      </div>
    
     </div>
    

     <div  className=' bg-white rounded-full w-7  z-20    p-1  h-7 absolute top-2 right-2'> 

     <svg onClick={() => seteditProductPopup(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="  text-slate-700">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

     </div>

  </div>



  ) )
}





















</div>



    </div>
    </div>
      


      {/* new table add  */}

      {showproductpopup && (
        <div className="fixed  left-0 z-[400] flex justify-center items-center top-0 w-full bg-opacity-80 h-full bg-black ">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.15 }}
              className={`lg:w-[600px] flex  p-10 w-[500px] mx-5 px-10 flex-col items-center bg-gray-50 rounded-lg lg:rounded-2xl opacity-100 border`}
            >
              <div className="flex w-full lg:pr-0 pr-4 lg:pt-0 pt-4 justify-end">
                <button
                  onClick={() => {
                    // setworkspacename("");
                    // resetAll()
                    setshowproductpopup(false)
                   
                    // setworkspaceerror("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <h1 className="text-[#FF385C]  font-poppinsreg5  text-2xl w-full">
                Add New Table
              </h1>
              {/* bg-[#FF385C] */}
              <div className="w-full justify-center flex flex-col">
                <div className="border-b w-full mt-2"></div>
              </div>

              <div className="w-full mt-4">
              {/* onSubmit={handleProductSubmit} */}
              <form className=' flex flex-col gap-4' >
    
       {/* jjjjjjjjjjjjjjjjjjjjjjjj */}
          <div>
                <label className="    font-poppinsreg5 text-slate-700">
               Table Number
                </label>
                <Input
                // value={name} onChange={(e) => setName(e.target.value)} 
                  type="text"
                  className="w-full  placeholder:font-rubik font-rubik mt-1 border-slate-300 border rounded-md focus:outline-none focus:border-[#FF2B85] transition-colors"
               
                  placeholder="Table Num"
                  // required
                />

</div>


<div className=' '>
                <label className="    font-poppinsreg5 text-slate-700">
               Maximum Seating Capacity
                </label>
                <Input
                // variant="flat"
           type="number" 
          //  value={price} onChange={(e) => setPrice(e.target.value)}
          //  required
                  className="w-full   placeholder:font-rubik font-rubik mt-1  border-slate-300 border  rounded-md focus:outline-none focus:border-[#FF2B85] transition-colors"
               
                  placeholder="Enter Capacity"
               
                />

</div>

<div className=' '>
                <label className="    font-poppinsreg5 text-slate-700">
               Reservation Fee For Table
                </label>
                <Input
           type="number" 
          //  value={price} onChange={(e) => setPrice(e.target.value)}
          //  required
                  className="w-full  placeholder:font-rubik font-rubik mt-1 border-slate-300 border  rounded-md focus:outline-none focus:border-[#FF2B85] transition-colors"
               
                  placeholder="Reservation Fee"
               
                />

</div>
   
     
      {/* sssssssssssssssssssssssssssssssssss */}





      {/* <div>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
      </div> */}
   
      {/* <div>
        <label>
          Image:
          <input type="file" onChange={handleFileChange} required />
        </label>
      </div> */}




      <div className=' gap-1 flex flex-col'> 


<label className="    font-poppinsreg5 text-slate-700">
               Upload Image
                </label>
                {/* required  */}
<input
        type="file"
        // onChange={handleFileChange}
      
        className=' w-fit'
      />
</div>


















      
      {/* <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div> */}
      
      {/* isLoading={addcategoryloading}  */}

      <Button disabled={loading} isLoading={loading}  type='submit' size="md" className='bg-[#FF385C] mt-3 font-poppinsreg  w-fit  text-white '> Add Table </Button>


    </form>      
              </div>


  
            </motion.div>
          </AnimatePresence>
        </div>
      )}







      {/* edit product  */}
      

      {editProductPopup && (
        <div className="fixed  left-0 z-[400] flex justify-center items-center top-0 w-full bg-opacity-80 h-full bg-black ">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.15 }}
              className={`lg:w-[600px] flex  p-10 w-[500px] mx-5 px-10 flex-col items-center bg-gray-50 rounded-lg lg:rounded-2xl opacity-100 border`}
            >
              <div className="flex w-full lg:pr-0 pr-4 lg:pt-0 pt-4 justify-end">
                <button
                  onClick={() => {
                    // setworkspacename("");
                    // resetAll()
                    seteditProductPopup(false)
                   
                    // setworkspaceerror("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <h1 className="text-[#FF385C]  font-poppinsreg5  text-2xl w-full">
                Edit Table
              </h1>
              {/* bg-[#FF385C] */}
              <div className="w-full justify-center flex flex-col">
                <div className="border-b w-full mt-2"></div>
              </div>

              <div className="w-full mt-4">
              {/* onSubmit={handleProductSubmit} */}
              <form className=' flex flex-col gap-4' >
    
       {/* jjjjjjjjjjjjjjjjjjjjjjjj */}
          <div>
                <label className="    font-poppinsreg5 text-slate-700">
               Table Number
                </label>
                <Input
                // value={name} onChange={(e) => setName(e.target.value)} 
                  type="text"
                  className="w-full  placeholder:font-rubik font-rubik mt-1 border-slate-300 border rounded-md focus:outline-none focus:border-[#FF2B85] transition-colors"
               
                  placeholder="Table Num"
                  // required
                />

</div>


<div className=' '>
                <label className="    font-poppinsreg5 text-slate-700">
               Maximum Seating Capacity
                </label>
                <Input
                // variant="flat"
           type="number" 
          //  value={price} onChange={(e) => setPrice(e.target.value)}
          //  required
                  className="w-full   placeholder:font-rubik font-rubik mt-1  border-slate-300 border  rounded-md focus:outline-none focus:border-[#FF2B85] transition-colors"
               
                  placeholder="Enter Capacity"
               
                />

</div>

<div className=' '>
                <label className="    font-poppinsreg5 text-slate-700">
               Reservation Fee For Table
                </label>
                <Input
           type="number" 
          //  value={price} onChange={(e) => setPrice(e.target.value)}
          //  required
                  className="w-full  placeholder:font-rubik font-rubik mt-1 border-slate-300 border  rounded-md focus:outline-none focus:border-[#FF2B85] transition-colors"
               
                  placeholder="Reservation Fee"
               
                />

</div>
   
     
      {/* sssssssssssssssssssssssssssssssssss */}





      {/* <div>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
      </div> */}
   
      {/* <div>
        <label>
          Image:
          <input type="file" onChange={handleFileChange} required />
        </label>
      </div> */}




      <div className=' gap-1 flex flex-col'> 


<label className="    font-poppinsreg5 text-slate-700">
               Upload Image
                </label>
                {/* required  */}
<input
        type="file"
        // onChange={handleFileChange}
      
        className=' w-fit'
      />
</div>


















      
      {/* <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div> */}
      
      {/* isLoading={addcategoryloading}  */}

      <Button disabled={loading} isLoading={loading}  type='submit' size="md" className='bg-[#FF385C] mt-3 font-poppinsreg  w-fit  text-white '> Edit Table </Button>


    </form>      
              </div>


  
            </motion.div>
          </AnimatePresence>
        </div>
      )}



      {/* edit product  */}


    </>

  )
}

export default Page