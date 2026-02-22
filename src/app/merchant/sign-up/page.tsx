"use client";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { useTemp } from "@/context/tempContext";
// import { signup, verifyuser } from "./action";


const pop400 = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const pop700 = Poppins({
  subsets: ["latin"],
  weight: "700",
});

const pop500 = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export default function Signup() {
  const router = useRouter();

  const { data: session, status } = useSession();

  // if (status === "authenticated") {
  //   router.replace("/dashboard");
  // }

  interface SignupInput {
    email: string;
    name: string;
    password: string;
    phone: string;
    role: string;
  }

  // signed up user email take
  const [reg_email, setreg_email] = useState("");
  // signed up user email take  ends

  // signup func

  // const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);
  // const inputRefs = useRef<HTMLInputElement[]>([]);

  // const handleInputChange = (index: number, value: string) => {
  //   const newOTP = [...otp];
  //   newOTP[index] = value;

  //   setOTP(newOTP);
  //   console.log(otp);
  // };

  // const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key.length === 1) {
  //     e.preventDefault();
  //     const newValue = e.key;
  //     handleInputChange(index, newValue);

  //     if (index < inputRefs.current.length - 1) {
  //       inputRefs.current[index + 1]!.focus(); // Use non-null assertion (!)
  //     }
  //   } else if (e.key === "Backspace") {
  //     if (otp[index] && index >= 0) {
  //       // Delete the character and keep the cursor in the current input
  //       handleInputChange(index, "");
  //     } else if (index > 0) {
  //       // Move to the previous input if the current one is empty
  //       inputRefs.current[index - 1]!.focus(); // Use non-null assertion (!)
  //     }
  //   }
  // };



  const [loading, setloading] = useState<boolean>(false);
  const [validate, setvalidate] = useState<boolean>(false);
  const [showtotp, setshowtotp] = useState(false);




  const [otperror, setotperror] = useState("");
const [showSignup, setshowSignup] = useState(true)



 
// fields and values of it 
const [businessName, setbusinessName] = useState("")
const [RegNum, setRegNum] = useState("")
const [verifyBTNload, setverifyBTNload] = useState(false)
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [errorMessageSignUp, seterrorMessageSignUp] = useState("")
// fields and values of it 

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const { setMerchantEmail} = useTemp()

const handleSignup = async () => {
  seterrorMessageSignUp("")
  try {
    const response = await fetch(`${backend_url}/api/auth/merchant-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password , bus_id:RegNum })
    });
    const data = await response.json();
    console.log(data);
    
    if (data.status === 'success') {
    //  setsignupresult('Signup successful!');
    //   setshowonboarding(true)
    console.log("merchant created succefully with new business id");
    setMerchantEmail(email)
    router.push('/merchant/onboarding')
    
    
    } else {
    //  setsignupresult(data.message);
    console.log(data?.message);
    seterrorMessageSignUp(data?.message)
    
    }
  } catch (error) {
  //  setsignupresult('Error occurred during signup');
  console.log("error occured during signup");
  seterrorMessageSignUp("error occured during signup. Try again!")
  
  }
};


const checkBusinessRegValid = async() => {
    
  setverifyBTNload(true)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-key': '7379f89424msh1724977b0fd90f2p1ca3c0jsn6753f6a28c50',
      'x-rapidapi-host': 'sri-lanka-company-data.p.rapidapi.com'
    },
    body: JSON.stringify({
      criteria: 2,
      searchtext: businessName,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiZjNjZWNjNjQ4MWY3ZWYwZWFlNGZmYzJhMjZjMDMwMWFhYTJjY2U2NWVlMmRiZjdkMjg1NjBjYjZlMTM1ODIyYTQ5MGZiMTdjNDhkYmZiIn0 '
    })
  };


  try {
    seterrorMessageSignUp("")
    const response = await fetch('https://sri-lanka-company-data.p.rapidapi.com/api/v1/eroc/name/search', options);
    const result = await response.json();

    console.log(result);
    

      if (result.availableData.data && result.availableData.data.length > 0) {
        const found = result.availableData.data.some((company:any) => company.registration_no === RegNum);
        if (found) {
          // setResultMessage(`${businessName}: Your business is available`);
          // setBusinessVefied(true)
          console.log("your business is available");
           await handleSignup()
          setverifyBTNload(false)
        } else {
          // setResultMessage(`${businessName}: Your business is not available`);
          // setBusinessVefied(false)
          console.log("your business is NOT available");
          setverifyBTNload(false)
          seterrorMessageSignUp("Business name or registration number not found")
        }
      } else {
        // setResultMessage(`${businessName}: Your business is not available`);
        // setBusinessVefied(false)
        console.log("your business is NOT available");
        seterrorMessageSignUp("Business name or registration number not found")
        setverifyBTNload(false)
      }
  } catch (error) {
    console.error('Error:', error);
    // setResultMessage('Error occurred while verifying the business');
    setverifyBTNload(false)
  }

}



  return (
    <>
      <div className=" flex lg:bg-white  overflow-hidden   lg:h-screen bg-white  lg:justify-between">
        <div className=" bg-[#212229] hidden lg:flex flex-col gap-6  lg:items-start 2xl:items-center  justify-center    w-8/12">
          <Image
            className="  mt-8 w-full"
            alt="hero"
            width={1000}
            height={1000}
            src={"/nice.webp"}
          />
          <div className=" flex flex-col  2xl:gap-5 gap-3">
            <h1
              className={` font-poppinssemi   text-gray-200 2xl:text-8xl  text-5xl 2xl:mx-10  md:mx-6 `}
            >
              {" "}
              Welcome To Spot My Table Merchant{" "}
            </h1>{" "}
            <h1
              className={`   font-poppinssemi    text-[#f37a6a] 2xl:text-7xl  text-4xl 2xl:mx-10   md:mx-6 `}
            >
              Supercharge your sales with us!
            </h1>
            {/* <p className=" text-sm  md:ml-6 mt-3 text-gray-200">
            {" "}
            Elevate your business with Raflakeskus: Manage orders, resolve
            issues, and track your success{" "}
          </p>{" "} */}
          </div>
        </div>
        <div className=" lg:w-6/12 2xl:w-4/12 w-full h-screen overflow-y-auto flex justify-center lg:justify-normal ">
          <main className="flex  lg:px-0 px-4  lg:w-full  w-full    bg-white  overflow-hidden   lg:m-5    flex-col gap-4  lg:items-start justify-center   ">
            {/* <Image
              src={"/Rafla_Logo.png"}
              alt="sda"
              width={500}
              height={500}
              className="  mt-4 md:mt-12 lg:mt-4  w-[200px]"
            /> */}
            {/* ${pop700.className} */}
            <h1 className={`  font-poppinsreg5    w-full   text-center     mt-1 text-3xl `}>
              Sign up to SpotMyTable Merchant
            </h1>

            <form className=" flex mt-3 w-full  lg:items-start items-center flex-col gap-6">
         


          {
            !showSignup &&

            <div className=" flex-col w-full items-center   gap-6 flex"> 
            <div className=" flex  w-full lg:w-full md:max-w-lg      flex-col gap-2">
            <h1 className={`    font-poppinsreg5 text-sm `}>
              {" "}
             Business Name
            </h1>
            <input
              value={businessName}
              onChange={(e) => setbusinessName(e.target.value)}
              placeholder="Eg : PPC Holdings"
              className=" py-[10px] lg:py-[10px text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
              type="text  "
            />
            {/* {emailError && (
              <p className="text-red-500 font-rubik text-sm">
                {emailError}
              </p>
            )} */}
          </div>

          <div className=" flex  w-full lg:w-full md:max-w-lg       flex-col gap-2">
            <h1 className={`    font-poppinsreg5 text-sm `}>
              {" "}
             Registration Number
            </h1>
            <input
              value={RegNum}
              onChange={(e) => setRegNum(e.target.value)}
              placeholder="Sri Lankan Business Reg No"
              className=" py-[10px] lg:py-[10px text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
              type="text  "
            />
            {/* {emailError && (
              <p className="text-red-500 font-rubik text-sm">
                {emailError}
              </p>
            )} */}
          </div>

          <div className="   w-full lg:w-full md:max-w-lg     flex lg:justify-normal justify-center"> 
          <div className=" w-full flex lg:justify-normal justify-center">
           <Button isDisabled={verifyBTNload} isLoading={verifyBTNload} onPress={checkBusinessRegValid}  className=" bg-[#FF385C] w-full font-poppinsreg text-white"> 
            Verify
           </Button>
          </div>  

          </div>


          </div>
        
            


          }
            

         

              <div className="flex-col  w-full  items-center gap-6 flex">

              <div className=" flex w-full lg:w-full md:max-w-lg        flex-col gap-2">
                <h1 className={`    font-poppinsreg5 text-sm `}>
                  {" "}
                 Business Name
                </h1>
                <input
                  value={businessName}
                  onChange={(e) =>  setbusinessName(e.target.value)}
                  placeholder="Reg:No"
                  className=" py-[10px] lg:py-[10px text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                  type="text  "
                />
                {/* {emailError && (
                  <p className="text-red-500 font-rubik text-sm">
                    {emailError}
                  </p>
                )} */}
              </div>
              

              <div className=" flex w-full lg:w-full md:max-w-lg        flex-col gap-2">
                <h1 className={`    font-poppinsreg5 text-sm `}>
                  {" "}
                 Business Registration Number
                </h1>
                <input
                  value={RegNum}
                  onChange={(e) =>  setRegNum(e.target.value)}
                  placeholder="Reg:No"
                  className=" py-[10px] lg:py-[10px text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                  type="text  "
                />
                {/* {emailError && (
                  <p className="text-red-500 font-rubik text-sm">
                    {emailError}
                  </p>
                )} */}
              </div>

               
               <div className=" flex w-full lg:w-full md:max-w-lg        flex-col gap-2">
                <h1 className={`    font-poppinsreg5 text-sm `}>
                  {" "}
                 Email
                </h1>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="yourbusinessemail@company.com"
                  className=" py-[10px] lg:py-[10px text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                  type="text  "
                />
                {/* {emailError && (
                  <p className="text-red-500 font-rubik text-sm">
                    {emailError}
                  </p>
                )} */}
              </div>

              <div className=" flex flex-col w-full  lg:w-full md:max-w-lg       gap-2">
                <h1 className={`   font-poppinsreg5 text-sm `}> Password </h1>
                <div className="relative ">
                  <div className="py-[10px] lg:py-[10px] rounded-lg border border-gray-300 w-full flex focus-within:border-[#f79e92] focus-within:border-2">
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="Enter your password"
                      className="flex-1 text-sm pr-2 outline-none pl-3"
                      // type="password"
                      // type={showpass ? "text" : "password"}
                    />
                    <h1
                      // onClick={() => setshowpass(!showpass)}
                      className="px-2 cursor-pointer text-sm absolute inset-y-0 right-0 flex items-center"
                    >
                      Show
                    </h1>
                  </div>
                  {/* {passwordError && (
                    <p className="text-red-500 font-rubik text-sm">
                      {passwordError}
                    </p>
                  )} */}
                </div>
              </div>
           

           {
            errorMessageSignUp &&
            <h1 className=" font-poppinsreg  text-red-600">  {errorMessageSignUp} </h1>

           }
        

              <h1 className="  mt-3  font-poppinsreg  text-slate-600  text-sm">
                {" "}
                {`By Signing up , you agree to SpotMyTable's Merchant`}
                <span className=" hover:underline cursor-pointer text-[#db614f]">
                  {" "}
                  Security Terms.{" "}
                </span>{" "}
              </h1>
              {/* ${    pop400.className  } */}
              <div className="   w-full lg:w-full md:max-w-lg     flex lg:justify-normal justify-center">
               <div className=" w-full flex lg:justify-normal justify-center">
           <Button isDisabled={verifyBTNload} isLoading={verifyBTNload}  onPress={checkBusinessRegValid} className=" bg-[#FF385C] w-full font-poppinsreg text-white"> 
            Sign Up
           </Button>
          </div>  
              </div>



              </div>


           
         
             
             










            </form>

            {/* #E79F4D */}

            <div className=" flex  w-full justify-center"> 

         

            <div className="  lg:w-full md:max-w-lg   w-full border-b mt-5"> </div>

            </div>

            <h1 className="text-sm  text-center font-poppinsreg  w-full pb-7">
              {" "}
              Already on Spot My Table?{" "}
              <Link href={"/login"}>
                <span className="  cursor-pointer  font-poppinsreg hover:underline text-[#db614f] ">
                  {" "}
                  Login{" "}
                </span>{" "}
              </Link>
            </h1>
          </main>
        </div>
      </div>

  

  
    </>
  );
}
