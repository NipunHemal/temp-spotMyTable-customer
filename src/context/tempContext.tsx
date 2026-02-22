"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type TempContextType = {
  //   selectedCity: any;
  //   setselectedCity: Dispatch<SetStateAction<any>>;
  //   tempcity: any;
  //   settempcity: Dispatch<SetStateAction<any>>;
  isSignupSuccess: boolean;
  setisSignupSuccess: Dispatch<SetStateAction<boolean>>;
  showSignupModel: boolean;
  setShowSignupModel: Dispatch<SetStateAction<boolean>>;
  isLoginSucces: boolean;
  setIsLoginSuccess: Dispatch<SetStateAction<boolean>>;
  showLoginModel: boolean;
  setIsShowLoginModel: Dispatch<SetStateAction<boolean>>;
  loginSucsess: boolean;
  setloginSuccess: Dispatch<SetStateAction<boolean>>;
  signUpSuccess: boolean;
  setSignUpSuccess: Dispatch<SetStateAction<boolean>>;
  merchantEmail : string;
  setMerchantEmail : Dispatch<SetStateAction<string>>
  aboutUs : boolean;
  setAboutUs : Dispatch<SetStateAction<boolean>>
  cancellation_policy : boolean;
  setCancellation_policy : Dispatch<SetStateAction<boolean>>
  terms: boolean;
  setterms : Dispatch<SetStateAction<boolean>>

  aboutUsCRT: boolean;
  setAboutUsCRT : Dispatch<SetStateAction<boolean>>

};

const TempContext = createContext<TempContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function TempProvider({ children }: UserProviderProps) {
  //   const [selectedCity, setselectedCity] = useState<string>(""); // Initialize with an empty string or an initial value
  //   const [tempcity, settempcity] = useState<string>(""); // Initialize with an empty string or an initial value
  const [isSignupSuccess, setisSignupSuccess] = useState<boolean>(false);
  const [showSignupModel, setShowSignupModel] = useState<boolean>(false);
  const [isLoginSucces, setIsLoginSuccess] = useState<boolean>(false);
  const [showLoginModel, setIsShowLoginModel] = useState<boolean>(false);
  const [loginSucsess, setloginSuccess] = useState<boolean>(false);
  const [ signUpSuccess,  setSignUpSuccess] = useState<boolean>(false);
  const [merchantEmail, setMerchantEmail] = useState<string>("")

  const [aboutUs, setAboutUs] = useState<boolean>(false)
  const [cancellation_policy, setCancellation_policy] = useState<boolean>(false)
  const [terms, setterms] = useState<boolean>(false)
  const [aboutUsCRT, setAboutUsCRT] = useState(false)

  return (
    <TempContext.Provider
      value={{
        // selectedCity,
        // setselectedCity,
        // tempcity,
        // settempcity,
        isSignupSuccess,
        setisSignupSuccess,
        showSignupModel,
        setShowSignupModel,
        isLoginSucces,
        setIsLoginSuccess,
        showLoginModel,
        setIsShowLoginModel,
        loginSucsess,
        setloginSuccess,
        signUpSuccess,
        setSignUpSuccess,
        merchantEmail,
        setMerchantEmail,
        aboutUs,
        setAboutUs,
        cancellation_policy,
        setCancellation_policy,
        terms,
        setterms,
        aboutUsCRT,
        setAboutUsCRT
        
      }}
    >
      {children}
    </TempContext.Provider>
  );
}

export function useTemp() {
  const context = useContext(TempContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}