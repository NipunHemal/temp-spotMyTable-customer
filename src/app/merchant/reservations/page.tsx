'use client'
import Sidebar from '@/comp/Sidebar'
// import { TableHead } from '@/components/ui/table'
import { Chip, Input, Modal, ModalBody, ModalContent, Select, SelectItem, Tab,  Tabs, useDisclosure } from '@nextui-org/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// Table, TableBody, TableCell, TableHeader, TableRow,
import React, { useState } from 'react'

const Page = () => {


    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
   

    const [selectedKey, setSelectedKey] = useState('incoming');

 



         
    



    // Handle the selection change
    const handleSelectionChange = (key:any) => {
      setSelectedKey(key);
    //   console.log('Selected tab:', key);
    };

 

    const [selectedItem, setSelectedItem] = useState("All");

  const handleSelectChange = (event:any) => {
    setSelectedItem(event.target.value);
    console.log(event.target.value);
    
  };

  return (
    <>
    <div className=" flex  h-screen   w-full overflow-hidden"> 

    <div className="   fixed"> 

   
   <Sidebar />
   </div>
   {/* overflow-x-auto  */}
   <div className="    lg:ml-60   md:ml-16 relative w-full h-full  "> 
      
      <div className=' w-full h-fit bg-[#18181B]  p-4'> 
        

      <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="light"
        defaultSelectedKey={selectedKey}
        onSelectionChange={handleSelectionChange}

        classNames={{
          tabList: "gap-3 w-full relative rounded-none p-0  border-divider",
          cursor: "w-full bg-[#FF385C]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-white"
        }}
      >
        <Tab
    
          key="incoming"
          title={
            <div className="flex px-4 items-center space-x-2">
              {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="   md:w-8 md:h-8   lg:w-6     text-white  lg:h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg> */}

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:w-8 md:h-8   lg:w-6     text-white  lg:h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

              <span className=' font-poppinsreg'>INCOMING</span>
              <Chip size="sm" variant="faded">19</Chip>
            </div>
          }
        />
        <Tab
          key="reservations"
          title={
            <div className="flex px-4   items-center space-x-2">
              {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="   md:w-8 md:h-8   lg:w-6     text-white  lg:h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg> */}

<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="  md:w-8 md:h-8   lg:w-6     text-white  lg:h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
              <span className=' font-poppinsreg'>RESERVATIONS</span>
              {/* <Chip size="sm" variant="faded">3</Chip> */}
            </div>
          }
        />
    
      </Tabs>
    </div>  

      </div>
      


      {/* tables here  */}

      {
        selectedKey === "incoming" &&

        <div className=' p-4  flex flex-col h-full'> 

          
   
{/* flex-1  */}
        <div className=' w-full  flex flex-col   border mb-20  h-fit overflow-auto       '> 
        

        <Table className=' md:mt-0   pt-4  '  >
        
        <TableHeader>
          <TableRow >
            <TableHead className="text-center  text-slate-400 font-poppinsreg5">Reservation Date</TableHead>
            <TableHead className='text-center text-slate-400 font-poppinsreg5'>Reference</TableHead>
            <TableHead className='text-center text-slate-400 font-poppinsreg5'>Customer</TableHead>
            <TableHead className='text-center text-slate-400 font-poppinsreg5'>Table</TableHead>
            <TableHead className='text-center text-slate-400 font-poppinsreg5'>Type</TableHead>
            
            <TableHead className="text-center text-slate-400 font-poppinsreg5">View</TableHead>
            {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
            <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
            
        
              
        
              {
                [1,2,3,4,5,6,7,8,9,10,11].map( (i,a) => (
        
                       
                <TableRow key={a}>
                <TableCell className="text-center text-slate-900   font-robotosemi">
                  {/* <h1> {reservation?.date} </h1> */}
                  <h1> 26.06.2024 </h1>
                  </TableCell>
                <TableCell className='text-center text-slate-900 font-poppinsreg5'>
               {/* <h1> {reservation?.reference} </h1> */}
               <h1> 1011 </h1>
                  </TableCell>
        
                  <TableCell className='text-center text-slate-900 font-poppinsreg5'>
               {/* <h1> {reservation?.reference} </h1> */}
               <h1 className=''> Jawidh M </h1>
                  </TableCell>
                  <TableCell className='text-center text-slate-900 font-poppinsreg5'>
               {/* <h1> {reservation?.reference} </h1> */}
               <h1> 04 </h1>
                  </TableCell>
                <TableCell className='text-center  text-slate-900 font-poppinsreg5'>
                   {/* <h1> {reservation?.merchant_name}</h1> */}
                   <h1> Normal</h1>
                  </TableCell>
             
        
                 
                <TableCell className="text-center font-poppinsreg5">
                <svg
        
                    //    onClick={() => openSingleReservation(reservation?._id)}
                    onClick={() => onOpen()}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 mx-auto  transition-colors ease-in-out duration-300   cursor-pointer hover:text-[#FF385C] h-6"
                                          >
                                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                            <path
                                              fill-rule="evenodd"
                                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                              clip-rule="evenodd"
                                            />
                                          </svg>
                  </TableCell>
             
              </TableRow>
        
          
          
        
                ) )
              }
        
        
            
        
        
        
        
        
        
        
        </TableBody>
        </Table>
        
            
            </div>

            </div>


      }

   

      {/* tables here  */}

      {
        selectedKey === "reservations" &&



        ////////////////
        /////////////////

        <div className=' p-4  flex flex-col h-full'>
            

        <div className=' flex gap-5 '> 

       

      <Select
      disallowEmptySelection={true}
      radius="md"
    //   placeholder="Select an option"
      value={selectedItem}
      onChange={handleSelectChange}
      defaultSelectedKeys={[selectedItem]}
      className="max-w-40 font-poppinsreg"
    >
      {["All", "Pending", "Reserved", "Cancelled", "Completed"].map((type) => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      ))}
    </Select>


    <Input className=' max-w-md  font-poppinsreg' type="email" variant="bordered"  placeholder='Search a reservation' />

    </div>

    {/* flex-1 */}
    <div className=' w-full flex flex-col   overflow-auto  mb-20  mt-6 h-fit    border     '> 

<Table className=' '  >

<TableHeader>
  <TableRow >
    <TableHead className="text-center  text-slate-400 font-poppinsreg5">Reservation Date</TableHead>
    <TableHead className='text-center text-slate-400 font-poppinsreg5'>Reference</TableHead>
  
    <TableHead className='text-center text-slate-400 font-poppinsreg5'>Table</TableHead>
    <TableHead className='text-center text-slate-400 font-poppinsreg5'>Type</TableHead>
    <TableHead className='text-center text-slate-400 font-poppinsreg5'>Status</TableHead>
    
    <TableHead className="text-center text-slate-400 font-poppinsreg5">View</TableHead>
    {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
    <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
  </TableRow>
</TableHeader>
<TableBody>
    

      

      {
        [1,2,3,4,5,6,7,8,9,10].map( (i,a) => (

               
        <TableRow key={a}>
        <TableCell className="text-center text-slate-900  font-robotosemi">
          {/* <h1> {reservation?.date} </h1> */}
          <h1> 26.06.2024 </h1>
          </TableCell>
        <TableCell className='text-center text-slate-900 font-poppinsreg5'>
       {/* <h1> {reservation?.reference} </h1> */}
       <h1> 1011 </h1>
          </TableCell>

   
          <TableCell className='text-center text-slate-900 font-poppinsreg5'>
       {/* <h1> {reservation?.reference} </h1> */}
       <h1> 04 </h1>
          </TableCell>
        <TableCell className='text-center  text-slate-900 font-poppinsreg5'>
           {/* <h1> {reservation?.merchant_name}</h1> */}
           <h1> Normal</h1>
          </TableCell>

          <TableCell className='text-center text-slate-900 font-poppinsreg5'>
       {/* <h1> {reservation?.reference} </h1> */}
       <h1 className=''> RESERVED </h1>
          </TableCell>
     

         
        <TableCell className="text-center font-poppinsreg5">
        <svg

            //    onClick={() => openSingleReservation(reservation?._id)}
            onClick={() => onOpen()}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 mx-auto  transition-colors ease-in-out duration-300   cursor-pointer hover:text-[#FF385C] h-6"
                                  >
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
          </TableCell>
     
      </TableRow>

  
  

        ) )
      }


    







</TableBody>
</Table>

    
    </div>
      


      </div>

        


        
      }


   




    </div>
    </div>


   

   {/* pop up  */}
     
   <Modal 

// isOpen:customisOpen, onOpen:customonOpen, onClose:customonClose, onOpenChange:customonOpenChange

// isOpen, onOpen, onClose, onOpenChange
      
      classNames={{
        backdrop: " bg-black bg-opacity-80"
      }}
      className=' md:h-auto h-screen py-3   overflow-y-auto'  size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody className=''>
                <div className=' flex flex-col gap-1'> 

            
              <h1 className="flex flex-col  md:mt-0 mt-5 text-[#FF385C]   font-poppinssemi text-2xl gap-1">Reservation Summary  </h1>
             
             <div> 

           
              <p className=' text-green-900 font-poppinsreg5'>  {`REFERENCE NUMBER: 1011`} </p>
              {/* <p className=' text-green-900 font-poppinsreg5'>  {`REFERENCE NUMBER: ${singleReservation?.reference}`} </p> */}

              <p className=' text-slate-400 text-sm font-poppinsreg5'> TYPE : CUSTOM </p>
              </div>
               </div>
             
          

             <div className=' mt-2 flex flex-col gap-2'>

              <h1 className='  font-poppinssemi text-lg'> Reservation Details </h1>

              <div className=' grid  grid-cols-2'>
                 
                 <div className='border-t border-b p-1 border-l'>

                  <h1 className=' font-poppinsreg5 '> Reservation Date </h1>
                  {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {singleReservation?.date} </h1> */}
                  <h1 className=' font-poppinsreg text-slate-500 text-sm'> 26.06.2024 </h1>
                  {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {reservationDate}</h1> */}


                  
                   

                 </div>

       


{/* /////////////////// */}
{/* /////////////////// */}
{/* singleReservation?.table_id */}
{
  true &&

  <div className='  p-1 border-r border-l'>

<h1 className=' font-poppinsreg5'> Table </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> 04 (Max-Seat-Capacity : 02)   </h1> */}
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {singleReservation?.table_id}  </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'> Table 04  </h1>
 

</div>
 


}


{/* singleReservation?.start_time */}

 {
  true  &&

  <div className='   border-b border-r p-1'>

<h1 className=' font-poppinsreg5'> Start Time </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {singleReservation?.start_time}   </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'> 10:00   </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {ReservationstartTime}   </h1> */}

 

</div>


 }

 
{/* singleReservation?.end_time */}
 {
      true    &&
 
    <div className='border p-1'>

<h1 className=' font-poppinsreg5'> End Time </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {singleReservation?.end_time}   </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'> 11:00   </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>  {ReservationendTime}  </h1> */}

 

</div>
 }

{/* singleReservation?.guest_count */}

 {
   true &&

  <div className=' border-b border-r p-1'>

<h1 className=' font-poppinsreg5'> Guest </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>  { String(singleReservation?.guest_count).padStart(2,"0")}   </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'>  { String(2).padStart(2,"0")}   </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> { type === "preferred" ? `Up to ${ReservationguestCount} people`  :  ReservationguestCount}  </h1> */}

 

</div>

 }




<div className=' border-b border-l border-r p-1'>

<h1 className=' font-poppinsreg5'> Reservation Fee  </h1>
<h1 className=' font-poppinsreg text-slate-500 text-sm'>  LKR 1500   </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> { type === "preferred" ? `Up to ${ReservationguestCount} people`  :  ReservationguestCount}  </h1> */}

 

</div>


{/* singleReservation?.details */}
{

false &&

<div className=' border-b border-l border-r p-1'>

<h1 className=' font-poppinsreg5'> Meal From Restaurant  </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>  {singleReservation?.meal_from_restaurant ? "Yes" : "No"}   </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'>  No   </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> { type === "preferred" ? `Up to ${ReservationguestCount} people`  :  ReservationguestCount}  </h1> */}

 

</div>


   
}






{/* Reservation Fee */}

{/* /////////////////// */}
{/* /////////////////// */}










                </div> 

             </div>


             {/* Reservation details customer description */}

           
             {/* <div className=' mt-4 flex flex-col gap-2'>

              <h1 className='  font-poppinssemi text-lg'> Event Details </h1>

               
               <div className=' h-[150px] overflow-y-auto border p-1 text-wrap'> 
                <p className=' text-slate-500 text-sm'>  {`hello iam jawidh muhammadh from galaha , hello iam jawidh muhammadh from galahahello iam jawidh muhammadh from galahahello iam jawidh muhammadh from galahahello iam jawidh muhammadh from galaha`} </p>
               </div>

             </div> */}
{/* rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}

             {/* Reservation details customer description */}

 

             {/* singleReservation?.details */}
 {
  false  &&


  <div className=' mt-4 flex flex-col gap-2'>

<h1 className='  font-poppinssemi text-lg'> Event Details </h1>

 
 <div className=' min-h-fit max-h-[150px] overflow-y-auto border p-1 text-wrap'> 
  {/* <p className=' text-slate-500 text-sm'>  {singleReservation?.details} </p> */}
  <p className=' text-slate-500 text-sm'>  hello </p>
 </div>

</div>


 }

             



             <div className=' mt-4 flex flex-col gap-2'>

<h1 className='  font-poppinssemi text-lg'> Customer Details </h1>

<div className=' grid  grid-cols-2'>
   
   <div className='border-t p-1 border-l'>

    <h1 className=' font-poppinsreg5'> Name </h1>
    {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> Jason Roy</h1> */}
    {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>{singleReservation?.customer_name}</h1> */}
    <h1 className=' font-poppinsreg text-slate-500 text-sm'>jmghere</h1>
  
   </div>

   <div className='  p-1  border'>

<h1 className=' font-poppinsreg5'> Email </h1>
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {singleReservation?.customer_email} </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'> jmghere@gmail.com </h1>


</div>

<div className='  p-1 border'>

<h1 className=' font-poppinsreg5'> Phone Number </h1>
{/* <h1 className=' font-poppinsreg text-red-500 text-sm'> {` ${false ? "04 (Max-Seat-Capacity : 02)" : "NOT ADDED"} `}    </h1> */}
{/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {singleReservation?.customer_number}    </h1> */}
<h1 className=' font-poppinsreg text-slate-500 text-sm'> +94778319382    </h1>


</div>






  </div> 

 

</div>





{/* //  bg-green-200 text-green-800 bg-red-200 text-red-800 */}


<div className='   mt-4 flex flex-col gap-1'> 
  <h1 className='  font-poppinssemi text-lg'> Reservation Status</h1>
  {/* <h1 className={`  ${singleReservation?.reservation_status === "pending" && "bg-purple-200    text-purple-800"}  ${singleReservation?.reservation_status === "reserved" && "text-green-800 bg-green-200"} ${singleReservation?.reservation_status === "cancelled" && "bg-red-200 text-red-800"} ${singleReservation?.reservation_status === "completed" && "text-green-800 bg-green-200"}      font-poppinsreg5 w-fit p-2 rounded-md    text-sm    `}> {singleReservation?.reservation_status === "pending" && "PENDING"} {singleReservation?.reservation_status === "reserved" && "RESERVED"} {singleReservation?.reservation_status === "completed" && "COMPLETED"} {singleReservation?.reservation_status === "cancelled" && "CANCELLED"} </h1> */}

 

 
</div>

 {/* {
  singleReservation?.cancelled_reason &&

  <div className='   mt-4 p-1 border flex flex-col gap-1'> 
  <h1 className='  font-poppinssemi text-lg'> Cancelled Reason</h1>
  <p className=' text-red-700 font-poppinsreg text-sm'>  {singleReservation?.cancelled_reason} </p>

 

 
</div>


 } */}





{/* <Butto className=' bg-[#FF385C] text-white font-poppinsreg5 text-xs mt-4  w-full'>Confirm & Proceed</Button> */}
             
              
              </ModalBody>
           
            </>
          )}
        </ModalContent>
      </Modal>



   {/* pop up  */}



    </>

  )
}

export default Page