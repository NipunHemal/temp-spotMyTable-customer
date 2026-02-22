'use client'

import Header from '@/components/comp/Header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Accordion, AccordionItem, Avatar, Button, DatePicker, DateValue, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState } from 'react'




const Page = () => {

    const [date, setDate] = React.useState<Date | undefined>(new Date())
     

    const [selectedDate, setSelectedDate] = useState<DateValue | null>();

    // Handle date change
    const handleDateChange = (newDate: DateValue  |  null ) => {
      setSelectedDate(newDate);
      if(newDate) {
        const formattedDate = `${newDate.day.toString().padStart(2, '0')}.${newDate.month.toString().padStart(2, '0')}.${newDate.year}`;
        console.log(formattedDate);
      }
   
    
      
    };

    const [clickedTab, setclickedTab] = useState("Profile")


    const animals = [
        {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
        {label: "Dog", value: "dog", description: "The most popular pet in the world"},
        {label: "Elephant", value: "elephant", description: "The largest land animal"},
        {label: "Lion", value: "lion", description: "The king of the jungle"},
        {label: "Tiger", value: "tiger", description: "The largest cat species"},
        {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
        {
          label: "Dolphin",
          value: "dolphin",
          description: "A widely distributed and diverse group of aquatic mammals",
        },
        {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
        {label: "Zebra", value: "zebra", description: "A several species of African equids"},
        {
          label: "Shark",
          value: "shark",
          description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
        },
        {
          label: "Whale",
          value: "whale",
          description: "Diverse group of fully aquatic placental marine mammals",
        },
        {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
        {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
      ];


  return (
       

    <div className=" w-full   min-h-screen  flex flex-col overflow-hidden  ">
  
   


      {/* the settings content  */}

      <div className=' w-full  h-full flex flex-col items-center justify-center'>

<div className=' max-w-7xl h-full    w-full flex items-center flex-col'>

<div className=" p-2 w-full"> 
 
 
 <Header />

 </div>
  

    <div className=' w-full   max-w-2xl mt-5  md:p-0 p-2  flex flex-col'> 
    
   <h1 className=' font-poppinssemi text-2xl'>  Notifications </h1>

   <div className=' border-b mt-2 w-full'> </div>

   <div className=' relative w-full h-full'> 





 

 

   <div className=' absolute bottom-0 w-full border-t  '> </div>

      
   </div>


   {/* the content goes here  */}

   {/* all for ACCOUNT - NOT NOTIFICATION  */}

  

   



{/* notifcation only  */}
<div className=' w-full flex flex-col  mt-5 bg-[#242526]   p-2'> 

{/* <h1 className=' text-white font-poppinsreg5 pb-3 p-1 text-lg'> Today </h1> */}

<div className=' flex flex-col w-full gap-3'> 

<div className=' flex   p-2 cursor-pointer hover:bg-[#323334] gap-2'>



<div>
<h1 className=' text-white font-poppinsreg'> Techwave Solution is hiring for a Senior Software Engineer position </h1>
<h1 className='  text-slate-400 font-poppinsreg text-sm'> 4 hours ago </h1>
</div>
</div>


<div className=' flex   p-2 cursor-pointer hover:bg-[#323334] gap-2'>



<div>
<h1 className=' text-white font-poppinsreg'> Your resume has been viewed by Digital Ventures </h1>
<h1 className='  text-slate-400 font-poppinsreg text-sm'> 5 hours ago </h1>
</div>
</div>

<div className=' flex   p-2 cursor-pointer hover:bg-[#323334] gap-2'>



<div>
<h1 className=' text-white font-poppinsreg'> Ezycode is hiring for a Senior Software Engineer position </h1>
<h1 className='  text-slate-400 font-poppinsreg text-sm'> 4 hours ago </h1>
</div>
</div>






<div className=' flex   p-2 cursor-pointer hover:bg-[#323334] gap-2'>



<div>
<h1 className=' text-white font-poppinsreg'> Welcome to Danexjob! Your account has been successfully created. Start exploring new job opportunities and updates tailored just for you </h1>
<h1 className='  text-slate-400 font-poppinsreg text-sm'> 8 hours ago </h1>
</div>
</div>


</div>



</div>
{/* notifcation only  */}
   


 


 
 


  

    </div>

   

</div>
</div>
      {/* the settings content  */}




     </div>



  )
}

export default Page