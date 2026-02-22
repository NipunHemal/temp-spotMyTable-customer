'use client';
import Cities from '@/components/comp/Cities';
import Footer from '@/components/comp/Footer';
import Header from '@/components/comp/Header';
import RestaurantListing from '@/components/comp/RestaurantListing';
import { Button } from '@/components/ui/button';
import { useTemp } from '@/context/tempContext';
import { restaurantsColombo } from '@/helpers/data';
import { motion } from 'framer-motion';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Button as BTN,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
//
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Signin from '@/components/comp/Signin';

export default function Home() {
  const { loginSucsess, signUpSuccess } = useTemp();

  const cities = [
    { label: 'Ampara', value: 'ampara' },
    { label: 'Anuradhapura', value: 'anuradhapura' },
    { label: 'Badulla', value: 'badulla' },
    { label: 'Batticaloa', value: 'batticaloa' },
    { label: 'Colombo', value: 'colombo' },
    { label: 'Galle', value: 'galle' },
    { label: 'Gampaha', value: 'gampaha' },
    { label: 'Hambantota', value: 'hambantota' },
    { label: 'Jaffna', value: 'jaffna' },
    { label: 'Kalutara', value: 'kalutara' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Kegalle', value: 'kegalle' },
    { label: 'Kilinochchi', value: 'kilinochchi' },
    { label: 'Kurunegala', value: 'kurunegala' },
    { label: 'Mannar', value: 'mannar' },
    { label: 'Matale', value: 'matale' },
    { label: 'Matara', value: 'matara' },
    { label: 'Moneragala', value: 'moneragala' },
    { label: 'Mullaitivu', value: 'mullaitivu' },
    { label: 'Nuwara Eliya', value: 'nuwara_eliya' },
    { label: 'Polonnaruwa', value: 'polonnaruwa' },
    { label: 'Puttalam', value: 'puttalam' },
    { label: 'Ratnapura', value: 'ratnapura' },
    { label: 'Trincomalee', value: 'trincomalee' },
    { label: 'Vavuniya', value: 'vavuniya' },
    // Add more cities as needed
  ];

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // get restuarant by city
  const secondCity = 'Kandy';

  const firstCity = 'Colombo';

  const [RestaurantsForCity, setRestaurantsForCity] = useState<any>();

  const params = useParams<{ city: string }>();

  const [noRestaurantsFoundForCity, setnoRestaurantsFoundForCity] =
    useState(false);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getRestaurantsInColombo = async () => {
    try {
      const response = await fetch(
        `${backend_url}/merchant/get-merchant-by-city/${params.city}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ city : firstCity})
        },
      );
      const data = await response.json();
      // console.log(data);lxlx

      // if (data.status === 'success') {
      //    setRestaurantsForCity(data?.data?.merchants)

      // } else {
      //   console.log(data?.message);
      //   setnoRestaurantsFoundForCity(true)

      // }

      if (data.status === 'success') {
        const merchants = data?.data?.merchants || [];
        setRestaurantsForCity(merchants);
        setnoRestaurantsFoundForCity(merchants.length === 0);
      } else {
        setRestaurantsForCity([]);
        setnoRestaurantsFoundForCity(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRestaurantsInColombo();
  }, []);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        // Fetch results only if query length is greater than 2
        try {
          const response = await fetch(
            `${backend_url}/merchant/search?name=${query}`,
          );
          const data = await response.json();
          // console.log(data);lxlx

          setResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  // get restuarant by city

  const router = useRouter();

  const absoluteElementRef = useRef<any>(null);

  const [openModal, setopenModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        absoluteElementRef.current &&
        !absoluteElementRef.current?.contains(event.target) &&
        openModal
      ) {
        setopenModal(false); // Call your function to close the modal or trigger any other action
      }
    };

    // const handleScroll = () => {
    //   if (openModal) {
    //     setopenModal(false); // Call your function to close the modal or trigger any other action
    //   }
    // };

    document.addEventListener('click', handleClickOutside);
    // window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [openModal]);

  //  const {isOpen:isOpenCity, onOpen:onOpenCity, onClose:onCloseCity, onOpenChange:onOpenChangeCity} = useDisclosure();

  const {
    isSignupSuccess,
    showSignupModel,
    setShowSignupModel,
    setisSignupSuccess,
    showLoginModel,
    setIsShowLoginModel,
  } = useTemp();

  const { data: session, status } = useSession();

  return (
    <>
      <div className=" overflow-hidden">
        {/* <Header /> */}

        <div className=" w-full flex justify-center">
          <div className=" max-w-7xl w-full">
            <Header />
          </div>
        </div>

        <div className=" border-t w-full">
          {/* mobile screen  */}

          <div className="  w-full  border-b lg:hidden p-2 flex justify-between items-center">
            <Image
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className=" w-16 h-fit object-cover"
            />

            <div className="flex  items-center gap-5">
              {status === 'authenticated' && (
                <div className=" flex flex-col ">
                  <h1 className=" text-sm font-poppinssemi">
                    {' '}
                    {`Hi ${session?.user?.name}`}{' '}
                  </h1>
                  <h1 className=" font-poppinsreg5 text-sm text-slate-600">{`${
                    new Date().getHours() < 12
                      ? 'Good Morning!'
                      : new Date().getHours() < 18
                      ? 'Good Afternoon!'
                      : 'Good Evening!'
                  }`}</h1>
                </div>
              )}

              <svg
                onClick={() => setopenModal(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>

          {/* the hamburger sheet  */}

          <div
            ref={absoluteElementRef}
            className={` lg:hidden fixed transition-all  overflow-y-auto  z-50   ease-in-out   duration-500 top-0  bg-[#141823] ${
              openModal ? 'right-0 w-[70%]' : ' -right-full w-0'
            }  h-full `}
          >
            <div className=" px-3 py-5">
              <div className=" w-full flex border-b pb-3 border-white justify-end">
                {/* <h1 className=" text-2xl"> FILTER </h1> */}

                <svg
                  onClick={() => setopenModal(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.9"
                  stroke="currentColor"
                  className="w-6 h-6 text-red-400 bg-white rounded-full p-[2px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>

              {/* dropdowns  */}

              <div className=" w-full       overflow-y-auto     ">
                {/* showDivider={false} */}

                {status === 'authenticated' && (
                  <div className=" mt-3 flex flex-col gap-3">
                    <h1
                      onClick={() => router.push('/settings?section=Profile')}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {' '}
                      Profile{' '}
                    </h1>
                    <h1
                      onClick={() =>
                        router.push('/settings?section=My-Reservations')
                      }
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {' '}
                      My Reservations{' '}
                    </h1>

                    <h1
                      onClick={() => {
                        signOut();
                      }}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {' '}
                      Log Out{' '}
                    </h1>
                  </div>
                )}

                {/* rrrrrrrrrrrrrrrrrrrrr  */}

                {status === 'unauthenticated' && (
                  <div className="mt-3 flex flex-col gap-3">
                    <h1
                      onClick={() => {
                        setIsShowLoginModel(true);
                        setopenModal(false);
                      }}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {' '}
                      Login{' '}
                    </h1>

                    <h1
                      onClick={() => {
                        setShowSignupModel(true);
                        setopenModal(false);
                      }}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {' '}
                      Sign Up{' '}
                    </h1>
                  </div>
                )}
              </div>

              {/* dropdowns  */}
            </div>
          </div>
          {/* the hamburger sheet  */}

          {/* mobile screen  */}

          <div className="flex w-full mt-3 justify-center gap-2 p-2  items-center ">
            {/* endContent={
          <div className=" bg-[#FF385C] w-8 h-8 p-1 flex justify-center rounded-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="w-fit  text-white   h-fit">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </div>
         } */}

            {/*  
   <div className=" w-full border p-2 md:p-3 flex items-center max-w-lg border-black/5  rounded-full"> 

  
    <input placeholder="Search a restaurant..." className=" placeholder:md:text-base text-sm w-full font-poppinsreg    outline-none   " />
    
    <div className=" cursor-pointer w-8 hover:bg-[#E31C5D] transition-colors duration-300 ease-in bg-[#FF385C] rounded-full p-1 h-8 flex justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-fit text-white h-fit">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
 

    </div>
    </div>

 */}

            <div className=" relative w-full border    max-w-lg border-black/5  rounded-full">
              <div className="p-2 md:p-3 flex items-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a restaurant..."
                  className=" placeholder:md:text-base text-sm w-full font-poppinsreg    outline-none   "
                />

                <div className=" cursor-pointer w-8 hover:bg-[#E31C5D] transition-colors duration-300 ease-in bg-[#FF385C] rounded-full p-1 h-8 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.0"
                    stroke="currentColor"
                    className="w-fit text-white h-fit"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </div>

              {query.length > 2 && (
                <div className=" absolute top-12 md:top-14  z-10    w-full flex justify-center  ">
                  <div
                    className={` ${
                      results.length > 0 && 'rounded-tl-lg rounded-tr-lg'
                    }  overflow-y-auto  bg-slate-50 w-[97%] min-h-fit max-h-[400px] border`}
                  >
                    {results.length > 0 ? (
                      results?.map((r: any) => (
                        <div
                          onClick={() => router.push(`/sn/${r._id}`)}
                          key={r._id}
                          className=" p-3 hover:bg-slate-100 cursor-pointer flex border-b gap-3  items-center"
                        >
                          <Image
                            src={r.cover_img}
                            alt=""
                            width={250}
                            height={250}
                            className=" w-16 h-16 rounded-md object-cover"
                          />

                          <div className=" flex flex-col">
                            <h1 className="  capitalize font-poppinsreg5">
                              {' '}
                              {r.restaurantName}{' '}
                            </h1>

                            <h1 className=" font-poppinsreg text-sm text-slate-500">
                              {' '}
                              {r.restaurantAddress}{' '}
                            </h1>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1 className=" bg-white  font-poppinsreg text-sm p-3">
                        {' '}
                        No Results Found...{' '}
                      </h1>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* <div className="w-full border p-2 md:p-3 flex items-center max-w-lg border-black/5  rounded-full"> 
    <input  value={query} 
        onChange={(e) => setQuery(e.target.value)}  placeholder="Search a restaurant..." className=" placeholder:md:text-base text-sm w-full font-poppinsreg    outline-none   " />
    
    <div className=" cursor-pointer w-8 hover:bg-[#E31C5D] transition-colors duration-300 ease-in bg-[#FF385C] rounded-full p-1 h-8 flex justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-fit text-white h-fit">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
 

    </div>

    </div> */}

            {/* filters  */}

            <Button onClick={onOpen} className=" flex w-fit sm:gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="sm:w-6 text-white  w-5 h-5 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>

              <h1 className=" sm:flex font-poppinsreg hidden"> Filters </h1>
            </Button>

            {/* filters  */}

            {/* modal  */}

            <Modal
              closeButton={
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 transition-colors duration-100 ease-in p-1 bg-[#FF385C] hover:bg-[#E31C5D] rounded-full text-white h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              }
              className=" bg-[#F9F9F9]"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                <>
                  <ModalHeader className="flex flex-col   font-poppinsreg text-xl gap-1">
                    Search a restaurant
                  </ModalHeader>
                  <ModalBody className=" flex flex-col gap-8">
                    <div>
                      <h1 className="   font-poppinsreg5 text-slate-700 ">
                        {' '}
                        Search By City{' '}
                      </h1>

                      <div className="flex w-full mt-3 flex-wrap md:flex-nowrap gap-4">
                        <Select
                          defaultSelectedKeys={['colombo']}
                          disallowEmptySelection
                          label="Select a city"
                          className=" font-poppinsreg"
                        >
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* <div>
                      <h1 className="   text-slate-700  font-poppinsreg5">
                        {' '}
                        Search Nearby Restaurants{' '}
                      </h1>

                      <div className="flex w-full mt-3 flex-wrap md:flex-nowrap gap-4">
                        <BTN
                          className=" w-full py-6 bg-transparent  border-black/15 border-[1px]"
                          radius="full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6    -rotate-45 h-6"
                          >
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                          </svg>

                          <h1 className="  font-poppinsreg">
                            {' '}
                            Use current Location{' '}
                          </h1>
                        </BTN>
                      </div>
                    </div> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className=" w-full  bg-[#FF385C] transition-colors duration-300 ease-in hover:bg-[#E31C5D]   font-poppinsreg5 text-lg  py-6"
                      onClick={onClose}
                    >
                      Search
                    </Button>
                  </ModalFooter>
                </>
              </ModalContent>
            </Modal>
            {/* modal  */}
          </div>
        </div>

        <div className=" w-full   flex justify-center p-4">
          <div className=" max-w-7xl w-full">
            <div className=" overflow-x-auto">
              <BTN
                onPress={() => router.replace('/')}
                variant="light"
                className=" border w-28"
              >
                {' '}
                Go Back{' '}
              </BTN>

              <div className=" flex md:flex-row flex-col mt-10 md:gap-0 gap-1  md:justify-between">
                {RestaurantsForCity?.length > 0 && (
                  <h1 className=" font-poppinssemi text-xl md:text-3xl text-slate-800">
                    {' '}
                    All Restuarants In {params?.city}{' '}
                  </h1>
                )}
              </div>

              {/* restaurants  */}

              <div className="   grid md:grid-cols-3   grid-cols-2 lg:grid-cols-4 mt-3 md:mt-5   gap-3   items-stretch">
                {RestaurantsForCity?.length > 0 &&
                  RestaurantsForCity?.map((restaurant: any, i: any) => (
                    <div
                      key={i}
                      onClick={() => router.push(`/sn/${restaurant?._id}`)}
                      className="  cursor-pointer   flex flex-col gap-1 border   rounded-lg   "
                    >
                      <Image
                        src={
                          restaurant?.cover_img
                            ? restaurant?.cover_img
                            : restaurant?.image
                        }
                        alt="restaurant"
                        className="  rounded-t-lg  rounded-b-none w-full h-36 object-cover"
                        width={500}
                        height={500}
                      />

                      <div className=" flex flex-col  px-2 pt-2">
                        {restaurant?.restaurantName && (
                          <h1 className="  md:text-lg  capitalize font-poppinssemi">
                            {' '}
                            {restaurant?.restaurantName?.length > 20
                              ? restaurant?.restaurantName?.slice(0, 20) + '...'
                              : restaurant?.restaurantName}{' '}
                          </h1>
                        )}

                        {restaurant?.name && (
                          <h1 className="  md:text-lg  font-poppinssemi">
                            {' '}
                            {restaurant?.name > 20
                              ? restaurant?.name?.slice(0, 20) + '...'
                              : restaurant?.name}{' '}
                          </h1>
                        )}

                        {/* <p className=' text-slate-700 text-xs md:text-sm font-poppinsreg'>{restaurant?.slogan?.length > 35 ? restaurant?.slogan?.slice(0, 35) + '...' : restaurant?.slogan}</p> */}
                        {/* slogan commented  */}
                        {/* <p className=' text-slate-700 text-xs md:text-sm font-poppinsreg'>{"Where Modern Meets Comfort".length > 35 ? "Where Modern Meets Comfort".slice(0, 35) + '...' : "Where Modern Meets Comfort"}</p> */}
                      </div>

                      {/* ratings  */}
                      <div className="flex items-center gap-1 px-2 pb-2">
                        {restaurant?.ratingAverage &&
                        restaurant?.ratingCount > 0 ? (
                          <>
                            {/* Star icons display */}
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => {
                                const filled = restaurant.ratingAverage >= star;
                                const halfFilled =
                                  restaurant.ratingAverage >= star - 0.5 &&
                                  restaurant.ratingAverage < star;

                                return filled ? (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="gold"
                                    className="w-4 h-4"
                                  >
                                    <path d="M12 .587l3.668 7.568L24 9.75l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.593 0 9.75l8.332-1.595z" />
                                  </svg>
                                ) : halfFilled ? (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4"
                                  >
                                    <defs>
                                      <linearGradient id={`half-${star}`}>
                                        <stop offset="50%" stopColor="gold" />
                                        <stop
                                          offset="50%"
                                          stopColor="lightgray"
                                        />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      fill={`url(#half-${star})`}
                                      d="M12 .587l3.668 7.568L24 9.75l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.593 0 9.75l8.332-1.595z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="lightgray"
                                    className="w-4 h-4"
                                  >
                                    <path d="M12 .587l3.668 7.568L24 9.75l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.593 0 9.75l8.332-1.595z" />
                                  </svg>
                                );
                              })}
                            </div>

                            {/* Rating Text */}
                            <span className="text-sm text-gray-600 ml-1">
                              {restaurant.ratingAverage.toFixed(1)} ratings
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">
                            No ratings
                          </span>
                        )}
                      </div>

                      {/* ratings  ends */}
                    </div>
                  ))}
              </div>

              {/* restaurants  */}
            </div>

            {noRestaurantsFoundForCity && (
              <h1 className=" font-poppinssemi text-xl md:text-3xl text-slate-800">
                {' '}
                No Restaurants Found In {params?.city} . Check Back Later{' '}
              </h1>
            )}
          </div>
        </div>

        {/* IF NO DATA FOUND IN THE RESTAURANT ARRAY  */}

        {/* IF NO DATA FOUND IN THE RESTAURANT ARRAY  */}

        {/* 
      <div className=" mt-16"> 

    
      <Footer />

      </div>
     */}
      </div>

      {/* show signup or login  */}

      {showSignupModel && (
        <div className=" fixed z-[1000]  top-0 w-full h-full">
          <Signin show={showSignupModel} isLogin={false} />
        </div>
      )}

      {showLoginModel && (
        <div className=" fixed z-[1000]  top-0 w-full h-full">
          <Signin show={showLoginModel} isLogin={true} />
        </div>
      )}
      {/* show signup or login  */}

      {/* LOGIN SUCCESS  */}

      {loginSucsess && (
        <div
          className="min-w-screen h-screen animated fadeIn faster   fixed  left-0 top-0 flex justify-center items-center inset-0 z-[200] outline-none focus:outline-none bg-no-repeat "
          // style={{
          //   backgroundImage:
          //     "url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80)",
          // }}
          id="modal-id"
        >
          <div className="absolute bg-black   opacity-60 inset-0 z-0" />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ delay: 0.15 }}
            className="lg:w-full  lg:max-w-md p-5 relative lg:mx-auto mx-6 my-auto rounded-xl shadow-lg  bg-white "
          >
            <div>
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-24 h-24 flex items-center text-green-500 mx-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <h2 className="text-xl  font-poppinsreg5 py-4 ">
                  Logged In Successfully!
                </h2>
                {/* <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete this product ? This process
                  cannot be undone
                </p> */}
              </div>
              {/*footer*/}
            </div>
          </motion.div>
        </div>
      )}

      {/* LOGIN SUCCESS  */}

      {/* SIGNUP SUCCESS  */}

      {signUpSuccess && (
        <div
          className="min-w-screen h-screen animated fadeIn faster   fixed  left-0 top-0 flex justify-center items-center inset-0 z-[200] outline-none focus:outline-none bg-no-repeat "
          // style={{
          //   backgroundImage:
          //     "url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80)",
          // }}
          id="modal-id"
        >
          <div className="absolute bg-black   opacity-60 inset-0 z-0" />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ delay: 0.15 }}
            className="lg:w-full  lg:max-w-md p-5 relative lg:mx-auto mx-6 my-auto rounded-xl shadow-lg  bg-white "
          >
            <div>
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-24 h-24 flex items-center text-green-500 mx-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <h2 className="text-xl  font-poppinsreg5 py-4 ">
                  User Registered Successfully!
                </h2>
                {/* <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete this product ? This process
                  cannot be undone
                </p> */}
              </div>
              {/*footer*/}
            </div>
          </motion.div>
        </div>
      )}
      {/* SIGNUP SUCCESS  */}
    </>
  );
}
