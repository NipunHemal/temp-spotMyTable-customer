"use client";

import { useTemp } from "@/context/tempContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Footer = () => {
  const [input, setinput] = useState("");



  const {aboutUs, setAboutUs, cancellation_policy,setCancellation_policy , terms,setterms , aboutUsCRT,setAboutUsCRT} = useTemp()


  return (
    <div className="bg-[#141414] pt-10 pb-8 flex  flex-col justify-center items-center w-full ">
      <div className=" max-w-7xl   flex lg:flex-row  lg:gap-0 gap-8 flex-col lg:justify-between  lg:px-10 px-2 lg:p-2 h-full w-full">
        <div className=" flex  justify-center  flex-col gap-1">
        
          <Image alt='' src={'/logofooter.png'} className=' w-36 h-fit object-cover' width={1000} height={1000} />
        </div>

        <div className=" flex flex-col gap-2">
          <h1 className={`  font-poppinsreg5 text-xl text-gray-200  `}>
            {" "}
            Who we are{" "}
          </h1>
          <div
            className={` font-poppinsreg  lg:text-base text-sm flex flex-col gap-1 text-white `}
          >
            {/* onClick={() => setAboutUsCRT(true) } */}
            <h1 onClick={() => setAboutUs(true) } className=" cursor-pointer"> Privacy Policy </h1>
            {/* <h1> Explore Countries </h1>
            <h1> Our Role </h1>
            <h1> Partner Program </h1> */}
            <h1 onClick={() => setterms(true) }  className=" cursor-pointer" > Terms & Conditions </h1>
            <h1 onClick={() => setCancellation_policy(true) }  className=" cursor-pointer"> Cancellation Policy </h1>
            <Link href="/about-us"><h1  className="cursor-pointer"> About Us </h1> </Link>
            <Link href="/contact-us">   <h1  className=" cursor-pointer"> Contact Us </h1></Link>
          </div>
        </div>
        {/* <div className=" flex flex-col gap-2">
          <h1 className={`  font-poppinsreg5 text-xl text-gray-200  `}>
            {" "}
            Get in touch
          </h1>
          <div
            className={`  font-poppinsreg lg:text-base text-sm flex flex-col gap-1  text-white `}
          >
            <h1> Contact </h1>
            <h1> Press </h1>
            <h1> Knowledge Center </h1>
            <h1> Guidelines </h1>
          
          </div>
        </div> */}
        <div className=" flex flex-col gap-2">
          <h1 className={` font-poppinsreg5 text-xl text-gray-200  `}>
            {" "}
            Follow Us
          </h1>
          <div
            className={`  font-poppinsreg lg:text-base text-sm flex flex-col gap-1  text-white `}
          >
            <h1> Facebook </h1>
            <h1> Instagram </h1>
            <h1> Twitter </h1>
            <h1> TikTok </h1>
            {/* <h1> FAQs </h1> */}
          </div>
        </div>
      </div>

      <div className=" border-b w-full border-white border-opacity-10 mt-4 ">
        {" "}
      </div>

      <div className=" max-w-7xl text-white px-2 lg:px-10 gap-6 mt-2 flex md:flex-row flex-col w-full  justify-center">
        {/* <div
          className={`  font-poppinsreg lg:text-base text-sm  flex    gap-2 `}
        >
          <h1> Privacy Policy </h1>
          <h1> Term & Condition </h1>
        </div> */}
        <h1 className={` font-poppinsreg mt-3 lg:text-base text-sm`}>
          {" "}
          &copy; 2024 SpotMyTable. All Rights Reserved.{" "}
        </h1>
      </div>
    </div>
  );
};

export default Footer;