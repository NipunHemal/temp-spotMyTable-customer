'use client';

import Header from '@/components/comp/Header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  DatePicker,
  DateValue,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { StarIcon } from '@heroicons/react/24/solid';
import {
  EyeIcon,
  EyeSlashIcon,
  StarIcon as StarOutline,
} from '@heroicons/react/24/outline';

import { motion } from 'framer-motion';

const Page = () => {
  const searchParams = useSearchParams();

  const section = searchParams.get('section');

  type Key = string | number;
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());

  useEffect(() => {
    if (section === 'Profile') {
      setclickedTab('Profile');
      setSelectedKeys(new Set(['profile']));
    } else if (section === 'My-Reservations') {
      setclickedTab('My-Reservations');
      setSelectedKeys(new Set(['my-reservations']));
    }
  }, [section]);

  const selectedKeysArray = Array.from(selectedKeys);

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [selectedDate, setSelectedDate] = useState<DateValue | null>();

  // Handle date change
  const handleDateChange = (newDate: DateValue | null) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = `${newDate.day
        .toString()
        .padStart(2, '0')}.${newDate.month.toString().padStart(2, '0')}.${
        newDate.year
      }`;
      console.log(formattedDate);
    }
  };

  const [clickedTab, setclickedTab] = useState(section ? section : 'Profile');

  // fetch all the reservations for the user

  const { data: session, status, update } = useSession();

  const [noData, setnoData] = useState(false);

  const [reservations, setreservations] = useState<any[]>([]);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [triggerReservationFetch, settriggerReservationFetch] = useState(false);

  useEffect(() => {
    const getAllTheReservationForUser = async () => {
      setnoData(false);

      try {
        const response = await fetch(
          `${backend_url}/reservations/getReservationsOfUser`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer_email: session?.user.email,
            }),
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch tables');
        }
        const reservations = await response.json();

        setreservations(reservations);
        // console.log("checkout the reservations" , reservations);

        // console.log(reservations?.length); lxlx

        if (reservations?.length < 1) {
          setnoData(true);
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
        setnoData(false);
      }
    };

    getAllTheReservationForUser();
  }, [session, triggerReservationFetch]);

  const [singleReservation, setsingleReservation] = useState<any>({});

  const openSingleReservation = async (id: string) => {
    //  onOpen

    const singleReservation = reservations?.find(
      (reservation) => reservation._id === id,
    );
    console.log(singleReservation);
    setsingleReservation(singleReservation);

    onOpen();
  };

  // fetch all the reservations for the user

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const router = useRouter();

  // profile edits
  const [isProfileEdit, setisProfileEdit] = useState(false);
  const [isChangePassword, setisChangePassword] = useState(false);
  // profile edits

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

  // profile infos

  const [name, setname] = useState('');
  const [phoneNum, setphoneNum] = useState('94');
  const [email, setemail] = useState('');

  const handlePhoneNumberChange = (e: any) => {
    const input = e.target.value;

    // Ensure the input starts with +94
    if (!input.startsWith('94')) {
      return;
    }

    // Remove any non-numeric characters except + and limit to 9 digits after +94
    // const cleanedInput = input.replace(/[^0-9+]/g, '').slice(0, 12);
    const cleanedInput = input.replace(/[^0-9]/g, '').slice(0, 11);

    // Set the cleaned input value
    setphoneNum(cleanedInput);
  };

  useEffect(() => {
    if (session) {
      setname(session.user.name);
      setphoneNum(session.user.phone);
      setemail(session.user.email);
    }
  }, [session]);

  // profile infos

  // profile update function

  const [profileBtnLoad, setprofileBtnLoad] = useState(false);

  const updateUserProfile = async () => {
    if (!name) {
      console.log('name is incorrect');
      return;
    }

    if (phoneNum.length <= 2 || phoneNum.length !== 11) {
      console.log('phone number is not proper');

      return;
    }

    setprofileBtnLoad(true);

    const data = {
      email,
      name,
      phone: phoneNum,
    };

    try {
      const response = await fetch(`${backend_url}/user/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // console.log('Profile updated successfully:', result.data.user);lxlx
        setprofileBtnLoad(false);
        setisProfileEdit(false);

        await update({
          name: result.data.user.name,

          phone: result.data.user.phone,
        });
      } else {
        console.error('Error updating profile:', result.message);
        setprofileBtnLoad(false);
        setisProfileEdit(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      setprofileBtnLoad(false);
      setisProfileEdit(false);
    }
  };

  // profile update function

  // change password

  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');

  const [updatePassBTN, setupdatePassBTN] = useState(false);

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      // console.log('old password or new password cannot be empty!');
      alert('Please fill in both the old and new password.');
      return;
    }

    const data = {
      email,
      oldPassword,
      newPassword,
    };

    try {
      setupdatePassBTN(true);

      const response = await fetch(`${backend_url}/user/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // console.log('Password updated successfully:', result.message);lxlx
        alert('Password updated successfully! You will be logged out.');
        setupdatePassBTN(false);
        signOut();
      } else {
        // console.error('Error updating password:', result.message);lxlx
        setupdatePassBTN(false);

        if (result.message) {
          alert(result.message);
        } else {
          alert(
            'Something went wrong. Please check your old password and try again.',
          );
        }
      }
    } catch (error) {
      // console.error('Network error:', error);lxlx
      setupdatePassBTN(false);
      alert(
        'Network error! Please check your internet connection and try again.',
      );
    }
  };
  // change password endsss

  const {
    isOpen: isOpenReport,
    onClose: onCloseReport,
    onOpen: onOpenReport,
    onOpenChange: onOpenChangeReport,
  } = useDisclosure();

  const [complaintReason, setcomplaintReason] = useState<any>('');

  const [complaint, setcomplaint] = useState('');

  const closeTheModal = () => {
    // onClosePayment();
    onCloseReport();
    setcomplaint('');
    setcomplaintReason('');
  };

  // complaints
  const [verified, setverified] = useState(false);
  const [reportBTNload, setreportBTNload] = useState(false);
  const updateComplaintDetails = async (reservationId: any) => {
    try {
      setreportBTNload(true);
      const response = await fetch(
        `${backend_url}/reservations/${reservationId}/complaint`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            complaintTitle: complaint,
            complaintDesc: complaintReason,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update complaint details');
      }

      const updatedReservation = await response.json();
      console.log(updatedReservation);
      settriggerReservationFetch(!triggerReservationFetch);
      onClose();
      closeTheModal();
      setreportBTNload(false);
      setverified(true);

      setTimeout(() => {
        setverified(false);
      }, 2000);

      return updatedReservation; // This will be the updated reservation object
    } catch (error) {
      console.error('Error updating complaint details:', error);
      setreportBTNload(false);
      return null;
    }
  };
  // complaints

  // useEffect(() => {

  //  console.log("the user is banned or not" , session?.user.is_ban);

  // }, [])

  useEffect(() => {
    const checkBanStatus = async () => {
      try {
        const res = await fetch(
          `${backend_url}/api/auth/ban-status/${session?.user.email}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) {
          throw new Error('Failed to fetch ban status');
        }

        const data = await res.json();

        console.log(data.is_ban);

        if (data.is_ban) {
          // alert('You have been banned. Logging out...');
          signOut(); // Log the user out if they are banned
        }
      } catch (error) {
        console.error('Error fetching ban status:', error);
      }
    };

    checkBanStatus();
  }, [session]);
  // useEffect(() => {

  //   console.log(session);

  // }, [session])

  // useEffect(() => {
  //   const checkBanStatus = async () => {
  //     try {
  //       if (!session?.user.id) return; // Ensure the session ID is available before making the request

  //       const res = await fetch(`${backend_url}/api/user/ban-status/${session.user.id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error('Failed to fetch ban status');
  //       }

  //       const data = await res.json();

  //       if (data.is_ban) {
  //         alert('You have been banned. Logging out...');
  //         signOut(); // Log the user out if they are banned
  //       }
  //     } catch (error) {
  //       console.error('Error fetching ban status:', error);
  //     }
  //   };

  //   checkBanStatus();
  // }, [session?.user.id]);

  //  hadees

  const params = useParams<{ id: string }>();

  const frontend_url = process.env.FRONTEND_URL;
  const payCustom = async () => {
    console.log('hello');

    try {
      const response = await fetch('/api/payment/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationData: {
            isCustom: true,
            reservationId: singleReservation?._id,
          },
          amount: singleReservation?.reservation_fee,
          restaurantId: singleReservation?.merchant_id,
          // asd
          // date:reservationDate,
          // start_time: ReservationstartTime,
          // end_time: ReservationendTime,
          // guest_count: ReservationguestCount,
          // table_id: reservationTableId,
          // merchant_id : reservationMerchantID,
          // merchant_name : reservationMerchantName ,
          // customer_email : session?.user.email,
          // customer_name : session?.user.name,
          // customer_number : session?.user.phone,
          // table_number : tableNumber,
          // reservation_fee : singleReservation?.reservation_fee
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
      // const responseData = await response.json();
      // console.log('Reservation created:', responseData); lxlx
      // Optionally reset the form or update UI
      // setFilteredTables([])
      // onClose()
      // setreservationSubmitLoadingBTN(false)
      // resetReservationStates()
      // onOpenSuccess()
      //  return
      const data = await response.json();

      if (data.redirect_url) {
        // Redirect to the Onepay payment gateway
        window.location.href = data.redirect_url;
      } else {
        console.error('Error generating payment link:', data.error);
        // Show failure popup
        // onOpenFailed();
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      // setreservationSubmitLoadingBTN(false)
      return;
      // Handle error - display a message or log it
    }
  };

  // rating and review
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0); // 1 to 5
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRating = (value: any) => {
    setRating(value);
  };

  // rating and review

  const submitReview = async ({
    reservationId,
    type,
    rating,
    comment,
  }: any) => {
    try {
      // const token = localStorage.getItem('token'); // or get from cookies if you use cookies
      console.log('sutrum', reservationId);
      console.log('sutrum', type);
      console.log('sutrum', rating);
      console.log('sutrum', comment);

      const response = await fetch(`${backend_url}/reviews/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // Important for auth
        },
        body: JSON.stringify({
          reservationId,
          type, // 'Reservation' or 'CustomReservation'
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      console.log('Review submitted:', data);
      // Optionally show success message
    } catch (error: any) {
      console.error('Review submit error:', error.message);
      // Optionally show error message to user
    }
  };

  console.log('dhe', singleReservation);

  const [reviewBtnLoad, setreviewBtnLoad] = useState(false);
  const handleSubmit = async () => {
    setreviewBtnLoad(true);

    try {
      await submitReview({
        reservationId: singleReservation ? singleReservation._id : '',
        type:
          singleReservation.table_id.length > 0
            ? 'Reservation'
            : 'CustomReservation', // or 'CustomReservation'
        rating: rating,
        comment: reviewText || '',
      });

      onClose();
      setShowForm(false);
      settriggerReservationFetch((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setreviewBtnLoad(false);
    }
  };

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
      <div className=" w-full   min-h-screen  flex flex-col overflow-hidden  ">
        {/* the settings content  */}

        <div className=" w-full  h-full flex flex-col items-center justify-center">
          <div className=" max-w-7xl h-full    w-full flex items-center flex-col">
            <div className=" p-2 w-full  ">
              <Header />
            </div>

            <div className="  w-full  lg:hidden p-2    flex justify-between ">
              <Button
                onPress={() => router.push('/')}
                variant="light"
                className=" border  w-28"
              >
                {' '}
                Go Back{' '}
              </Button>

              {/* wwwwwwwwwwwwwwwwwwwwwwww */}

              <div className=" flex items-center gap-5">
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
                  className="size-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>

            <div
              ref={absoluteElementRef}
              className={` lg:hidden fixed transition-all  overflow-y-auto z-10   ease-in-out   duration-500 top-0  bg-[#141823] ${
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
                    strokeWidth="1.5"
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
                        onClick={() => {
                          router.push('/settings?section=Profile');
                          setopenModal(false);
                        }}
                        className=" text-white text-center font-poppinsreg py-2 rounded-md border"
                      >
                        {' '}
                        Profile{' '}
                      </h1>
                      <h1
                        onClick={() => {
                          router.push('/settings?section=My-Reservations');
                          setopenModal(false);
                        }}
                        className=" text-white text-center font-poppinsreg py-2 rounded-md border"
                      >
                        {' '}
                        My Reservations{' '}
                      </h1>

                      <h1
                        onClick={() => {
                          signOut();
                        }}
                        className=" text-center font-poppinsreg py-2 rounded-md border text-white"
                      >
                        {' '}
                        Log Out{' '}
                      </h1>
                    </div>
                  )}

                  {/* rrrrrrrrrrrrrrrrrrrrr  */}
                </div>

                {/* dropdowns  */}
              </div>
            </div>

            <div className=" w-full   max-w-2xl lg:mt-5 mt-3  md:p-0 p-2  flex flex-col">
              <h1 className=" font-poppinssemi text-lg lg:text-2xl">
                {' '}
                Settings{' '}
              </h1>

              <div className=" border-b mt-2 w-full"> </div>

              <div className=" relative w-full h-full">
                <div className=" hidden md:flex  mt-2 w-full gap-6">
                  <div
                    onClick={() => router.push('/settings?section=Profile')}
                    className="w-fit "
                  >
                    <h1 className="  font-poppinsreg  cursor-pointer     rounded-md">
                      {' '}
                      Profile{' '}
                    </h1>

                    <div
                      className={`  ${
                        clickedTab === 'Profile' ? 'flex' : 'hidden'
                      }  mt-1   h-[4px] rounded-full bg-[#FF385C]`}
                    >
                      {' '}
                    </div>
                  </div>

                  {/* <div  onClick={() => setclickedTab("Notification")} className=' w-fit '> 

  
    <h1 className='  font-poppinsreg  cursor-pointer   rounded-md'> Notification </h1>



    <div className={`  ${clickedTab === "Notification" ? "flex" : "hidden"}   mt-1  h-[4px] rounded-full bg-[#FF385C]`}> </div>



    </div> */}

                  <div
                    onClick={() =>
                      router.push('/settings?section=My-Reservations')
                    }
                    className=" w-fit "
                  >
                    <h1 className="  font-poppinsreg  cursor-pointer   rounded-md">
                      {' '}
                      My Reservations{' '}
                    </h1>

                    {/* <div className='   mt-1  h-[4px] rounded-full bg-[#44484e]'> </div> */}

                    <div
                      className={`  ${
                        clickedTab === 'My-Reservations' ? 'flex' : 'hidden'
                      }   mt-1  h-[4px] rounded-full bg-[#FF385C]`}
                    >
                      {' '}
                    </div>
                  </div>

                  {/* <div  onClick={() => setclickedTab("Billings")} className=' w-fit '> 

  
<h1 className='  font-poppinsreg  cursor-pointer   rounded-md'> Payments & Billings </h1>



<div className={`  ${clickedTab === "Billings" ? "flex" : "hidden"}   mt-1  h-[4px] rounded-full bg-[#FF385C]`}> </div>



</div> */}
                </div>

                <div className=" absolute bottom-0 w-full border-t  "> </div>
              </div>

              {/* the content goes here  */}

              {/* all for ACCOUNT - NOT NOTIFICATION  */}

              {clickedTab === 'Profile' && (
                <div className=" mt-5 md:flex hidden flex-col w-full">
                  <div className=" flex flex-col ">
                    <h1 className="   font-poppinsreg5 text-lg">
                      {' '}
                      Your Profile{' '}
                    </h1>

                    <h1 className=" text-slate-400 font-poppinsreg text-sm">
                      {' '}
                      Choose how you are displayedd{' '}
                    </h1>
                  </div>

                  {/* profile name bio image  */}

                  <div className=" flex  mt-2 flex-col">
                    <div className=" mt-3 flex  md:flex-row flex-col gap-5 md:gap-20 w-full ">
                      <div className="  flex flex-col w-full  md:max-w-sm  gap-5 ">
                        {/* <div className=' flex md:hidden flex-col md:items-center gap-1'>

   
<Image src={"/mannar.jpg"} alt='profile' width={100} height={100} className=' w-20 h-20 rounded-full object-cover' />
  <h1 className=' text-slate-700 text-sm font-poppinsreg underline'> Change Photos </h1>
</div> */}

                        <div className=" flex flex-col gap-1">
                          <h1 className="   font-poppinsreg"> Email </h1>

                          {/* <input className='  w-full  outline-none border rounded-md  p-[1px]' />   */}

                          {/* <h1 className=' text-slate-400 text-sm font-poppinsreg'>  jawidhmuhammadh@gmail.com </h1> */}
                          <h1 className=" text-slate-400 text-sm font-poppinsreg">
                            {' '}
                            {session?.user.email}{' '}
                          </h1>
                        </div>

                        <div className=" flex flex-col gap-1">
                          <h1 className="   font-poppinsreg"> Name </h1>

                          {isProfileEdit ? (
                            <input
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                              className="  capitalize w-full  outline-none border rounded-md  p-[1px]"
                            />
                          ) : (
                            // <h1 className=' text-slate-400 text-sm font-poppinsreg'> Jawidh Muhammadh bin </h1>
                            <h1 className=" text-slate-400 text-sm font-poppinsreg capitalize">
                              {' '}
                              {session?.user.name}{' '}
                            </h1>
                          )}
                        </div>

                        <div className=" flex flex-col gap-1">
                          <h1 className="   font-poppinsreg"> Phone Number </h1>

                          {isProfileEdit ? (
                            <input
                              value={phoneNum}
                              onChange={handlePhoneNumberChange}
                              className="  w-full  outline-none border rounded-md  p-[1px]"
                            />
                          ) : (
                            // <h1 className=' text-slate-400 text-sm font-poppinsreg'> 94778319382 </h1>
                            <h1 className=" text-slate-400 text-sm font-poppinsreg">
                              {' '}
                              {session?.user.phone}{' '}
                            </h1>
                          )}
                        </div>
                      </div>

                      {/* <div className=' hidden md:flex flex-col md:items-center gap-2'>

   
<Image src={"/mannar.jpg"} alt='profile' width={100} height={100} className=' w-20 h-20 rounded-full object-cover' />
  <h1 className=' text-slate-700 text-sm font-poppinsreg underline'> Change Photos </h1>
</div> */}
                    </div>

                    {isProfileEdit ? (
                      <div className=" flex gap-4 items-center">
                        <Button
                          onPress={() => {
                            setisProfileEdit(false);
                            setname(session?.user.name as string);
                            setphoneNum(session?.user.phone as string);
                          }}
                          size="sm"
                          className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                        >
                          {' '}
                          Cancel
                        </Button>
                        <Button
                          isLoading={profileBtnLoad}
                          isDisabled={
                            !name ||
                            phoneNum.length <= 2 ||
                            phoneNum.length !== 11
                          }
                          onPress={updateUserProfile}
                          size="sm"
                          className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                        >
                          {' '}
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      // <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Save Changes</Button>
                      <h1
                        onClick={() => setisProfileEdit(true)}
                        className=" mt-3 cursor-pointer font-poppinsreg underline"
                      >
                        {' '}
                        Edit{' '}
                      </h1>
                    )}

                    <div className=" border-b  mt-6"> </div>
                  </div>

                  {/* profile name bio image  ends */}

                  {/* Professional Details */}

                  <div className="gap-5 md:gap-4 flex flex-col">
                    <div className=" flex mt-8 flex-col ">
                      <h1 className="   font-poppinsreg5  text-lg">
                        {' '}
                        Change Your Password
                      </h1>

                      <h1 className=" text-slate-400  font-poppinsreg  text-sm">
                        Create a new password to enhance your account security{' '}
                      </h1>

                      {!isChangePassword && (
                        <div className=" flex  items-baseline mt-6   gap-6 justify-start">
                          {/* <h1 className=" font-rubikSemiBold text-xl"> Security</h1> */}
                          <Button
                            onPress={() => setisChangePassword(true)}
                            size="sm"
                            className=" font-poppinsreg5  w-fit bg-[#323537] text-white"
                          >
                            {' '}
                            Change Password
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* other things  */}

                    {isChangePassword && (
                      <div className=" flex flex-col mt-3 gap-5">
                        <div>
                          <h1 className="font-poppinsreg5 text-gray-800">
                            {' '}
                            Email
                          </h1>
                          {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                          {/* <input
                          value={oldpass}
                     
                          className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                          type="text  "
                        /> */}

                          <h1 className=" font-poppinsreg text-sm text-slate-400">
                            {' '}
                            {session?.user.email}{' '}
                          </h1>

                          {/* {oldpass_err && (
                          <h1 className=" text-red-400"> {oldpass_err} </h1>
                        )} */}
                        </div>

                        <div>
                          <h1 className=" font-poppinsreg5 text-gray-800">
                            {' '}
                            Old Password
                          </h1>
                          {/* <h1> jawidmuhammadh@gmail.com </h1> */}

                          {/* <div className=" relative">
                            <input
                              value={oldPassword}
                              onChange={(e) => setoldPassword(e.target.value)}
                              className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                              type={showOldPassword ? 'text' : 'password'}
                            />

                            <div
                              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            >
                              {showOldPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </div>
                          </div> */}

                          <div className="relative w-full md:w-64">
                            <input
                              value={oldPassword}
                              onChange={(e) => setoldPassword(e.target.value)}
                              className="w-full py-[8px] text-sm rounded-lg outline-none focus:border-[#f79e92] focus:border-2 pl-3 pr-10 border border-gray-300"
                              type={showOldPassword ? 'text' : 'password'}
                              placeholder="Old Password"
                            />

                            {/* Eye icon inside input */}
                            <div
                              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            >
                              {showOldPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </div>
                          </div>

                          {/* {newpass_err && (
                          <h1 className=" text-red-400"> {newpass_err} </h1>
                        )} */}
                        </div>

                        {/* <div>
                          <h1 className="font-poppinsreg5 text-gray-800">
                            {' '}
                            New Password
                          </h1>
                          
                          <input
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                            type="text  "
                          />
                       
                        </div> */}

                        <div className="relative w-full md:w-64">
                          <input
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            className="w-full py-[8px] text-sm rounded-lg outline-none focus:border-[#f79e92] focus:border-2 pl-3 pr-10 border border-gray-300"
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="New Password"
                          />

                          <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </div>
                        </div>

                        <h1 className="  text-sm text-slate-400">
                          {' '}
                          Password should be atleast 6 characters long{' '}
                        </h1>

                        <div className=" flex items-center -mt-5 gap-3">
                          <Button
                            onPress={() => {
                              setisChangePassword(false);
                              setoldPassword('');
                              setnewPassword('');
                            }}
                            size="sm"
                            className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                          >
                            {' '}
                            Cancel
                          </Button>

                          <Button
                            isLoading={updatePassBTN}
                            onPress={changePassword}
                            isDisabled={
                              !oldPassword ||
                              !newPassword ||
                              newPassword.length < 6
                            }
                            size="sm"
                            className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                          >
                            {' '}
                            Change Password
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* other things  */}

                    {/* new things  */}

                    {/* new things  */}

                    <div className=" border-b  mt-6"> </div>
                  </div>

                  {/* Professional Details */}
                </div>
              )}

              {/* the content goes here  */}
              {/* all for ACCOUNT - NOT NOTIFICATION  */}

              {/* Notification only  */}

              {/* Notification only  */}

              {/* My reservation only  */}

              {clickedTab === 'My-Reservations' && (
                <>
                  <div className=" w-full md:flex flex-col  hidden mt-6 border     ">
                    <Table className=" ">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center  text-slate-400 font-poppinsreg5">
                            Reservation Data
                          </TableHead>
                          <TableHead className="text-center text-slate-400 font-poppinsreg5">
                            Reference
                          </TableHead>
                          <TableHead className="text-center text-slate-400 font-poppinsreg5">
                            Restaurant
                          </TableHead>
                          <TableHead className="text-center text-slate-400 font-poppinsreg5">
                            Status
                          </TableHead>
                          <TableHead className="text-center text-slate-400 font-poppinsreg5">
                            View
                          </TableHead>
                          {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
    <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations?.map((reservation, i) => (
                          <TableRow key={i}>
                            <TableCell className="text-center text-slate-900  font-poppinsreg5">
                              <h1> {reservation?.date} </h1>
                            </TableCell>
                            <TableCell className="text-center text-slate-900 font-poppinsreg5">
                              <h1> {reservation?.reference} </h1>
                            </TableCell>
                            <TableCell className="text-center text-slate-900 font-poppinsreg5">
                              <h1> {reservation?.merchant_name}</h1>
                            </TableCell>
                            <TableCell className="text-center  font-poppinsreg5">
                              <h1
                                className={` ${
                                  reservation?.reservation_status ===
                                    'pending' &&
                                  '  bg-purple-200    text-purple-800'
                                } ${
                                  reservation?.reservation_status ===
                                    'accepted' &&
                                  '    bg-lime-200    text-lime-800'
                                }  ${
                                  reservation?.reservation_status ===
                                    'completed' &&
                                  '  bg-green-200    text-green-800'
                                }   ${
                                  reservation?.reservation_status ===
                                    'reserved' && 'bg-green-200 text-green-800'
                                } ${
                                  reservation?.reservation_status ===
                                    'cancelled' && 'bg-red-200 text-red-800'
                                }  p-2 rounded-md`}
                              >
                                {' '}
                                {reservation?.reservation_status ===
                                  'pending' && 'Pending'}{' '}
                                {reservation?.reservation_status ===
                                  'reserved' && 'Reserved'}{' '}
                                {reservation?.reservation_status ===
                                  'cancelled' && 'Cancelled'}{' '}
                                {reservation?.reservation_status ===
                                  'completed' && 'Completed'}{' '}
                                {reservation?.reservation_status ===
                                  'accepted' && 'Accepted'}{' '}
                              </h1>
                            </TableCell>
                            <TableCell className="text-center font-poppinsreg5">
                              <svg
                                onClick={() =>
                                  openSingleReservation(reservation?._id)
                                }
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
                        ))}

                        {/* <TableRow>
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
 
  </TableRow> */}
                      </TableBody>
                    </Table>
                  </div>

                  {noData && (
                    <div className=" flex justify-center">
                      <h1 className=" text-center md:flex hidden mt-5 text-slate-400 font-poppinsreg ">
                        {' '}
                        {`No Reservations to show`}
                      </h1>
                    </div>
                  )}

                  {reservations.length > 0 && (
                    <h1 className=" text-center pb-5 md:flex hidden mt-10 text-slate-400 font-poppinsreg text-xs">
                      {' '}
                      {`All your reservations are displayed here. New reservations will be pending until confirmed by the restaurant. Occasionally, reservations may be rejected with reasons provided here. Please check back or view notifications for status updates`}
                    </h1>
                  )}
                </>
              )}

              {/* My reservation only  */}

              {/* small devices  */}
              <div className=" w-full mt-2  md:hidden flex">
                <Accordion
                  selectedKeys={selectedKeysArray} // Convert Set to array
                  onSelectionChange={(keys) =>
                    setSelectedKeys(new Set(keys as Iterable<Key>))
                  }
                  itemClasses={{
                    title: 'font-poppinssemi',
                  }}
                  variant="shadow"
                >
                  <AccordionItem
                    key="profile"
                    aria-label="Accordion 1"
                    title="Profile"
                  >
                    <div className=" md:mt-5 flex   flex-col w-full">
                      <div className=" flex flex-col ">
                        <h1 className="    font-poppinsreg5 text-lg">
                          {' '}
                          Your Profile{' '}
                        </h1>

                        <h1 className=" text-slate-400 font-poppinsreg text-sm">
                          {' '}
                          Choose how you are displayed{' '}
                        </h1>
                      </div>

                      {/* profile name bio image  */}

                      <div className=" flex  mt-2 flex-col">
                        <div className=" mt-3 flex  md:flex-row flex-col gap-5 md:gap-20 w-full ">
                          <div className="  flex flex-col w-full  md:max-w-sm  gap-5 md:gap-4">
                            {/* <div className=' flex md:hidden flex-col md:items-center gap-1'>


<Image src={"/mannar.jpg"} alt='profile' width={100} height={100} className=' w-20 h-20 rounded-full object-cover' />
<h1 className=' text-slate-700 text-sm font-poppinsreg underline'> Change Photo </h1>
</div> */}

                            <div className=" flex flex-col gap-1">
                              <h1 className="   font-poppinsreg"> Email </h1>

                              {/* <input className='  w-full  outline-none border rounded-md  p-[1px]' />   */}

                              <h1 className=" text-slate-400 text-sm font-poppinsreg">
                                {' '}
                                {session?.user.email}{' '}
                              </h1>
                            </div>

                            <div className=" flex flex-col gap-1">
                              <h1 className="   font-poppinsreg"> Name </h1>

                              {isProfileEdit ? (
                                <input
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                  className="  w-full  outline-none border rounded-md  p-[1px]"
                                />
                              ) : (
                                <h1 className=" text-slate-400 capitalize text-sm font-poppinsreg">
                                  {' '}
                                  {session?.user.name}{' '}
                                </h1>
                              )}
                            </div>

                            <div className=" flex flex-col gap-1">
                              <h1 className="   font-poppinsreg">
                                {' '}
                                Phone Number{' '}
                              </h1>

                              {isProfileEdit ? (
                                <input
                                  value={phoneNum}
                                  onChange={handlePhoneNumberChange}
                                  className="  w-full  outline-none border rounded-md  p-[1px]"
                                />
                              ) : (
                                <h1 className=" text-slate-400 text-sm font-poppinsreg">
                                  {' '}
                                  {session?.user.phone}
                                </h1>
                              )}
                            </div>
                          </div>

                          {/* <div className=' hidden md:flex flex-col md:items-center gap-2'>


<Image src={"/mannar.jpg"} alt='profile' width={100} height={100} className=' w-20 h-20 rounded-full object-cover' />
<h1 className=' text-slate-700 text-sm font-poppinsreg underline'> Change Photo </h1>
</div> */}
                        </div>

                        {/* <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Save Changes</Button> */}

                        {/* {
    isProfileEdit ? 

    <div className=' flex gap-4 items-center'> 

<Button onPress={() => setisProfileEdit(false)} size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Cancel</Button>
<Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Save Changes</Button>
      </div> : 

   
    <h1 onClick={() => setisProfileEdit(true)} className=' mt-3 cursor-pointer font-poppinsreg underline'>  Edit </h1>


   } */}

                        {isProfileEdit ? (
                          <div className=" flex gap-4 items-center">
                            <Button
                              onPress={() => {
                                setisProfileEdit(false);
                                setname(session?.user.name as string);
                                setphoneNum(session?.user.phone as string);
                              }}
                              size="sm"
                              className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                            >
                              {' '}
                              Cancel
                            </Button>
                            <Button
                              isLoading={profileBtnLoad}
                              isDisabled={
                                !name ||
                                phoneNum.length <= 2 ||
                                phoneNum.length !== 11
                              }
                              onPress={updateUserProfile}
                              size="sm"
                              className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                            >
                              {' '}
                              Save Changes
                            </Button>
                          </div>
                        ) : (
                          // <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Save Changes</Button>
                          <h1
                            onClick={() => setisProfileEdit(true)}
                            className=" mt-3 cursor-pointer font-poppinsreg underline"
                          >
                            {' '}
                            Edit{' '}
                          </h1>
                        )}

                        <div className=" border-b  mt-6"> </div>
                      </div>

                      {/* profile name bio image  ends */}

                      {/* Professional Details */}

                      <div className="gap-5 md:gap-4 md:pb-0 pb-4 flex flex-col">
                        <div className=" flex mt-8 flex-col ">
                          <h1 className="   font-poppinsreg5  text-lg">
                            {' '}
                            Change Your Password
                          </h1>

                          <h1 className=" text-slate-400  font-poppinsreg  text-sm">
                            Create a new password to enhance your account
                            security{' '}
                          </h1>

                          {!isChangePassword && (
                            <div className=" flex  items-baseline mt-6   gap-6 justify-start">
                              {/* <h1 className=" font-rubikSemiBold text-xl"> Security</h1> */}
                              <Button
                                onPress={() => setisChangePassword(true)}
                                size="sm"
                                className=" font-poppinsreg5  w-fit bg-[#323537] text-white"
                              >
                                {' '}
                                Change Password
                              </Button>
                            </div>
                          )}

                          {/* <div className=" flex  items-baseline mt-6   gap-6 justify-start">
             
                <Button size="sm" className=' font-poppinsreg5  w-fit bg-[#323537] text-white'> Change Password</Button>
              </div> */}
                        </div>

                        {/* other things  */}

                        {isChangePassword && (
                          <div className=" flex flex-col mt-3 gap-5">
                            <div>
                              <h1 className="font-poppinsreg5 text-gray-800">
                                {' '}
                                Email
                              </h1>
                              {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                              {/* <input
                          value={oldpass}
                     
                          className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                          type="text  "
                        /> */}

                              <h1 className=" font-poppinsreg text-sm text-slate-400">
                                {' '}
                                jawidmuhammadh@gmail.com{' '}
                              </h1>

                              {/* {oldpass_err && (
                          <h1 className=" text-red-400"> {oldpass_err} </h1>
                        )} */}
                            </div>

                            {/* <div>
                              <h1 className=" font-poppinsreg5 text-gray-800">
                                {' '}
                                Old Password
                              </h1>
                             
                              <input
                                value={oldPassword}
                                onChange={(e) => setoldPassword(e.target.value)}
                                className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                                type="text  "
                              />

                        
                            </div> */}

                            <div className="relative w-full">
                              <input
                                value={oldPassword}
                                onChange={(e) => setoldPassword(e.target.value)}
                                className="w-full py-[8px] text-sm rounded-lg outline-none focus:border-[#f79e92] focus:border-2 pl-3 pr-10 border border-gray-300"
                                type={showOldPassword ? 'text' : 'password'}
                                placeholder="Old Password"
                              />

                              {/* Eye icon inside input */}
                              <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() =>
                                  setShowOldPassword(!showOldPassword)
                                }
                              >
                                {showOldPassword ? (
                                  <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </div>
                            </div>

                            <div>
                              <h1 className="font-poppinsreg5 text-gray-800">
                                {' '}
                                New Password
                              </h1>
                              {/* <h1> jawidmuhammadh@gmail.com </h1> */}
                              {/* <input
                                value={newPassword}
                                onChange={(e) => setnewPassword(e.target.value)}
                                className=" w-full  md:w-64    py-[8px] text-sm  rounded-lg outline-none focus:border-[#f79e92] focus:border-2  pl-3  border border-gray-300 "
                                type="text  "
                              /> */}

                              <div className="relative w-full">
                                <input
                                  value={newPassword}
                                  onChange={(e) =>
                                    setnewPassword(e.target.value)
                                  }
                                  className="w-full py-[8px] text-sm rounded-lg outline-none focus:border-[#f79e92] focus:border-2 pl-3 pr-10 border border-gray-300"
                                  type={showNewPassword ? 'text' : 'password'}
                                  placeholder="New Password"
                                />

                                {/* Eye icon inside input */}
                                <div
                                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                >
                                  {showNewPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                  ) : (
                                    <EyeIcon className="h-5 w-5" />
                                  )}
                                </div>
                              </div>

                              <h1 className="  text-sm mt-3 text-slate-400">
                                {' '}
                                Password should be atleast 6 characters long{' '}
                              </h1>
                            </div>

                            {/* <div className=' flex items-center gap-3'>
                      <Button onPress={() => setisChangePassword(false)} size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Cancel</Button>
                      
                      <Button size="sm" className=' font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white'> Change Password</Button>
                      </div> */}

                            <div className=" flex -mt-5 items-center gap-3">
                              <Button
                                onPress={() => {
                                  setisChangePassword(false);
                                  setoldPassword('');
                                  setnewPassword('');
                                }}
                                size="sm"
                                className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                              >
                                {' '}
                                Cancel
                              </Button>

                              <Button
                                isLoading={updatePassBTN}
                                onPress={changePassword}
                                isDisabled={
                                  !oldPassword ||
                                  !newPassword ||
                                  newPassword.length < 6
                                }
                                size="sm"
                                className=" font-poppinsreg5 mt-6 w-fit bg-[#323537] text-white"
                              >
                                {' '}
                                Change Password
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* other things  */}

                        {/* new things  */}

                        {/* new things  */}

                        <div className=" border-b md:flex hidden   mt-6"> </div>
                      </div>

                      {/* Professional Details */}
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="my-reservations"
                    aria-label="Accordion 2"
                    title="My Reservations"
                  >
                    <div className=" w-full md:flex flex-col  border     ">
                      {/* <Table className=' '  >

<TableHeader>
  <TableRow >
    <TableHead className="text-center  text-slate-400 font-poppinsreg5">Reservation Data</TableHead>
    <TableHead className='text-center text-slate-400 font-poppinsreg5'>Reference</TableHead>
    <TableHead className='text-center text-slate-400 font-poppinsreg5'>Restaurant</TableHead>
    <TableHead className="text-center text-slate-400 font-poppinsreg5">Status</TableHead>
    <TableHead className="text-center text-slate-400 font-poppinsreg5">View</TableHead>
   
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
</Table> */}

                      <Table className=" ">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center  text-slate-400 font-poppinsreg5">
                              Reservation Data
                            </TableHead>
                            <TableHead className="text-center text-slate-400 font-poppinsreg5">
                              Reference
                            </TableHead>
                            <TableHead className="text-center text-slate-400 font-poppinsreg5">
                              Restaurant
                            </TableHead>
                            <TableHead className="text-center text-slate-400 font-poppinsreg5">
                              Status
                            </TableHead>
                            <TableHead className="text-center text-slate-400 font-poppinsreg5">
                              View
                            </TableHead>
                            {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
    <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reservations?.map((reservation, i) => (
                            <TableRow key={i}>
                              <TableCell className="text-center text-slate-900  font-poppinsreg5">
                                <h1> {reservation?.date} </h1>
                              </TableCell>
                              <TableCell className="text-center text-slate-900 font-poppinsreg5">
                                <h1> {reservation?.reference} </h1>
                              </TableCell>
                              <TableCell className="text-center text-slate-900 font-poppinsreg5">
                                <h1> {reservation?.merchant_name}</h1>
                              </TableCell>
                              <TableCell className="text-center  font-poppinsreg5">
                                <h1
                                  className={` ${
                                    reservation?.reservation_status ===
                                      'pending' &&
                                    '  bg-purple-200    text-purple-800'
                                  } ${
                                    reservation?.reservation_status ===
                                      'accepted' &&
                                    '    bg-lime-200    text-lime-800'
                                  }  ${
                                    reservation?.reservation_status ===
                                      'completed' &&
                                    '  bg-green-200    text-green-800'
                                  }   ${
                                    reservation?.reservation_status ===
                                      'reserved' &&
                                    'bg-green-200 text-green-800'
                                  } ${
                                    reservation?.reservation_status ===
                                      'cancelled' && 'bg-red-200 text-red-800'
                                  }  p-2 rounded-md`}
                                >
                                  {' '}
                                  {reservation?.reservation_status ===
                                    'pending' && 'Pending'}{' '}
                                  {reservation?.reservation_status ===
                                    'reserved' && 'Reserved'}{' '}
                                  {reservation?.reservation_status ===
                                    'cancelled' && 'Cancelled'}{' '}
                                  {reservation?.reservation_status ===
                                    'completed' && 'Completed'}{' '}
                                  {reservation?.reservation_status ===
                                    'accepted' && 'Accepted'}{' '}
                                </h1>
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                <svg
                                  onClick={() =>
                                    openSingleReservation(reservation?._id)
                                  }
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
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionItem>
                  {/* <AccordionItem key="3" aria-label="Accordion 3" title="Payments & Billings">
      
      </AccordionItem> */}
                </Accordion>
              </div>
              {/* small devices  */}
            </div>
          </div>
        </div>
        {/* the settings content  */}
      </div>

      {/* the popup  */}

      <Modal
        isDismissable={false}
        // isOpen:customisOpen, onOpen:customonOpen, onClose:customonClose, onOpenChange:customonOpenChange

        // isOpen, onOpen, onClose, onOpenChange

        classNames={{
          backdrop: ' bg-black bg-opacity-80',
        }}
        // md:h-auto h-screen py-3   overflow-y-auto
        // md:min-h-fit md:h-fit h-screen  md:max-h-[95vh]  py-3   overflow-y-auto
        className=" md:min-h-fit md:h-fit  max-h-[90vh]  md:max-h-[95vh]  py-3   overflow-y-auto "
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setShowForm(false);
          setRating(0);
          setHoverRating(0);
          setReviewText('');
        }}
      >
        <ModalContent className=" ">
          {(onClose) => (
            <>
              <ModalBody className=" max-h-[80vh] overflow-y-auto">
                <div className=" flex flex-col gap-1">
                  <h1 className="flex flex-col  md:mt-0 mt-5 text-[#FF385C]   font-poppinssemi text-2xl gap-1">
                    Reservation Summary{' '}
                  </h1>

                  <p className=" text-green-900 font-poppinsreg5">
                    {' '}
                    {`REFERENCE NUMBER: ${singleReservation?.reference}`}{' '}
                  </p>
                </div>

                <div className=" mt-2 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {' '}
                    Reservation Details{' '}
                  </h1>

                  <div className=" grid  grid-cols-2">
                    <div className="border-t border-b p-1 border-l">
                      <h1 className=" font-poppinsreg5 "> Reservation Date </h1>
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {' '}
                        {singleReservation?.date}{' '}
                      </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {reservationDate}</h1> */}
                    </div>

                    <div className=" border-t border-b border-r p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Restaurant </h1>
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {' '}
                        {singleReservation?.merchant_name}{' '}
                      </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {Reservationrestaurant}</h1> */}
                    </div>

                    {/* /////////////////// */}
                    {/* /////////////////// */}

                    {singleReservation?.table_id && (
                      <div className="  p-1 border-r border-l">
                        <h1 className=" font-poppinsreg5"> Table </h1>
                        {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> 04 (Max-Seat-Capacity : 02)   </h1> */}
                        <h1 className=" font-poppinsreg text-slate-500 text-sm">
                          {' '}
                          {singleReservation?.table_number}{' '}
                        </h1>
                      </div>
                    )}

                    {singleReservation?.start_time && (
                      <div className="   border-b border-r p-1">
                        <h1 className=" font-poppinsreg5"> Start Time </h1>
                        <h1 className=" font-poppinsreg text-slate-500 text-sm">
                          {' '}
                          {singleReservation?.start_time}{' '}
                        </h1>
                        {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> {ReservationstartTime}   </h1> */}
                      </div>
                    )}

                    {singleReservation?.end_time && (
                      <div className="border p-1">
                        <h1 className=" font-poppinsreg5"> End Time </h1>
                        <h1 className=" font-poppinsreg text-slate-500 text-sm">
                          {' '}
                          {singleReservation?.end_time}{' '}
                        </h1>
                        {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>  {ReservationendTime}  </h1> */}
                      </div>
                    )}

                    {singleReservation?.guest_count && (
                      <div className=" border-b border-r p-1">
                        <h1 className=" font-poppinsreg5"> Guest </h1>
                        <h1 className=" font-poppinsreg text-slate-500 text-sm">
                          {' '}
                          {String(singleReservation?.guest_count).padStart(
                            2,
                            '0',
                          )}{' '}
                        </h1>
                        {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> { type === "preferred" ? `Up to ${ReservationguestCount} people`  :  ReservationguestCount}  </h1> */}
                      </div>
                    )}

                    {singleReservation?.reservation_fee !== 0 &&
                      singleReservation?.reservation_status !== 'cancelled' && (
                        <div className=" border-b border-l border-r p-1">
                          <h1 className=" font-poppinsreg5">
                            {' '}
                            Reservation Fee{' '}
                          </h1>
                          <h1
                            className={`  ${
                              singleReservation?.details
                                ? 'text-green-900 font-poppinsreg5 bg-green-100 w-fit'
                                : 'text-slate-500 font-poppinsreg'
                            }  text-sm`}
                          >
                            {' '}
                            LKR {singleReservation?.reservation_fee}{' '}
                          </h1>
                          {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> { type === "preferred" ? `Up to ${ReservationguestCount} people`  :  ReservationguestCount}  </h1> */}
                        </div>
                      )}

                    {singleReservation?.details && (
                      <div className=" border-b border-l border-r p-1">
                        <h1 className=" font-poppinsreg5">
                          {' '}
                          Meal From Restaurant{' '}
                        </h1>
                        <h1 className=" font-poppinsreg text-slate-500 text-sm">
                          {' '}
                          {singleReservation?.meal_from_restaurant
                            ? 'Yes'
                            : 'No'}{' '}
                        </h1>
                        {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> { type === "preferred" ? `Up to ${ReservationguestCount} people`  :  ReservationguestCount}  </h1> */}
                      </div>
                    )}

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

                {singleReservation?.details && (
                  <div className=" mt-4 flex flex-col gap-2">
                    <h1 className="  font-poppinssemi text-lg">
                      {' '}
                      Event Details{' '}
                    </h1>

                    <div className=" min-h-fit max-h-[150px] overflow-y-auto border p-1 text-wrap">
                      <p className=" text-slate-500 text-sm">
                        {' '}
                        {singleReservation?.details}{' '}
                      </p>
                    </div>
                  </div>
                )}

                <div className=" mt-4 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {' '}
                    Customer Details{' '}
                  </h1>

                  <div className=" grid  grid-cols-2">
                    <div className="border-t p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Name </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> Jason Roy</h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {singleReservation?.customer_name}
                      </h1>
                    </div>

                    <div className="  p-1  border">
                      <h1 className=" font-poppinsreg5"> Email </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
                      <h1 className="   break-words  font-poppinsreg text-slate-500 text-sm">
                        {' '}
                        {singleReservation?.customer_email}{' '}
                      </h1>
                    </div>

                    <div className="  p-1 border">
                      <h1 className=" font-poppinsreg5"> Phone Number </h1>
                      {/* <h1 className=' font-poppinsreg text-red-500 text-sm'> {` ${false ? "04 (Max-Seat-Capacity : 02)" : "NOT ADDED"} `}    </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {' '}
                        {singleReservation?.customer_number}{' '}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* //  bg-green-200 text-green-800 bg-red-200 text-red-800 */}

                <div className="   mt-4 flex flex-col gap-1">
                  <h1 className="  font-poppinssemi text-lg">
                    {' '}
                    Reservation Status
                  </h1>
                  <h1
                    className={`  ${
                      singleReservation?.reservation_status === 'pending' &&
                      'bg-purple-200    text-purple-800'
                    }   ${
                      singleReservation?.reservation_status === 'accepted' &&
                      '    bg-lime-200    text-lime-800'
                    }    ${
                      singleReservation?.reservation_status === 'reserved' &&
                      'text-green-800 bg-green-200'
                    } ${
                      singleReservation?.reservation_status === 'cancelled' &&
                      'bg-red-200 text-red-800'
                    } ${
                      singleReservation?.reservation_status === 'completed' &&
                      'text-green-800 bg-green-200'
                    }      font-poppinsreg5 w-fit p-2 rounded-md    text-sm    `}
                  >
                    {' '}
                    {singleReservation?.reservation_status === 'accepted' &&
                      'Accepted'}{' '}
                    {singleReservation?.reservation_status === 'pending' &&
                      'PENDING'}{' '}
                    {singleReservation?.reservation_status === 'reserved' &&
                      'RESERVED'}{' '}
                    {singleReservation?.reservation_status === 'completed' &&
                      'COMPLETED'}{' '}
                    {singleReservation?.reservation_status === 'cancelled' &&
                      'CANCELLED'}{' '}
                  </h1>
                </div>

                {singleReservation?.cancelled_reason && (
                  <div className="   mt-4 p-1 border flex flex-col gap-1">
                    <h1 className="  font-poppinssemi text-lg">
                      {' '}
                      Cancelled Reason
                    </h1>
                    <p className=" text-red-700 font-poppinsreg text-sm">
                      {' '}
                      {singleReservation?.cancelled_reason}{' '}
                    </p>
                  </div>
                )}

                {!singleReservation?.details &&
                  singleReservation?.cancelled_reason &&
                  !singleReservation?.complaintDesc && (
                    <h1
                      onClick={() => onOpenReport()}
                      className=" px-1 text-red-500 underline cursor-pointer font-poppinsreg text-sm"
                    >
                      {' '}
                      Report{' '}
                    </h1>
                  )}

                {singleReservation?.complaintDesc && (
                  <h1
                    // onClick={() => onOpenPayment()}
                    className=" px-1 text-slate-900  font-poppinsreg text-sm"
                  >
                    {' '}
                    You have submitted a report for this cancellation{' '}
                  </h1>
                )}

                {/* {
   (!singleReservation?.details && singleReservation?.cancelled_reason && !singleReservation?.complaintDesc) && 

    <h1 onClick={() => onOpenPayment()}   className=' px-1 text-red-500 underline cursor-pointer font-poppinsreg text-sm'> Report </h1>
 } */}

                {singleReservation?.reservation_status === 'accepted' && (
                  <div className=" mt-3 flex flex-col gap-2">
                    {/* abu huraira rali  */}

                    {/* cccccccccccccccccccccccccccccc */}
                    <h1 className=" text-sm font-poppinsreg  text-slate-400">{`Please pay the reservation fee by clicking the button below to confirm your reservation`}</h1>
                    <Button
                      onPress={() => {
                        console.log(
                          'the emount is ',
                          singleReservation?.reservation_fee,
                        ),
                          payCustom();
                      }}
                      className=" mt-2 bg-[#FF385C] text-white "
                    >
                      {' '}
                      Pay Now
                    </Button>
                    {/* <h1 className=' font-poppinsreg text-sm underline cursor-pointer'> Pay Now </h1> */}
                  </div>
                )}

                <div className="mt-3">
                  {singleReservation.review ? (
                    <div className="border rounded-lg shadow p-4 space-y-2">
                      <h3 className="text-md font-semibold text-gray-800">
                        Your Review
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) =>
                          i < singleReservation.review.rating ? (
                            <StarIcon
                              key={i}
                              className="w-5 h-5 text-yellow-400"
                            />
                          ) : (
                            <StarOutline
                              key={i}
                              className="w-5 h-5 text-gray-300"
                            />
                          ),
                        )}
                      </div>
                      <p className="text-gray-700">
                        {singleReservation.review.comment}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reviewed on:{' '}
                        {new Date(
                          singleReservation.review.updatedAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* { */}
                      {/* !showForm &&
                      singleReservation?.reservation_status === 'completed' ? (
                        <h1
                          onClick={() => setShowForm(true)}
                          className="font-poppinsreg5 cursor-pointer text-[#270f14] text-sm underline"
                        >
                          Write a Review
                        </h1>
                      )  */}
                      {!showForm &&
                        singleReservation?.reservation_status ===
                          'completed' && (
                          <h1
                            onClick={() => setShowForm(true)}
                            className="font-poppinsreg5 cursor-pointer text-[#270f14] text-sm underline"
                          >
                            Write a Review
                          </h1>
                        )}
                      {showForm &&
                        singleReservation?.reservation_status ===
                          'completed' && (
                          <div className="space-y-4 p-2 border rounded-lg shadow">
                            {/* Rating Section */}
                            <div>
                              <label className="block font-medium mb-2 text-gray-700">
                                Rate your experience
                              </label>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) =>
                                  (hoverRating || rating) >= star ? (
                                    <StarIcon
                                      key={star}
                                      className="w-6 h-6 text-yellow-400 cursor-pointer"
                                      onClick={() => handleRating(star)}
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                    />
                                  ) : (
                                    <StarOutline
                                      key={star}
                                      className="w-6 h-6 text-gray-400 cursor-pointer"
                                      onClick={() => handleRating(star)}
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                    />
                                  ),
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {rating > 0
                                  ? `You rated this ${rating} star${
                                      rating > 1 ? 's' : ''
                                    }`
                                  : 'No rating yet'}
                              </p>
                            </div>

                            {/* Review Textarea */}
                            <div>
                              <label className="block font-medium mb-2 text-gray-700">
                                Your Review
                              </label>
                              <Textarea
                                rows={4}
                                className="w-full p-2 border rounded-md focus:outline-none"
                                placeholder="Write your feedback..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                              />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center gap-4">
                              <Button
                                radius="md"
                                className="bg-black text-white"
                                onClick={() => setShowForm(false)}
                              >
                                Cancel
                              </Button>

                              <Button
                                onPress={handleSubmit}
                                radius="md"
                                isLoading={reviewBtnLoad}
                                className="bg-[#FF385C] text-white"
                                // onClick={() => {
                                //   console.log('Rating:', rating);
                                //   console.log('Review:', reviewText);
                                // }}
                              >
                                Submit Review
                              </Button>

                              {/* <button onClick={handleSubmit}>
                                kandaale siru
                              </button> */}
                            </div>
                          </div>
                        )}
                      {/* // } */}
                    </>
                  )}
                </div>

                {/* <Butto className=' bg-[#FF385C] text-white font-poppinsreg5 text-xs mt-4  w-full'>Confirm & Proceed</Button> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* the popup  */}

      {/* if cancelled user can report here  */}
      {/* add or edit payment  */}
      <Modal
        onClose={closeTheModal}
        isDismissable={false}
        classNames={{
          backdrop: ' bg-black bg-opacity-30',
        }}
        className="h-fit   py-3  z-[100]  overflow-y-auto"
        size="lg"
        isOpen={isOpenReport}
        onOpenChange={onOpenChangeReport}
      >
        <ModalContent className=" ">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Reservations For {selectedMonth}</ModalHeader> */}

              <ModalBody>
                <div className=" flex flex-col  gap-2">
                  <label className="    font-poppinsreg5 text-slate-600">
                    {' '}
                    Report to admin{' '}
                  </label>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    //  defaultSelectedKeys={["Colombo"]}
                    disallowEmptySelection
                    label="Select a reason"
                    className=" font-poppinsreg"
                    value={complaintReason}
                    onChange={(e) => setcomplaintReason(e.target.value)}
                  >
                    {['Last-Minute Cancellation', 'Other'].map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className=" flex flex-col mt-1 gap-2">
                  <label className="    font-poppinsreg5 text-slate-700">
                    {' '}
                    Write your complaint{' '}
                  </label>
                  <Textarea
                    value={complaint}
                    placeholder="Write a report (Min 30 characters required)"
                    onChange={(e) => setcomplaint(e.target.value)}
                    className=" w-full"
                  />
                </div>

                <Button
                  isLoading={reportBTNload}
                  onPress={() => updateComplaintDetails(singleReservation?._id)}
                  className="  mt-2 bg-[#FF385C] text-white"
                  isDisabled={
                    !complaintReason || !complaint || complaint.length < 30
                  }
                >
                  {' '}
                  Report{' '}
                </Button>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
      {/* add or edit payment  */}
      {/* if cancelled user can report here  */}

      {/* VERFICATION SUCCESS  */}

      {verified && (
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
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 -m-1 flex items-center text-green-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg> */}

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
                  Complaint Reported Successfully!
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
      {/* VERFICATION SUCCESS  */}
    </>
  );
};

export default Page;
