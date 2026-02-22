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

      

        <h1 className=' text-2xl md:text-4xl font-poppinssemi text-center'>   About SpotMyTable</h1>
        <p className=' font-poppinsreg text-slate-400 mt-1 text-center'> Your trusted partner for seamless restaurant bookings</p>
        </div>


        <div className=' flex flex-col items-center justify-center'>

            <div className=' w-full max-w-3xl mt-6 '> 

          

        <h1 className="font-semibold text-lg">Connecting People <span className=' inline-block align-middle'> <Image width={100} height={100} src="/people.png" alt='' className=" w-5 h-5 object-cover " /> </span> with Seamless Reservations</h1>
          <p className="mt-2">
            At SpotMyTable, we believe that reserving a table <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/chair.png" alt='' className=" w-6 h-6 object-cover " /> </span> should be as enjoyable as the experience itself. Our platform was created to connect people with restaurants, event venues, and other services in the easiest way possible. {`We’re on a mission`} <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/target.png" alt='' className=" w-6 h-6 object-cover " /> </span> to make booking a table stress-free, efficient, and reliable.
          </p>
         
          {/* Our Journey */}
          <div className="mt-4">
            <h1 className="font-semibold text-lg">Our Journey <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/walk.png" alt='' className=" w-6 h-6 object-cover " /> </span></h1>
            <ul className="list-disc pl-5 mt-2">
              <li><span className="font-medium">2021:</span> SpotMyTable was founded with a vision <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/vision-and-mission.png" alt='' className=" w-6 h-6 object-cover " /> </span> to revolutionize the reservation process for restaurants and event spaces.</li>
              <li><span className="font-medium">2022:</span> We hit our first milestone,<span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/goal.png" alt='' className=" w-6 h-6 object-cover " /> </span>with over 1000 successful reservations made through our platform.</li>
              <li><span className="font-medium">2023:</span> SpotMyTable expanded to serve 10 major cities, helping <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/help.png" alt='' className=" w-6 h-6 object-cover " /> </span> thousands of customers connect with top venues.</li>
              <li><span className="font-medium">2024:</span> We formed partnerships with renowned venues, expanding our network <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/networking.png" alt='' className=" w-6 h-6 object-cover " /> </span> and making it easier for users to find the perfect spot for any occasion.</li>
            </ul>
          </div>

          {/* Mission, Vision, and Values */}
          <div className="mt-4">
            <h1 className="font-semibold text-lg">{`Our Mission, Vision, and Values`} <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/vision-and-mission.png" alt='' className=" w-6 h-6 object-cover " /> </span></h1>
            <p className="mt-2">
              <span className="font-medium">{`Mission:`}</span> To provide a seamless and efficient platform for customers to book <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/booking.png" alt='' className=" w-6 h-6 object-cover " /> </span> reservations at their favorite venues, while offering businesses an easy way to manage bookings.
            </p>
            <p className="mt-2">
              <span className="font-medium">{`Vision:`}</span> To become the leading platform for table reservations worldwide, <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/grid.png" alt='' className=" w-6 h-6 object-cover " /> </span> enhancing the dining and event experience for all.
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li><span className="font-medium">{`Customer Focus:`}</span> We prioritize creating the best experience for our customers.<span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/customer.png" alt='' className=" w-6 h-6 object-cover " /> </span></li>
              <li><span className="font-medium">{`Innovation:`}</span> We are always improving and adding features <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/opportunity.png" alt='' className=" w-6 h-6 object-cover " /> </span> that make booking easier and faster.<span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/quick.png" alt='' className=" w-6 h-6 object-cover " /> </span></li>
              <li><span className="font-medium">{`Reliability:`}</span> Customers and venues alike can count on SpotMyTable to handle reservations smoothly.<span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/quill.png" alt='' className=" w-6 h-6 object-cover " /> </span></li>
              <li><span className="font-medium">{`Simplicity:`}</span> We make booking a table as easy <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/easy.png" alt='' className=" w-6 h-6 object-cover " /> </span> as possible for everyone involved.</li>
            </ul>
          </div>

          {/* Meet Our Team */}
          <div className="mt-4">
            <h1 className="font-semibold text-lg">Meet Our Team <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/hands.png" alt='' className=" w-6 h-6 object-cover " /> </span></h1>
            <ul className="list-disc pl-5 mt-2">
              <li><span className="font-medium">{`Fredrick Peter (Founder & CEO):`}</span> {`The visionary behind SpotMyTable, leading the charge to innovate the way people make reservations.`}</li>
              <li><span className="font-medium">{`Ronasha Fernando (Co-Founder):`}</span> {`A strategic leader working alongside the CEO to shape the company's direction, with a focus on building strong partnerships and scaling the business.`}</li>
              <li><span className="font-medium">{`Jawidh Muhammadh (Lead Engineer):`}</span> {`Spearheading the technical development of the platform, ensuring it delivers a fast, secure, and user-friendly experience.`}</li>
            </ul>
          </div>

          {/* What Our Customers Say */}
          {/* <div className="mt-4">
            <h1 className="font-semibold text-lg">What Our Customers Say</h1>
            <ul className="list-disc pl-5 mt-2">
              <li><span className="font-medium">{`Restaurant A:`}</span> {`“SpotMyTable transformed our reservation process! We’ve seen a huge improvement in how we handle bookings.”`}</li>
              <li><span className="font-medium">{`Event Venue B:`}</span> {`“A game changer for event reservations! The platform is so user-friendly and efficient.”`}</li>
              <li><span className="font-medium">{`Restaurant C:`}</span> {`“We rely on SpotMyTable for all our bookings now. It’s a must-have for any busy restaurant.”`}</li>
            </ul>
          </div> */}

          {/* Our Reach */}
          <div className="mt-4">
            <h1 className="font-semibold text-lg">Our Reach <span className=' inline-block align-middle'> <Image width={100} height={100} src="/aboutus/megaphone.png" alt='' className=" w-6 h-6 object-cover " /> </span></h1>
            <p className="mt-2">
              We currently operate in over 10 cities, connecting thousands of customers with top restaurants and event venues.
            </p>
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