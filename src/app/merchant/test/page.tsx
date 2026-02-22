'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'

import GooglePlacesAutocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';


const Page = () => {

    const [businessName, setBusinessName] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const [signupresult, setsignupresult] = useState("")

  const [BusinessVefied, setBusinessVefied] = useState(false)



  const [showonboarding, setshowonboarding] = useState(false)


  const [businessIdgettinginput, setbusinessIdgettinginput] = useState("")



  const getBusinessId = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': '7379f89424msh1724977b0fd90f2p1ca3c0jsn6753f6a28c50',
        'x-rapidapi-host': 'sri-lanka-company-data.p.rapidapi.com'
      },
      body: JSON.stringify({
        criteria: 2,
        searchtext: businessIdgettinginput,
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiZjNjZWNjNjQ4MWY3ZWYwZWFlNGZmYzJhMjZjMDMwMWFhYTJjY2U2NWVlMmRiZjdkMjg1NjBjYjZlMTM1ODIyYTQ5MGZiMTdjNDhkYmZiIn0 '
      })
    };

    try {
      const response = await fetch('https://sri-lanka-company-data.p.rapidapi.com/api/v1/eroc/name/search', options);
      const result = await response.json();
      console.log(result);
      
  } catch (error) {
     console.log(error);
     
  } 
 
}

















  

  const handleVerify = async () => {
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
      const response = await fetch('https://sri-lanka-company-data.p.rapidapi.com/api/v1/eroc/name/search', options);
      const result = await response.json();

      console.log(result);
      

        // if (result.availableData.data && result.availableData.data.length > 0) {
        //   const found = result.availableData.data.some((company:any) => company.registration_no === businessId);
        //   if (found) {
        //     setResultMessage(`${businessName}: Your business is available`);
        //     setBusinessVefied(true)
        //   } else {
        //     setResultMessage(`${businessName}: Your business is not available`);
        //     setBusinessVefied(false)
        //   }
        // } else {
        //   setResultMessage(`${businessName}: Your business is not available`);
        //   setBusinessVefied(false)

        // }
    } catch (error) {
      console.error('Error:', error);
      setResultMessage('Error occurred while verifying the business');
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [bus_id, setbus_id] = useState("")

// http://localhost:5000
  //  const backend_url = process.env.BACKEND_URL
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSignup = async () => {
    try {
      const response = await fetch(`${backend_url}/api/auth/merchant-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password , bus_id })
      });
      const data = await response.json();
      console.log(data);
      
      if (data.status === 'success') {
       setsignupresult('Signup successful!');
        setshowonboarding(true)
      } else {
       setsignupresult(data.message);
      }
    } catch (error) {
     setsignupresult('Error occurred during signup');
    }
  };


//  merchant onboarding 

const [onboardingResult, setonboardingResult] = useState("")

const handleMerchantOnboarding = async () => {
  try {
      const response = await fetch(`${backend_url}/merchant/merchant-onboarding`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email, // This should be the email of the already signed-up user
              restaurantName, restaurantAddress, city, District,
              latitude, longitude, openingHours
          })
      });
      const data = await response.json();
      console.log(data);

      if (data.status === 'success') {
          setonboardingResult('Onboarding successful!');
      } else {
          setonboardingResult(data.message);
      }
  } catch (error) {
      setonboardingResult('Error occurred during onboarding');
  }
};

//  merchant onboarding 



  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [city, setCity] = useState('');
  // const [openingHours, setOpeningHours] = useState(Array(7).fill({ open: '', close: '' }));
  // const [openingHours, setOpeningHours] = useState(
  //   Array(7).fill({ day: '', open: '', close: '' })
  // );

  // const [openingHours, setOpeningHours] = useState([
  //   { day: 'Sunday', open: '', close: '' },
  //   { day: 'Monday', open: '', close: '' },
  //   { day: 'Tuesday', open: '', close: '' },
  //   { day: 'Wednesday', open: '', close: '' },
  //   { day: 'Thursday', open: '', close: '' },
  //   { day: 'Friday', open: '', close: '' },
  //   { day: 'Saturday', open: '', close: '' }
  // ]);

  const [openingHours, setOpeningHours] = useState([
    { day: 'Sunday', open: null, close: null },
    { day: 'Monday', open: null, close: null },
    { day: 'Tuesday', open: null, close: null },
    { day: 'Wednesday', open: null, close: null },
    { day: 'Thursday', open: null, close: null },
    { day: 'Friday', open: null, close: null },
    { day: 'Saturday', open: null, close: null }
  ]);
  

  const [District, setDistrict] = useState("")

  const handleAddressSelect = (place:any) => {
    const address = place.formatted_address || "";
    // const city = place.address_components.find( (comp:any) => comp.types.includes('locality'))?.long_name || '';
    // setRestaurantAddress(address);
    // setCity(city);
    const districtComponent = place.address_components?.find( (comp:any) => comp.types.includes('administrative_area_level_2'));
    const district = districtComponent?.long_name || '';
  
    // If district not found, fallback to the city (locality) component
    const cityComponent = districtComponent || place.address_components?.find( (comp:any) => comp.types.includes('locality'));
    const city = cityComponent?.long_name || '';


    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setLatitude(lat);
    setLongitude(lng);
  
    setRestaurantAddress(address);
    setCity(city);
    setDistrict(district);
  };

  // const handleTimeChange = (day:any, type:any, time:any) => {
  //   // const updatedHours = [...openingHours];
  //   // updatedHours[day][type] = time;
  //   // setOpeningHours(updatedHours);
  //   const updatedHours = openingHours.map((hours, index) => {
  //     if (index === day) {
  //       return {
  //         ...hours,
  //         [type]: time,
  //       };
  //     }
  //     return hours;
  //   });
  //   setOpeningHours(updatedHours);
  // };

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


  const handleSubmit = () => {
    setErrorMessage("")
    for (let i = 0; i < openingHours.length; i++) {
      const { open, close } = openingHours[i];
      if ((open && !close) || (!open && close)) {
        setErrorMessage(`Error: Incomplete business hours for ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i]}`);
        return; // Stop further execution
      }
    }

    setErrorMessage(''); // Clear any previous error messages

    console.log('Restaurant Name:', restaurantName);
    console.log('Restaurant Address:', restaurantAddress);
    console.log('City:', District);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Opening Hours:', openingHours);


    handleMerchantOnboarding()


  };


  const [errorMessage, setErrorMessage] = useState('');



  const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);






// CITIES LOGIC 
const fetchAllCities = async () => {
  try {
    const response = await fetch(`${backend_url}/city/all-cities`);
    const cities = await response.json();
    console.log(cities); // Do something with the cities array
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

 

// upload new city 

const [cityName, setCityName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

const uploadCityData = async (cityName:string, imageFile:File) => {
  try {
    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'lm5y6hur'); // Replace 'your_upload_preset' with your Cloudinary upload preset
    const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/deyk0uh6i/image/upload', {
      method: 'POST',
      body: formData
    });
    const cloudinaryData = await cloudinaryResponse.json();
    const imageUrl = cloudinaryData.secure_url; // Retrieve the image URL from Cloudinary response

    console.log(imageUrl);
    

    // Upload city data to backend with the image URL
    const response = await fetch('http://localhost:5000/city/upload-city', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cityName, imageUrl })
    });
    const newCity = await response.json();
    console.log('New city created:', newCity);
  } catch (error) {
    console.error('Error uploading city data:', error);
  }
};

// upload new city 

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    // uploadCityData(cityName, file);
    setSelectedFile(file);
  }
};

const handleimageupload = () => {
  if (!selectedFile) {
    console.error('Please select a file');
    return;
  }

  if (!cityName.trim()) {
    console.error('Please enter a city name');
    return;
  }

  // Call the function to upload city data with the selected file and city name
  uploadCityData(cityName, selectedFile);
};

// CITIES LOGIC 












// UPLOAD BANNER AND COVER IMAGE 
const [bannerImage, setBannerImage] = useState<File | null>(null);
const [coverImage, setcoverImage] = useState<File | null>(null);



// assualt 
const [tempEmail, settempEmail] = useState("centralrestaurant@gmail.com")

 

const handleBannerImageupload = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    // uploadCityData(cityName, file);
    setBannerImage(file);
  }
};

const handleCoverImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    // uploadCityData(cityName, file);
    setcoverImage(file);
  }
};



const handleRestaurantImageUploads = async () => {
  if (!bannerImage && !coverImage) {
    console.error('Please select a any images');
    return;
  }


  // Call the function to upload city data with the selected file and city name
  try {
    const formData = new FormData();
    if (bannerImage) {
      formData.append('bannerImage', bannerImage);
    }
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }
    formData.append('upload_preset', 'lm5y6hur'); // Replace with your Cloudinary upload preset

    // Assuming we upload one image at a time, we should loop through the form data
    const uploadImage = async (file: File, preset: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset);
      const response = await fetch('https://api.cloudinary.com/v1_1/deyk0uh6i/image/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }
      return response.json();
    };

    // Upload banner image if it exists
    let bannerImageUrl = '';
    let coverImageUrl = '';
    if (bannerImage) {
      const bannerImageData = await uploadImage(bannerImage, 'lm5y6hur');
      bannerImageUrl = bannerImageData.secure_url;
      console.log('Banner Image URL:', bannerImageData.secure_url);
    }

    // Upload cover image if it exists
    if (coverImage) {
      const coverImageData = await uploadImage(coverImage, 'lm5y6hur');
      coverImageUrl = coverImageData.secure_url;
      console.log('Cover Image URL:', coverImageData.secure_url);
    }
    

    // Upload city data to backend with the image URL
    // below part 
    const response = await fetch(`${backend_url}/merchant/merchant-uploadImages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
       email : tempEmail,
        banner_img: bannerImageUrl,
        cover_img: coverImageUrl
       })
    });


    if (!response.ok) {
      throw new Error('Failed to upload images to the backend');
    }
    const imageData = await response.json();
    console.log('images uploaded:', imageData);
 

    // above part 


  } catch (error) {
    console.error('Error uploading image data:', error);
  }
};

// UPLOAD BANNER AND COVER IMAGE 






// ADD NEW TABLE 


const [tableImageFile, settableImageFile] = useState<File | null>(null);



 

const handletableImageupload = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    // uploadCityData(cityName, file);
    settableImageFile(file);
  }
};



interface TableDataProps {
  table_number: number | string,
  table_image: string,
  max_seating: number | string,
  merchant_id: string,
}
 
const addTable = async (tableData:TableDataProps) => {
  console.log(backend_url);
  
  try {
    const response = await fetch(`${backend_url}/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    });
    if (!response.ok) {
      throw new Error('Failed to create table');
    }
    const newTable = await response.json();
    return newTable;
  } catch (error) {
    console.error('Error creating table:', error);
    return null;
  }
};

const [tableNumber, setTableNumber] = useState('');
const [tableImage, setTableImage] = useState('');
const [maxSeating, setMaxSeating] = useState('');
const [merchantID, setmerchantID] = useState("")
// const merchantId = '665d4133c78d1e633aa46ca6';



const handleTableSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();


  // code sample 
  if (!tableImageFile) {
    console.error('Please select a any images');
    return;
  }


  // Call the function to upload city data with the selected file and city name
  try {
    const formData = new FormData();
    if (tableImageFile) {
      formData.append('tableImage',tableImageFile);
    }
  
    formData.append('upload_preset', 'lm5y6hur'); // Replace with your Cloudinary upload preset

    // Assuming we upload one image at a time, we should loop through the form data
    const uploadImage = async (file: File, preset: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset);
      const response = await fetch('https://api.cloudinary.com/v1_1/deyk0uh6i/image/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }
      return response.json();
    };

    // Upload banner image if it exists
    let TableImageUrl = '';
   
    if (tableImageFile) {
      const bannerImageData = await uploadImage(tableImageFile, 'lm5y6hur');
      TableImageUrl = bannerImageData.secure_url;
      console.log('Banner Image URL:', bannerImageData.secure_url);
    }
  // code sample 

  
const tableData = {
    table_number: tableNumber,
    table_image: TableImageUrl,
    max_seating: maxSeating,
    merchant_id: merchantID,
  };

  const newTable = await addTable(tableData);
  if (newTable) {
    console.log('New table created:', newTable);
    // Optionally reset form or update UI
  }
} catch (error) {
     console.log(error);
       
} }




// ADD NEW TABLE 


// FETCH ALL TABLES BY MERCHANT ID 

const fetchTablesByMerchant = async (merchantId:string) => {
  try {
    const response = await fetch(`${backend_url}/tables/merchant/${merchantId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tables');
    }
    const tables = await response.json();
    return tables;
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
};


const [tables, setTables] = useState<any[]>([]);


// useEffect(() => {
//   const getTables = async () => {
//     const fetchedTables = await fetchTablesByMerchant(merchantID);
//     setTables(fetchedTables);
//   };

//   getTables();
// }, [merchantID]);
// FETCH ALL TABLES BY MERCHANT ID 







// ADD RESERVATIONS 

const [date, setDate] = useState('');
const [startTime, setStartTime] = useState('');
const [endTime, setEndTime] = useState('');
const [guestCount, setGuestCount] = useState('');
const [tableId, setTableId] = useState('');

// customer_email,
// customer_number,
// customer_name



const handleReservationSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await fetch(`${backend_url}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        start_time: startTime,
        end_time: endTime,
        guest_count: parseInt(guestCount),
        table_id: tableId,
        merchant_id : merchantID,
        customer_email : "jmg@gmail.com",
        customer_name : "Jawidh Muhammadh",
        customer_number : "+94778319382"
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }
    const responseData = await response.json();
    console.log('Reservation created:', responseData);
    // Optionally reset the form or update UI
  } catch (error) {
    console.error('Error creating reservation:', error);
    // Handle error - display a message or log it
  }
};




// ADD RESERVATIONS 




  return (
    // rrrrrrrrrrrrrrrrrrrrrrrrrrrrr
   <>


   <div className=' pb-10'> 
    <h1>  BUSINESS ID GETTING PLACE </h1>
    <input value={businessIdgettinginput} onChange={(e) => setbusinessIdgettinginput(e.target.value)} className=' border' placeholder='business id get' /> 
   <button onClick={ getBusinessId}>  search busienss id </button>
   </div>

    <div>
      <input
        placeholder='Business Name'
        className='w-[200px] p-1 border'
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      <input
        placeholder='Business ID'
        className='w-[200px] p-1 border'
        value={businessId}
        onChange={(e) => setBusinessId(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {resultMessage && <p>{resultMessage}</p>}
    </div>


{/* 
    {BusinessVefied && (
      
      )}

 */}


<div> 
         

<input 
           placeholder='business id'
           type='text'
           className='border'
           value={bus_id}
           onChange={(e) =>  setbus_id(e.target.value)}
          />

          <input
            placeholder='Email'
            className='border'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Password'
            type='password'
            className='border'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

   
          <button onClick={handleSignup}>Signup</button>



          {signupresult && <p>{signupresult}</p>}
        </div>

      {
        showonboarding &&

        <div> 
            <div>
      <input
        placeholder='Restaurant Name'
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        className='w-[200px] p-1 border'
      />

      <GooglePlacesAutocomplete
        apiKey='AIzaSyCB_jT6LWXfo47cjjJoZqjHJjZSONMHhW4'
        onPlaceSelected={handleAddressSelect}
        className='w-[200px] p-1 border'
        options={{
            types: ['establishment'], // Adjust this to control what types of places are returned
            componentRestrictions: { country: 'lk' } // Restrict to a specific country (LK for Sri Lanka)
          }}
      />

      {/* <div>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <div key={index}>
            <h4>{day}</h4>
            <DatePicker
              selected={openingHours[index].open}
              onChange={(time) => handleTimeChange(index, 'open', time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption='Open'
              dateFormat='h:mm aa'
              placeholderText='Open Time'
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
            />
          </div>
        ))}
      </div> */}

<div>
    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
      <div key={index}>
        <h4>{day}</h4>
        <DatePicker
          selected={openingHours[index].open}
          onChange={(time) => handleTimeChange(index, 'open', time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption='Open'
          dateFormat='h:mm aa'
          placeholderText='Open Time'
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
        />
      </div>
    ))}
  </div>

      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

      <button onClick={handleSubmit}>Submit</button>

    
    {onboardingResult &&  <h1> {onboardingResult} </h1>}

    </div>

            {/* location  */}

            {/* opening and closing hours */}

            {/* coverimage  */}

        </div>
      }
 

 {
   onboardingResult === "Onboarding successful!" &&

   <div>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={cityName} 
        onChange={(e) => setCityName(e.target.value)} 
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      <button onClick={handleimageupload}>Upload City Data</button>
    </div>


 }




   <div>
    
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleBannerImageupload} 
      />

<input 
        type="file" 
        accept="image/*" 
        onChange={handleCoverImageUpload} 
      />
      <button onClick={handleRestaurantImageUploads}>Upload images</button>
    </div>




    <div className=' mt-20'>

        <form onSubmit={handleTableSubmit}>
      <div>
        <label>
          Table Number:
          <input type="text" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Table Image URL:
          {/* <input type="text" value={tableImage} onChange={(e) => setTableImage(e.target.value)} required /> */}
          <input 
        type="file" 
        accept="image/*" 
        onChange={handletableImageupload} 
      />
        </label>
      </div>
      <div>
        <label>
          Max Seating Capacity:
          <input type="number" value={maxSeating} onChange={(e) => setMaxSeating(e.target.value)} required />
        </label>
      </div>

      <div>
        <label>
          MerchantID:
          <input className='border' type="text" value={merchantID} onChange={(e) => setmerchantID(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Add Table</button>
    </form> 

    </div>




    <div> 
      <h1> All the tables </h1>

      <div>
      <h1>Tables</h1>
      <ul>
        {tables.map((table) => (
          <li key={table._id}>
            table number {table.table_number} - {table.max_seating} seats
            <Image src={table.table_image} width={100} height={100} className=' w-48 h-fit object-cover' alt={`Table ${table.table_number}`} />
          </li>
        ))}
      </ul>
    </div>
    </div>





    <div className='pb-20 mt-5'> 
      <h1 className=' font-poppinsbold '> Add reservation </h1>

      <form onSubmit={handleReservationSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <input placeholder='guest count' className='border' type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} />
      <input placeholder='table id' className=' border' type="text" value={tableId} onChange={(e) => setTableId(e.target.value)} />
      <button className=' bg-black text-white p-2 rounded-md' type="submit">Add Reservation</button>
    </form>
    </div>






</>




  )
}

export default Page