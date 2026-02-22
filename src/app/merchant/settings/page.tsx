'use client'
import Sidebar from '@/comp/Sidebar'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Accordion, AccordionItem, Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import React, { ChangeEvent, useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Page = () => {


  const [clickedTab, setclickedTab] = useState("Profile")



 

  // merchant mobile number 
  const [phoneNumber, setPhoneNumber] = useState('+94');

    // phone number change handle 
    const handlePhoneNumberChange = (e:any) => {
      const input = e.target.value;
      
      // Ensure the input starts with +94
      if (!input.startsWith('+94')) {
        return;
      }
  
      // Remove any non-numeric characters except + and limit to 9 digits after +94
      const cleanedInput = input.replace(/[^0-9+]/g, '').slice(0, 12);
  
      // Set the cleaned input value
      setPhoneNumber(cleanedInput);
    };
    // phone number change handle 
  // merchant mobile number 



  // enable disbale custom event reservation 
 
  const [customEvent, setcustomEvent] = useState(false)

  const handleSwitchChange = ( checked: boolean) => {
 
     setcustomEvent(checked)
  };
  // enable disbale custom event reservation 








// OPENING HOURS SETUP AND EDIT 

const [openingHours, setOpeningHours] = useState([
  { day: 'Sunday', open: null, close: null },
  { day: 'Monday', open: null, close: null },
  { day: 'Tuesday', open: null, close: null },
  { day: 'Wednesday', open: null, close: null },
  { day: 'Thursday', open: null, close: null },
  { day: 'Friday', open: null, close: null },
  { day: 'Saturday', open: null, close: null }
]);







const [errorMessage, setErrorMessage] = useState('');

const handleTimeChange = (day:any, type:any, time:any) => {
  const updatedHours = openingHours.map((hours, index) => {
    if (index === day) {
      return {
        ...hours,
        [type]: time,
      };
    }
    return hours;
  });
  setOpeningHours(updatedHours);
};



// OPENING HOURS SETUP AND EDIT 




// IMAGES SETUP BANNER AND COVER EDITS UPLOADS SECTION 3 
const [imgupload, setimgupload] = useState("");
const [imgupload2, setimgupload2] = useState("");
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
const [imageSrc, setImageSrc] = useState<string | null>(null);
const [imageSrc2, setImageSrc2] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const fileInputRef2 = useRef<HTMLInputElement | null>(null);

const [bannerImage, setBannerImage] = useState<File | null>(null);
const [coverImage, setcoverImage] = useState<File | null>(null);


// image upload functionality 
const [UploadBannerImage, setUploadBannerImage] = useState("")
const [UploadProfileImage, setUploadProfileImage] = useState("")
// image upload functionality 

const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    // setSelectedFile(file);
    setBannerImage(file)
    setimgupload("");

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        setImageSrc(e.target.result as string); // Cast to string
      }
    };
    reader.readAsDataURL(file);
    

    // const storageRef = ref(storage, `banner-images/${file.name}`);
    // try {
    //   const snapshot = await uploadBytes(storageRef, file);
    //   const downloadURL = await getDownloadURL(snapshot.ref);
    //   setUploadBannerImage(downloadURL)
      
    //   console.log('File available at', downloadURL);
    // } catch (error) {
    //   console.error('Upload failed', error);
    // }


  }
};

const handleFileChange2 = async(event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    // setSelectedFile2(file);
   setcoverImage(file)
    setimgupload2("");

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        setImageSrc2(e.target.result as string); // Cast to string
      }
    };
    reader.readAsDataURL(file);

    // const storageRef = ref(storage, `profile-images/${file.name}`);
    // try {
    //   const snapshot = await uploadBytes(storageRef, file);
    //   const downloadURL = await getDownloadURL(snapshot.ref);
    //   setUploadProfileImage(downloadURL)
    //   console.log('File available at', downloadURL);
    // } catch (error) {
    //   console.error('Upload failed', error);
    // }

  }
};

const [imageuploadingloadingbtn, setimageuploadingloadingbtn] = useState(false)






const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

// const handleUpload = async () => {
//   if (selectedFile) {
//     try {
//       const uploadedImageUrl = await ImageUpload(selectedFile);
//       setUploadedImageUrl(uploadedImageUrl);
//       console.log(uploadedImageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   }
// };

const handleDelete = () => {
  // setSelectedFile(null);
  setBannerImage(null)
  setImageSrc(""); // Clear the image source
  // You can add more logic here to handle deleting the file from your server if necessary.

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const handleDelete2 = () => {
  setSelectedFile2(null);
  setcoverImage(null)
  setImageSrc2(""); // Clear the image source
  // You can add more logic here to handle deleting the file from your server if necessary.

  if (fileInputRef2.current) {
    fileInputRef2.current.value = "";
  }
};

// IMAGES SETUP BANNER AND COVER EDITS UPLOADS SECTION 3 ENDS




  return (
    <div className=" flex  min-h-screen   w-full overflow-hidden"> 

    <div className="   fixed"> 

   
   <Sidebar />
   </div>

   <div className="    lg:ml-60   md:ml-16 relative w-full overflow-x-auto  "> 


      

   <div className=' w-full   max-w-2xl mt-5   md:px-10 p-2  flex flex-col'> 
    
    <h1 className=' font-poppinssemi text-2xl'>  Settings </h1>
 
    <div className=' border-b mt-2 w-full'> </div>
 
    <div className=' relative w-full h-full'> 
  
 
    <div className=' hidden md:flex  mt-2 w-full gap-6'>
     <div onClick={() => setclickedTab("Profile")}  className='w-fit '> 
 
     
     <h1 className='  font-poppinsreg  cursor-pointer     rounded-md'> Profile </h1>
 
     <div className={`  ${clickedTab === "Profile" ? "flex" : "hidden"}  mt-1   h-[4px] rounded-full bg-[#FF385C]`}> </div>
 
 
     </div>
 
     {/* <div  onClick={() => setclickedTab("Notification")} className=' w-fit '> 
 
   
     <h1 className='  font-poppinsreg  cursor-pointer   rounded-md'> Notification </h1>
 
 
 
     <div className={`  ${clickedTab === "Notification" ? "flex" : "hidden"}   mt-1  h-[4px] rounded-full bg-[#FF385C]`}> </div>
 
 
 
     </div> */}
     
 
     <div  onClick={() => setclickedTab("open-close")} className=' w-fit '> 
 
   
 <h1 className='  font-poppinsreg  cursor-pointer   rounded-md'> Opening Hours </h1>
 
 {/* <div className='   mt-1  h-[4px] rounded-full bg-[#44484e]'> </div> */}
 
 <div className={`  ${clickedTab === "open-close" ? "flex" : "hidden"}   mt-1  h-[4px] rounded-full bg-[#FF385C]`}> </div>
 
 
 
 </div>
 
 
  
 <div  onClick={() => setclickedTab("images")} className=' w-fit '> 
 
   
 <h1 className='  font-poppinsreg  cursor-pointer   rounded-md'> Images </h1>
 
 {/* <div className='   mt-1  h-[4px] rounded-full bg-[#44484e]'> </div> */}
 
 <div className={`  ${clickedTab === "images" ? "flex" : "hidden"}   mt-1  h-[4px] rounded-full bg-[#FF385C]`}> </div>
 
 
 
 </div>
 
 
    </div>
 
    <div className=' absolute bottom-0 w-full border-t  '> </div>
 
       
    </div>
 
 
    {/* the content goes here  */}
 
    {/* all for ACCOUNT - NOT NOTIFICATION  */}
 
    {
     clickedTab === "Profile" &&
 
     <div className=' mt-5 md:flex hidden flex-col w-full'> 
 
   
     {/* <div className=' flex flex-col '> 
 
   
    <h1 className='   font-poppinsreg5 text-lg'> Your Profile </h1>
 

 
    </div>
  */}
    {/* profile name bio image  */}
 
    <div className=' flex  mt-2 flex-col'> 
     
     <div className='  flex  md:flex-row flex-col gap-5 md:gap-20 w-full '> 
     <div className='  flex flex-col w-full  md:max-w-sm   gap-1'> 
 
     
     
 
 <div className=' flex flex-col '>
    <h1 className=' text-2xl font-poppinsreg5 text-slate-700'> ARABIAN KNIGHTS </h1>
    {/* <input className='  w-full  outline-none border rounded-md  p-[1px]' />  */}
 
 </div>
 
 <div className=' flex flex-col '>
    <h1 className=' text-sm text-slate-400 font-poppinsreg'> arabianknights@gmail.com </h1>
    {/* <input className='  w-full  outline-none border rounded-md  p-[1px]' />  */}
 
 </div>
 
 
 <div className=' flex flex-col '>
    <h1 className=' text-sm text-slate-400 font-poppinsreg'> 377 Galle Rd, Colombo 00300, Sri Lanka</h1>
    {/* <input className='  w-full  outline-none border rounded-md  p-[1px]' />  */}
 
 </div>
 
 
 
 
 
 
 
 
 
 </div>
 
  
 
 
     </div>
 
 
     {/* <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Save Changes</Button> */}
 
     <div className=' border-b  mt-6'> </div>
 
 
     </div>
 
 

      
      <div className='gap-5 md:gap-4 flex flex-col'> 
 
       <div className=' flex  mt-4 gap-3 flex-col  '> 
 
    
    <div> 
 <h1 className='   font-poppinsreg5  text-lg'> Add Contact Number</h1>
 
 {/* <h1 className=' text-slate-400  font-poppinsreg  text-sm'>Create a new password to enhance your account security </h1> */}
 <h1 className=' text-slate-400  font-poppinsreg  text-sm'>Add your contact number for important updates and communication </h1>
 </div>
 
 <Input
                    // {...register("password")}
                    type="text"
                    size="sm"
                    // label="Phone Number"
                    className=" w-fit border-slate-400 border rounded-md  font-poppinsreg"

                    value={phoneNumber}
        onChange={handlePhoneNumberChange}
                  />




 <div className=" flex  items-baseline mt-2   gap-6 justify-start">
                     {/* <h1 className=" font-rubikSemiBold text-xl"> #323537 Security</h1> */}
                     <Button isDisabled size="sm" className=' font-poppinsreg5   w-fit bg-[#FF385C] text-white'> Save Number</Button>
                   </div>
 
 
 
 
 
      
      
 
 
 
 </div>

 <div className=' border-b  mt-3'> </div>
 
 
 {/* other things  */}
 
             <div> 

             <div> 
 <h1 className='   font-poppinsreg5  text-lg'> Change Password</h1>
 
 {/* <h1 className=' text-slate-400  font-poppinsreg  text-sm'>Create a new password to enhance your account security </h1> */}
 <h1 className=' text-slate-400  font-poppinsreg  text-sm'>Update your password to maintain account security. </h1>
 </div>
 

                     <div className=" flex flex-col mt-6 gap-5">
                       <div>
                         <h1 className=" font-poppinsreg5 text-sm text-gray-600">
                           {" "}
                           Email
                         </h1>
                         {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                         {/* <input
                           value={oldpass}
                      
                           className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                           type="text  "
                         /> */}
 
                         <h1 className=' font-poppinsreg text-sm text-slate-400'> jawidmuhammadh@gmail.com </h1>
 
                         {/* {oldpass_err && (
                           <h1 className=" text-red-400"> {oldpass_err} </h1>
                         )} */}
                       </div>
 
                       <div className=' flex flex-col gap-1'>
                         <h1 className=" font-poppinsreg5 text-sm text-gray-600">
                           {" "}
                           Old Password
                         </h1>
                         {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                         <input
                         //   value={newpass}
                         //   onChange={(e) => setnewpass(e.target.value)}
                           className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                           type="text  "
                         />
 
                         {/* {newpass_err && (
                           <h1 className=" text-red-400"> {newpass_err} </h1>
                         )} */}
                       </div>
 
                       <div className=' flex flex-col gap-1'>
                         <h1 className="font-poppinsreg5 text-sm text-gray-600">
                           {" "}
                           New Password
                         </h1>
                         {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                         <input
                         //   value={confirmnewpass}
                         //   onChange={(e) => setconfirmnewpass(e.target.value)}
                           className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                           type="text  "
                         />
                         {/* {confirmPass_err && (
                           <h1 className=" text-red-400"> {confirmPass_err} </h1>
                         )} */}
                       </div>
 
                       <Button isDisabled size="sm" className=' font-poppinsreg5 mt-2 w-fit bg-[#FF385C] text-white'> Change Password</Button>
                     </div>

                     </div>
                 
 
 
 
 
 {/* other things  */}
 
 
 
 {/* new things  */}
 
 
 {/* new things  */}
 
 
 
 
 
 
 
 
 
 
 <div className=' border-b  mt-4'> </div>


 <div className=' flex  mt-1 gap-3 flex-col  '> 
 
    
 <div> 
<h1 className='   font-poppinsreg5  text-lg'> Enable Custom Reservation</h1>

{/* <h1 className=' text-slate-400  font-poppinsreg  text-sm'>Create a new password to enhance your account security </h1> */}
<h1 className=' text-slate-400  font-poppinsreg  text-sm'>Enable custom event reservations for unique booking options beyond standard table reservations </h1>
</div>

<Switch  
                
                checked={customEvent}
                onCheckedChange={(checked:boolean) => handleSwitchChange(checked)}
                className=' h-fit mt-1' />
             




<div className=" flex  items-baseline mt-2 pb-6   gap-6 justify-start">
                  {/* <h1 className=" font-rubikSemiBold text-xl"> #323537 Security</h1> */}
                  <Button isDisabled size="sm" className=' font-poppinsreg5   w-fit bg-[#FF385C] text-white'> Save</Button>
                </div>





   
   



</div>
 
 
 </div>
        
 
 
       {/* Professional Details */}
 
 
 
 
 
 
 
 
    </div>
 
 
    }
   
 
   
   {/* secondsection  */}
 
      {
     clickedTab === "open-close" &&
     <>
 
    
 
     <div className=' w-full md:flex flex-col  hidden      '> 

     {/* <h1 className='  w-full mt-5 font-poppinsreg5 text-lg'> Opening Hours </h1> */}
                <div className='  mt-3  pb-3  w-full'>
   

    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
      <div className=' mt-4 flex flex-col gap-1' key={index}>
        <h4 className=' font-poppinsreg5   text-slate-700'> {day}</h4>
        <div className=' flex gap-3'> 
        <DatePicker
          selected={openingHours[index].open}
          onChange={(time) => handleTimeChange(index, 'open', time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Open'
          dateFormat='h:mm aa'
          placeholderText='Open Time'
          className=' border p-1 outline-none rounded-md placeholder:text-sm font-poppinsreg'
        />
        <DatePicker
          selected={openingHours[index].close}
          onChange={(time) => handleTimeChange(index, 'close', time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Close'
          dateFormat='h:mm aa'
          placeholderText='Close Time'
            className=' border p-1 outline-none rounded-md placeholder:text-sm font-poppinsreg'
        />
        </div>
      </div>
    ))}
  </div>

  <Button  isDisabled className='  bg-[#FF385C] text-white font-poppinsreg mt-5 w-fit'> Save Business Hours </Button>
 

     
     </div>

 
     </>
    }



     {/* Images section 3rd one  */}


     {
      clickedTab === "images" &&


  
     

     <div className='  flex flex-col gap-2   max-w-2xl mt-5  items-start'>





  



  {/* Image cards code  */}

  <div className=" grid grid-cols-1  gap-7 w-full  md:gap-10    ">
<div>
  <h1 className=" md:text-lg   font-poppinssemi"> Banner Image</h1>
  <p className=" text-xs font-rubik   text-slate-700 font-poppinsreg">
    {" "}


    This provide a quick glimpse of your restaurant while customers browse
    the application.{" "}
  </p>

  <div className="flex mt-3 items-center lg:w-full  w-full  relative bg-gray-200  ">
    <label
      htmlFor="dropzone-file"
      className="flex flex-col lg:w-full  w-full    h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
    >
      {imageSrc ? (
        <div className="relative   h-full ">
          <Image
            src={imageSrc}
            alt="Uploaded"
            className="w-full  h-full object-cover rounded-lg"
            width={1000}
            height={1000}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center  h-full justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="  font-poppinsreg6">
              Click to upload image
            </span>
          </p>
          {/* <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p> */}
        </div>
      )}

      <input
        id="dropzone-file"
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/jpeg, image/png"
      />
    </label>
    {bannerImage && (
      <button
        onClick={handleDelete}
        className=" px-4 py-1 absolute top-2 right-2 bg-red-500 text-white rounded-md  "
      >
        Delete
      </button>
    )}
  </div>

  {imgupload && (
    <p className="text-red-500 mt-3 text-sm"> {imgupload} </p>
  )}
</div>

<div>
  <h1 className=" md:text-lg    font-poppinssemi"> Cover Image</h1>

  <p className=" text-xs  font-poppinsreg   w-full text-slate-700">
    {" "}
    Your cover image sets the tone for user when they enter your restaurant profile.
  </p>

  <div className="flex mt-3 items-center   w-full relative bg-gray-200  ">
    <label
      htmlFor="dropzone-file2"
      className="flex flex-col l    w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
    >
      {imageSrc2 ? (
        <div className="relative  h-full ">
          <Image
            src={imageSrc2}
            alt="Uploaded"
            className="w-full  h-full object-cover rounded-lg"
            width={1000}
            height={1000}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center  h-full justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-poppinsreg6">
              Click to upload image
            </span>
          </p>
          {/* <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p> */}
        </div>
      )}

      <input
        id="dropzone-file2"
        type="file"
        ref={fileInputRef2}
        className="hidden"
        onChange={handleFileChange2}
        accept="image/jpeg, image/png"
      />
    </label>
    {coverImage && (
      <button
        onClick={handleDelete2}
        className=" px-4 py-1 absolute top-2 right-2 bg-red-500 text-white rounded-md  "
      >
        Delete
      </button>
    )}
  </div>

  {imgupload2 && (
    <p className="text-red-500 mt-3 text-sm"> {imgupload2} </p>
  )}
</div>
</div>
  {/* Image cards code  */}






 
 <div className=' flex w-full justify-center'> 

 <Button 
  // isLoading={finalBTNload}
  // isDisabled={finalBTNload}
  // isDisabled={!selectedFile && !selectedFile2 || imageuploadingloadingbtn}
      isDisabled
   onPress={ async() => {
    //  handleMerchantOnboarding()
    // setdata("jmg has changed the data")
  //  await uploadImagesToDB()
    //  await updateCompanyData()
    //  await  updateEmployerData()
    // router.push(`/onboarding?stat=company`);
  }}
  
  className=' max-w-56 w-full  py-6 bg-[#FF385C] text-white mt-6   font-poppinsreg6'> Continue </Button>


 </div>




  
{/* <Button  className=' max-w-md w-full  py-6 bg-transparent text-black mt-2 border border-black   font-poppinsreg6'> Skip For Now </Button> */}





</div>




}









    {/* Images section 3rd one ENDS  */}
 
 
 
 
  
    {/* My reservation only  */}
 
 
    {/* small devices  */}
    <div className=' w-full mt-2  md:hidden flex'> 
 
   
    <Accordion itemClasses={
     {
         title : "font-poppinssemi"
     }
    }  variant="shadow">
       <AccordionItem key="1" aria-label="Accordion 1" title="Profile">
 
       <div className=' md:mt-5 flex   flex-col w-full'> 
 
   
 <div className=' flex flex-col '> 
 
 
 <h1 className='    font-poppinsreg5 text-lg'> Your Profile </h1>
 
 <h1 className=' text-slate-400 font-poppinsreg text-sm'> Choose how you are displayed </h1>
 
 </div>
 
 {/* profile name bio image  */}
 
 <div className=' flex  mt-2 flex-col'> 
 
 <div className=' mt-3 flex  md:flex-row flex-col gap-5 md:gap-20 w-full '> 
 <div className='  flex flex-col w-full  md:max-w-sm  gap-5 md:gap-4'> 
 
 
 
 <div className=' flex md:hidden flex-col md:items-center gap-1'>
 
 
 <Image src={"/mannar.jpg"} alt='profile' width={100} height={100} className=' w-20 h-20 rounded-full object-cover' />
 <h1 className=' text-slate-700 text-sm font-poppinsreg underline'> Change Photo </h1>
 </div>
 
 <div className=' flex flex-col gap-1'>
 <h1 className=' text-sm font-poppinsreg'> Name </h1>
 <input className='  w-full  outline-none border rounded-md  p-[1px]' /> 
 
 </div>
 
 <div className=' flex flex-col gap-1'>
 <h1 className=' text-sm font-poppinsreg'> Email </h1>
 <input className='  w-full  outline-none border rounded-md  p-[1px]' /> 
 
 </div>
 
 
 <div className=' flex flex-col gap-1'>
 <h1 className=' text-sm font-poppinsreg'> Phone Number </h1>
 <input className='  w-full  outline-none border rounded-md  p-[1px]' /> 
 
 </div>
 
 
 
 
 
 
 
 
 
 </div>
 
 <div className=' hidden md:flex flex-col md:items-center gap-2'>
 
 
 <Image src={"/mannar.jpg"} alt='profile' width={100} height={100} className=' w-20 h-20 rounded-full object-cover' />
 <h1 className=' text-slate-700 text-sm font-poppinsreg underline'> Change Photo </h1>
 </div>
 
 
 </div>
 
 
 <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Save Changes</Button>
 
 <div className=' border-b  mt-6'> </div>
 
 
 </div>
 
 
   {/* profile name bio image  ends */}
 
 
   {/* Professional Details */}
  
  <div className='gap-5 md:gap-4 md:pb-0 pb-4 flex flex-col'> 
 
   <div className=' flex mt-8 flex-col '> 
 
 
 <h1 className='   font-poppinsreg5  text-lg'> Change Your Password</h1>
 
 <h1 className=' text-slate-400  font-poppinsreg  text-sm'>Create a new password to enhance your account security </h1>
 
 <div className=" flex  items-baseline mt-6   gap-6 justify-start">
                 {/* <h1 className=" font-rubikSemiBold text-xl"> Security</h1> */}
                 <Button size="sm" className=' font-poppinsreg5  w-fit bg-[#323537] text-white'> Change Password</Button>
               </div>
 
 
 
 
 
  
  
 
 
 
 </div>
 
 
 {/* other things  */}
 
 
 {false && (
                 <div className=" flex flex-col mt-10 gap-5">
                   <div>
                     <h1 className="font-rubikSemiBold text-gray-800">
                       {" "}
                       Email
                     </h1>
                     {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                     {/* <input
                       value={oldpass}
                  
                       className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                       type="text  "
                     /> */}
 
                     <h1> jawidmuhammadh@gmail.com </h1>
 
                     {/* {oldpass_err && (
                       <h1 className=" text-red-400"> {oldpass_err} </h1>
                     )} */}
                   </div>
 
                   <div>
                     <h1 className="font-rubikSemiBold text-gray-800">
                       {" "}
                       Old Password
                     </h1>
                     {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                     <input
                     //   value={newpass}
                     //   onChange={(e) => setnewpass(e.target.value)}
                       className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                       type="text  "
                     />
 
                     {/* {newpass_err && (
                       <h1 className=" text-red-400"> {newpass_err} </h1>
                     )} */}
                   </div>
 
                   <div>
                     <h1 className="font-rubikSemiBold text-gray-800">
                       {" "}
                       New Password
                     </h1>
                     {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                     <input
                     //   value={confirmnewpass}
                     //   onChange={(e) => setconfirmnewpass(e.target.value)}
                       className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                       type="text  "
                     />
                     {/* {confirmPass_err && (
                       <h1 className=" text-red-400"> {confirmPass_err} </h1>
                     )} */}
                   </div>
 
                   <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Change Password</Button>
                 </div>
               )}
 
 
 
 
 {/* other things  */}
 
 
 
 {/* new things  */}
 
 
 {/* new things  */}
 
 
 
 
 
 
 
 
 
 
 <div className=' border-b md:flex hidden   mt-6'> </div>
 
 
 </div>
    
 
 
   {/* Professional Details */}
 
 
 
 
 
 
 
 
 </div>
 
        
       </AccordionItem>
       <AccordionItem key="2" aria-label="Accordion 2" title="My Reservations">
         
 
         
     <div className=' w-full md:flex flex-col  border     '> 
 
 <Table className=' '  >
 
 <TableHeader>
   <TableRow >
     <TableHead className="text-center  text-slate-400 font-poppinsreg5">Reservation Data</TableHead>
     <TableHead className='text-center text-slate-400 font-poppinsreg5'>Reference</TableHead>
     <TableHead className='text-center text-slate-400 font-poppinsreg5'>Restaurant</TableHead>
     <TableHead className="text-center text-slate-400 font-poppinsreg5">Status</TableHead>
     <TableHead className="text-center text-slate-400 font-poppinsreg5">View</TableHead>
     {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
     <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
   </TableRow>
 </TableHeader>
 <TableBody>
   <TableRow>
     <TableCell className="text-center text-slate-900  font-poppinsreg5">
       <h1> 28.04.2024 </h1>
       </TableCell>
     <TableCell className='text-center text-slate-900 font-poppinsreg5'>
    <h1> 356584 </h1>
       </TableCell>
     <TableCell className='text-center text-slate-900 font-poppinsreg5'>
        <h1> The Gallery Cafe</h1>
       </TableCell>
     <TableCell className="text-center  font-poppinsreg5">
        <h1 className='bg-red-100 text-red-800  p-2 rounded-md'> Pending </h1>
       </TableCell>
     <TableCell className="text-center font-poppinsreg5">
     <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="w-6 mx-auto  transition-colors ease-in-out duration-300 hover:text-[#ca5a56]  h-6"
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
 
 
   <TableRow>
     <TableCell className="text-center text-slate-900  font-poppinsreg5">
       <h1> 29.04.2024 </h1>
       </TableCell>
     <TableCell className='text-center text-slate-900 font-poppinsreg5'>
    <h1> 356487 </h1>
       </TableCell>
     <TableCell className='text-center text-slate-900 font-poppinsreg5'>
        <h1> Arabian Knights</h1>
       </TableCell>
     <TableCell className="text-center  font-poppinsreg5">
        <h1 className='bg-green-100 text-green-800  p-2 rounded-md'> Reserved </h1>
       </TableCell>
     <TableCell className="text-center font-poppinsreg5">
     <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 className="w-6 mx-auto  transition-colors ease-in-out duration-300 hover:text-[#ca5a56]  h-6"
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
 
 
 
 
 
 </TableBody>
 </Table>
 
     
     </div>
 
 
       
       </AccordionItem>
       <AccordionItem key="3" aria-label="Accordion 3" title="Payments & Billings">
       
       </AccordionItem>
     </Accordion>
     </div>
    {/* small devices  */}
 
 
 
 
   
 
     </div>
 






    </div>
    </div>

  )
}

export default Page