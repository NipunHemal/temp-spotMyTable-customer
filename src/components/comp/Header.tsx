'use client';
import React from 'react';

import { Input } from '@/components/ui/input';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTemp } from '@/context/tempContext';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
Button;

const Header = () => {
  const { data: session, status } = useSession();

  const currentPage = usePathname();

  const router = useRouter();

  const {
    isSignupSuccess,
    showSignupModel,
    setShowSignupModel,
    setisSignupSuccess,
    showLoginModel,
    setIsShowLoginModel,
  } = useTemp();

  const isHomeOrRestaurants =
    currentPage === '/' ||
    currentPage.startsWith('/restaurants') ||
    currentPage.startsWith('/contact-us');
  const isCompDetailsPage =
    currentPage.startsWith('/contact-us') ||
    currentPage.startsWith('/about-us');

  return (
    <>
      <div className=" w-full hidden lg:flex lg:justify-between items-center p-4">
        <div className=" flex  items-center gap-5">
          {isHomeOrRestaurants && (
            //   <Link href={'/'}>
            // <h1 className=' text-xl cursor-pointer   font-poppinssemi text-[#FF385C]'> SpotMyTable </h1>

            // </Link>

            <Image
              alt=""
              src={'/logo.png'}
              className=" cursor-pointer w-28 h-fit object-cover"
              width={1000}
              height={1000}
            />
          )}

          {currentPage === '/settings' && (
            <Button
              onPress={() => router.replace('/')}
              variant="light"
              className=" border w-28"
            >
              {' '}
              Home{' '}
            </Button>
          )}
        </div>

        {status === 'unauthenticated' && !isCompDetailsPage && (
          <div className=" flex gap-3   font-poppinsreg5  items-center">
            <Button
              onPress={() => setShowSignupModel(true)}
              className=" px-8  bg-transparent border text-slate-700  rounded-full"
            >
              Sign up
            </Button>
            <Button
              onPress={() => setIsShowLoginModel(true)}
              className=" px-8  bg-transparent border  text-slate-700 rounded-full"
            >
              Log In
            </Button>
          </div>
        )}

        {status === 'authenticated' && !isCompDetailsPage && (
          <div className=" flex  items-center gap-5">
            <div className=" flex flex-col ">
              <h1 className=" text-sm font-poppinssemi">
                {' '}
                {`Hi ${session.user.name}`}{' '}
              </h1>
              <h1 className=" font-poppinsreg5 text-sm text-slate-600">{`${
                new Date().getHours() < 12
                  ? 'Good Morning!'
                  : new Date().getHours() < 18
                  ? 'Good Afternoon!'
                  : 'Good Evening!'
              }`}</h1>
            </div>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src="/trinco.jpg"
                />
              </DropdownTrigger>
              <DropdownMenu
                className=" w-full"
                aria-label="Profile Actions"
                variant="flat"
              >
                <DropdownItem
                  onClick={() => router.push('/settings?section=Profile')}
                  key="settings"
                >
                  <h1 className=" w-full">Profile</h1>
                </DropdownItem>
                {/*      
       <DropdownItem key="analytics">
       <Link href={'/settings'}> 
       <h1 className=' w-full'>
       My Reservations
         </h1>
         </Link>

       
       </DropdownItem> */}
                <DropdownItem
                  onClick={() =>
                    router.push('/settings?section=My-Reservations')
                  }
                  key="system"
                >
                  {/* <Link href={'/settings'}> 
       <h1 className=' w-full'>
       Notifications
         </h1>
         </Link> */}
                  {/* onClick={() =>  router.push('/settings?section=My-Reservations')} */}
                  {/* <Link href={'/settings?section=My-Reservations'}>  */}
                  <h1 className=" w-full">My Reservations</h1>
                  {/* </Link> */}
                </DropdownItem>
                {/* <DropdownItem key="configurations">Payment & Billing</DropdownItem> */}

                <DropdownItem key="logout" color="danger">
                  <h1
                    onClick={() => {
                      signOut();
                      router.replace('/');
                    }}
                  >
                    Log Out
                  </h1>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        {/* 
        <div className=' flex   items-center'> 
      

         <Button className='   bg-transparent border  font-poppinsreg5 text-slate-700 px-8 rounded-full'> Reserve</Button>
        </div>

         */}
      </div>
    </>
  );
};

export default Header;
