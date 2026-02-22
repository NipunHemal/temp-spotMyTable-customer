'use client';
import { cities } from '@/helpers/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const Cities = () => {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  interface restaurantsForCities {
    restaurants: number;
    city: string;
  }

  const [resForCities, setresForCities] = useState<restaurantsForCities[]>();

  const [mergedCities, setMergedCities] = useState<any>([]);

  useEffect(() => {
    const getRestaurantsCountByCities = async () => {
      try {
        const response = await fetch(
          `${backend_url}/merchant/cities-with-restaurant-count`,
        );

        const data = await response.json();

        console.log('testing count', data);
        setresForCities(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRestaurantsCountByCities();
  }, []);

  useEffect(() => {
    const merged = cities.map((city) => {
      const found = resForCities?.find((res) => res.city === city.name);
      return {
        ...city,
        restaurants: found ? found.restaurants : 'No',
      };
    });
    setMergedCities(merged);
  }, [resForCities]);

  const router = useRouter();
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const scrollStep = 10; // Adjust scroll step as needed
  const scrollSpeed = 15; // Adjust scroll speed as needed

  let scrollInterval: NodeJS.Timeout;

  const scrollHorizontally = (direction: 'left' | 'right'): void => {
    const scrollSection = scrollSectionRef.current;
    if (!scrollSection) return;
    scrollInterval = setInterval(() => {
      const scrollAmount = direction === 'left' ? -scrollStep : scrollStep;
      scrollSection.scrollBy({ left: scrollAmount });
    }, scrollSpeed);
  };

  const stopScroll = (): void => {
    clearInterval(scrollInterval);
  };

  return (
    //     <div className=' overflow-x-auto '>
    //     <div className=' flex  md:gap-0 gap-1  justify-between'>

    //  <h1 className=' font-poppinssemi text-2xl md:text-3xl text-slate-800'> Find Restaurant From Cities </h1>

    // <div id="scrollContainer" className='  md:flex hidden gap-4 items-center'>
    // <div    onMouseUp={stopScroll}
    //           onMouseLeave={stopScroll} onClick={() => scrollHorizontally('left')} className=' bg-[#F4F4F4] rounded-full flex justify-center items-center p-1'>

    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 text-[#FF385C] h-6">
    // <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    // </svg>

    // </div>

    // <div  onMouseUp={stopScroll}
    //                       onMouseLeave={stopScroll} onClick={() => scrollHorizontally('right')} className=' bg-[#F4F4F4] rounded-full flex justify-center items-center p-1'>

    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6  text-[#FF385C] h-6">
    // <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    // </svg>

    //     </div>
    // </div>

    //  </div>

    // {/* restaurants  */}

    // <div ref={scrollSectionRef} className='   grid  grid-flow-col mt-3 md:mt-5  scrollbar-hide  gap-3 overflow-x-auto   items-stretch'>

    // {
    //    mergedCities?.map( (city:any,i:any) => (

    //         <div key={i} onClick={() => router.push(`/restaurants/${city?.name}`)} className=' w-48 cursor-pointer    flex flex-col gap-1 border   flex-shrink-0  rounded-lg   '>

    //         <Image src={city?.image} alt='restaurant' className='  rounded-t-lg  rounded-b-none w-full  h-36 object-cover' width={500} height={500} />

    //    <div className=' flex flex-col  p-2'>

    //    <h1 className='  md:text-lg  font-poppinssemi'> {city?.name} </h1>

    //    <p className=' text-slate-700 text-xs md:text-sm font-poppinsreg'> {city.restaurants} Places</p>
    //    </div>

    //      </div>

    //     ) )
    // }

    // </div>

    // {/* restaurants  */}

    //     </div>

    <div className="overflow-x-auto">
      <div className="flex md:gap-0 gap-1 justify-between">
        <h1 className="font-poppinssemi text-2xl md:text-3xl text-slate-800">
          {/* Find Restaurant From Cities */}
          Find Your Favorite Resturant
        </h1>
        <div className="md:flex hidden gap-4 items-center">
          <div
            onMouseDown={() => scrollHorizontally('left')}
            onMouseUp={stopScroll}
            onMouseLeave={stopScroll}
            className="bg-[#F4F4F4] rounded-full flex justify-center items-center p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 select-none  text-[#FF385C] h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <div
            onMouseDown={() => scrollHorizontally('right')}
            onMouseUp={stopScroll}
            onMouseLeave={stopScroll}
            className="bg-[#F4F4F4] rounded-full flex justify-center items-center p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className=" select-none  w-6 text-[#FF385C] h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        ref={scrollSectionRef}
        className="grid grid-flow-col mt-3 md:mt-5 scrollbar-hide gap-3 overflow-x-auto items-stretch"
      >
        {mergedCities?.map((city: any, i: any) => (
          <div
            key={i}
            onClick={() => router.push(`/restaurants/${city?.name}`)}
            className="w-48 cursor-pointer flex flex-col gap-1 border flex-shrink-0 rounded-lg"
          >
            <Image
              src={city?.image}
              alt="restaurant"
              className="rounded-t-lg rounded-b-none w-full h-36 object-cover"
              width={500}
              height={500}
            />
            <div className="flex flex-col p-2">
              <h1 className="md:text-lg font-poppinssemi">{city?.name}</h1>
              <p className="text-slate-700 text-xs md:text-sm font-poppinsreg">
                {city.restaurants} Places
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;
