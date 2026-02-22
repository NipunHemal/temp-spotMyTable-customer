"use client";
import Cities from "@/components/comp/Cities";
import Footer from "@/components/comp/Footer";
import Header from "@/components/comp/Header";
import RestaurantListing from "@/components/comp/RestaurantListing";
import Signin from "@/components/comp/Signin";
import { Button } from "@/components/ui/button";
import { useTemp } from "@/context/tempContext";
import { restaurantsColombo } from "@/helpers/data";
import { motion } from "framer-motion";
import { LoadScript, LoadScriptNext } from "@react-google-maps/api";

import { useSearchParams } from "next/navigation";

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
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
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

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const cities = [
    { label: "Ampara", value: "Ampara" },
    { label: "Anuradhapura", value: "Anuradhapura" },
    { label: "Badulla", value: "Badulla" },
    { label: "Batticaloa", value: "Batticaloa" },
    { label: "Colombo", value: "Colombo" },
    { label: "Galle", value: "Galle" },
    { label: "Gampaha", value: "Gampaha" },
    { label: "Hambantota", value: "Hambantota" },
    { label: "Jaffna", value: "Jaffna" },
    { label: "Kalutara", value: "Kalutara" },
    { label: "Kandy", value: "Kandy" },
    { label: "Kegalle", value: "Kegalle" },
    { label: "Kilinochchi", value: "Kilinochchi" },
    { label: "Kurunegala", value: "Kurunegala" },
    { label: "Mannar", value: "Mannar" },
    { label: "Matale", value: "Matale" },
    { label: "Matara", value: "Matara" },
    { label: "Moneragala", value: "Moneragala" },
    { label: "Mullaitivu", value: "Mullaitivu" },
    { label: "Nuwara Eliya", value: "Nuwara Eliya" },
    { label: "Polonnaruwa", value: "Polonnaruwa" },
    { label: "Puttalam", value: "Puttalam" },
    { label: "Ratnapura", value: "Ratnapura" },
    { label: "Trincomalee", value: "Trincomalee" },
    { label: "Vavuniya", value: "Vavuniya" },
    // Add more cities as needed
  ];

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenAbout,
    onOpen: onOpenAbout,
    onClose: onCloseAbout,
    onOpenChange: OnOpenChangeAbout,
  } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
    onOpenChange: OnOpenChangeCancel,
  } = useDisclosure();
  const {
    isOpen: isOpenterms,
    onOpen: onOpenterms,
    onClose: onCloseterms,
    onOpenChange: OnOpenChangeterms,
  } = useDisclosure();
  const {
    isOpen: isOpenAboutUsCRT,
    onOpen: onOpenAboutUsCRT,
    onClose: onCloseAboutUsCRT,
    onOpenChange: OnOpenChangeAboutUsCRT,
  } = useDisclosure();

  const {
    isSignupSuccess,
    showSignupModel,
    setShowSignupModel,
    setisSignupSuccess,
    showLoginModel,
    setIsShowLoginModel,
    loginSucsess,
    signUpSuccess,
    aboutUs,
    setAboutUs,
    cancellation_policy,
    setCancellation_policy,
    terms,
    setterms,
    setAboutUsCRT,
    aboutUsCRT,
  } = useTemp();

  // get restuarant by city
  const secondCity = "Kandy";

  const firstCity = "Colombo";

  const [colomboRestaurants, setcolomboRestaurants] = useState<any>();

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getRestaurantsInColombo = async () => {
    try {
      const response = await fetch(
        `${backend_url}/merchant/get-merchant-by-city/${firstCity}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ city : firstCity})
        }
      );
      const data = await response.json();
      console.log("data to be tracked", data); //

      if (data.status === "success") {
        setcolomboRestaurants(data?.data?.merchants || []);
      } else {
        console.log(data?.message);
        setcolomboRestaurants([]);
      }
    } catch (error: any) {
      console.log(error.message);
      setcolomboRestaurants([]);
    }
  };

  useEffect(() => {
    getRestaurantsInColombo();
  }, []);

  // get restuarant by city

  // hold city value in filter

  const [selectedCity, setselectedCity] = useState("Colombo");

  // hold city value in filter

  const router = useRouter();
  // searchFilter search

  const [btnloadingsearch, setbtnloadingsearch] = useState(false);

  const searchRestaurantForCity = () => {
    setbtnloadingsearch(true);
    setTimeout(() => {
      router.push(`/restaurants/${selectedCity}`);
      setbtnloadingsearch(false);
    }, 1500);
  };
  // searchFilter search

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

    document.addEventListener("click", handleClickOutside);
    // window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [openModal]);

  const { data: session, status } = useSession();

  // search bar type
  const [restaurantsSearch, setrestaurantsSearch] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        // Fetch results only if query length is greater than 2
        try {
          const response = await fetch(
            `${backend_url}/merchant/search?name=${query}`
          );
          const data = await response.json();
          // console.log(data);lxlx

          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  // search bar type

  // /cities-with-restaurant-count

  // useEffect(() => {

  //   const getRestaurantsCountByCities = async() => {

  //     try {

  //       const response = await fetch(`${backend_url}/merchant/cities-with-restaurant-count`);

  //       const data = await response.json();

  //       console.log(data);

  //     }

  //    catch (error) {
  //       console.log(error);

  //     }

  //   }

  //   getRestaurantsCountByCities()

  // }, [])
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verified, setverified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    if (!invalidEmail) return;

    setIsResending(true);
    try {
      const response = await fetch(
        `${backend_url}/api/auth/resend-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: invalidEmail }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setVerificationError(false);
        setInvalidEmail("");
        // Show a success message or notification
        alert("Verification email sent successfully! Please check your inbox.");
      } else {
        alert("Failed to resend email. Please try again.");
      }
    } catch (error) {
      console.log("Error resending verification email:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${backend_url}/api/auth/verify-email?token=${token}`
        );
        const data = await response.json();

        // if (data.msg === 'Invalid token') {

        // }

        if (response.ok) {
          // Email verified successfully
          setverified(true);
          setVerificationError(false);
          setTimeout(() => {
            setverified(false);
            router.push("/");
          }, 3000);
          return;
        } else {
          // Token is invalid or expired
          setVerificationError(true);
          setInvalidEmail(data.email || "");
          return;
        }
      } catch (error) {
        console.log("server error . please try again later");
        setVerificationError(true);
      }
    };

    verifyEmail();
  }, [token, router]);

  const loadModalForTerms = () => {
    console.log("loading");
  };

  const [showModalForTerms, setshowModalForTerms] = useState<Boolean>(false);

  const updateModalForTerms = () => {
    setAboutUs(!aboutUs);
  };

  useEffect(() => {
    if (!aboutUs) {
      onCloseAbout();
      // console.log(aboutUs);
    } else {
      onOpenAbout();
      // console.log(aboutUs);
    }
  }, [aboutUs]);

  useEffect(() => {
    if (!cancellation_policy) {
      onCloseCancel();
      // console.log(aboutUs);
    } else {
      onOpenCancel();
      // console.log(aboutUs);
    }
  }, [cancellation_policy]);

  useEffect(() => {
    if (!terms) {
      onCloseterms();
      // console.log(aboutUs);
    } else {
      onOpenterms();
      // console.log(aboutUs);
    }
  }, [terms]);

  useEffect(() => {
    if (!aboutUsCRT) {
      onCloseAboutUsCRT();
      // console.log(aboutUs);
    } else {
      onOpenAboutUsCRT();
      // console.log(aboutUs);
    }
  }, [aboutUsCRT]);

  // top rated
  const [topRestaurants, setTopRestaurants] = useState([]);

  // useEffect(() => {
  //   const fetchTopRated = async () => {
  //     try {
  //       const response = await fetch(`${backend_url}/merchant/top-rated`);
  //       const json = await response.json();

  //       if (json.success) {
  //         setTopRestaurants(json.data);
  //       }
  //     } catch (err) {
  //       console.log('Error fetching top rated restaurants:', err);
  //     }
  //   };

  //   fetchTopRated();
  // }, []);
  // top rated  ends

  // get location

  // get location  ends

  // NEW METHOD
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // NEW METHOD  ENDS

  const [locationReady, setLocationReady] = useState(false);
  const [mapsReady, setMapsReady] = useState(false);

  useEffect(() => {
    if (!locationReady) return; // wait until we have district/city

    const fetchTopRated = async () => {
      try {
        const response = await fetch(
          `${backend_url}/merchant/top-rated?district=${district}&city=${city}`
        );
        const json = await response.json();

        if (json.success) {
          setTopRestaurants(json.data);
          console.log("here comes the data", json.data);
        }
      } catch (err) {
        console.log("Error fetching top rated restaurants:", err);
      }
    };

    fetchTopRated();
  }, [locationReady]);

  useEffect(() => {
    if (!mapsReady) return;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Now google is guaranteed to exist
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (results: any, status) => {
        if (status === "OK") {
          const components = results[0].address_components;

          const districtComp = components.find((c: any) =>
            c.types.includes("administrative_area_level_2")
          );

          const cityComp = components.find((c: any) =>
            c.types.includes("locality")
          );

          setDistrict(districtComp?.long_name || "");
          setCity(cityComp?.long_name || "");
          setLocationReady(true);
        }
      });
    });
  }, [mapsReady]);

  return (
    <>
      <div className=" overflow-hidden">
        <div className=" w-full flex justify-center">
          <div className=" max-w-7xl w-full">
            <Header />
          </div>
        </div>

        <div className=" border-t w-full">
          <div className="  w-full  border-b lg:hidden p-2 flex justify-between items-center">
            <Image
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className=" w-16 h-fit object-cover"
            />

            <div className="flex  items-center gap-5">
              {status === "authenticated" && (
                <div className=" flex flex-col ">
                  <h1 className=" text-sm font-poppinssemi">
                    {" "}
                    {`Hi ${session?.user?.name}`}{" "}
                  </h1>
                  <h1 className=" font-poppinsreg5 text-sm text-slate-600">{`${
                    new Date().getHours() < 12
                      ? "Good Morning!"
                      : new Date().getHours() < 18
                      ? "Good Afternoon!"
                      : "Good Evening!"
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
              openModal ? "right-0 w-[70%]" : " -right-full w-0"
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

                {status === "authenticated" && (
                  <div className=" mt-3 flex flex-col gap-3">
                    <h1
                      onClick={() => router.push("/settings?section=Profile")}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {" "}
                      Profile{" "}
                    </h1>
                    <h1
                      onClick={() =>
                        router.push("/settings?section=My-Reservations")
                      }
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {" "}
                      My Reservations{" "}
                    </h1>

                    <h1
                      onClick={() => {
                        signOut();
                      }}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {" "}
                      Log Out{" "}
                    </h1>
                  </div>
                )}

                {/* rrrrrrrrrrrrrrrrrrrrr  */}

                {status === "unauthenticated" && (
                  <div className="mt-3 flex flex-col gap-3">
                    <h1
                      onClick={() => {
                        setIsShowLoginModel(true);
                        setopenModal(false);
                      }}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {" "}
                      Login{" "}
                    </h1>

                    <h1
                      onClick={() => {
                        setShowSignupModel(true);
                        setopenModal(false);
                      }}
                      className=" text-center font-poppinsreg py-2 rounded-md border bg-[#2B2F39] text-white"
                    >
                      {" "}
                      Sign Up{" "}
                    </h1>
                  </div>
                )}
              </div>

              {/* dropdowns  */}
            </div>
          </div>
          {/* the hamburger sheet  */}

          <div className="flex w-full mt-3 justify-center gap-2 p-2  items-center ">
            {/* endContent={
          <div className=" bg-[#FF385C] w-8 h-8 p-1 flex justify-center rounded-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="w-fit  text-white   h-fit">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </div>
         } */}

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
                <div className=" absolute top-12 md:top-14     w-full flex justify-center  ">
                  <div
                    className={` ${
                      results.length > 0 && "rounded-tl-lg rounded-tr-lg"
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
                              {" "}
                              {r.restaurantName}{" "}
                            </h1>

                            <h1 className=" font-poppinsreg text-sm text-slate-500">
                              {" "}
                              {r.restaurantAddress}{" "}
                            </h1>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1 className=" bg-white  font-poppinsreg text-sm p-3">
                        {" "}
                        No Results Found...{" "}
                      </h1>
                    )}
                  </div>
                </div>
              )}
            </div>

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
                        {" "}
                        Search By City{" "}
                      </h1>

                      <div className="flex w-full mt-3 flex-wrap md:flex-nowrap gap-4">
                        <Select
                          defaultSelectedKeys={["Colombo"]}
                          disallowEmptySelection
                          label="Select a city"
                          className=" font-poppinsreg"
                          value={selectedCity}
                          onChange={(e) => setselectedCity(e.target.value)}
                        >
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.value}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* <div>  */}

                    {/* <h1 className="   text-slate-700  font-poppinsreg5">  Search Nearby Restaurants </h1> */}

                    {/* <div className="flex w-full mt-3 flex-wrap md:flex-nowrap gap-4">
<BTN className=" w-full py-6 bg-transparent  border-black/15 border-[1px]" radius="full">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6    -rotate-45 h-6">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

      <h1 className="  font-poppinsreg">  Use current Location </h1>
      </BTN>
</div> */}

                    {/* </div> */}
                  </ModalBody>
                  <ModalFooter>
                    {/* qqqqqqqqqqqqqqq */}
                    <BTN
                      isLoading={btnloadingsearch}
                      onPress={searchRestaurantForCity}
                      isDisabled={!selectedCity}
                      className=" w-full  text-white bg-[#FF385C] transition-colors duration-300 ease-in    font-poppinsreg5 text-lg  py-6"
                      onClick={onClose}
                    >
                      Search
                    </BTN>
                  </ModalFooter>
                </>
              </ModalContent>
            </Modal>
            {/* modal  */}
          </div>
        </div>

        {/* TOP RATED RESTAURANTS  */}
        <LoadScriptNext
          onLoad={() => setMapsReady(true)}
          libraries={["geocoding"]}
          googleMapsApiKey="AIzaSyCB_jT6LWXfo47cjjJoZqjHJjZSONMHhW4"
          loadingElement={<></>}
        >
          <div className=" w-full  lg:mt-10 mt-5 flex justify-center p-4">
            <div className=" max-w-7xl w-full">
              {/* ffffffffffffffffffffff */}
              <RestaurantListing
                // title="Top Rated Restaurants"
                title="Top Rated Restaurants Near You"
                restaurants={topRestaurants}
                showViewAllRestaurant={false}
              />
            </div>
          </div>
        </LoadScriptNext>

        {/* TOP RATED RESTAURANTS  ends */}

        {/* <div className=" w-full  lg:mt-10 mt-5 flex justify-center p-4">
          <div className=" max-w-7xl w-full">
           
            <RestaurantListing
              city="Colombo"
              title="Explore Restaurants in Colombo"
              restaurants={colomboRestaurants}
            />
          </div>
        </div> */}

        {/* <div className=" w-full  mt-10 flex justify-center p-4">
      <div className=" max-w-7xl w-full"> 

  

      <RestaurantListing city="Kandy" title="Explore Restaurants in Kandy" restaurants={restaurantsColombo} /> 

      </div>

    </div> */}

        <div className=" w-full  mt-10  flex justify-center p-4">
          <div className=" max-w-7xl w-full">
            <Cities />
          </div>
        </div>

        {/* /// */}

        <div className="  w-full flex justify-center md:p-4 mt-20 lg:mt-28 ">
          <div className=" w-full max-w-7xl px-5 flex lg:flex-row flex-col  lg:gap-0 sm:gap-4 md:gap-6 gap-4 items-center ">
            <div className=" lg:order-1 order-2 flex flex-col gap-5">
              <h1
                className={`  font-poppinssemi   lg:text-left text-center  text-3xl sm:text-5xl md:text-5xl lg:text-6xl `}
              >
                {" "}
                Expand Your Reach,
                <span className=" text-[#FF385C]"> Join Us Today! </span>
              </h1>{" "}
              <p
                className={`  font-poppinsreg5 lg:px-1 lg:text-left text-center  text-sm`}
              >
                {" "}
                Bring your flavors to the forefront. Partner with us and reach
                food enthusiasts across cities. Elevate your presence and let
                your culinary artistry shine.
              </p>
              {/* the button to fetch location   */}
              {/* <LoadScript googleMapsApiKey="AIzaSyCB_jT6LWXfo47cjjJoZqjHJjZSONMHhW4">
                <div className="p-4 max-w-2xl mx-auto">
                  <button
                    onClick={handleLocation}
                    className="px-4 py-2 bg-black text-white rounded-md"
                  >
                    Use My Location
                  </button>

                  {latitude && (
                    <div className="mt-4 space-y-1">
                      <p>Latitude: {latitude}</p>
                      <p>Longitude: {longitude}</p>
                      <p>District: {district}</p>
                      <p>City: {city}</p>
                      <p>Address: {address}</p>
                    </div>
                  )}
                </div>
              </LoadScript> */}
              {/* the button to fetch  location ends */}
              <div className="  flex lg:justify-normal justify-center  w-full ">
                <Button
                  // onClick={() => window.location.href = "https://spotmytable-merchant.vercel.app/"}
                  onClick={() =>
                    (window.location.href = "https://merchant.spotmytable.com")
                  }
                  className="  md:py-0 py-5 w-full sm:w-4/12"
                >
                  {" "}
                  Get Started{" "}
                </Button>
              </div>
            </div>
            <Image
              alt="merchant"
              src={"/merchant.jpg"}
              width={1000}
              height={1000}
              className=" lg:w-6/12 rounded-2xl lg:order-2 order-1  w-full h-full  object-cover"
            />

            {/* 
<div className="  md:hidden flex justify-center w-full "> 
            <Button className=" w-full sm:w-6/12"> Get Started </Button>
          </div> */}
          </div>
        </div>

        <div className=" mt-16">
          <Footer />
        </div>
      </div>

      {/* show signup or login  */}

      {showSignupModel && (
        <div className=" fixed z-[10 top-0 w-full h-full">
          <Signin show={showSignupModel} isLogin={false} />
        </div>
      )}

      {showLoginModel && (
        <div className=" fixed z-10  top-0 w-full h-full">
          <Signin show={showLoginModel} isLogin={true} />
        </div>
      )}
      {/* show signup or login  */}

      {/* VERFICATION SUCCESS  */}

      {verified && (
        <div
          className="min-w-screen h-screen animated fadeIn faster   fixed  left-0 top-0 flex justify-center items-center inset-0 z-[200] outline-none focus:outline-none bg-no-repeat "
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
                  Email Verified Successfully!
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* VERFICATION SUCCESS  */}

      {/* VERIFICATION ERROR DIALOG */}
      {verificationError && (
        <div
          className="min-w-screen h-screen animated fadeIn faster   fixed  left-0 top-0 flex justify-center items-center inset-0 z-[200] outline-none focus:outline-none bg-no-repeat "
          id="modal-error-id"
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
                  className="w-24 h-24 flex items-center text-red-500 mx-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                    clipRule="evenodd"
                  />
                </svg>

                <h2 className="text-xl font-poppinsreg5 py-4">
                  Verification Link Invalid or Expired
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Your verification link has expired or is invalid. Please
                  request a new one.
                </p>

                <div className="flex flex-col gap-3">
                  {invalidEmail && (
                    <BTN
                      isLoading={isResending}
                      isDisabled={isResending}
                      className="w-full text-white bg-[#FF385C] hover:bg-[#E31C5D] transition-colors duration-300 ease-in font-poppinsreg5 py-6"
                      onClick={handleResendEmail}
                    >
                      {isResending ? "Sending..." : "Resend Verification Email"}
                    </BTN>
                  )}
                  <Button
                    onClick={() => {
                      setVerificationError(false);
                      setInvalidEmail("");
                      router.push("/");
                    }}
                    className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 ease-in font-poppinsreg5 py-6"
                  >
                    Go to Home
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* VERIFICATION ERROR DIALOG */}

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

      {/* modal  */}

      {/* //       <div  className=" fixed top-0 w-full  md:p-0 p-3 h-screen bg-opacity-40 flex justify-center items-center bg-black">

//       <div className="  w-full max-w-xl overflow-y-auto  h-[40%]  p-2 bg-white rounded-md"> 

//         <div className=" flex flex-col items-end w-full  justify-end">


//           <div  onClick={() => updateModalForTerms()} className=" rounded-full cursor-pointer hover:bg-[#e73052] duration-200 ease-out p-[2px] bg-[#FF385C]"> 

        
        
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="size-7 text-white">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
// </svg>

// </div>



// <div className=" w-full font-poppinssemi text-2xl">

// <h1>  About Us </h1>  

// </div>




//         </div>

//       </div>

//      </div> */}

      <Modal
        size="2xl"
        closeButton={
          <div>
            <svg
              onClick={() => {
                setAboutUs(false);
              }}
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
        isDismissable={false}
        isOpen={isOpenAbout}
        onOpenChange={OnOpenChangeAbout}
      >
        <ModalContent className=" max-h-[80%]">
          {(onCloseAbout) => (
            <>
              <ModalHeader className="flex flex-col font-poppinsreg5 text-xl gap-1">
                Privacy Policy
              </ModalHeader>
              <ModalBody className="   pb-10 overflow-y-auto">
                <p className=" ">
                  {`
                At Spot My Table, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website and services.
                `}
                </p>
                <div>
                  <h1 className="  font-semibold text-lg">
                    {" "}
                    1. Information We Collect{" "}
                  </h1>

                  <div className=" mt-4 flex flex-col gap-3">
                    <p className="">
                      <span className=" font-medium ">
                        {" "}
                        Personal Identification Information:{" "}
                      </span>
                      {`
Name, email address, phone number, and payment information when you make a reservation.
`}
                    </p>

                    <p className="">
                      <span className=" font-medium ">
                        {" "}
                        Non-personal Identification Information:{" "}
                      </span>
                      {`
Browser type, IP address, device type, and other technical information when you interact with our site.
`}
                    </p>

                    <p className="">
                      <span className=" font-medium ">
                        {" "}
                        Reservation Details:{" "}
                      </span>
                      {`
Date, time, and location of reservations, number of guests, and any special requests.
`}
                    </p>
                  </div>
                </div>

                {/* how we use your information  */}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    2. How We Use Your Information{" "}
                  </h1>

                  <p className=" mt-2 font-semibold">
                    {" "}
                    {`We may use the information we collect for the following purposes:`}{" "}
                  </p>

                  <div className="mt-2 flex gap-[2px] flex-col">
                    <ul className="list-disc pl-5">
                      <li className="font-normal">
                        To facilitate table reservations and manage your
                        account.
                      </li>
                      <li className="font-normal">
                        To communicate with you about your reservations,
                        including sending confirmation emails and notifications.
                      </li>
                      <li className="font-normal">
                        To improve our website and services based on your
                        feedback and interaction.
                      </li>
                      <li className="font-normal">
                        To process payments securely.
                      </li>
                      <li className="font-normal">
                        To comply with legal obligations and protect the rights,
                        property, or safety of Spot My Table, our users, or
                        others.
                      </li>
                    </ul>
                  </div>
                </div>
                {/* how we use your information  */}

                {/* How We Protect Your Information*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    3. How We Protect Your Information{" "}
                  </h1>

                  <p className=" ">
                    {`
               We implement appropriate security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure server infrastructure.
                `}
                  </p>
                </div>
                {/* How We Protect Your Information  */}

                {/* Sharing Your Information*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    4. Sharing Your Information{" "}
                  </h1>

                  <p className=" ">
                    {`
              We do not sell, trade, or rent your personal information to third parties. However, we may share information with:
                `}
                  </p>

                  <div className="mt-2 flex gap-[2px] flex-col">
                    <ul className="list-disc flex flex-col gap-2 pl-5">
                      <li className=" font-medium">
                        Service Providers{" "}
                        <span className=" font-normal">
                          {" "}
                          {`Trusted third-party service providers who assist us in operating our website, conducting our business, or providing services to you, as long as those parties agree to keep this information confidential.
`}{" "}
                        </span>
                      </li>
                      <li className=" font-medium">
                        Legal Requirements{" "}
                        <span className=" font-normal">
                          {" "}
                          {`If required by law or in response to legal processes, such as a subpoena or court order.`}{" "}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Sharing Your Information  */}

                {/*Cookies and Tracking Technologies*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    5. Cookies and Tracking Technologies{" "}
                  </h1>

                  <p className=" ">
                    {`
              Our site may use cookies and similar tracking technologies to enhance your experience. You can choose to set your browser to refuse cookies or alert you when cookies are being sent. However, please note that some parts of our site may not function properly without cookies.
                `}
                  </p>
                </div>
                {/* Cookies and Tracking Technologies */}

                {/*Your Rights*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    6. Your Rights
                  </h1>

                  <p className=" ">
                    {`
             You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at [Your Contact Email]. We will respond to your request within a reasonable timeframe.
                `}
                  </p>
                </div>
                {/*Your Rights */}

                {/*Children's Privacy*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    7. Children's Privacy
                  </h1>

                  <p className=" ">
                    {`
             Spot My Table does not knowingly collect personal information from children under the age of 13. If you believe we may have collected information from a child under 13, please contact us immediately so we can take appropriate action.
                `}
                  </p>
                </div>
                {/*Children's Privacy */}

                {/*Changes to This Privacy Policy*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    8. Changes to This Privacy Policy
                  </h1>

                  <p className=" ">
                    {`
           We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of the site after any changes are made will constitute your acknowledgment and acceptance of the changes.
                `}
                  </p>
                </div>
                {/*Changes to This Privacy Policy */}

                {/*Contact Us*/}

                <div>
                  <h1 className="  font-semibold text-lg mt-2">
                    {" "}
                    9. Contact Us
                  </h1>

                  <p className=" ">
                    {`
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                `}
                  </p>

                  <div className="  mt-1 ">
                    <h1 className=" font-medium">
                      {" "}
                      Email:hello@spotmytable.com{" "}
                    </h1>
                    <h1 className=" font-medium">
                      {" "}
                      Address:94/3, cemetery road, Negombo
                    </h1>
                    <h1 className=" font-medium"> Phone:+94707774861</h1>
                  </div>
                </div>
                {/*Contact Us */}
              </ModalBody>
              {/* <ModalFooter>
                <Button  onClick={() => { onCloseAbout ; setAboutUs(false) }}>
                  Close
                </Button>
          
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>

      {/* modal  */}

      {/* CANCELLATION POPUP  */}

      <Modal
        size="2xl"
        closeButton={
          <div>
            <svg
              onClick={() => {
                setCancellation_policy(false);
              }}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        }
        isDismissable={false}
        isOpen={isOpenCancel}
        onOpenChange={OnOpenChangeCancel}
      >
        <ModalContent className="max-h-[80%]">
          {(onCloseCancel) => (
            <>
              <ModalHeader className="flex flex-col font-poppinsreg5 text-xl gap-1">
                Refund and Cancellation Policy
              </ModalHeader>
              <ModalBody className="pb-10 overflow-y-auto">
                <p>
                  {`
              At Spot My Table, we value your business and aim to provide a seamless dining reservation experience. We understand that plans can change, and you may need to cancel or modify your reservations. This Refund Policy outlines the terms and conditions under which refunds will be issued for reservations made through our website.
            `}
                </p>

                <div>
                  <h1 className="font-semibold text-lg mt-2">
                    1. Customer Cancellation and Refund Eligibility
                  </h1>
                  <div className="mt-4 flex flex-col gap-3">
                    <p>
                      <span className="font-medium">Full Refund:</span>{" "}
                      {`A full refund will be issued if the reservation is cancelled at least 24 hours before the scheduled reservation time.`}
                    </p>
                    <p>
                      <span className="font-medium">Partial Refund:</span>{" "}
                      {`If the reservation is cancelled within 4 hours before the reservation time, a partial refund of 50% of the reservation fee will be provided.`}
                    </p>
                    <p>
                      <span className="font-medium">No Refund:</span>{" "}
                      {`No refund will be given if the reservation is cancelled less than 4 hours before the scheduled reservation time or if the customer fails to show up for the reservation.`}
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="font-semibold text-lg mt-2">
                    2. How to Cancel a Reservation
                  </h1>
                  <p>
                    Email: Send a cancellation request to our customer support
                    team including your reservation details (name, reservation
                    date, time, and confirmation number).
                  </p>
                  <p>
                    Phone: Contact our customer support team to cancel your
                    reservation.
                  </p>
                </div>

                <div>
                  <h1 className="font-semibold text-lg mt-2">
                    3. Restaurant Cancellation Policy
                  </h1>
                  <div className="mt-4 flex flex-col gap-3">
                    <p>
                      <span className="font-medium">
                        Restaurant-Initiated Cancellations:
                      </span>{" "}
                      {`If a restaurant needs to cancel a reservation due to unforeseen circumstances, Spot My Table will issue a full refund to the customer, and no fees will be charged to the restaurant.`}
                    </p>
                    <p>
                      <span className="font-medium">
                        Custom Reservation Cancellation:
                      </span>{" "}
                      {`After confirming and paying for the custom reservation, the restaurant cannot cancel it as normal reservations.`}
                    </p>
                    <p>
                      <span className="font-medium">
                        Repeated Cancellations:
                      </span>{" "}
                      {`Restaurants that repeatedly cancel reservations without valid reasons may face penalties, including suspension or removal from the Spot My Table platform.`}
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="font-semibold text-lg mt-2">
                    4. Refund Process
                  </h1>
                  <p>
                    Refunds will be processed to the original payment method.
                    Please allow 5 - 7 business days for the refund to reflect
                    in your account.
                  </p>
                  <p>
                    You will receive an email confirmation once your refund has
                    been processed.
                  </p>
                </div>

                <div>
                  <h1 className="font-semibold text-lg mt-2">
                    5. Complaint Process
                  </h1>
                  <p>
                    If a customer is not satisfied with the reason for
                    cancellation, they can file a complaint.
                  </p>
                </div>

                <div>
                  <h1 className="font-semibold text-lg mt-2">
                    6. Exceptional Circumstances
                  </h1>
                  <p>
                    In cases of emergencies, such as extreme weather conditions
                    or natural disasters, please contact our support team.
                    Refunds will be reviewed on a case-by-case basis.
                  </p>
                </div>

                <div>
                  <h1 className="font-semibold text-lg mt-2">7. Contact Us</h1>
                  <div className="  mt-1 ">
                    <h1 className=" font-medium">
                      {" "}
                      Email:hello@spotmytable.com{" "}
                    </h1>
                    <h1 className=" font-medium">
                      {" "}
                      Address:94/3, cemetery road, Negombo
                    </h1>
                    <h1 className=" font-medium"> Phone:+94707774861</h1>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* CANCELLATION POPUP  */}

      {/* TERMS AND CONDITION  */}

      <Modal
        size="2xl"
        closeButton={
          <div>
            <svg
              onClick={() => setterms(false)}
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
        isDismissable={false}
        isOpen={isOpenterms}
        onOpenChange={OnOpenChangeterms}
      >
        <ModalContent className="max-h-[80%]">
          {(onCloseterms) => (
            <>
              <ModalHeader className="flex flex-col font-poppinsreg5 text-xl gap-1">
                Terms and Conditions
              </ModalHeader>
              <ModalBody className="pb-10 overflow-y-auto">
                {/* Introduction */}
                <p className="">
                  Welcome to Spot My Table. These Terms and Conditions outline
                  the rules and regulations for using our website and services.
                  By accessing or using our website, you agree to comply with
                  these terms. If you do not agree with any part of these terms,
                  you must not use our website.
                </p>

                {/* Definitions */}
                <div>
                  <h1 className="font-semibold text-lg mt-4">1. Definitions</h1>
                  <ul className="list-disc pl-5">
                    <li>
                      <span className="font-medium">{`"Spot My Table"`}:</span>{" "}
                      Refers to our online platform, accessible at{" "}
                      <a
                        href="https://spotmytable.com"
                        className="text-blue-500"
                      >
                        https://spotmytable.com
                      </a>
                      , which facilitates table reservations for restaurants.
                    </li>
                    <li>
                      <span className="font-medium">{`"User"`}:</span> Refers to
                      any individual or entity accessing or using Spot My Table,
                      including both customers and restaurants.
                    </li>
                    <li>
                      <span className="font-medium">{`"Customer"`}:</span>{" "}
                      Refers to individuals using Spot My Table to make
                      reservations at restaurants.
                    </li>
                    <li>
                      <span className="font-medium">{`"Restaurant"`}:</span>{" "}
                      Refers to restaurant owners or managers using Spot My
                      Table to list their establishments and accept
                      reservations.
                    </li>
                  </ul>
                </div>

                {/* Acceptance of Terms */}
                <div>
                  <h1 className="font-semibold text-lg mt-4">
                    2. Acceptance of Terms
                  </h1>
                  <p className="mt-2">
                    By accessing or using Spot My Table, you confirm that you
                    are at least 18 years old and legally capable of entering
                    into a binding contract. Your use of Spot My Table
                    constitutes your acceptance of these Terms and Conditions,
                    which may be updated periodically.
                  </p>
                </div>

                {/* User Accounts */}
                <div>
                  <h1 className="font-semibold text-lg mt-4">
                    3. User Accounts
                  </h1>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <span className="font-medium">Registration:</span> To use
                      certain features of Spot My Table, you may be required to
                      create a user account. You agree to provide accurate,
                      current, and complete information during registration and
                      update it as necessary.
                    </li>
                    <li>
                      <span className="font-medium">Account Security:</span> You
                      are responsible for maintaining the confidentiality of
                      your account login information and for all activities
                      under your account. Notify us immediately of any
                      unauthorised use or breach of security.
                    </li>
                    <li>
                      <span className="font-medium">Account Termination:</span>{" "}
                      Spot My Table reserves the right to suspend or terminate
                      user accounts at our discretion, without notice, for any
                      violation of these Terms and Conditions or for any other
                      reason.
                    </li>
                  </ul>
                </div>

                {/* Reservations and Payments */}
                <div>
                  <h1 className="font-semibold text-lg mt-4">
                    4. Reservations and Payments
                  </h1>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <span className="font-medium">Reservation Process:</span>{" "}
                      {`Customers can make table reservations at listed restaurants using Spot My Table. Confirmation of reservations will be sent via email or SMS. It is the customer’s responsibility to provide accurate contact information.`}
                    </li>
                    <li>
                      <span className="font-medium">Payment:</span>{" "}
                      {`Payment for reservations may be required at the time of booking, depending on the restaurant's policy. Spot My Table uses secure payment gateways to process payments.`}
                    </li>
                    <li>
                      <span className="font-medium">Cancellation Policy:</span>{" "}
                      Each restaurant may have its own cancellation and refund
                      policy, which will be displayed during the booking
                      process. Customers agree to abide by the specific policies
                      of the restaurant they are booking with.
                    </li>
                  </ul>
                </div>

                {/* More sections like No-show Policy, Dispute Resolution, etc. can be added similarly. */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* TERMS AND CONDITION  */}

      {/* ABOUT US CORRECT popup*/}

      <Modal
        size="2xl"
        closeButton={
          <div>
            <svg
              onClick={() => setAboutUsCRT(false)}
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
        isDismissable={false}
        isOpen={isOpenAboutUsCRT}
        onOpenChange={OnOpenChangeAboutUsCRT}
      >
        <ModalContent className="max-h-[80%]">
          {(onCloseAboutUsCRT) => (
            <>
              <ModalHeader className="flex flex-col font-poppinsreg5 text-xl gap-1">
                About SpotMyTable
              </ModalHeader>
              <ModalBody className="pb-10 overflow-y-auto">
                {/* About SpotMyTable */}
                <h1 className="font-semibold text-lg">
                  Connecting People with Seamless Reservations
                </h1>
                <p className="mt-2">
                  At SpotMyTable, we believe that reserving a table should be as
                  enjoyable as the experience itself. Our platform was created
                  to connect people with restaurants, event venues, and other
                  services in the easiest way possible. We’re on a mission to
                  make booking a table stress-free, efficient, and reliable.
                </p>

                {/* Our Journey */}
                <div className="mt-4">
                  <h1 className="font-semibold text-lg">Our Journey</h1>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <span className="font-medium">2021:</span> SpotMyTable was
                      founded with a vision to revolutionize the reservation
                      process for restaurants and event spaces.
                    </li>
                    <li>
                      <span className="font-medium">2022:</span> We hit our
                      first milestone, with over 1000 successful reservations
                      made through our platform.
                    </li>
                    <li>
                      <span className="font-medium">2023:</span> SpotMyTable
                      expanded to serve 10 major cities, helping thousands of
                      customers connect with top venues.
                    </li>
                    <li>
                      <span className="font-medium">2024:</span> We formed
                      partnerships with renowned venues, expanding our network
                      and making it easier for users to find the perfect spot
                      for any occasion.
                    </li>
                  </ul>
                </div>

                {/* Mission, Vision, and Values */}
                <div className="mt-4">
                  <h1 className="font-semibold text-lg">{`Our Mission, Vision, and Values`}</h1>
                  <p className="mt-2">
                    <span className="font-medium">{`Mission:`}</span>{" "}
                    {`To provide a seamless and efficient platform for customers to book reservations at their favorite venues, while offering businesses an easy way to manage bookings.`}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">{`Vision:`}</span>{" "}
                    {`To become the leading platform for table reservations worldwide, enhancing the dining and event experience for all.`}
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <span className="font-medium">{`Customer Focus:`}</span>{" "}
                      We prioritize creating the best experience for our
                      customers.
                    </li>
                    <li>
                      <span className="font-medium">{`Innovation:`}</span> We
                      are always improving and adding features that make booking
                      easier and faster.
                    </li>
                    <li>
                      <span className="font-medium">{`Reliability:`}</span>{" "}
                      Customers and venues alike can count on SpotMyTable to
                      handle reservations smoothly.
                    </li>
                    <li>
                      <span className="font-medium">{`Simplicity:`}</span> We
                      make booking a table as easy as possible for everyone
                      involved.
                    </li>
                  </ul>
                </div>

                {/* Meet Our Team */}
                <div className="mt-4">
                  <h1 className="font-semibold text-lg">Meet Our Team</h1>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <span className="font-medium">{`Fredrick Peter (Founder & CEO):`}</span>{" "}
                      {`The visionary behind SpotMyTable, leading the charge to innovate the way people make reservations.`}
                    </li>
                    <li>
                      <span className="font-medium">{`Ronasha Fernando (Co-Founder):`}</span>{" "}
                      {`A strategic leader working alongside the CEO to shape the company's direction, with a focus on building strong partnerships and scaling the business.`}
                    </li>
                    <li>
                      <span className="font-medium">{`Jawidh Muhammadh (Lead Engineer):`}</span>{" "}
                      {`Spearheading the technical development of the platform, ensuring it delivers a fast, secure, and user-friendly experience.`}
                    </li>
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
                  <h1 className="font-semibold text-lg">Our Reach</h1>
                  <p className="mt-2">
                    We currently operate in over 10 cities, connecting thousands
                    of customers with top restaurants and event venues.
                  </p>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ABOUT US CORRECT popup ends */}
    </>
  );
}
