'use client'

import Header from '@/components/comp/Header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionItem, Avatar, Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion';






const Page = () => {

 const router = useRouter()



  return (

    <>
       

    <div className=" w-full   min-h-screen  flex flex-col overflow-hidden  ">
  
   


      {/* the settings content  */}

      <div className=' w-full  h-full flex flex-col items-center justify-center'>

<div className=' max-w-7xl h-full    w-full flex items-center flex-col'>

<div className=" p-2 w-full  "> 
 
 
 <Header />

 </div>
 

 <div className="  w-full  lg:hidden p-2    flex justify-between ">

<Button onPress={() =>   router.push('/')} variant="light" className=" border  w-28">  Go Back </Button>
      
   

       
        

                
              </div>


   

  

    <div className=' w-full   lg:mt-5 mt-3  md:p-4 p-2  flex flex-col'> 


    <Button onPress={() =>   router.push('/')} variant="light" className=" border lg:flex hidden  w-28">  Go Back </Button>
        

        <div className=' flex flex-col gap-1'> 

      

        <h1 className=' text-2xl md:text-4xl font-poppinssemi text-center'> Contact our friendly team </h1>
        <p className=' font-poppinsreg text-slate-400 text-center'> Let us know how we can help</p>
        </div>


        <div className=' flex justify-center'>

            <div className=' grid md:grid-cols-2 mt-5 gap-4 grid-cols-1 '>
                 

                 <div className=' border flex flex-col  items-center p-2'>

                    <Image src="/whatsapp.png" alt='' width={500} height={500} className=' w-36    object-cover'/>

                  
                  <div className="  mt-3 ">

        
                    <h1 className=' font-poppinsreg5 text-center text-slate-700'> Quick Chat on Whatsapp </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Message our team anytime </p>
                     
                     <h1 className=' text-center'>
                     <a href="https://wa.me/94707774861" target="_blank" className='  underline text-xs  font-poppinsreg  mt-2'>Continue to chat</a>
                     </h1>
                     </div>
                 </div>

                 <div className=' border flex flex-col  items-center  p-2'>

<Image src="/email.png" alt='' width={500} height={500} className=' w-24   object-cover'/>
 
 <div className="  mt-3 "> 


<h1 className=' font-poppinsreg5 text-center text-slate-700'> Email Us </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Send us a quick message </p>

                     <h1 className=' text-center'>
                     <a href="mailto:jawidhmuhammadh@gmail.com"  className='  underline text-xs  font-poppinsreg  mt-2'>Continue to mail</a>
                     </h1>

                     </div>

</div>


<div className=' border  flex flex-col  items-center p-2'>

<Image src="/call.png" alt='' width={500} height={500} className=' w-24   object-cover'/>
<div className="  mt-3 "> 


<h1 className=' font-poppinsreg5 text-center text-slate-700'> Call Us </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Speak with us directly </p>
                   
                     <h1 className=' text-center'>
                     <a href="tel:+94707774861"  className='  underline text-xs  font-poppinsreg  mt-2'>Call us now</a>
                     </h1>
                     </div>


</div>


<div className=' border  flex flex-col  items-center     p-2'>

<Image src="/office.png" alt='' width={500} height={500} className=' w-24   object-cover'/>
 
 <div className="  mt-3 "> 


<h1 className=' font-poppinsreg5 text-center text-slate-700'> Visit Us </h1>
                     
                     <p className=' text-center text-slate-400  font-poppinsreg text-xs'>Come see us in person </p>

                     <h1 className=' text-center'>
                     <a href="https://www.google.com/maps?q=7.227685,79.845039" target="_blank" className='  underline text-xs  font-poppinsreg  mt-2'>See location</a>
                     </h1>
                    
                     </div>

</div>


                </div> 

        </div>
   

  

    </div>

   

</div>
</div>
      {/* the settings content  */}











 



     </div>







 












   

 
     </>


  )
}

export default Page