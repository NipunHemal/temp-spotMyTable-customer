import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

export interface Restaurant {
  id: string | number;
  name: string;
  image: string;
  slogan: string;
}

export interface RestaurantListingProps {
  title: string;
  restaurants: any[];
  city?: string;
  showViewAllRestaurant?: boolean;
}

const RestaurantListing = ({
  title,
  restaurants,
  city,
  showViewAllRestaurant,
}: RestaurantListingProps) => {
  const router = useRouter();

  return (
    <div className=" overflow-x-auto">
      <div className=" flex md:flex-row flex-col md:gap-0 gap-1  md:justify-between">
        <h1 className=" font-poppinssemi text-xl md:text-3xl text-slate-800">
          {' '}
          {title}{' '}
        </h1>

        {restaurants?.length !== 0 && showViewAllRestaurant && (
          <h1
            onClick={() => router.push(`/restaurants/${city}`)}
            className="  font-poppinsreg5 cursor-pointer text-slate-700 underline md:text-base text-sm md:text-center"
          >
            {' '}
            View all restaurants{' '}
          </h1>
        )}
      </div>

      {/* restaurants  */}

      <div className="   grid md:grid-cols-3   grid-cols-2 lg:grid-cols-4 mt-3 md:mt-5   gap-3   items-stretch">
        {restaurants?.map((restaurant: any, i: any) => (
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

            <div className=" flex flex-col  p-2">
              {restaurant?.restaurantName && (
                <h1 className="  md:text-lg  font-poppinssemi">
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

              {/* ratings  */}
              <div className="flex items-center gap-1">
                {restaurant.ratingAverage && restaurant.ratingCount > 0 ? (
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
                                <stop offset="50%" stopColor="lightgray" />
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
                ) : // (
                //   <span className="text-sm text-gray-500">No ratings</span>
                // )}
                null}
              </div>

              {/* ratings  ends */}

              <div className="flexchange hidden items-center gap-1 mt-1">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = restaurant?.rating || 4.6;
                  const isFilled = index < Math.floor(ratingValue);

                  return isFilled ? (
                    // ✅ Filled star (Heroicons solid style)
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
          5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 
          3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 
          1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
          -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 
          2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    // ⭕ Empty star (outline only)
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4 text-yellow-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 
          5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 
          3.602a.563.563 0 0 0-.182.557l1.285 
          5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 
          0 0 0-.586 0L6.982 
          20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 
          0 0 0-.182-.557l-4.204-3.602a.562.562 
          0 0 1 .321-.988l5.518-.442a.563.563 
          0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  );
                })}

                <span className="text-xs font-poppinsreg text-gray-600 ml-1">
                  ({restaurant?.rating || '4.6'} ratings)
                </span>
              </div>

              {/* <p className=' text-slate-700 text-xs md:text-sm font-poppinsreg'>{restaurant?.slogan?.length > 35 ? restaurant?.slogan?.slice(0, 35) + '...' : restaurant?.slogan}</p> */}
              {/* slogan commented */}
              {/* <p className=' text-slate-700 text-xs md:text-sm font-poppinsreg'>{"Where Modern Meets Comfort".length > 35 ? "Where Modern Meets Comfort".slice(0, 35) + '...' : "Where Modern Meets Comfort"}</p> */}
            </div>
          </div>
        ))}

        {restaurants?.length === 0 && (
          <h1 className=" font-poppinsreg text-slate-700 col-span-full ">
            {' '}
            {` ${
              title === 'Top Rated Restaurants Near You'
                ? 'No top rated restaurants found'
                : ' No restaurants found in this city.'
            } `}
          </h1>
        )}
      </div>

      {/* restaurants  */}
    </div>
  );
};

export default RestaurantListing;
