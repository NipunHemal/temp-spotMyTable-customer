// import { Poppin600, Poppin700, PoppinReg } from "@/helper/fonts";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { FC, useState } from 'react';
// import { useForm } from "react-hook-form";
// import { ZodType, z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signup } from "@/app/home/action";
// import { useTemp } from "@/context/tempContext";
import { useRouter } from 'next/navigation';
import { useTemp } from '@/context/tempContext';

import { signIn } from 'next-auth/react';

import { motion } from 'framer-motion';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface Isignin {
  show?: boolean;
  close?: () => void;
  isLogin?: boolean;
}

type userData = {
  email: string;
  password: string;
  phone: string;
};

type SignInUserData = {
  email: string;
  password: string;
};

const Signin: FC<Isignin> = ({ show = false, close, isLogin = false }) => {
  const router = useRouter();
  const {
    isSignupSuccess,
    setisSignupSuccess,
    setShowSignupModel,
    showSignupModel,
    showLoginModel,
    setIsShowLoginModel,
    loginSucsess,
    setloginSuccess,
    signUpSuccess,
    setSignUpSuccess,

    terms,
    setterms,

    setAboutUs,
    aboutUs,
  } = useTemp();

  const [errorMessageLoginEmail, seterrorMessageLoginEmail] = useState('');
  const [errorMessageLoginPass, seterrorMessageLoginPass] = useState('');
  const [disbalebutton, setdisbalebutton] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [successlogin, setsuccesslogin] = useState(false);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypepassword, setRetypePassword] = useState('');

  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e: any) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Improved email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      // setemailError("Please enter a valid email address");
      setIsValid(false);
    } else {
      // setemailError("");
      setIsValid(true);
    }
  };

  const [phoneNumber, setPhoneNumber] = useState('94');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [message, setMessage] = useState('');

  // phone number change handle
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
    setPhoneNumber(cleanedInput);
  };
  // phone number change handle

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    seterrorMessageLoginEmail('');
    seterrorMessageLoginPass('');

    if (!email) {
      seterrorMessageLoginEmail('Email is required');
      setLoading(false);
      return;
    }

    if (!password) {
      seterrorMessageLoginPass('Password is required');
      setLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      if (res.error === 'User does not exist!') {
        setError('User does not exist!');
      } else if (res.error === 'Invalid credentials') {
        setError('Invalid credentials');
      } else if (res.error === 'User is banned') {
        setError(
          'Your account has been temporarily suspended. Please contact our support team at support@spotmytable.com to resolve this issue.',
        );
      } else {
        // General error handling if needed
        setError('An error occurred. Please try again.');
      }
      setLoading(false);
      // console.log(res.error);lxlx
    } else {
      // setSuccess("Login successful!");
      setIsShowLoginModel(false);
      setLoading(false);
      setloginSuccess(true);
      setTimeout(() => {
        setloginSuccess(false);
      }, 1500);
      // Redirect or handle successful login
      // console.log("Login successful!");lxlx
    }
  };

  const [signuperrormessage, setsignuperrormessage] = useState('');

  const [nameError, setnameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [retypepasswordError, setRetypepasswordError] = useState('');
  const [mobileError, setmobilError] = useState('');
  const [notvaliderror, setnotvaliderror] = useState('');

  const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    setnameError('');
    setemailError('');
    setnotvaliderror('');
    setpasswordError('');
    setRetypepasswordError('');
    setmobilError('');

    if (!name) {
      setnameError('Name is required');
      setLoading(false);
      return;
    }

    if (!email) {
      setemailError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!isValid) {
      setnotvaliderror('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!password) {
      setpasswordError('Password is required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setpasswordError('Password should be minimum of 6 characters');
      setLoading(false);
      return;
    }

    if (!retypepassword) {
      setRetypepasswordError('Re-enter Password is required');
      setLoading(false);
      return;
    }

    if (phoneNumber.length <= 2 || phoneNumber.length !== 11) {
      setmobilError('Enter a valid mobile number');
      setLoading(false);
      return;
    }

    const afterPrefix = phoneNumber.slice(2);

    if (/^(\d)\1+$/.test(afterPrefix)) {
      setmobilError('Invalid mobile number. Repeated digits are not allowed.');
      setLoading(false);
      return;
    }

    if (retypepassword !== password) {
      setLoading(false);
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      const res = await fetch(`${backend_url}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone: phoneNumber }),
      });

      const data = await res.json();
      console.log(data);

      // setLoading(false);

      if (res.ok) {
        setMessage(
          'Signup successful! Please check your email to verify your account.',
        );

        // Authenticate the user with the received token
        const signInResponse = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (signInResponse?.error) {
          setError(signInResponse.error);
          setLoading(false);
        } else {
          // Redirect or take any additional action on successful sign-in
          // Example: router.push('/dashboard');
          setShowSignupModel(false);
          setLoading(false);
          setSignUpSuccess(true);
          setTimeout(() => {
            setSignUpSuccess(false);
          }, 1500);
        }
      } else {
        setError(data.msg || 'Something went wrong');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError('Something went wrong');
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const toggleVisibility2 = () => setIsVisible2((prev) => !prev);

  // forgot password

  const [step, setStep] = useState(1);
  const [emailForReset, setEmailForReset] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingForReset, setLoadingForReset] = useState(false);

  const resetAll = () => {
    setEmailForReset('');
    setCode('');
    setNewPassword('');
    setStep(1);
    setModalOpen(false);
    setLoadingForReset(false);
    setForgotModalOpen(false);
  };

  // const handleForgotPassword = async () => {
  //   const email = prompt('Enter your email:');
  //   if (!email) return alert('Email is required.');

  //   try {
  //     // 1. Request reset code
  //     const sendCodeRes = await fetch(
  //       `${backend_url}/api/auth/forgot-password`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email }),
  //       },
  //     );

  //     const sendCodeData = await sendCodeRes.json();
  //     if (!sendCodeRes.ok)
  //       return alert(sendCodeData.msg || 'Failed to send reset code.');

  //     alert('Reset code sent to your email.');

  //     // 2. Ask for reset code
  //     const code = prompt('Enter the reset code sent to your email:');
  //     if (!code) return alert('Reset code is required.');

  //     const verifyRes = await fetch(
  //       `${backend_url}/api/auth/verify-reset-code`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email, code }),
  //       },
  //     );

  //     const verifyData = await verifyRes.json();
  //     if (!verifyRes.ok)
  //       return alert(verifyData.msg || 'Invalid or expired reset code.');

  //     // 3. Ask for new password
  //     const newPassword = prompt('Enter your new password:');
  //     if (!newPassword) return alert('New password is required.');

  //     const resetRes = await fetch(`${backend_url}/api/auth/reset-password`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, code, newPassword }),
  //     });

  //     const resetData = await resetRes.json();
  //     if (!resetRes.ok)
  //       return alert(resetData.msg || 'Failed to reset password.');

  //     alert(
  //       'Password reset successful. You can now log in with your new password.',
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     alert('Something went wrong. Please try again later.');
  //   }
  // };

  // const handleForgotPassword = async () => {
  //   try {
  //     setLoadingForReset(true);

  //     if (step === 1) {
  //       const res = await fetch(`${backend_url}/api/auth/forgot-password`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email: emailForReset }),
  //       });
  //       const data = await res.json();
  //       if (!res.ok) throw new Error(data.msg || 'Failed to send code');
  //       setStep(2);
  //     }

  //     if (step === 2) {
  //       const res = await fetch(`${backend_url}/api/auth/verify-reset-code`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email: emailForReset, code }),
  //       });
  //       const data = await res.json();
  //       if (!res.ok) throw new Error(data.msg || 'Invalid or expired code');
  //       setStep(3);
  //     }

  //     if (step === 3) {
  //       const res = await fetch(`${backend_url}/api/auth/reset-password`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email: emailForReset, code, newPassword }),
  //       });
  //       const data = await res.json();
  //       if (!res.ok) throw new Error(data.msg || 'Password reset failed');

  //       alert('Password reset successful! You can now log in.');
  //       resetAll();
  //     }
  //   } catch (err: any) {
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [showPassResetSuccess, setShowPassResetSuccess] = useState(false);

  const handleForgotPassword = async () => {
    setShowPassResetSuccess(false);
    setLoadingForReset(true);
    try {
      if (step === 1) {
        const res = await fetch(`${backend_url}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailForReset }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Failed to send reset code.');
        setStep(2);
      } else if (step === 2) {
        const res = await fetch(`${backend_url}/api/auth/verify-reset-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailForReset, code }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Invalid or expired code.');
        setStep(3);
      } else if (step === 3) {
        const res = await fetch(`${backend_url}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailForReset, code, newPassword }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Failed to reset password.');
        // alert('Password reset successful. You can now log in.');
        setShowPassResetSuccess(true);
        resetAll();
        setTimeout(() => {
          setShowPassResetSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoadingForReset(false); // ✅ important to ensure it's not stuck
    }
  };

  // forgot password

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  // const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [emailForPass, setEmailForPass] = useState('');
  // const [code, setCode] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const [loadingForPass, setLoadingForPass] = useState(false);

  const handleSendCode = async () => {
    if (!email) return alert('Email is required.');
    setLoading(true);
    try {
      const res = await fetch(`${backend_url}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || 'Error sending code');
      alert('Code sent to your email');
      setStep(2);
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // const handleVerifyCode = async () => {
  //   if (!code) return alert('Code is required.');
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${backend_url}/api/auth/verify-reset-code`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, code }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) return alert(data.msg || 'Invalid code');
  //     alert('Code verified');
  //     setStep(3);
  //   } catch (err) {
  //     alert('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleResetPassword = async () => {
  //   if (!newPassword) return alert('Enter your new password');
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${backend_url}/api/auth/reset-password`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, code, newPassword }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) return alert(data.msg || 'Error resetting password');
  //     alert('Password reset successful');
  //     setStep(1);
  //     setEmail('');
  //     setCode('');
  //     setNewPassword('');
  //     setIsForgotOpen(false);
  //   } catch (err) {
  //     alert('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSendCode = async () => {
  //   if (!email) return alert('Please enter your email');
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${backend_url}/api/auth/forgot-password`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) return alert(data.msg || 'Error sending code');
  //     alert('Code sent to your email');
  //     setStep(2);
  //   } catch (err) {
  //     alert('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleVerifyCode = async () => {
  //   if (!code) return alert('Please enter the code');
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${backend_url}/api/auth/verify-reset-code`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, code }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) return alert(data.msg || 'Invalid code');
  //     alert('Code verified');
  //     setStep(3);
  //   } catch (err) {
  //     alert('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleResetPassword = async () => {
  //   if (!newPassword) return alert('Enter your new password');
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${backend_url}/api/auth/reset-password`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, code, newPassword }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) return alert(data.msg || 'Error resetting password');
  //     alert('Password reset successful');
  //     setStep(1);
  //     setEmail('');
  //     setCode('');
  //     setNewPassword('');
  //     onClose(); // close modal
  //   } catch (err) {
  //     alert('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  return (
    <>
      {showSignupModel ? (
        <div className=" w-full absolute top-0 h-screen bg-black bg-opacity-80 flex justify-center items-end md:items-center">
          <div className="  md:rounded-lg rounded-t-lg lg:w-5/12   md:w-8/12  w-full px-5 py-8 h-fit flex flex-col bg-[#fffdfc] ">
            {/* close icon  */}

            <div className="  w-full h-fit justify-end flex">
              <div
                // onClick={close}
                onClick={() => setShowSignupModel(false)}
                className="  bg-gray-100 hover:bg-gray-200 hover:shadow-sm cursor-pointer transition-all ease-in p-1  rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.9"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            {/* close icon  ends */}

            <h1 className={` font-poppinssemi text-2xl`}>
              {' '}
              Create your account
            </h1>

            <div className=" mt-5 gap-4 flex flex-col">
              {/* <Input type="text" size="sm" variant="flat" label="Your Name" /> */}

              <form
                noValidate
                onSubmit={handleSubmitSignup}
                className=" gap-4 flex flex-col"
                // onSubmit={handleSubmit(signUpUser)}
              >
                {!isLogin && (
                  <div className="flex flex-col gap-[2px]">
                    <h1 className=" text-sm font-poppinsreg text-slate-500">
                      {' '}
                      Name{' '}
                    </h1>
                    <Input
                      //   {...register("phone")}
                      classNames={{
                        input: ' placeholder:text-xs ',
                      }}
                      type="text"
                      size="sm"
                      // label="Name"
                      placeholder="Enter your name"
                      className="  font-poppinsreg"
                      value={name}
                      // onChange={(e) => setName(e.target.value)}
                      onChange={(e) => {
                        const val = e.target.value;

                        // Allow only letters and spaces
                        if (/^[A-Za-z\s]*$/.test(val)) {
                          setName(val);

                          // Optionally clear error if valid
                          if (nameError) setnameError('');
                        }
                      }}
                    />

                    {nameError && (
                      <p className=" text-red-400 font-poppinsreg pt-1 px-1 text-sm">
                        {nameError}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-[2px]">
                  <h1 className=" text-sm font-poppinsreg text-slate-500">
                    {' '}
                    Email{' '}
                  </h1>
                  <Input
                    // {...register("email")}
                    type="email"
                    classNames={{
                      input: ' placeholder:text-xs ',
                    }}
                    size="sm"
                    placeholder="Enter your email"
                    // label="Email"
                    className="  font-poppinsreg"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={handleEmailChange}
                  />

                  {emailError && (
                    <p className=" text-red-400 font-poppinsreg pt-1 px-1 text-sm">
                      {emailError}
                    </p>
                  )}

                  {notvaliderror && (
                    <p className=" text-red-400 font-poppinsreg pt-1 px-1 text-sm">
                      {notvaliderror}
                    </p>
                  )}
                </div>

                <div className=" flex flex-col gap-[2px]">
                  <h1 className=" text-sm font-poppinsreg text-slate-500">
                    {' '}
                    Password{' '}
                  </h1>
                  <Input
                    classNames={{
                      input: ' placeholder:text-xs ',
                    }}
                    // {...register("password")}
                    placeholder="Enter your password"
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeOffIcon className="w-5 h-5 text-default-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-default-400" />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    size="sm"
                    // label="Password"
                    className="  font-poppinsreg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {passwordError && (
                    <p className=" text-red-400  font-poppinsreg pt-1 px-1 text-sm">
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* confirm password  */}
                <div className=" flex flex-col gap-[2px]">
                  <h1 className=" text-sm font-poppinsreg text-slate-500">
                    {' '}
                    Re-enter Password
                  </h1>
                  <Input
                    classNames={{
                      input: ' placeholder:text-xs ',
                    }}
                    // {...register("password")}
                    placeholder="Re-enter your password"
                    endContent={
                      <button type="button" onClick={toggleVisibility2}>
                        {isVisible2 ? (
                          <EyeOffIcon className="w-5 h-5 text-default-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-default-400" />
                        )}
                      </button>
                    }
                    type={isVisible2 ? 'text' : 'password'}
                    size="sm"
                    // label="Password"
                    className="  font-poppinsreg"
                    value={retypepassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />

                  {retypepasswordError && (
                    <p className=" text-red-400  font-poppinsreg pt-1 px-1 text-sm">
                      {retypepasswordError}
                    </p>
                  )}
                </div>
                {/* confirm password  */}

                <div className=" flex flex-col gap-[2px]">
                  <h1 className=" text-sm font-poppinsreg text-slate-500">
                    {' '}
                    Mobile Number{' '}
                  </h1>
                  <Input
                    type="text"
                    size="sm"
                    className="  font-poppinsreg"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />

                  {mobileError && (
                    <p className=" text-red-400  font-poppinsreg pt-1 px-1 text-sm">
                      {mobileError}
                    </p>
                  )}
                </div>

                <h1
                  className={` font-poppinsreg text-center pt-4    text-slate-600  text-sm`}
                >
                  {' '}
                  {`By Signing up , you agree to SpotMyTable's`}
                  <span
                    onClick={() => setterms(true)}
                    className=" hover:underline cursor-pointer text-[#fa6c59]"
                  >
                    {' '}
                    Terms & Conditions
                  </span>{' '}
                  {`and`}
                  <span
                    onClick={() => setAboutUs(true)}
                    className=" hover:underline cursor-pointer text-[#fa6c59]"
                  >
                    {' '}
                    Privacy Policy
                  </span>
                </h1>

                <Button
                  isDisabled={loading}
                  isLoading={loading}
                  type="submit"
                  className={`   font-poppinsreg5 bg-[#fa6c59] text-white `}
                  radius="md"
                >
                  Create New Account
                </Button>
              </form>
            </div>

            {error && (
              <p className=" text-red-400 mt-2 font-poppinsreg text-sm">
                {error}
              </p>
            )}

            <h1 className={`  font-poppinsreg5 text-sm pt-5 text-center`}>
              {' '}
              Already on SpotMyTable?{' '}
              <span
                onClick={() => {
                  setShowSignupModel(false);
                  setIsShowLoginModel(true);
                }}
                className="  cursor-pointer  hover:underline text-[#db614f] "
              >
                {' '}
                Login{' '}
              </span>{' '}
            </h1>
          </div>
        </div>
      ) : null}

      {showLoginModel ? (
        <div className=" w-full absolute top-0 h-screen bg-black bg-opacity-80 flex justify-center items-end md:items-center">
          <div className="  md:rounded-lg rounded-t-lg lg:w-5/12   md:w-8/12  w-full px-5 py-8 h-fit flex flex-col bg-[#fffdfc] ">
            <div className="  w-full h-fit justify-end flex">
              <div
                onClick={() => setIsShowLoginModel(false)}
                className="  bg-gray-100 hover:bg-gray-200 hover:shadow-sm cursor-pointer transition-all ease-in p-1  rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.9"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <h1 className={` font-poppinssemi  text-2xl`}>
              {' '}
              Log in Into Your Account
            </h1>

            <div className=" mt-3 gap-4 flex flex-col">
              <form className=" gap-4 flex flex-col" onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="email"
                    size="sm"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {errorMessageLoginEmail && (
                    <p className=" text-red-400 pt-1 px-1 text-sm">
                      {errorMessageLoginEmail}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    // type="password"
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeOffIcon className="w-5 h-5 text-default-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-default-400" />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    size="sm"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {errorMessageLoginPass && (
                    <p className=" text-red-400 pt-1 px-1 text-sm">
                      {errorMessageLoginPass}
                    </p>
                  )}
                </div>

                <h1
                  // onClick={handleForgotPassword}
                  // onClick={() => {
                  //   // setIsForgotOpen(true);
                  //   // setIsShowLoginModel(false);

                  //   // handleForgotPassword();
                  //   setModalOpen(true);
                  // }}
                  onClick={() => {
                    setForgotModalOpen(true);
                    setPassword('');
                    setEmail('');
                    setError('');
                    console.log('hello');
                  }}
                  className=" px-2  underline text-slate-600 cursor-pointer text-sm"
                >
                  {' '}
                  Forgot Password?{' '}
                </h1>

                <h1
                  className={`font-poppinsreg text-center pt-4    text-slate-600  text-sm`}
                >
                  {' '}
                  {`By Logging in, you agree to SpotMyTable's`}
                  <span
                    onClick={() => setterms(true)}
                    className=" hover:underline cursor-pointer text-[#fa6c59]"
                  >
                    {' '}
                    Terms & Conditions
                  </span>{' '}
                  {`and`}
                  <span
                    onClick={() => setAboutUs(true)}
                    className=" hover:underline cursor-pointer text-[#fa6c59]"
                  >
                    {' '}
                    Privacy Policy
                  </span>
                </h1>

                <Button
                  isDisabled={loading}
                  isLoading={loading}
                  type="submit"
                  className={` font-poppinsreg5 bg-[#fa6c59] text-white `}
                  radius="md"
                >
                  Log in
                </Button>
              </form>
            </div>

            {error && <p className=" mt-2 text-red-500">{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <h1 className={`  font-poppinsreg text-sm pt-5   text-center`}>
              {' '}
              New to SpotMyTable?{' '}
              <span
                onClick={() => {
                  setIsShowLoginModel(false);
                  setShowSignupModel(true);
                }}
                className="  cursor-pointer  hover:underline text-[#db614f] "
              >
                {' '}
                Signup{' '}
              </span>{' '}
            </h1>
          </div>
        </div>
      ) : null}

      {/* forgot password modal  */}
      {/* <Modal isOpen={true} onOpenChange={setIsForgotOpen} backdrop="blur">
        <ModalContent>
          <ModalHeader className="text-lg font-semibold">
            Reset Your Password
          </ModalHeader>
          <ModalBody>
            {step === 1 && (
              <>
                <p className="text-sm text-gray-600">
                  Enter your email to receive a reset code.
                </p>
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code sent to your email.
                </p>
                <Input
                  type="text"
                  label="Reset Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </>
            )}

            {step === 3 && (
              <>
                <p className="text-sm text-gray-600">
                  Enter your new password.
                </p>
                <Input
                  type="password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="light" onClick={() => setIsForgotOpen(false)}>
              Cancel
            </Button>
            {step === 1 && (
              <Button
                color="primary"
                onClick={handleSendCode}
                isLoading={loading}
              >
                Send Code
              </Button>
            )}
            {step === 2 && (
              <Button
                color="primary"
                onClick={handleVerifyCode}
                isLoading={loading}
              >
                Verify Code
              </Button>
            )}
            {step === 3 && (
              <Button
                color="primary"
                onClick={handleResetPassword}
                isLoading={loading}
              >
                Reset Password
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      {/* forgot password modal  ends */}

      {/* <Modal isOpen={forgotModalOpen} onClose={() => setForgotModalOpen(false)}>
        <ModalHeader>
          {step === 1 && 'Enter your Email'}
          {step === 2 && 'Enter Reset Code'}
          {step === 3 && 'Set New Password'}
        </ModalHeader>
        <ModalBody>
          {step === 1 && (
            <Input
              label="Email"
              type="email"
              isRequired
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
            />
          )}
          {step === 2 && (
            <Input
              label="Reset Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              isRequired
            />
          )}
          {step === 3 && (
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isRequired
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={resetAll}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleForgotPassword}
            isLoading={loadingForReset}
          >
            {step === 1 && 'Send Code'}
            {step === 2 && 'Verify Code'}
            {step === 3 && 'Reset Password'}
          </Button>
        </ModalFooter>
      </Modal> */}

      {forgotModalOpen && (
        <div className="fixed top-0 left-0 p-2 w-full h-full bg-black bg-opacity-40 z-[9999] flex items-center justify-center">
          <form
            // onPress={handleForgotPassword}
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto"
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              {step === 1 && 'Forgot Password'}
              {step === 2 && 'Verify Reset Code'}
              {step === 3 && 'Set New Password'}
            </h2>

            <div className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <p className="text-sm text-gray-600">
                    Type your email address to receive a password reset code.
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailForReset}
                    onChange={(e) => setEmailForReset(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:outline-none"
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-sm text-gray-600">
                    Enter the code sent to <strong>{emailForReset}</strong>.
                  </p>
                  <input
                    type="text"
                    placeholder="Enter reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:outline-none"
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <p className="text-sm text-gray-600">
                    Set your new password below.
                  </p>
                  {/* <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    // "anura"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:outline-none"
                  /> */}
                  <Input
                    // type="password"
                    type={isVisible ? 'text' : 'password'}
                    placeholder="New password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    // className="border rounded px-3 py-2 w-full focus:outline-none"
                    value={newPassword}
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeOffIcon className="w-5 h-5 text-default-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-default-400" />
                        )}
                      </button>
                    }
                  />
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="light"
                onPress={resetAll}
                className="border text-gray-600"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isLoading={loadingForReset}
                // onPress={handleForgotPassword}
                className="bg-[#FF385C] text-white"
                isDisabled={
                  (step === 1 && !emailForReset.trim()) ||
                  (step === 2 && !code.trim()) ||
                  (step === 3 && !newPassword.trim())
                }
              >
                {step === 1 && 'Send Code'}
                {step === 2 && 'Verify Code'}
                {step === 3 && 'Reset Password'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* password successfull popup  */}
      {showPassResetSuccess && (
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
                  Password reset successful. You can now log in.
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
      {/* password successfull popup  ends */}
    </>
  );
};

export default Signin;
