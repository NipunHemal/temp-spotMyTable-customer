"use client";
import Image from "next/image";
import { RestaurantLayout, Table as MapTable } from "@/types/restaurant";
import dynamic from "next/dynamic";

const RestaurantMap = dynamic(
  () => import("@/components/table-management/RestaurantMap"),
  { ssr: false },
);

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Avatar,
  Button,
  DatePicker,
  DateValue,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { useMediaQuery } from "react-responsive";

import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reservations } from "@/helpers/data";
import Signin from "@/components/comp/Signin";
import { useTemp } from "@/context/tempContext";

import { signOut, useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Page = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const {
    isOpen: customisOpen,
    onOpen: customonOpen,
    onClose: customonClose,
    onOpenChange: customonOpenChange,
  } = useDisclosure();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
    onOpenChange: onOpenChangeSuccess,
  } = useDisclosure();
  const {
    isOpen: isOpenFailed,
    onOpen: onOpenFailed,
    onClose: onCloseFailed,
    onOpenChange: onOpenChangeFailed,
  } = useDisclosure();

  const { data: session, status } = useSession();
  console.log("session in sn id page", session);

  const [value, setValue] = useState<Time | null>(null);
  const [valueend, setValueend] = useState<Time | null>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isInvalid2, setIsInvalid2] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessage2, setErrorMessage2] = useState<string>("");

  const { loginSucsess, setloginSuccess, signUpSuccess, setSignUpSuccess } =
    useTemp();

  const merchantId = "665d4133c78d1e633aa46ca6";
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchTablesByMerchant = async (merchantId: string) => {
    try {
      const response = await fetch(
        `${backend_url}/tables/merchant/${merchantId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tables");
      }
      const tables = await response.json();
      return tables;
    } catch (error) {
      console.error("Error fetching tables:", error);
      return [];
    }
  };

  interface Tabletemp {
    _id: string;
    table_number: number;
    table_image: string;
    max_seating: number;
  }

  const [tablesTemp, setTablesTemp] = useState<Tabletemp[]>([]);

  // the params id in url
  const params = useParams<{ id: string }>();
  // the params id in url ends

  interface RestaurantTable {
    createdAt: string;
    max_seating: number;
    merchant_id: string;
    table_image: string;
    table_number: number;
    reservation_fee: number;
    _id: string;
  }

  // tables for the restaurant
  const [RestaurantTables, setRestaurantTables] = useState<RestaurantTable[]>(
    [],
  );
  // tables for the restaurant ENDS

  const [success, setsuccess] = useState(false);

  useEffect(() => {
    const getTables = async () => {
      const fetchedTables = await fetchTablesByMerchant(params?.id);
      // setTablesTemp(fetchedTables);
      setRestaurantTables(fetchedTables);
      // console.log("tables coming from backend" , fetchedTables);lxlx
    };

    getTables();
  }, [params?.id]);

  type Reservation = {
    id: number;
    tableId: number;
    tableNumber: number;
    date: string;
    startTime: string;
    endTime: string;
    guestCount: number;
  };

  type Table = {
    id: number;
    tableNumber: number;
    seatingCapacity: number;
  };

  type TableWithDetails = RestaurantTable & {
    date: string; // Assuming date is a string in "DD.MM.YYYY" format
    startTime: string; // Assuming startTime is a string in "HH:MM" format
    endTime: string; // Assuming endTime is a string in "HH:MM" format
    guest: string | number;
  };

  const reservations: Reservation[] = [
    {
      id: 1,
      tableId: 1,
      tableNumber: 1,
      date: "03.06.2024",
      startTime: "10:00",
      endTime: "11:15",
      guestCount: 1,
    },
    {
      id: 2,
      tableId: 1,
      tableNumber: 1,
      date: "03.06.2024",
      startTime: "14:00",
      endTime: "15:00",
      guestCount: 2,
    },
    {
      id: 3,
      tableId: 2,
      tableNumber: 2,
      date: "03.06.2024",
      startTime: "09:00",
      endTime: "10:00",
      guestCount: 3,
    },
    {
      id: 4,
      tableId: 3,
      tableNumber: 3,
      date: "03.06.2024",
      startTime: "12:00",
      endTime: "13:00",
      guestCount: 5,
    },
    {
      id: 5,
      tableId: 4,
      tableNumber: 4,
      date: "03.06.2024",
      startTime: "10:00",
      endTime: "11:00",
      guestCount: 4,
    },
    {
      id: 6,
      tableId: 5,
      tableNumber: 5,
      date: "03.06.2024",
      startTime: "12:00",
      endTime: "13:00",
      guestCount: 5,
    },
    {
      id: 7,
      tableId: 6,
      tableNumber: 6,
      date: "03.06.2024",
      startTime: "15:00",
      endTime: "16:00",
      guestCount: 2,
    },
    {
      id: 8,
      tableId: 7,
      tableNumber: 7,
      date: "03.06.2024",
      startTime: "10:00",
      endTime: "11:00",
      guestCount: 8,
    },
    {
      id: 9,
      tableId: 8,
      tableNumber: 8,
      date: "03.06.2024",
      startTime: "14:00",
      endTime: "15:00",
      guestCount: 3,
    },
    {
      id: 10,
      tableId: 9,
      tableNumber: 9,
      date: "03.06.2024",
      startTime: "09:00",
      endTime: "10:00",
      guestCount: 5,
    },
  ];

  const tables: Table[] = [
    { id: 1, tableNumber: 1, seatingCapacity: 2 },
    { id: 2, tableNumber: 2, seatingCapacity: 3 },
    { id: 3, tableNumber: 3, seatingCapacity: 5 },
    { id: 4, tableNumber: 4, seatingCapacity: 4 },
    { id: 5, tableNumber: 5, seatingCapacity: 6 },
    { id: 6, tableNumber: 6, seatingCapacity: 2 },
    { id: 7, tableNumber: 7, seatingCapacity: 8 },
    { id: 8, tableNumber: 8, seatingCapacity: 3 },
    { id: 9, tableNumber: 9, seatingCapacity: 5 },
    { id: 10, tableNumber: 10, seatingCapacity: 4 },
  ];

  const [filteredTables, setFilteredTables] = useState<TableWithDetails[]>([]);

  const formatDate = (date: DateValue) =>
    `${date.day.toString().padStart(2, "0")}.${date.month
      .toString()
      .padStart(2, "0")}.${date.year}`;

  const formatTime = (time: Time) =>
    `${time.hour.toString().padStart(2, "0")}:${time.minute
      .toString()
      .padStart(2, "0")}`;

  const isTimeConflict = (
    start1: string,
    end1: string,
    start2: string,
    end2: string,
  ) => {
    const [start1Hour, start1Minute] = start1.split(":").map(Number);
    const [end1Hour, end1Minute] = end1.split(":").map(Number);
    const [start2Hour, start2Minute] = start2.split(":").map(Number);
    const [end2Hour, end2Minute] = end2.split(":").map(Number);

    const start1TotalMinutes = start1Hour * 60 + start1Minute;
    const end1TotalMinutes = end1Hour * 60 + end1Minute;
    const start2TotalMinutes = start2Hour * 60 + start2Minute;
    const end2TotalMinutes = end2Hour * 60 + end2Minute;

    return (
      start1TotalMinutes < end2TotalMinutes &&
      end1TotalMinutes > start2TotalMinutes
    );
  };

  const [matched, setMatched] = useState<boolean>(false);
  const [notablestoshow, setnotablestoshow] = useState(false);

  // fetch restuarant info from url params

  const isMobile = useMediaQuery({ maxWidth: 768 });

  interface ReservationDB {
    _id: string;
    date: string;
    start_time: string;
    end_time: string;
    guest_count: number;
    reservation_status: string;
    table_id: string;
    merchant_id: string;
    customer_email: string;
    customer_name: string;
    customer_number: string;
  }

  const [reservationsFromDB, setReservationsfromDB] = useState<ReservationDB[]>(
    [],
  );

  // fetch reservations from db
  //  const fetchData = async () => {

  //  };

  // fetch reservations from db

  const [instantTableSearchLoading, setinstantTableSearchLoading] =
    useState(false);

  const handleSearch = async () => {
    setinstantTableSearchLoading(true);
    setnotablestoshow(false);
    const guestCountNumber =
      typeof guestCount === "string" ? parseInt(guestCount) : guestCount;

    if (selectedDate && value && valueend && guestCountNumber) {
      const formattedDate = formatDate(selectedDate);
      const formattedStartTime = formatTime(value);
      const formattedEndTime = formatTime(valueend);

      // console.log(formattedDate); lxlx
      // console.log(formattedStartTime); lxlx
      // console.log(formattedEndTime); lxlx

      // let suitableTables = tables.filter(table => table.seatingCapacity >= guestCountNumber);
      let suitableTables = RestaurantTables?.filter(
        (table) => table.max_seating >= guestCountNumber,
      );

      let matchingTables = RestaurantTables?.filter(
        (table) => table.max_seating === guestCountNumber,
      );
      let matched = matchingTables.length > 0;

      // console.log("Suitable tables (capacity >= guest count):", suitableTables); lxlx
      // console.log("Matching tables (capacity == guest count):", matchingTables);  lxlx

      // get the reservations

      const response = await fetch(`${backend_url}/reservations/${params?.id}`);
      if (!response.ok) {
        throw new Error("Error fetching reservations");
      }
      const data = await response.json();
      console.log("reservations from DB", data);

      setReservationsfromDB(data);

      // get the reservations

      // convert the date to DDMMYYYY
      // const formatDateToDDMMYYYY = (isoDateString:string) => {
      //   const date = new Date(isoDateString);
      //   const day = String(date.getDate()).padStart(2, '0');
      //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      //   const year = date.getFullYear();

      //   return `${day}.${month}.${year}`;
      // };
      // convert the date to DDMMYYYY

      // formatDateToDDMMYYYY

      if (
        matchingTables.length === 0 ||
        matchingTables.every((table) => {
          const conflictingReservations = data?.filter(
            (reservation: ReservationDB) =>
              reservation.table_id === table._id &&
              reservation.date === formattedDate &&
              isTimeConflict(
                formattedStartTime,
                formattedEndTime,
                reservation.start_time,
                reservation.end_time,
              ),
          );
          return conflictingReservations.length > 0;
        })
      ) {
        matchingTables = suitableTables;
        matched = false; // Update matched status for fallback
      }
      // formatDateToDDMMYYYY
      const availableTables = matchingTables.filter((table) => {
        const conflictingReservations = data.filter(
          (reservation: ReservationDB) =>
            reservation.table_id === table._id &&
            reservation.date === formattedDate &&
            isTimeConflict(
              formattedStartTime,
              formattedEndTime,
              reservation.start_time,
              reservation.end_time,
            ),
        );
        return conflictingReservations.length === 0;
      });

      // console.log("Available tables after conflict check:", availableTables);lxlx

      if (availableTables.length === 0) {
        setnotablestoshow(true);
      }

      const tablesWithDetails = availableTables.map((table) => ({
        ...table,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        guest: guestCountNumber,
      }));

      setFilteredTables(tablesWithDetails);
      setMatched(matched);
    }

    setinstantTableSearchLoading(false);
  };

  // reservation type select
  const [type, settype] = useState("instant");
  // reservation type select

  // 2D Map state
  const [mapLayouts, setMapLayouts] = useState<RestaurantLayout[]>([]);
  const [selectedMapLayout, setSelectedMapLayout] =
    useState<RestaurantLayout | null>(null);
  const [selectedMapTable, setSelectedMapTable] = useState<MapTable | null>(
    null,
  );
  const [mapBookedTableIds, setMapBookedTableIds] = useState<string[]>([]);
  const [mapIncompatibleTableIds, setMapIncompatibleTableIds] = useState<
    string[]
  >([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapSearched, setMapSearched] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // handle values

  const [guestCount, setGuestCount] = useState<number | string>(1);

  const [selectedDate, setSelectedDate] = useState<DateValue | null>();

  // Handle date change
  // rrrrrrrrrrrrrrrrrrrr
  const handleDateChange = (newDate: DateValue | null) => {
    setFilteredTables([]);
    setValue(null);
    setValueend(null);
    setSelectedDate(newDate);
    setIsInvalid(false);
    setIsInvalid2(false);
    setErrorMessage("");
    setErrorMessage2("");
    if (newDate) {
      const formattedDate = `${newDate.day
        .toString()
        .padStart(2, "0")}.${newDate.month.toString().padStart(2, "0")}.${newDate.year
        }`;
      // console.log(formattedDate); lxlx
    }
  };

  // Get today's date in the local time zone
  // const todayDate = today(getLocalTimeZone());

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    if (newValue === "") {
      setGuestCount("");
    } else {
      const parsedValue = parseInt(newValue, 10);
      if (parsedValue >= 1) {
        setGuestCount(parsedValue);
      } else {
        setGuestCount(1);
      }
    }
  };

  const handleBlur = (): void => {
    if (guestCount === "") {
      setGuestCount(1);
    }
  };

  // handle values

  // const openingHour = 9
  // const openingMinute = 14

  const [openingHour, setopeningHour] = useState(0);
  const [openingMinute, setopeningMinute] = useState(0);

  const [closeHour, setcloseHour] = useState(0);
  const [closeMinute, setcloseMinute] = useState(0);

  // const minValue: Time = new Time(openingHour, openingMinute); // 9 AM
  // const maxValue: Time = new Time(21 , 30); // 9 PM
  const minValue: Time = new Time(openingHour, openingMinute); // 9 AM
  const maxValue: Time = new Time(closeHour, closeMinute); // 9 PM

  // useEffect(() => {
  //   const getTodayOpeningHours = async () => {
  //     try {
  //       const response = await fetch(`${backend_url}/merchant/getOpeningHours/${params?.id}`);
  //       const data = await response.json();
  //       const openingHours = data.openingHours;
  //       const today = new Date().toLocaleString('en-US', { weekday: 'long' });

  //       const todayOpeningHours = openingHours.find( (hour:any) => hour.day === today);

  //       if (todayOpeningHours && todayOpeningHours.open && todayOpeningHours.close) {
  //         const openTime = new Date(todayOpeningHours.open);
  //         const closeTime = new Date(todayOpeningHours.close);

  //         setopeningHour(openTime.getUTCHours())
  //         setopeningMinute(openTime.getUTCMinutes())
  //         setcloseHour(closeTime.getUTCHours())
  //         setcloseMinute(closeTime.getUTCMinutes())

  //         console.log({ hour: openTime.getUTCHours(), minute: openTime.getUTCMinutes() });
  //         console.log({ hour: closeTime.getUTCHours(), minute: closeTime.getUTCMinutes() });
  //       } else {

  //         console.log("nothing");

  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getTodayOpeningHours();
  // }, [params?.id]);

  const [closedErrorShow, setclosedErrorShow] = useState("");
  const [closed, setclosed] = useState(false);
  const [preferredDefaultDate, setpreferredDefaultDate] =
    useState<DateValue | null>(today(getLocalTimeZone()));
  const [selectedCustomEventDate, setSelectedCustomEventDate] =
    useState<DateValue | null>();

  useEffect(() => {
    setclosed(false);
    const getOpeningHours = async (date: any) => {
      try {
        const response = await fetch(
          `${backend_url}/merchant/getOpeningHours/${params?.id}`,
        );
        const data = await response.json();
        const openingHours = data.openingHours;
        const dayOfWeek = new Date(
          date.year,
          date.month - 1,
          date.day,
        ).toLocaleString("en-US", { weekday: "long" });

        const dayOpeningHours = openingHours.find(
          (hour: any) => hour.day === dayOfWeek,
        );

        if (dayOpeningHours && dayOpeningHours.open && dayOpeningHours.close) {
          const openTime = new Date(dayOpeningHours.open);
          const closeTime = new Date(dayOpeningHours.close);

          // setopeningHour(openTime.getUTCHours());
          // setopeningMinute(openTime.getUTCMinutes());
          // setcloseHour(closeTime.getUTCHours());
          // setcloseMinute(closeTime.getUTCMinutes());

          setopeningHour(openTime.getHours());
          setopeningMinute(openTime.getMinutes());
          setcloseHour(closeTime.getHours());
          setcloseMinute(closeTime.getMinutes());

          // console.log({ hour: openTime.getUTCHours(), minute: openTime.getUTCMinutes() }); lxlx
          // console.log({ hour: closeTime.getUTCHours(), minute: closeTime.getUTCMinutes() }); lxlx
        } else {
          // Handle the case where the restaurant is closed on the selected date
          console.log("Closed on the selected date");
          setclosedErrorShow("The Restaurant is closed on this day");
          setclosed(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate) {
      getOpeningHours(selectedDate);
      return;
    }

    if (preferredDefaultDate) {
      getOpeningHours(preferredDefaultDate);
      return;
    }

    if (selectedCustomEventDate) {
      getOpeningHours(selectedCustomEventDate);
      return;
    }
  }, [selectedDate, params?.id, preferredDefaultDate, selectedCustomEventDate]);

  // nnnnnnnnnnnnnnnnnnnnnnnnnnnn
  // console.log(minValue);

  // const handleChange = (newValue: Time | null): void => {

  //   if (
  //     newValue !== null &&
  //     (newValue.hour < minValue.hour || (newValue.hour === minValue.hour && newValue.minute < minValue.minute))
  //   ) {
  //     setIsInvalid(true);
  //     // setErrorMessage('Select a time after 09:30 AM.');
  //     setErrorMessage(`Select a time after ${openingHour % 12}:${openingMinute} ${openingHour >= 12 ? 'PM' : 'AM'}.`);
  //   } else {
  //     setIsInvalid(false);
  //     setErrorMessage('');
  //   }
  //   setValue(newValue);
  // };

  const handleChange = (newValue: Time | null): void => {
    if (!newValue) {
      setValue(null);
      setIsInvalid(false);
      setErrorMessage("");
      return;
    }

    console.log("Selected Date:", selectedDate);
    console.log("new value", newValue);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const isToday =
      selectedDate &&
      new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day,
      ).toDateString() === now.toDateString();

    // ✅ Check only if newValue is not null
    if (isToday) {
      if (
        newValue.hour < currentHour ||
        (newValue.hour === currentHour && newValue.minute < currentMinute)
      ) {
        setIsInvalid(true);
        setErrorMessage(
          `Start Time: Select a time after current time (${currentHour % 12 || 12
          }:${currentMinute.toString().padStart(2, "0")} ${currentHour >= 12 ? "PM" : "AM"
          }).`,
        );
        setValue(newValue);
        return;
      }
    }

    if (
      newValue !== null &&
      (newValue.hour < minValue.hour ||
        (newValue.hour === minValue.hour &&
          newValue.minute < minValue.minute) ||
        newValue.hour > maxValue.hour ||
        (newValue.hour === maxValue.hour && newValue.minute > maxValue.minute))
    ) {
      setIsInvalid(true);
      if (
        newValue.hour > maxValue.hour ||
        (newValue.hour === maxValue.hour && newValue.minute > maxValue.minute)
      ) {
        setErrorMessage(
          `Start Time : Select a time before ${maxValue.hour % 12 || 12
          }:${String(maxValue.minute).padStart(2, "0")} ${maxValue.hour >= 12 ? "PM" : "AM"
          }.`,
        );
      } else {
        setErrorMessage(
          `Start Time : Select a time after ${openingHour % 12 || 12}:${String(
            openingMinute,
          ).padStart(2, "0")} ${openingHour >= 12 ? "PM" : "AM"}.`,
        );
      }
    } else if (
      valueend !== null &&
      (newValue!.hour > valueend.hour ||
        (newValue!.hour === valueend.hour &&
          newValue!.minute >= valueend.minute))
    ) {
      setIsInvalid(true);
      setErrorMessage(
        `Start Time : Cannot be after or equal to End Time (${valueend.hour % 12 || 12
        }:${valueend.minute.toString().padStart(2, "0")} ${valueend.hour >= 12 ? "PM" : "AM"
        }).`,
      );
    } else {
      setIsInvalid(false);
      setErrorMessage("");
    }
    setValue(newValue);
    // console.log(newValue); lxlx
  };

  const handleChangeSecondTime = (newValue: Time | null): void => {
    // console.log(newValue);

    if (newValue !== null) {
      if (
        newValue.hour > maxValue.hour ||
        (newValue.hour === maxValue.hour && newValue.minute > maxValue.minute)
      ) {
        setIsInvalid2(true);
        setErrorMessage2(
          `End Time : Select a time before ${maxValue.hour % 12 || 12
          }:${maxValue.minute.toString().padStart(2, "0")} ${maxValue.hour >= 12 ? "PM" : "AM"
          }.`,
        );
      } else if (
        value !== null &&
        (newValue.hour < value.hour ||
          (newValue.hour === value.hour && newValue.minute <= value.minute))
      ) {
        setIsInvalid2(true);
        setErrorMessage2(
          `End Time : Select a time after ${value.hour % 12 || 12
          }:${value.minute.toString().padStart(2, "0")} ${value.hour >= 12 ? "PM" : "AM"
          }.`,
        );
      } else {
        setIsInvalid2(false);
        setErrorMessage2("");
      }
      setValueend(newValue);
    } else {
      setIsInvalid2(false);
      setErrorMessage2("");
    }

    // console.log(newValue);lxlx
  };

  // PREFERRED SECTION user selecting time

  const [ErrorMessagePrefferedStart, setErrorMessagePrefferedStart] =
    useState("");
  const [isInvalidpreffered, setisInvalidpreffered] = useState<boolean>(false);
  const [ErrorMessagePrefferedEnd, setErrorMessagePrefferedEnd] = useState("");
  const [isInvalidpreffered2, setisInvalidpreffered2] =
    useState<boolean>(false);
  const [valueStartPreferred, setValuStartPreferred] = useState<Time | null>(
    null,
  );
  const [valueEndPreferred, setValueEndPreferred] = useState<Time | null>(null);

  const handleChangeprefferedStart = (newValue: Time | null): void => {
    if (
      newValue !== null &&
      (newValue.hour < minValue.hour ||
        (newValue.hour === minValue.hour &&
          newValue.minute < minValue.minute) ||
        newValue.hour > maxValue.hour ||
        (newValue.hour === maxValue.hour && newValue.minute > maxValue.minute))
    ) {
      setisInvalidpreffered(true);
      if (
        newValue.hour > maxValue.hour ||
        (newValue.hour === maxValue.hour && newValue.minute > maxValue.minute)
      ) {
        setErrorMessagePrefferedStart(
          `Start Time : Select a time before ${maxValue.hour % 12 || 12
          }:${String(maxValue.minute).padStart(2, "0")} ${maxValue.hour >= 12 ? "PM" : "AM"
          }.`,
        );
      } else {
        setErrorMessagePrefferedStart(
          `Start Time : Select a time after ${openingHour % 12 || 12}:${String(
            openingMinute,
          ).padStart(2, "0")} ${openingHour >= 12 ? "PM" : "AM"}.`,
        );
      }
    } else {
      setisInvalidpreffered(false);
      setErrorMessagePrefferedStart("");
    }

    // CHECKS
    const now = new Date();
    const sel = new Date(
      preferredDefaultDate!.year,
      preferredDefaultDate!.month - 1,
      preferredDefaultDate!.day,
    );
    if (
      sel.getFullYear() === now.getFullYear() &&
      sel.getMonth() === now.getMonth() &&
      sel.getDate() === now.getDate()
    ) {
      if (
        newValue &&
        (newValue.hour < now.getHours() ||
          (newValue.hour === now.getHours() &&
            newValue.minute < now.getMinutes()))
      ) {
        const currentHour12 = now.getHours() % 12 || 12;
        const currentMinute = String(now.getMinutes()).padStart(2, "0");
        const ampm = now.getHours() >= 12 ? "PM" : "AM";

        setisInvalidpreffered(true);
        setErrorMessagePrefferedStart(
          `Start Time : Cannot be before current time (${currentHour12}:${currentMinute} ${ampm}). Please select a later time.`,
        );
      }
    }

    // ✅ 2️⃣ NEW: Prevent selecting start time >= selected end time
    if (
      newValue &&
      valueEndPreferred &&
      (newValue.hour > valueEndPreferred.hour ||
        (newValue.hour === valueEndPreferred.hour &&
          newValue.minute >= valueEndPreferred.minute))
    ) {
      setisInvalidpreffered(true);
      setErrorMessagePrefferedStart(
        "Start Time : Must be before the selected end time.",
      );
    }
    // CHECKS   ends

    setValuStartPreferred(newValue);
    // console.log(newValue);lxlx
  };

  // gab

  const handleChangeprefferedEnd = (newValue: Time | null): void => {
    // console.log(newValue);

    if (newValue !== null) {
      if (
        newValue.hour > maxValue.hour ||
        (newValue.hour === maxValue.hour && newValue.minute > maxValue.minute)
      ) {
        setisInvalidpreffered2(true);
        setErrorMessagePrefferedEnd(
          `End Time : Select a time before ${maxValue.hour % 12 || 12
          }:${maxValue.minute.toString().padStart(2, "0")} ${maxValue.hour >= 12 ? "PM" : "AM"
          }.`,
        );
        console.log("!");
      } else if (
        valueStartPreferred !== null &&
        (newValue.hour < valueStartPreferred.hour ||
          (newValue.hour === valueStartPreferred.hour &&
            newValue.minute <= valueStartPreferred.minute))
      ) {
        setisInvalidpreffered2(true);
        setErrorMessagePrefferedEnd(
          `End Time : Select a time after ${valueStartPreferred.hour % 12 || 12
          }:${valueStartPreferred.minute.toString().padStart(2, "0")} ${valueStartPreferred.hour >= 12 ? "PM" : "AM"
          }.`,
        );
        console.log("2");
      } else {
        setisInvalidpreffered2(false);
        setErrorMessagePrefferedEnd("");
      }
      setValueEndPreferred(newValue);
    } else {
      setisInvalidpreffered2(false);
      setErrorMessagePrefferedEnd("");
    }

    // console.log(newValue);lxlx
  };

  // PREFERRED SECTION user selecting time

  const isbuttondisabled =
    !value ||
    !valueend ||
    errorMessage.length > 0 ||
    errorMessage2.length > 0 ||
    !guestCount ||
    !selectedDate;
  const isbuttondisabledPreferred =
    !valueStartPreferred ||
    !valueEndPreferred ||
    ErrorMessagePrefferedStart.length > 0 ||
    ErrorMessagePrefferedEnd.length > 0;

  const {
    isSignupSuccess,
    showSignupModel,
    setShowSignupModel,
    setisSignupSuccess,
    showLoginModel,
    setIsShowLoginModel,
  } = useTemp();

  // take acces of params

  // console.log("this is the parms" , params?.id);

  // get-merchant-by-id/:id

  // take acces of params

  // fetch restuarant info from url params

  // singleRestaurant info saving state

  const [singleRestaurant, setsingleRestaurant] = useState<any>();
  // singleRestaurant info saving state

  const getSingleRestaurant = async () => {
    try {
      const response = await fetch(
        `${backend_url}/merchant/get-merchant-by-id/${params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ city : firstCity})
        },
      );
      const data = await response.json();
      // console.log(data);lxlx

      if (data.status === "success") {
        console.log("merchant data", data?.data?.merchant);

        setsingleRestaurant(data?.data?.merchant);
      } else {
        console.log(data?.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSingleRestaurant();
  }, []);

  // when booking open the confirmation modal

  // Booking Confirmation Data
  const [reservationDate, setreservationDate] = useState("");
  const [Reservationrestaurant, setReservationrestaurant] = useState("");
  const [Reservationtable, setReservationtable] = useState<any>();
  const [ReservationstartTime, setReservationstartTime] = useState("");
  const [ReservationendTime, setReservationendTime] = useState("");
  const [ReservationguestCount, setReservationguestCount] = useState<any>();
  const [reservationTableId, setreservationTableId] = useState("");
  const [reservationMerchantID, setreservationMerchantID] = useState("");
  const [reservationMerchantName, setreservationMerchantName] = useState("");
  const [reservationfee, setreservationfee] = useState(0);

  const [tableNumber, settableNum] = useState<any>();

  //  const [mealFromRestaurant, setmealFromRestaurant] = useState<boolean>(true)

  // Booking Confirmation Data

  //  rrrrrrrrrrrrrrrrrrrrrrrrr

  const [isVerified, setIsVerified] = useState(false);
  const [resendEmailLoading, setResendEmailLoading] = useState(false);

  const handleResendVerificationEmail = async () => {
    try {
      setResendEmailLoading(true);
      const response = await fetch(
        `${backend_url}/api/auth/resend-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session?.user?.email }),
        },
      );
      const data = await response.json();

      if (response.ok) {
        // console.log('Verification email sent successfully');
        toast.success("Verification email resent successfully!");
        // Optionally show a success message to the user
      } else {
        console.error("Failed to resend verification email:", data.msg);
        toast.error("Failed to resend verification email. Please try again.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setResendEmailLoading(false);
    }
  };

  const openTheConfirmationModal = async (table: TableWithDetails) => {
    if (status === "unauthenticated") {
      setIsShowLoginModel(true);
      return;
    }

    //  get the is verified status
    try {
      const response = await fetch(
        `${backend_url}/user/verification-status?email=${session?.user.email}`,
      );
      const data = await response.json();

      if (response.ok) {
        setIsVerified(data.isVerified);
      } else {
        console.error("Failed to fetch verification status:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching verification status:", error);
    }

    //  get the is verified status  ends

    try {
      const res = await fetch(
        `${backend_url}/api/auth/ban-status/${session?.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch ban status");
      }

      const data = await res.json();

      // console.log(data.is_ban);

      if (data.is_ban) {
        // alert('You have been banned. Logging out...');
        signOut(); // Log the user out if they are banned
        return;
      }
    } catch (error) {
      console.error("Error fetching ban status:", error);
    }

    if (selectedDate && value && valueend && guestCount) {
      setreservationDate(formatDate(selectedDate));
      setReservationrestaurant(singleRestaurant?.restaurantName);
      //  setReservationtable(`${table.table_number} (Max-Seat-Capacity : ${table.max_seating})`)
      setReservationtable(
        `${String(table.table_number).padStart(
          2,
          "0",
        )} (Max-Seat-Capacity : ${String(table.max_seating).padStart(2, "0")})`,
      );
      setReservationstartTime(table.startTime);
      setReservationendTime(table.endTime);
      setReservationguestCount(`${String(table.guest).padStart(2, "0")}`);
      setreservationTableId(table._id);
      setreservationMerchantID(singleRestaurant?._id);
      setreservationfee(table.reservation_fee);

      setreservationMerchantName(singleRestaurant?.restaurantName);

      settableNum(table.table_number);
    }

    onOpen();
  };

  // when booking open the confirmation modal ENDS

  // useEffect(() => {

  //  if(session) {
  //   console.log(session.user.name);
  //   console.log(session.user.token);
  //   console.log(session.user.email);

  //  }

  // }, [session])

  // Add the reservation to DB

  // const [date, setDate] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  // const [guestCount, setGuestCount] = useState('');
  // const [tableId, setTableId] = useState('');

  // const [reservationDate, setreservationDate] = useState("")
  // const [Reservationrestaurant, setReservationrestaurant] = useState("")
  // const [Reservationtable, setReservationtable] = useState<any>()
  // const [ReservationstartTime, setReservationstartTime] = useState("")
  // const [ReservationendTime, setReservationendTime] = useState("")
  // const [ReservationguestCount, setReservationguestCount] = useState<any>()
  // const [reservationTableId, setreservationTableId] = useState("")
  // const [reservationMerchantID, setreservationMerchantID] = useState("")

  // customer_email,
  // customer_number,
  // customer_name

  // const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  // e:React.FormEvent<HTMLFormElement>

  const resetReservationStates = () => {
    setreservationDate("");
    setReservationstartTime("");
    setReservationendTime("");
    setReservationguestCount("");
    setreservationTableId("");
    setreservationMerchantID("");
    setreservationMerchantName("");
    setReservationtable("");
  };

  // const reservationtest = async() => {
  //   try {
  //      setreservationSubmitLoadingBTN(true)

  //     //  localstorage
  //     localStorage.setItem("reservationData", JSON.stringify({
  //       date: reservationDate,
  //       start_time: ReservationstartTime,
  //       end_time: ReservationendTime,
  //       guest_count: ReservationguestCount,
  //       table_id: reservationTableId,
  //       merchant_id: reservationMerchantID,
  //       merchant_name: reservationMerchantName,
  //       customer_email: session?.user.email,
  //       customer_name: session?.user.name,
  //       customer_number: session?.user.phone,
  //       table_number: tableNumber,
  //       reservation_fee: reservationfee
  //     }));
  //     //  localstorage

  //     const res = await fetch('/api/payment', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },

  //       body: JSON.stringify({
  //         amount: reservationfee,
  //         restaurantId: params?.id
  //       }),
  //     });

  //     const data = await res.json();

  //     if (data.redirect_url) {
  //       // Redirect to the Onepay payment gateway
  //       window.location.href = data.redirect_url;
  //       setreservationSubmitLoadingBTN(false)
  //     } else {
  //       console.error('Error generating payment link:', data.error);
  //       setreservationSubmitLoadingBTN(false)
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setreservationSubmitLoadingBTN(false)
  //   }
  // }

  const reservationTest = async () => {
    try {
      setreservationSubmitLoadingBTN(true);

      if (reservationfee === 0) {
        try {
          const response = await fetch(`${backend_url}/reservations`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: reservationDate,
              start_time: ReservationstartTime,
              end_time: ReservationendTime,
              guest_count: ReservationguestCount,
              table_id: reservationTableId,
              merchant_id: reservationMerchantID,
              merchant_name: reservationMerchantName,
              customer_email: session?.user.email,
              customer_name: session?.user.name,
              customer_number: session?.user.phone,
              table_number: tableNumber,
              reservation_fee: 0,
              merchant_email: singleRestaurant?.email,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to create reservation");
          }
          const responseData = await response.json();
          // console.log('Reservation created:', responseData); lxlx
          // Optionally reset the form or update UI
          setFilteredTables([]);
          onClose();
          setreservationSubmitLoadingBTN(false);
          resetReservationStates();
          onOpenSuccess();
          return;
        } catch (error) {
          console.error("Error creating reservation:", error);
          setreservationSubmitLoadingBTN(false);
          return;
          // Handle error - display a message or log it
        }
      }

      setreservationSubmitLoadingBTN(true);

      // Store reservation data in localStorage
      // localStorage.setItem("reservationData", JSON.stringify({
      //   date: reservationDate,
      //   start_time: ReservationstartTime,
      //   end_time: ReservationendTime,
      //   guest_count: ReservationguestCount,
      //   table_id: reservationTableId,
      //   merchant_id: reservationMerchantID,
      //   merchant_name: reservationMerchantName,
      //   customer_email: session?.user.email,
      //   customer_name: session?.user.name,
      //   customer_number: session?.user.phone,
      //   table_number: tableNumber,
      //   reservation_fee: reservationfee,
      // }));

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: reservationfee,
          restaurantId: params?.id,
          process: "customer-reservation",
          // below are reservation data
          // date: reservationDate,
          // start_time: ReservationstartTime,
          // end_time: ReservationendTime,
          // guest_count: ReservationguestCount,
          // table_id: reservationTableId,
          // merchant_id: reservationMerchantID,
          // merchant_name: reservationMerchantName,
          // customer_email: session?.user.email,
          // customer_name: session?.user.name,
          // customer_number: session?.user.phone,
          // table_number: tableNumber,
          // reservation_fee: reservationfee,

          reservationData: {
            date: reservationDate,
            start_time: ReservationstartTime,
            end_time: ReservationendTime,
            guest_count: ReservationguestCount,
            table_id: reservationTableId,
            merchant_id: reservationMerchantID,
            merchant_name: reservationMerchantName,
            customer_email: session?.user.email,
            customer_name: session?.user.name,
            customer_number: session?.user.phone,
            table_number: tableNumber,
            reservation_fee: reservationfee,
          },
          // below are reservation data
        }),
      });

      const data = await res.json();

      if (data.redirect_url) {
        // Redirect to the Onepay payment gateway
        console.log("rdrt url", data.redirect_url);
        window.location.href = data.redirect_url;
      } else {
        console.error("Error generating payment link:", data.error);
        // Show failure popup
        onOpenFailed();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setreservationSubmitLoadingBTN(false);
    }
  };

  const [reservationSubmitLoadingBTN, setreservationSubmitLoadingBTN] =
    useState(false);

  const [reservationData, setReservationData] = useState(null);

  // useEffect(() => {
  //   // Retrieve reservation data from localStorage on page load
  //   const data = localStorage.getItem("reservationData");
  //   if (data) {
  //     setReservationData(JSON.parse(data));
  //   }

  //   // Automatically submit reservation if payment was successful
  //   const paymentStatus = new URLSearchParams(window.location.search).get("paymentStatus");
  //   if (paymentStatus === "success" && reservationData) {
  //     handleReservationSubmit();
  //   } else {
  //     console.log("vaaipilla raja");

  //   }
  // }, [reservationData]);

  // useEffect(() => {
  //   // Retrieve reservation data from localStorage on page load
  //   const data = localStorage.getItem("reservationData");
  //   if (data) {
  //     setReservationData(JSON.parse(data));
  //   }

  //   // Automatically submit reservation if payment was successful
  //   const paymentStatus = new URLSearchParams(window.location.search).get("paymentStatus");
  //   // const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");

  //   if (paymentStatus === "success") {
  //     if (reservationData) {
  //       handleReservationSubmit();
  //     } else {
  //       // If payment was successful but no reservation data is found,
  //       // rewrite the URL to remove the query parameters
  //       const newUrl = window.location.pathname; // Get the current path without query parameters
  //       window.history.replaceState({}, document.title, newUrl); // Update the URL

  //       console.log("Payment successful but no reservation data found. URL has been updated.");
  //     }
  //   } else {
  //     console.log("Payment not successful or no data.");
  //   }
  // }, [reservationData]);

  // const handleReservationSubmit = async () => {
  //   // console.log("reservation");lxlx
  //   setreservationSubmitLoadingBTN(true)
  //   // mmmmmmmmmmmmmmmmmmmmmmm
  //   // e.preventDefault();
  //   try {
  //     const response = await fetch(`${backend_url}/reservations`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         date:reservationDate,
  //         start_time: ReservationstartTime,
  //         end_time: ReservationendTime,
  //         guest_count: ReservationguestCount,
  //         table_id: reservationTableId,
  //         merchant_id : reservationMerchantID,
  //         merchant_name : reservationMerchantName ,
  //         customer_email : session?.user.email,
  //         customer_name : session?.user.name,
  //         customer_number : session?.user.phone,
  //         table_number : tableNumber,
  //         reservation_fee : reservationfee

  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to create reservation');
  //     }
  //     const responseData = await response.json();
  //     // console.log('Reservation created:', responseData); lxlx
  //     // Optionally reset the form or update UI
  //     setFilteredTables([])
  //     onClose()
  //     setreservationSubmitLoadingBTN(false)
  //     resetReservationStates()
  //     onOpenSuccess()

  //   } catch (error) {
  //     console.error('Error creating reservation:', error);
  //     setreservationSubmitLoadingBTN(false)
  //     // Handle error - display a message or log it
  //   }
  // };

  // useEffect(() => {
  //   // Retrieve reservation data from localStorage on page load
  //   const data = localStorage.getItem("reservationData");
  //   if (data) {
  //     setReservationData(JSON.parse(data));
  //   }

  //   // Automatically submit reservation if payment was successful
  //   const paymentStatus = new URLSearchParams(window.location.search).get("paymentStatus");
  //   const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");

  //   if (paymentStatus === "success") {
  //     if (reservationData) {
  //       handleReservationSubmit();
  //     } else {
  //       // If payment was successful but no reservation data is found,
  //       // rewrite the URL to remove the query parameters
  //       const newUrl = window.location.pathname; // Get the current path without query parameters
  //       window.history.replaceState({}, document.title, newUrl); // Update the URL

  //       console.log("Payment successful but no reservation data found. URL has been updated.");
  //     }
  //   } else {
  //     console.log("Payment not successful or no data.");
  //   }
  // }, []);

  // const handleReservationSubmit = async () => {
  //   setreservationSubmitLoadingBTN(true);

  //   try {
  //     // Retrieve reservation data from localStorage
  //     const reservationData = localStorage.getItem("reservationData");
  //     if (!reservationData) {
  //       // console.log("nothing found");

  //       throw new Error('No reservation data found');
  //     }

  //     // Parse the reservation data
  //     const parsedData = JSON.parse(reservationData);

  //     // Prepare the request body using parsed data
  //     const response = await fetch(`${backend_url}/reservations`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         date: parsedData.date,
  //         start_time: parsedData.start_time,
  //         end_time: parsedData.end_time,
  //         guest_count: parsedData.guest_count,
  //         table_id: parsedData.table_id,
  //         merchant_id: parsedData.merchant_id,
  //         merchant_name: parsedData.merchant_name,
  //         customer_email: parsedData.customer_email,
  //         customer_name: parsedData.customer_name,
  //         customer_number: parsedData.customer_number,
  //         table_number: parsedData.table_number,
  //         reservation_fee: parsedData.reservation_fee,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create reservation');
  //     }

  //     const responseData = await response.json();
  //     // Optional reset actions or updates
  //     setFilteredTables([]);
  //     onClose();
  //     resetReservationStates();
  //     onOpenSuccess();
  //     // Clean up local storage after successful submission
  //     localStorage.removeItem("reservationData");

  //   } catch (error) {
  //     console.error('Error creating reservation:', error);
  //     // Handle error - display a message or log it
  //   } finally {
  //     setreservationSubmitLoadingBTN(false);
  //   }
  // };

  useEffect(() => {
    const paymentStatus = new URLSearchParams(window.location.search).get(
      "paymentStatus",
    );
    const restaurantId = new URLSearchParams(window.location.search).get(
      "restaurantId",
    );
    const reference = new URLSearchParams(window.location.search).get(
      "reference",
    );
    // const data = localStorage.getItem("reservationData");

    // if (paymentStatus === "success") {
    //   if (data) {
    //     const parsedData = JSON.parse(data);
    //     handleReservationSubmit(parsedData);
    //     localStorage.removeItem("reservationData");
    //   } else {

    //     const newUrl = window.location.pathname;
    //     window.history.replaceState({}, document.title, newUrl);
    //     console.log("Payment successful but no reservation data found. URL didnt get the update.");
    //   }
    // } else if (paymentStatus === "failure") {

    //   localStorage.removeItem("reservationData");
    //   onOpenFailed();
    //   console.log("Payment failedddd. lcal storage cleared.");
    // } else {
    //   console.log("Payyment not successful-no data.");
    // }

    // return () => {
    //   localStorage.removeItem("reservationData");
    // };

    const fetchPaymentStatus = async () => {
      if (!reference) {
        return;
      }

      try {
        const response = await fetch(
          `${backend_url}/api/payment/status?reference=${reference}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment status");
        }

        const data = await response.json();

        if (data.isFirst === "no") {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          return;
        }

        if (data.status_message === "SUCCESS") {
          // setStatusMessage(data.status_message);
          onOpenSuccess();
        } else {
          // setError(data.message);
          onOpenFailed();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPaymentStatus();
  }, []);

  const handleReservationSubmit = async (parsedData: any) => {
    setreservationSubmitLoadingBTN(true);

    try {
      if (!parsedData) {
        throw new Error("No reservation data provided");
      }

      const response = await fetch(`${backend_url}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: parsedData.date,
          start_time: parsedData.start_time,
          end_time: parsedData.end_time,
          guest_count: parsedData.guest_count,
          table_id: parsedData.table_id,
          merchant_id: parsedData.merchant_id,
          merchant_name: parsedData.merchant_name,
          customer_email: parsedData.customer_email,
          customer_name: parsedData.customer_name,
          customer_number: parsedData.customer_number,
          table_number: parsedData.table_number,
          reservation_fee: parsedData.reservation_fee,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      const responseData = await response.json();
      setFilteredTables([]);
      onClose();
      resetReservationStates();
      onOpenSuccess();

      // Clean up local storage after successful submission
      localStorage.removeItem("reservationData");
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error - display a message or log it
    } finally {
      setreservationSubmitLoadingBTN(false);
    }
  };

  // Add the reservation to DB

  // ALL ABOUT PREFFERED BOOKING GOES IN HERE IA

  // PREFFERED BOOKING STATE VARIABLES
  const [preferredSelectedDate, setPreferredSelectedDate] =
    useState<DateValue | null>();
  // const [preferredSelectedDate, setPreferredSelectedDate] = useState<string>()
  const [formattedPreferredSelectedDate, setformattedPreferredSelectedDate] =
    useState("");

  const [selectedPreferredTable, setselectedPreferredTable] = useState("");

  // the date for prefered was here in this line and move to near line 448

  // PREFFERED BOOKING STATE VARIABLES

  // const renderCount = useRef(0);
  // renderCount.current += 1;

  // Handle date change

  const handlePrefferedDateChange = (newDate: DateValue | null) => {
    if (!newDate) return;

    // setErrorMessagePrefferedStart('');
    // setErrorMessagePrefferedEnd('');
    // setValuStartPreferred(null);
    // setValueEndPreferred(null);
    // setisInvalidpreffered(false);
    // setisInvalidpreffered2(false);
    // setclosed(false);
    // setclosedErrorShow('');

    const formattedDate = `${newDate.day
      .toString()
      .padStart(2, "0")}.${newDate.month.toString().padStart(2, "0")}.${newDate.year
      }`;

    // Proceed only if it’s a *new* valid date
    setErrorMessagePrefferedStart("");
    setErrorMessagePrefferedEnd("");
    setValuStartPreferred(null);
    setValueEndPreferred(null);
    setisInvalidpreffered(false);
    setisInvalidpreffered2(false);
    setclosed(false);
    setclosedErrorShow("");
    setformattedPreferredSelectedDate(formattedDate);
    setpreferredDefaultDate(newDate);
    setshowSlotsTable(false);

    // setSelectedDate(newDate);
    // if (newDate) {
    //   const formattedDate = `${newDate.day
    //     .toString()
    //     .padStart(2, '0')}.${newDate.month.toString().padStart(2, '0')}.${
    //     newDate.year
    //   }`;
    //   // console.log(formattedDate);lxlx
    //   setformattedPreferredSelectedDate(formattedDate);
    //   setpreferredDefaultDate(newDate);
    //   setshowSlotsTable(false);
    // }
  };

  const [mentionSelectedTable, setmentionSelectedTable] = useState("");

  const handleSelection = (key: any) => {
    // const table = RestaurantTables.find((table) => table._id === key);
    setselectedPreferredTable(key);
    // console.log(key); lxlx

    const tableNum = RestaurantTables?.find((table) => table._id === key);
    setmentionSelectedTable(String(tableNum?.table_number));
    setshowSlotsTable(false);
  };

  // CHECK SLOTS FUNCTIONALITY

  // cccccccccccccccccccccccccc

  const [tableWithSlots, settableWithSlots] = useState<any[]>([]);
  const [slotsfetchingloadingbtn, setslotsfetchingloadingbtn] = useState(false);

  // show the slots and time

  const [showSlotsTable, setshowSlotsTable] = useState(false);

  const CheckSlotsForTable = async () => {
    setBookingError(false);
    setBookingSuccess(false);
    setshowSlotsTable(false);
    setValuStartPreferred(null);
    setValueEndPreferred(null);

    setslotsfetchingloadingbtn(true);

    try {
      const response = await fetch(`${backend_url}/reservations/preferred`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedPreferredSelectedDate,
          table_id: selectedPreferredTable,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tables");
      }
      const tables = await response.json();
      // return tables;

      const sortedTables = tables.sort((a: any, b: any) => {
        const [hoursA, minutesA] = a.start_time.split(":").map(Number);
        const [hoursB, minutesB] = b.start_time.split(":").map(Number);

        if (hoursA !== hoursB) {
          return hoursA - hoursB;
        }
        return minutesA - minutesB;
      });

      // settableWithSlots(tables)
      settableWithSlots(sortedTables);
      setslotsfetchingloadingbtn(false);
      setslotsfetchingloadingbtn(false);

      setshowSlotsTable(true);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setslotsfetchingloadingbtn(false);
      setslotsfetchingloadingbtn(false);
      setshowSlotsTable(false);
      // return [];
    }
  };

  // CHECK SLOTS FUNCTIONALITY

  // AFTER SHOWCASING SLOTS NOW IS RESERVING TIME

  const [
    slotscheckedbookingconfirmbtnload,
    setslotscheckedbookingconfirmbtnload,
  ] = useState(false);

  const [reConfirmedSlotsForTableList, setreConfirmedSlotsForTableList] =
    useState<any>([]);

  const [BookingError, setBookingError] = useState<boolean>(false);
  const [BookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const ReserveTheTableAfterSlotChecks = async () => {
    // setshowSlotsTable(false)

    // setslotsfetchingloadingbtn(true)

    if (status === "unauthenticated") {
      setIsShowLoginModel(true);
      return;
    }

    try {
      const res = await fetch(
        `${backend_url}/api/auth/ban-status/${session?.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch ban status");
      }

      const data = await res.json();

      // console.log(data.is_ban);

      if (data.is_ban) {
        // alert('You have been banned. Logging out...');
        signOut(); // Log the user out if they are banned
        return;
      }
    } catch (error) {
      console.error("Error fetching ban status:", error);
    }

    setBookingError(false);
    setBookingSuccess(false);

    setslotscheckedbookingconfirmbtnload(true);

    try {
      const response = await fetch(`${backend_url}/reservations/preferred`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedPreferredSelectedDate,
          table_id: selectedPreferredTable,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tables");
      }
      const reservations = await response.json();
      // return tables;

      // settableWithSlots(tables)
      setreConfirmedSlotsForTableList(reservations);

      //  check for conflicts

      //  const formattedDate = formatDate(selectedDate);
      //  const formattedStartTime = formatTime(value);
      //  const formattedEndTime = formatTime(valueend);

      if (valueStartPreferred && valueEndPreferred) {
        const formattedStartTime = formatTime(valueStartPreferred);
        const formattedEndTime = formatTime(valueEndPreferred);

        const hasConflict = reservations.some((reservation: ReservationDB) =>
          isTimeConflict(
            formattedStartTime,
            formattedEndTime,
            reservation.start_time,
            reservation.end_time,
          ),
        );

        if (hasConflict) {
          setBookingError(true);
          setBookingSuccess(false);
        } else {
          setBookingError(false);
          setBookingSuccess(true);

          const tableNum = RestaurantTables?.find(
            (table) => table._id === selectedPreferredTable,
          );
          // console.log(tableNum);lxlx

          // const [reservationDate, setreservationDate] = useState("")
          // const [Reservationrestaurant, setReservationrestaurant] = useState("")
          // const [Reservationtable, setReservationtable] = useState<any>()
          // const [ReservationstartTime, setReservationstartTime] = useState("")
          // const [ReservationendTime, setReservationendTime] = useState("")
          // const [ReservationguestCount, setReservationguestCount] = useState<any>()
          // const [reservationTableId, setreservationTableId] = useState("")
          // const [reservationMerchantID, setreservationMerchantID] = useState("")

          setreservationDate(formattedPreferredSelectedDate);
          // ttttttttttttttttttttt

          setReservationrestaurant(singleRestaurant?.restaurantName);

          setReservationtable(
            `${String(tableNum?.table_number).padStart(
              2,
              "0",
            )} (Max-Seat-Capacity : ${String(tableNum?.max_seating).padStart(
              2,
              "0",
            )})`,
          );
          setReservationstartTime(formattedStartTime);
          setReservationendTime(formattedEndTime);
          setReservationguestCount(
            `${String(tableNum?.max_seating).padStart(2, "0")}`,
          );
          setreservationTableId(tableNum?._id as string);
          setreservationMerchantID(singleRestaurant?._id);
          setreservationMerchantName(singleRestaurant?.restaurantName);
          // setReservationtable(`${String(tableNum?.table_number).padStart(2, '0')} (Max-Seat-Capacity : ${ String(tableNum?.max_seating).padStart(2,'0')  })`);
          settableNum(tableNum?.table_number);
          setreservationfee(tableNum?.reservation_fee as number);
          // rrrrrrrrrrrrrrrrrrrr
          //  removed the unwated check
          try {
            const response = await fetch(
              `${backend_url}/user/verification-status?email=${session?.user.email}`,
            );
            const data = await response.json();

            if (response.ok) {
              setIsVerified(data.isVerified);
            } else {
              console.error("Failed to fetch verification status:", data.msg);
            }
          } catch (error) {
            console.error("Error fetching verification status:", error);
          }

          //  removed the unwated check
          onOpen();
        }
      }

      setslotscheckedbookingconfirmbtnload(false);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setslotscheckedbookingconfirmbtnload(false);

      // return [];
    }
  };

  // AFTER SHOWCASING SLOTS NOW IS RESERVING TIME

  // ALL ABOUT PREFFERED BOOKING GOES IN HERE IA

  // ALL ABOUT CUSTOM EVENT RESERVATION GOES HERE
  // qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq

  // http://localhost:5000/reservations/create-custom-reservation

  const [customReservationDetail, setcustomReservationDetail] = useState("");

  // moved to lines 400 after due to block scope issue to get hours
  const [CustomDate, setCustomDate] = useState("");

  // meal order check swtich
  const [isMealOrdered, setIsMealOrdered] = useState(true);

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setIsMealOrdered(checked);
    // Additional logic if needed when the switch is toggled
    // console.log(`Meals ordered from us: ${checked}`);lxlx
  };
  // meal order check swtich

  // Handle date change
  const handleDateChangeForCustom = (newDate: DateValue | null) => {
    setclosedErrorShow("");

    if (newDate) {
      const formattedDate = `${newDate.day
        .toString()
        .padStart(2, "0")}.${newDate.month.toString().padStart(2, "0")}.${newDate.year
        }`;
      // console.log(formattedDate); lxlx
      setCustomDate(formattedDate);
      setSelectedCustomEventDate(newDate);
    }
  };

  const [customReservationError, setcustomReservationError] = useState("");

  const customReservationDataLoad = async () => {
    if (status === "unauthenticated") {
      setIsShowLoginModel(true);
      return;
    }

    if (
      !customReservationDetail ||
      customReservationDetail.length < 100 ||
      !CustomDate
    ) {
      return;
    }

    setreservationDate(CustomDate);
    setReservationrestaurant(singleRestaurant?.restaurantName);

    //  get the is verified status
    try {
      const response = await fetch(
        `${backend_url}/user/verification-status?email=${session?.user.email}`,
      );
      const data = await response.json();

      if (response.ok) {
        setIsVerified(data.isVerified);
      } else {
        console.error("Failed to fetch verification status:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching verification status:", error);
    }

    //  get the is verified status  ends

    try {
      const res = await fetch(
        `${backend_url}/api/auth/ban-status/${session?.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch ban status");
      }

      const data = await res.json();

      // console.log(data.is_ban);

      if (data.is_ban) {
        // alert('You have been banned. Logging out...');
        signOut(); // Log the user out if they are banned
        return;
      }
    } catch (error) {
      console.error("Error fetching ban status:", error);
    }

    customonOpen();
  };

  const [customReservationBtnLoad, setcustomReservationBtnLoad] =
    useState(false);

  const createCustomReservation = async () => {
    if (status === "unauthenticated") {
      return;
    }

    if (!session?.user.phone || !session.user.email || !session.user.name) {
      return;
    }

    setcustomReservationBtnLoad(true);
    try {
      const response = await fetch(
        `${backend_url}/reservations/create-custom-reservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: CustomDate,
            details: customReservationDetail,
            meal_from_restaurant: isMealOrdered,
            merchant_id: singleRestaurant?._id,
            merchant_name: singleRestaurant?.restaurantName,
            customer_email: session?.user?.email,
            customer_name: session?.user?.name,
            customer_number: session?.user?.phone,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tables");
      }
      const customReservation = await response.json();

      // console.log(customReservation); lxlx
      setcustomReservationDetail("");
      setIsMealOrdered(true);
      setSelectedCustomEventDate(null);
      setCustomDate("");
      setcustomReservationBtnLoad(false);
      customonClose();

      onOpenSuccess();
    } catch (error) {
      console.log(error);
      setcustomReservationError("An error occured. Try again");
      setcustomReservationBtnLoad(false);
    }
  };

  // ALL ABOUT CUSTOM EVENT RESERVATION GOES HERE

  // custom event reservation show/hide
  // getHaveCustom
  // /getHaveCustom/:email'
  // /merchant

  const [showCustom, setshowCustom] = useState(false);

  const getCustom = async () => {
    try {
      const response = await fetch(
        `${backend_url}/merchant/getHaveCustom/${singleRestaurant?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ city : firstCity})
        },
      );
      const data = await response.json();
      // console.log(data); lxlx

      if (data.status === "success") {
        //  setsingleRestaurant(data?.data?.merchant)
        setshowCustom(data.have_custom);
      }
    } catch (error: any) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    getCustom();
  }, [session, singleRestaurant]);

  // custom event reservation show/hide ends

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

    document.addEventListener("click", handleClickOutside);
    // window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [openModal]);

  // resetAll
  const resetAll = () => {
    setSelectedDate(null);
    setpreferredDefaultDate(null);
    setErrorMessage("");
    setErrorMessage2("");
    setErrorMessagePrefferedStart("");
    setErrorMessagePrefferedEnd("");
    setIsInvalid(false);
    setIsInvalid2(false);
    setisInvalidpreffered(false);
    setisInvalidpreffered2(false);
    setValue(null);
    setValueend(null);
    setValuStartPreferred(null);
    setValueEndPreferred(null);
    setclosed(false);
    setclosedErrorShow("");
    setshowSlotsTable(false);
    setmentionSelectedTable("");
    setselectedPreferredTable("");
    setformattedPreferredSelectedDate("");
    setCustomDate("");
    setSelectedCustomEventDate(null);
    setnotablestoshow(false);
    setFilteredTables([]);
    setSelectedMapTable(null);
    setMapBookedTableIds([]);
    setMapIncompatibleTableIds([]);
    setMapSearched(false);
  };
  // resetAll ends

  //  scroll to id

  const [noRushOnStart, setnoRushOnStart] = useState(false);

  const instantRef = useRef<HTMLDivElement | null>(null);
  const preferredRef = useRef<HTMLDivElement | null>(null);
  const customRef = useRef<HTMLDivElement | null>(null);

  // Fetch 2D map layouts
  useEffect(() => {
    const fetchLayouts = async () => {
      if (!params?.id) return;
      try {
        const res = await fetch(
          `${backend_url}/selection-model/merchant/${params.id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setMapLayouts(data);
          if (data.length > 0) setSelectedMapLayout(data[0]);
        }
      } catch (err) {
        console.error("Error fetching layouts:", err);
      }
    };
    fetchLayouts();
  }, [params?.id]);

  // Handle map table search
  const handleMapSearch = async () => {
    if (
      !selectedDate ||
      !value ||
      !valueend ||
      !guestCount ||
      !selectedMapLayout
    )
      return;
    setMapLoading(true);
    setSelectedMapTable(null);
    try {
      const formattedDate = formatDate(selectedDate);
      const formattedStartTime = formatTime(value);
      const formattedEndTime = formatTime(valueend);
      const guestCountNumber =
        typeof guestCount === "string" ? parseInt(guestCount) : guestCount;

      const response = await fetch(`${backend_url}/reservations/${params?.id}`);
      if (!response.ok) throw new Error("Error fetching reservations");
      const reservationsData = await response.json();

      const components = selectedMapLayout.components.filter(
        (c: any) => c.type === "table",
      );

      const tableStatuses = components.map((comp: any) => {
        const table = comp as MapTable;
        const hasConflict = reservationsData.some(
          (r: any) =>
            r.table_id === table.id &&
            r.date === formattedDate &&
            isTimeConflict(
              formattedStartTime,
              formattedEndTime,
              r.start_time,
              r.end_time,
            ),
        );
        return {
          id: table.id,
          seats: table.seats,
          hasConflict,
        };
      });

      // Following handleSearch() logic:
      // Exact matches first
      const matchingTables = tableStatuses.filter(
        (t) => t.seats === guestCountNumber,
      );

      // Check if any matching tables are available
      const anyMatchingAvailable = matchingTables.some((t) => !t.hasConflict);

      let targetIds: string[] = [];

      if (matchingTables.length > 0 && anyMatchingAvailable) {
        // Target only exact matches that are available
        targetIds = matchingTables
          .filter((t) => !t.hasConflict)
          .map((t) => t.id);
      } else {
        // Fallback to suitable tables (larger) that are available
        targetIds = tableStatuses
          .filter((t) => t.seats >= guestCountNumber && !t.hasConflict)
          .map((t) => t.id);
      }

      const bookedIds = tableStatuses
        .filter((t) => t.hasConflict)
        .map((t) => t.id);

      // Incompatible are those NOT in targetIds AND NOT in bookedIds
      const incompatibleIds = tableStatuses
        .filter((t) => !targetIds.includes(t.id) && !bookedIds.includes(t.id))
        .map((t) => t.id);

      setMapBookedTableIds(bookedIds);
      setMapIncompatibleTableIds(incompatibleIds);
      setMapSearched(true);
    } catch (err) {
      console.error("Error searching map:", err);
    } finally {
      setMapLoading(false);
    }
  };

  // Handle map table booking
  const handleMapTableBook = (mapTable: MapTable) => {
    if (!selectedDate || !value || !valueend || !guestCount) return;

    const formattedDate = formatDate(selectedDate);
    const formattedStartTime = formatTime(value);
    const formattedEndTime = formatTime(valueend);

    const tableDetails: TableWithDetails = {
      _id: mapTable.id,
      table_number: mapTable.name as any,
      table_image: "",
      max_seating: mapTable.seats,
      merchant_id: params?.id || "",
      reservation_fee: mapTable.pricePerSeat || 0,
      createdAt: "",
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      guest: guestCount,
    };

    openTheConfirmationModal(tableDetails);
  };
  useEffect(() => {
    if (type === "instant" && instantRef.current && !noRushOnStart) {
      setTimeout(() => {
        if (instantRef.current) {
          instantRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);

      setnoRushOnStart(true);
    } else if (type === "instant" && instantRef.current && noRushOnStart) {
      instantRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (type === "preferred" && preferredRef.current) {
      preferredRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (type === "custom" && customRef.current) {
      customRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (type === "map" && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [type]);

  //  scroll to id

  const minDate = useMemo(() => today(getLocalTimeZone()), []);

  // const handleNativeDateChange = (e: any) => {
  //   const value = e.target.value;
  //   if (!value) return;

  //   // Format YYYY-MM-DD → DD.MM.YYYY
  //   const [year, month, day] = value.split('-');
  //   const formatted = `${day}.${month}.${year}`;
  //   setformattedPreferredSelectedDate(formatted);
  //   setpreferredDefaultDate({
  //     day: Number(day),
  //     month: Number(month),
  //     year: Number(year),
  //   } as any);
  //   setshowSlotsTable(false);
  //   setclosedErrorShow('');
  // };

  const handleNativeDateChange = (e: any) => {
    const value = e.target.value;
    if (!value) return;

    // Convert YYYY-MM-DD → CalendarDate (real DateValue)
    const [year, month, day] = value.split("-").map(Number);
    const newDate = new CalendarDate(year, month, day);

    const formatted = `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}`;

    setformattedPreferredSelectedDate(formatted);
    setpreferredDefaultDate(newDate); // ✅ now real DateValue
    setshowSlotsTable(false);
    setclosedErrorShow("");
  };

  return (
    <>
      <div className=" md:">
        <div className=" w-full relative  md:overflow-hidden">
          <div className=" relative w-full h-80">
            <Image
              alt="image"
              // src={"/3.avif"}
              src={singleRestaurant?.banner_img || "/restaurant-1.jpg"}
              width={1000}
              height={1000}
              className=" w-full h-full  bg-blend-color object-cover "
            />

            <div
              className={` ${false && "animate-none"
                }  absolute top-0 w-full h-full   bg-opacity-70  bg-black `}
            ></div>
          </div>

          <div className=" absolute     bottom-7  flex    2xl:px-0 px-5   w-full">
            <div className=" w-full justify-center flex flex-col items-center ">
              <div className=" w-full max-w-7xl  flex flex-col">
                <div className=" flex  flex-col">
                  <h1
                    className={`text-white text-3xl   font-poppinssemi lg:text-5xl `}
                  >
                    {" "}
                    {/* The Ottima Cafe */}
                    {/* The Gallery Cafe */}
                    {singleRestaurant?.restaurantName}
                  </h1>

                  {/* <h1
                    className={`text-white text-base lg:text-lg mt-2  font-poppinsreg5`}
                  >
                    {" "}
                 
                    Where Every Meal is an Experience
                  </h1> */}

                  <h1 className={`text-white  mt-2  font-poppinsreg5`}>
                    {" "}
                    {/* Moak coffee and beautiful Sicilian delights and snacks. */}
                    {singleRestaurant?.restaurantAddress}
                  </h1>
                </div>

                {/* <div className=" flex flex-row mt-2 gap-5 ">
               

                    <div className=" flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 text-[#feaaa0] h-5 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h1 className=" text-white"> 9.2 </h1>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* table reservation  */}
        <div className=" w-full flex  2xl:px-0  px-5 justify-center ">
          <div className=" w-full max-w-7xl mt-5  flex md:flex-row flex-col  gap-5   md:flex-wrap ">
            <div
              onClick={() => {
                settype("instant");
                resetAll();
              }}
              className={`border p-5 flex flex-col gap-1 rounded-md items-center cursor-pointer ${type === "instant" &&
                "bg-[#2f3335] transition-colors delay-100  ease-in"
                } border-black/10`}
            >
              <h1
                className={`text-center  font-poppinssemi ${type === "instant" ? "text-white" : "text-black"
                  }  text-xl`}
              >
                Instant Table Reservation{" "}
              </h1>

              <p
                className={`text-center font-poppinsreg ${type === "instant" ? "text-slate-200" : "text-slate-700"
                  }  max-w-64 text-xs`}
              >
                {" "}
                {`Select your date and time, and we'll reserve a suitable table for you`}{" "}
              </p>
            </div>

            <div
              onClick={() => {
                settype("preferred");
                resetAll();
              }}
              className={`border p-5 flex flex-col gap-1 rounded-md items-center cursor-pointer ${type === "preferred" &&
                "bg-[#2f3335] transition-colors delay-100  ease-in"
                } border-black/10`}
            >
              <h1
                className={`text-center  font-poppinssemi ${type === "preferred" ? "text-white" : "text-black"
                  }  text-xl`}
              >
                Preferred Table Booking{" "}
              </h1>

              <p
                className={`text-center font-poppinsreg ${type === "preferred" ? "text-slate-200" : "text-slate-700"
                  }  max-w-64 text-xs`}
              >
                {" "}
                Choose your favorite table and see available times for your
                preferred date{" "}
              </p>
            </div>

            {/* showCustom */}
            {showCustom && (
              <div
                onClick={() => {
                  settype("custom");
                  resetAll();
                }}
                className={`border p-5 flexchange hidden flex-col gap-1 rounded-md items-center cursor-pointer ${type === "custom" &&
                  "bg-[#2f3335] transition-colors delay-100  ease-in"
                  } border-black/10`}
              >
                <h1
                  className={`text-center  font-poppinssemi ${type === "custom" ? "text-white" : "text-black"
                    }  text-xl`}
                >
                  Custom Event Reservation{" "}
                </h1>

                <p
                  className={`text-center font-poppinsreg ${type === "custom" ? "text-slate-200" : "text-slate-700"
                    }  max-w-64 text-xs`}
                >
                  {" "}
                  Plan your event with customized seating and arrangements to
                  suit your needs{" "}
                </p>
              </div>
            )}

            {/* 2D Map Reservation */}
            {mapLayouts.length > 0 && (
              <div
                onClick={() => {
                  settype("map");
                  resetAll();
                }}
                className={`border p-5 flex flex-col gap-1 rounded-md items-center cursor-pointer ${type === "map" &&
                  "bg-[#2f3335] transition-colors delay-100  ease-in"
                  } border-black/10`}
              >
                <h1
                  className={`text-center  font-poppinssemi ${type === "map" ? "text-white" : "text-black"
                    }  text-xl`}
                >
                  2D Map Reservation
                </h1>

                <p
                  className={`text-center font-poppinsreg ${type === "map" ? "text-slate-200" : "text-slate-700"
                    }  max-w-64 text-xs`}
                >
                  View the restaurant layout and pick your preferred table from
                  the map
                </p>
              </div>
            )}
          </div>
        </div>

        {/* do the reservation */}

        {/* instant wrapper starts  */}

        {type === "instant" && (
          <div ref={instantRef} className=" w-full">
            {/* table reservation  */}
            <div className=" w-full flex  2xl:px-0  px-5 justify-center ">
              <div className=" w-full max-w-7xl   flex flex-col ">
                <div
                  className={`mt-12 overflow-x-auto  w-full md:w-fit  border  flex`}
                >
                  {/* <h1 className=' text-2xl text-slate-800 font-poppinssemi'> Instant Table Reservation </h1> */}

                  <div className=" flex md:hidden flex-col  border p-4 gap-5 md:gap-10   w-full md:w-fit  rounded-md">
                    <div className=" flex  md:items-center flex-col gap-1">
                      <h1 className=" font-poppinsreg5 text-sm md:text-lg">
                        {" "}
                        Select a date{" "}
                      </h1>
                      <DatePicker
                        // vvvvvvvvvvvvvvvvvvvv
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="Date and time"
                        // minValue={today(getLocalTimeZone())}
                        minValue={minDate}
                      // minValue={today(getLocalTimeZone()).add({ days: 1 })}
                      // defaultValue={today(getLocalTimeZone())}
                      />
                    </div>

                    <div className=" flex md:items-center  flex-col gap-1">
                      <h1 className=" font-poppinsreg5 text-sm md:text-lg">
                        {" "}
                        Starting time{" "}
                      </h1>
                      {/* <TimeInput
                        value={value}
                        onChange={(newValue: Time | null) =>
                          handleChange(newValue)
                        }
                        minValue={minValue}
                        maxValue={maxValue}
                        isInvalid={isInvalid}

                        // errorMessage={errorMessage}
                      /> */}

                      <input
                        type="time"
                        value={
                          value
                            ? `${String(value.hour).padStart(2, "0")}:${String(
                              value.minute,
                            ).padStart(2, "0")}`
                            : ""
                        }
                        onChange={(e) => {
                          const [hourStr, minuteStr] =
                            e.target.value.split(":");
                          const hour = parseInt(hourStr, 10);
                          const minute = parseInt(minuteStr, 10);
                          handleChange(new Time(hour, minute)); // still compatible
                        }}
                        // min={`${String(minValue.hour).padStart(
                        //   2,
                        //   '0',
                        // )}:${String(minValue.minute).padStart(2, '0')}`}
                        max={`${String(maxValue.hour).padStart(
                          2,
                          "0",
                        )}:${String(maxValue.minute).padStart(2, "0")}`}
                        disabled={!selectedDate || closed}
                        className={`border rounded-md p-2 w-full ${isInvalid ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                    </div>

                    <div className=" flex md:items-center  flex-col gap-1">
                      <h1 className=" font-poppinsreg5 text-sm md:text-lg">
                        {" "}
                        Ending time{" "}
                      </h1>
                      {/* <TimeInput
                        value={valueend}
                        onChange={(newValue: Time | null) =>
                          handleChangeSecondTime(newValue)
                        }
                        maxValue={maxValue}
                        isInvalid={isInvalid2}
                        // errorMessage={errorMessage2}
                      /> */}

                      <input
                        type="time"
                        value={
                          valueend
                            ? `${String(valueend.hour).padStart(
                              2,
                              "0",
                            )}:${String(valueend.minute).padStart(2, "0")}`
                            : ""
                        }
                        onChange={(e) => {
                          const [hourStr, minuteStr] =
                            e.target.value.split(":");
                          const hour = parseInt(hourStr, 10);
                          const minute = parseInt(minuteStr, 10);
                          handleChangeSecondTime(new Time(hour, minute)); // still compatible
                        }}
                        max={`${String(maxValue.hour).padStart(
                          2,
                          "0",
                        )}:${String(maxValue.minute).padStart(2, "0")}`}
                        disabled={
                          !selectedDate ||
                          closed ||
                          !value ||
                          errorMessage.length > 0
                        }
                        className={`border rounded-md p-2 w-full ${isInvalid2 ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                    </div>

                    <div className=" flex flex-col md:items-center gap-1">
                      <h1 className=" font-poppinsreg5 text-sm md:text-lg">
                        {" "}
                        Number of guest
                      </h1>
                      {/* <input
                        value={guestCount}
                        onChange={handleGuestChange}
                        onBlur={handleBlur}
                        type="number"
                        className=" border  w-20 outline-none"
                      /> */}
                      <Input
                        type="number"
                        value={guestCount.toString()}
                        onChange={handleGuestChange}
                        onBlur={handleBlur}
                        min={1}
                        className="w-14"
                        variant="bordered"
                        radius="sm"
                      />
                    </div>

                    <Button
                      isLoading={instantTableSearchLoading}
                      isDisabled={isbuttondisabled}
                      onPress={handleSearch}
                      className=" bg-[#FF385C] text-white font-poppinsreg5     md:text-sm text-xs w-full md:w-fit"
                    >
                      {" "}
                      Find a table{" "}
                    </Button>
                  </div>

                  <div className=" md:flex    hidden">
                    <Table className=" ">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center font-poppinsreg5">
                            Select a date
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Start Time
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            End Time
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Number of guest
                          </TableHead>
                          {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
     <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-center  font-poppinsreg5">
                            <DatePicker
                              value={selectedDate}
                              onChange={handleDateChange}
                              label="Date and time"
                              // minValue={today(getLocalTimeZone())}
                              minValue={minDate}
                            // minValue={today(getLocalTimeZone()).add({ days: 1 })}
                            //  defaultValue={today(getLocalTimeZone())}
                            />
                          </TableCell>
                          <TableCell className="text-center font-poppinsreg5">
                            {/* <TimeInput
                              value={value}
                              onChange={(newValue: Time | null) =>
                                handleChange(newValue)
                              }
                              minValue={minValue}
                              maxValue={maxValue}
                              isInvalid={isInvalid}
                              isDisabled={!selectedDate || closed}
                              // errorMessage={errorMessage}
                            /> */}

                            <input
                              type="time"
                              value={
                                value
                                  ? `${String(value.hour).padStart(
                                    2,
                                    "0",
                                  )}:${String(value.minute).padStart(2, "0")}`
                                  : ""
                              }
                              onChange={(e) => {
                                const [hourStr, minuteStr] =
                                  e.target.value.split(":");
                                const hour = parseInt(hourStr, 10);
                                const minute = parseInt(minuteStr, 10);
                                handleChange(new Time(hour, minute)); // still compatible
                              }}
                              // min={`${String(minValue.hour).padStart(
                              //   2,
                              //   '0',
                              // )}:${String(minValue.minute).padStart(2, '0')}`}
                              max={`${String(maxValue.hour).padStart(
                                2,
                                "0",
                              )}:${String(maxValue.minute).padStart(2, "0")}`}
                              disabled={!selectedDate || closed}
                              className={`border rounded-md p-2 w-full ${isInvalid ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                          </TableCell>
                          <TableCell className="text-center font-poppinsreg5">
                            {/* <TimeInput
                              value={valueend}
                              onChange={(newValue: Time | null) =>
                                handleChangeSecondTime(newValue)
                              }
                              maxValue={maxValue}
                              isInvalid={isInvalid2}
                              isDisabled={
                                !selectedDate ||
                                closed ||
                                !value ||
                                errorMessage.length > 0
                              }
                              // errorMessage={errorMessage2}
                            /> */}

                            <input
                              type="time"
                              value={
                                valueend
                                  ? `${String(valueend.hour).padStart(
                                    2,
                                    "0",
                                  )}:${String(valueend.minute).padStart(
                                    2,
                                    "0",
                                  )}`
                                  : ""
                              }
                              onChange={(e) => {
                                const [hourStr, minuteStr] =
                                  e.target.value.split(":");
                                const hour = parseInt(hourStr, 10);
                                const minute = parseInt(minuteStr, 10);
                                handleChangeSecondTime(new Time(hour, minute)); // still compatible
                              }}
                              max={`${String(maxValue.hour).padStart(
                                2,
                                "0",
                              )}:${String(maxValue.minute).padStart(2, "0")}`}
                              disabled={
                                !selectedDate ||
                                closed ||
                                !value ||
                                errorMessage.length > 0
                              }
                              className={`border rounded-md p-2 w-full ${isInvalid2
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                            />
                          </TableCell>
                          <TableCell className="text-center font-poppinsreg5">
                            {/* <input
                              value={guestCount}
                              onChange={handleGuestChange}
                              onBlur={handleBlur}
                              type="number"
                              className=" border  text-center  w-14 outline-none"
                            /> */}

                            <Input
                              type="number"
                              value={guestCount.toString()}
                              onChange={handleGuestChange}
                              onBlur={handleBlur}
                              min={1}
                              className="w-14"
                              variant="bordered"
                              radius="sm"
                            />
                          </TableCell>

                          <TableCell className="text-center font-poppinssemi">
                            <Button
                              onPress={handleSearch}
                              isLoading={instantTableSearchLoading}
                              isDisabled={isbuttondisabled}
                              className=" bg-[#FF385C] text-white font-poppinsreg5     md:text-sm text-xs w-full md:w-fit"
                            >
                              {" "}
                              Find a table{" "}
                            </Button>
                          </TableCell>
                        </TableRow>

                        {/* ffffffffffffffffff */}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {errorMessage && (
                  <h1 className=" mt-1 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                    {" "}
                    {errorMessage}{" "}
                  </h1>
                )}

                {closed && (
                  <h1 className=" mt-1 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                    {" "}
                    {closedErrorShow}{" "}
                  </h1>
                )}

                {errorMessage2 && (
                  <h1 className=" mt-1 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm ">
                    {" "}
                    {errorMessage2}{" "}
                  </h1>
                )}

                {/* 
       <h1>
       {value ? `${value.hour.toString().padStart(2, '0')}:${value.minute.toString().padStart(2, '0')}` : 'No time selected'}
          </h1>

          <h1>
       {valueend ? `${valueend.hour.toString().padStart(2, '0')}:${valueend.minute.toString().padStart(2, '0')}` : 'No time selected'}
          </h1>

          <h1> {guestCount} </h1>

          <h1>
       {selectedDate ? 
         `${selectedDate.day.toString().padStart(2, '0')}.${selectedDate.month.toString().padStart(2, '0')}.${selectedDate.year}` 
         : 'No date selected'}
     </h1> */}

                {/* {filteredTables.length > 0 ? (
       filteredTables.map((table:any) => (
         <div className=' py-10' key={table.id}>
           <h2>Table ID: {table.id}</h2>
           <p>Table Number: {table.tableNumber}</p>
           <p>Seating Capacity: {table.seatingCapacity}</p>
         </div>
       ))
     ) : (
       <p>No available tables found for the selected time and date.</p>
     )}

*/}
              </div>
            </div>

            {/* do the reservation ends */}

            {/* show the reservation  */}

            <div className=" w-full flex  2xl:px-0   px-5 justify-center ">
              <div className=" w-full max-w-7xl   mt-10  flex-col  flex ">
                {/* <h1 className=' text-xl  md:text-2xl text-green-700 font-poppinssemi'> {filteredTables.length > 0 ? `Voila! We Have ${filteredTables.length} Available Tables for You 🎉` : ""} </h1> */}

                <h1 className="text-xl md:text-2xl text-green-700 font-poppinssemi">
                  {filteredTables.length > 0
                    ? `Voila! We Have ${filteredTables.length} Available Table${filteredTables.length > 1 ? "s" : ""
                    } for You 🎉`
                    : ""}
                </h1>

                {notablestoshow && (
                  <div>
                    <h1 className=" text-slate-400 ">
                      {" "}
                      {`Oops! We couldn't find any available tables. Please try different dates or times. `}{" "}
                    </h1>
                    <h1 className=" text-slate-400 ">
                      {" "}
                      {`If your guest count is large, consider CUSTOM EVENT RESERVATION to accommodate your needs as you wish.`}{" "}
                    </h1>
                  </div>
                )}

                {filteredTables.length > 0 && (
                  <h1 className=" text-slate-400 text-sm mt-2  font-poppinsreg">
                    {matched
                      ? "Great news! We have tables available that perfectly match your request."
                      : "No tables match your exact guest count. You can still reserve a larger table instead."}
                  </h1>
                )}

                <div className=" overflow-x-auto mt-10 pb-10">
                  {filteredTables.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center font-poppinsreg5">
                            Table
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Date
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Start Time
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            End Time
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Guest
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Seating Capacity
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            Reserve
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTables.length > 0
                          ? filteredTables.map((table: TableWithDetails) => (
                            <TableRow key={table?._id}>
                              <TableCell className="text-center  font-poppinsreg5">
                                {table?.table_number}
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {table?.date}
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {/* {table?.startTime} */}
                                {table?.startTime &&
                                  new Date(`1970-01-01T${table.startTime}`)
                                    .toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                    .replace("am", "AM")
                                    .replace("pm", "PM")}
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {/* {table?.endTime} */}
                                {table?.endTime &&
                                  new Date(`1970-01-01T${table.endTime}`)
                                    .toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                    .replace("am", "AM")
                                    .replace("pm", "PM")}
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {table?.guest}
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {table?.max_seating}
                              </TableCell>
                              <TableCell className="text-center font-poppinssemi">
                                <Button
                                  onPress={() =>
                                    openTheConfirmationModal(table)
                                  }
                                  className=" bg-[#FF385C] text-white font-poppinsreg5 text-xs  w-fit"
                                >
                                  BOOK NOW{" "}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                          : // <p>No available tables found for the selected time and date.</p>
                          null}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* instant wrapper ends  */}

        {/* 2D Map wrapper starts */}
        {type === "map" && selectedMapLayout && (
          <div ref={mapRef} className="w-full">
            <div className="w-full flex 2xl:px-0 px-5 justify-center">
              <div className="w-full max-w-7xl flex flex-col mt-12">
                {/* Section selector */}
                {mapLayouts.length > 1 && (
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {mapLayouts.map((layout: any) => (
                      <button
                        key={layout.id}
                        onClick={() => {
                          setSelectedMapLayout(layout);
                          setSelectedMapTable(null);
                          setMapSearched(false);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-poppinsreg5 transition-all ${selectedMapLayout?.id === layout.id
                          ? "bg-[#2f3335] text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                          }`}
                      >
                        {layout.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Date/Time/Guest selection */}
                <div className="flex flex-col md:flex-row gap-4 items-end mb-8 p-5 border rounded-xl border-zinc-200 bg-white">
                  <div className="flex flex-col gap-1 flex-1 w-full">
                    <h1 className="font-poppinsreg5 text-sm">Select a date</h1>
                    <DatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      label="Date"
                      minValue={minDate}
                    />
                  </div>

                  <div className="flex flex-col gap-1 flex-1 w-full">
                    <h1 className="font-poppinsreg5 text-sm">Starting time</h1>
                    <input
                      type="time"
                      value={
                        value
                          ? `${String(value.hour).padStart(2, "0")}:${String(
                            value.minute,
                          ).padStart(2, "0")}`
                          : ""
                      }
                      onChange={(e) => {
                        const [hourStr, minuteStr] = e.target.value.split(":");
                        const hour = parseInt(hourStr, 10);
                        const minute = parseInt(minuteStr, 10);
                        handleChange(new Time(hour, minute));
                      }}
                      max={`${String(maxValue.hour).padStart(2, "0")}:${String(
                        maxValue.minute,
                      ).padStart(2, "0")}`}
                      disabled={!selectedDate || closed}
                      className={`border rounded-md p-2 w-full ${isInvalid ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1 flex-1 w-full">
                    <h1 className="font-poppinsreg5 text-sm">Ending time</h1>
                    <input
                      type="time"
                      value={
                        valueend
                          ? `${String(valueend.hour).padStart(
                            2,
                            "0",
                          )}:${String(valueend.minute).padStart(2, "0")}`
                          : ""
                      }
                      onChange={(e) => {
                        const [hourStr, minuteStr] = e.target.value.split(":");
                        const hour = parseInt(hourStr, 10);
                        const minute = parseInt(minuteStr, 10);
                        handleChangeSecondTime(new Time(hour, minute));
                      }}
                      max={`${String(maxValue.hour).padStart(
                        2,
                        "0",
                      )}:${String(maxValue.minute).padStart(2, "0")}`}
                      disabled={
                        !selectedDate ||
                        closed ||
                        !value ||
                        errorMessage.length > 0
                      }
                      className={`border rounded-md p-2 w-full ${isInvalid2 ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h1 className="font-poppinsreg5 text-sm">Guests</h1>
                    <Input
                      type="number"
                      value={guestCount.toString()}
                      onChange={handleGuestChange}
                      onBlur={handleBlur}
                      min={1}
                      className="w-20"
                      variant="bordered"
                      radius="sm"
                    />
                  </div>

                  <Button
                    isLoading={mapLoading}
                    isDisabled={
                      !selectedDate ||
                      !value ||
                      !valueend ||
                      !guestCount ||
                      closed
                    }
                    onPress={handleMapSearch}
                    className="bg-[#FF385C] text-white font-poppinsreg5 md:text-sm text-xs w-full md:w-fit h-10"
                  >
                    Show Availability
                  </Button>
                </div>

                {errorMessage && (
                  <h1 className="mt-1 mb-2 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                    {errorMessage}
                  </h1>
                )}
                {closed && (
                  <h1 className="mt-1 mb-2 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                    {closedErrorShow}
                  </h1>
                )}
                {errorMessage2 && (
                  <h1 className="mt-1 mb-2 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                    {errorMessage2}
                  </h1>
                )}

                {/* Legend */}
                {mapSearched && (
                  <div className="flex gap-6 mb-4 flex-wrap items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-zinc-200 bg-white"></div>
                      <span className="text-xs font-poppinsreg5 text-zinc-500">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-orange-400 bg-orange-50"></div>
                      <span className="text-xs font-poppinsreg5 text-zinc-500">
                        Selected
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-red-400 bg-red-50"></div>
                      <span className="text-xs font-poppinsreg5 text-zinc-500">
                        Booked
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-zinc-200 bg-zinc-50"></div>
                      <span className="text-xs font-poppinsreg5 text-zinc-400">
                        Too Small
                      </span>
                    </div>
                  </div>
                )}

                {/* Map */}
                <RestaurantMap
                  layout={selectedMapLayout}
                  bookedTableIds={mapSearched ? mapBookedTableIds : []}
                  incompatibleTableIds={mapSearched ? mapIncompatibleTableIds : []}
                  selectedTableId={selectedMapTable?.id || null}
                  mapSearched={mapSearched}
                  onSelectTable={(table) => {
                    if (!mapSearched) {
                      toast.error(
                        "Please select date, time, and guests first, then click 'Show Availability'",
                      );
                      return;
                    }
                    setSelectedMapTable(table);
                  }}
                />

                {/* Selected table info panel */}
                {selectedMapTable && mapSearched && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 mb-10 p-5 border border-orange-200 bg-orange-50 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <h2 className="font-poppinssemi text-lg text-zinc-800">
                        Table: {selectedMapTable.name}
                      </h2>
                      <p className="font-poppinsreg text-sm text-zinc-500">
                        Seats: {selectedMapTable.seats} &bull; Fee: Rs.
                        {selectedMapTable.pricePerSeat || 0}/seat
                      </p>
                    </div>
                    <Button
                      onPress={() => handleMapTableBook(selectedMapTable)}
                      className="bg-[#FF385C] text-white font-poppinsreg5 text-sm px-8 h-10"
                    >
                      BOOK NOW
                    </Button>
                  </motion.div>
                )}

                {mapSearched && !selectedMapTable && (
                  <p className="text-zinc-400 text-sm font-poppinsreg mt-4 mb-10">
                    Tap on an available table to select it for booking.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* 2D Map wrapper ends */}
        {/* show the reservation  */}

        {type === "preferred" && (
          <div ref={preferredRef} className=" w-full ">
            {/* table reservation  */}
            <div className=" w-full flex  2xl:px-0  px-5 justify-center ">
              <div className=" w-full max-w-7xl    gap-16 mt-12   ">
                {/* overflow-auto */}
                {/* //vaa inga  */}
                <div className=" ">
                  {/* <h1 className="text-slate-500  sm:hidden flex pb-2 text-xs font-bold">
                    Scroll sideways to view the complete table information below
                  </h1> */}

                  {/* <h1 className="text-sm    sm:hidden flex text-black -mt-5 ">
                    Selected Date:{' '}
                    {formattedPreferredSelectedDate
                      ? formattedPreferredSelectedDate
                      : 'No date selected'}
                  </h1> */}

                  {/* overflow-x-auto */}
                  <div className=" lg:w-fit   mb-10 lg:border-none border    ">
                    <Table className=" border">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center font-poppinsreg5">
                            {" "}
                            Date
                          </TableHead>
                          <TableHead className="text-center font-poppinsreg5">
                            {" "}
                            Tables
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-center  font-poppinsreg5">
                            {/* <DatePicker
                              //  value={selectedDate}
                              //  onChange={handleDateChange}
                              value={preferredSelectedDate}
                              onChange={handlePrefferedDateChange}
                              label="Date and time"
                              // minValue={today(getLocalTimeZone())}
                              minValue={minDate}
                              // minValue={today(getLocalTimeZone()).add({ days: 1 })}
                              // defaultValue={today(getLocalTimeZone())}
                            /> */}

                            <div>
                              {isMobile ? (
                                // ✅ Native mobile date picker
                                <input
                                  type="date"
                                  value={
                                    formattedPreferredSelectedDate
                                      ? formattedPreferredSelectedDate
                                        .split(".")
                                        .reverse()
                                        .join("-")
                                      : ""
                                  }
                                  onChange={handleNativeDateChange}
                                  min={new Date().toISOString().split("T")[0]} // today's date as min
                                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                                />
                              ) : (
                                // ✅ Desktop version with NextUI DatePicker
                                <DatePicker
                                  value={preferredSelectedDate}
                                  onChange={handlePrefferedDateChange}
                                  label="Date and time"
                                  minValue={minDate}
                                />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-poppinsreg5">
                            {/* ffffffffffffffffffffffffffffffffffff */}
                            <Dropdown className="   " shouldBlockScroll={false}>
                              <DropdownTrigger>
                                <Button variant="bordered">
                                  {mentionSelectedTable
                                    ? `Table ${mentionSelectedTable}`
                                    : "Choose a table"}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                onAction={handleSelection}
                                className="max-h-60 overflow-y-auto"
                                variant="faded"
                                aria-label="Dropdown menu with description"
                              >
                                {RestaurantTables?.map((table: any) => (
                                  <DropdownItem
                                    key={table._id}
                                    className="  font-poppinsreg5"
                                    description={`Max Seat Capacity : ${table.max_seating}`}
                                    startContent={
                                      <Image
                                        src={
                                          table?.table_image
                                            ? table?.table_image
                                            : "/noimage.jpg"
                                        }
                                        alt=""
                                        width={100}
                                        height={100}
                                        className=" w-14 h-14 object-cover"
                                      />
                                    }
                                  // startContent={<h1> className={iconClasses} />}
                                  >
                                    Table {table.table_number}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </TableCell>

                          <TableCell className="text-center font-poppinssemi">
                            <Button
                              isLoading={slotsfetchingloadingbtn}
                              onPress={CheckSlotsForTable}
                              isDisabled={
                                !formattedPreferredSelectedDate ||
                                !selectedPreferredTable ||
                                closedErrorShow.length > 0
                              }
                              className=" bg-[#FF385C] text-white font-poppinsreg5 text-xs  w-fit"
                            >
                              CHECK SLOTS{" "}
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* slots for selected table  */}

                {closed && (
                  <h1 className=" mt-1 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                    {" "}
                    {closedErrorShow}{" "}
                  </h1>
                )}

                {/* slots for selected table ends  */}

                {/* jigiri */}

                {/* tableWithSlots?.length > 0 */}

                {showSlotsTable && (
                  <div
                    className={`  flex ${tableWithSlots.length > 0 && "lg:flex-row lg:gap-20 "
                      }  flex-col gap-10  my-14 `}
                  >
                    {tableWithSlots?.length > 0 && (
                      <div className="  lg:w-fit border h-fit  pt-3 flex flex-col   gap-3  ">
                        <h1 className=" text-lg text-center  text-slate-800 font-poppinssemi px-2">
                          {" "}
                          Reserved slots for the table
                        </h1>

                        <Table className=" border">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-center font-poppinsreg5">
                                Date
                              </TableHead>
                              <TableHead className="text-center whitespace-nowrap font-poppinsreg5">
                                Start Time
                              </TableHead>
                              <TableHead className="text-center whitespace-nowrap font-poppinsreg5">
                                End Time
                              </TableHead>

                              <TableHead className="text-center font-poppinsreg5">
                                Status
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tableWithSlots?.map((table: any) => (
                              <TableRow key={table._id}>
                                <TableCell className="text-center font-poppinsreg5">
                                  {table?.date}
                                </TableCell>
                                <TableCell className="text-center  font-poppinsreg5">
                                  {/* {table?.start_time} */}
                                  {table?.start_time &&
                                    new Date(`1970-01-01T${table.start_time}`)
                                      .toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace("am", "AM")
                                      .replace("pm", "PM")}
                                </TableCell>
                                <TableCell className="text-center font-poppinsreg5">
                                  {/* {table?.end_time} */}
                                  {table?.end_time &&
                                    new Date(`1970-01-01T${table.end_time}`)
                                      .toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace("am", "AM")
                                      .replace("pm", "PM")}
                                </TableCell>
                                <TableCell className="text-center font-poppinsreg5 text-green-700">
                                  Reserved
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}

                    {/* jigiri */}

                    {/* the right side section  */}

                    {tableWithSlots?.length === 0 && (
                      <h1 className="   font-poppinssemi text-lg text-green-700">
                        {" "}
                        {/* No slots reserved for the table on this day. Reserve
                        your table now{' '} */}
                        {`This table is free for your chosen date. Secure your reservation today!`}
                      </h1>
                    )}

                    <div className=" flex flex-col">
                      <div className="  lg:w-fit   border h-fit pt-3  flex flex-col gap-3">
                        <div className=" flex flex-col gap-[1px] items-center">
                          <h1 className=" text-lg  text-center  font-poppinssemi text-slate-800">
                            {" "}
                            Reserve on your preferred time{" "}
                          </h1>
                          {tableWithSlots?.length > 0 && (
                            <p className=" max-w-lg text-sm text-center text-slate-400">
                              {" "}
                              Please review the available slot times in the
                              table to the left and select a reservation time
                              when the table is free{" "}
                            </p>
                          )}
                        </div>

                        <Table className="  w-fit border">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-center font-poppinsreg5">
                                Select a date
                              </TableHead>
                              <TableHead className="text-center whitespace-nowrap font-poppinsreg5">
                                Start Time
                              </TableHead>
                              <TableHead className="text-center whitespace-nowrap font-poppinsreg5">
                                End Time
                              </TableHead>

                              {/* <TableHead className="text-center font-poppinsreg5">Seating Capacity</TableHead>
     <TableHead className="text-center font-poppinsreg5">Reserve</TableHead> */}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center  font-poppinsreg5">
                                <DatePicker
                                  //  value={selectedDate}
                                  //  onChange={handleDateChange}

                                  value={preferredDefaultDate}
                                  label="Date and time"
                                  //  minValue={today(getLocalTimeZone())}
                                  isReadOnly
                                // defaultValue={today(getLocalTimeZone())}
                                />
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {/* <TimeInput
                                  //  value={value}
                                  //  onChange={(newValue: Time | null) => handleChange(newValue)}
                                  value={valueStartPreferred}
                                  onChange={(newValue: Time | null) =>
                                    handleChangeprefferedStart(newValue)
                                  }
                                  minValue={minValue}
                                  maxValue={maxValue}
                                  isInvalid={isInvalidpreffered}
                                  // errorMessage={errorMessage}
                                /> */}
                                <input
                                  type="time"
                                  value={
                                    valueStartPreferred
                                      ? `${String(
                                        valueStartPreferred.hour,
                                      ).padStart(2, "0")}:${String(
                                        valueStartPreferred.minute,
                                      ).padStart(2, "0")}`
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const [hourStr, minuteStr] =
                                      e.target.value.split(":");
                                    const hour = parseInt(hourStr, 10);
                                    const minute = parseInt(minuteStr, 10);
                                    handleChangeprefferedStart(
                                      new Time(hour, minute),
                                    );
                                  }}
                                  min={`${String(minValue.hour).padStart(
                                    2,
                                    "0",
                                  )}:${String(minValue.minute).padStart(
                                    2,
                                    "0",
                                  )}`}
                                  max={`${String(maxValue.hour).padStart(
                                    2,
                                    "0",
                                  )}:${String(maxValue.minute).padStart(
                                    2,
                                    "0",
                                  )}`}
                                  disabled={false}
                                  className={`border rounded-md p-2 w-full ${isInvalidpreffered
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                                />
                                {/* bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */}
                              </TableCell>
                              <TableCell className="text-center font-poppinsreg5">
                                {/* <TimeInput
                                  //  value={valueend}
                                  //  onChange={(newValue: Time | null) => handleChangeSecondTime(newValue)}
                                  value={valueEndPreferred}
                                  onChange={(newValue: Time | null) =>
                                    handleChangeprefferedEnd(newValue)
                                  }
                                  maxValue={maxValue}
                                  isInvalid={isInvalidpreffered2}
                                  isDisabled={
                                    isInvalidpreffered || !valueStartPreferred
                                  }
                                  // errorMessage={errorMessage2}
                                /> */}
                                <input
                                  type="time"
                                  value={
                                    valueEndPreferred
                                      ? `${String(
                                        valueEndPreferred.hour,
                                      ).padStart(2, "0")}:${String(
                                        valueEndPreferred.minute,
                                      ).padStart(2, "0")}`
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const [hourStr, minuteStr] =
                                      e.target.value.split(":");
                                    const hour = parseInt(hourStr, 10);
                                    const minute = parseInt(minuteStr, 10);
                                    handleChangeprefferedEnd(
                                      new Time(hour, minute),
                                    );
                                  }}
                                  min={
                                    valueStartPreferred
                                      ? `${String(
                                        valueStartPreferred.hour,
                                      ).padStart(2, "0")}:${String(
                                        valueStartPreferred.minute,
                                      ).padStart(2, "0")}`
                                      : `${String(minValue.hour).padStart(
                                        2,
                                        "0",
                                      )}:${String(minValue.minute).padStart(
                                        2,
                                        "0",
                                      )}`
                                  }
                                  max={`${String(maxValue.hour).padStart(
                                    2,
                                    "0",
                                  )}:${String(maxValue.minute).padStart(
                                    2,
                                    "0",
                                  )}`}
                                  disabled={
                                    isInvalidpreffered || !valueStartPreferred
                                  }
                                  className={`border rounded-md p-2 w-full ${isInvalidpreffered2
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                                />
                              </TableCell>
                              {/* jab */}

                              <TableCell className="text-center font-poppinssemi">
                                <Button
                                  isLoading={slotscheckedbookingconfirmbtnload}
                                  onPress={ReserveTheTableAfterSlotChecks}
                                  isDisabled={isbuttondisabledPreferred}
                                  className=" bg-[#FF385C] text-white font-poppinsreg5     md:text-sm text-xs w-full md:w-fit"
                                >
                                  {" "}
                                  Reserve{" "}
                                </Button>
                              </TableCell>
                            </TableRow>
                            {/* bbbbbbbbbbbbbbbbbbb  */}
                          </TableBody>
                        </Table>
                      </div>

                      {ErrorMessagePrefferedStart && (
                        <h1 className=" mt-1 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm">
                          {" "}
                          {ErrorMessagePrefferedStart}{" "}
                        </h1>
                      )}

                      {ErrorMessagePrefferedEnd && (
                        <h1 className=" mt-1 text-[#F31260] bg-[#FDD0DF] w-fit p-[1px] font-poppinsreg text-sm ">
                          {" "}
                          {ErrorMessagePrefferedEnd}{" "}
                        </h1>
                      )}

                      {/* {
        BookingSuccess &&

        <h1> Success booking </h1>
       } */}

                      {BookingError && (
                        <h1 className=" max-w-lg text-sm mt-2 text-red-500 font-poppinsreg">
                          {" "}
                          {`Your reservation time conflicts with an existing booking. Please check the slots table and select an available time`}{" "}
                        </h1>
                      )}
                    </div>

                    {/* the right side section  */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {type === "custom" && (
          // kjjjjjjjjjjjjjjj

          <div
            ref={customRef}
            className=" 2xl:px-0  flex justify-center px-5  w-full"
          >
            <div className=" max-w-7xl pb-10 w-full">
              <h1 className=" text-lg md:text-xl mt-12 text-green-900 md:text-left text-center   font-poppinssemi">
                {" "}
                Awesome! Tell us a bit about your event
              </h1>

              <div className=" flex flex-col  md:mb-0 mb-5  pb-5 mt-4 pt-5 gap-10  border  rounded-md w-fit p-2">
                {/* selectedCustomEventDate
  handleDateChangeForCustom */}

                <div className=" flex  w-fit  flex-col gap-1">
                  <h1 className="  font-poppinssemi text-slate-900 ">
                    {" "}
                    01. Select a date{" "}
                  </h1>
                  <DatePicker
                    value={selectedCustomEventDate}
                    onChange={handleDateChangeForCustom}
                    label="Date and time"
                    // minValue={today(getLocalTimeZone())}
                    minValue={minDate}
                  // minValue={today(getLocalTimeZone()).add({ days: 1 })}
                  // defaultValue={today(getLocalTimeZone())}
                  />

                  {closedErrorShow && (
                    <h1 className=" text-red-400 font-poppinsreg">
                      {" "}
                      {closedErrorShow}
                    </h1>
                  )}
                </div>

                <div className="  flex flex-col gap-2 w-full max-w-2xl ">
                  {/* <Label htmlFor="message-2">Your Message</Label> */}
                  <div className=" flex flex-col gap-[4px]">
                    <p className="      font-poppinssemi text-slate-900">
                      {`02. Please provide the details of your event including the date, time, venue setup, and any special requests`}
                    </p>
                    <h1 className="  text-slate-400 font-poppinsreg text-xs">
                      {" "}
                      {`(Minimum of 100 characters required)`}{" "}
                    </h1>
                  </div>
                  <Textarea
                    value={customReservationDetail}
                    onChange={(e) => setcustomReservationDetail(e.target.value)}
                    className="  placeholder:font-poppinsreg text-slate-600   placeholder:text-slate-400     font-poppinsreg placeholder:text-xs md:placeholder:text-sm"
                    placeholder="Eg: I want the balcony of your restaurant on 24.05.2024 from 2 PM to 6 PM for a family get-together function. Please ensure the area is well cleaned, arrange tables for 20 people, and remove any additional tables to make the space open"
                    id="message-2"
                  />
                </div>

                <div className="flex gap-5">
                  <h1 className="    font-poppinssemi text-slate-900  ">
                    {" "}
                    03. Order event meals from us{" "}
                  </h1>

                  <Switch
                    // checked={productAvailability[food.id] ?? food.availability}
                    // onCheckedChange={(checked) => handleSwitchChange(food.id, checked)}
                    checked={isMealOrdered}
                    onCheckedChange={handleSwitchChange}
                    className=" h-fit"
                  />
                </div>
                {/* isMealOrdered */}
                {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}

                <Button
                  isDisabled={
                    !customReservationDetail ||
                    customReservationDetail.length < 100 ||
                    !CustomDate ||
                    closedErrorShow.length > 0
                  }
                  onPress={customReservationDataLoad}
                  className=" bg-[#FF385C] text-white font-poppinsreg5     md:text-sm text-xs w-full md:w-fit"
                >
                  {" "}
                  Submit Custom Reservation{" "}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* {status === 'unauthenticated' && (
        <div className=" absolute top-2 right-2 hidden md:flex gap-3   font-poppinsreg5  items-center">
          <Button
            onPress={() => setShowSignupModel(true)}
            className=" px-8  bg-transparent border-white border-[1px] text-white  rounded-full"
          >
            Sign up
          </Button>
          <Button
            onPress={() => setIsShowLoginModel(true)}
            className=" px-8  bg-transparent border-white border-[1px]  text-white rounded-full"
          >
            Log In
          </Button>
        </div>
      )} */}

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

      {status === "authenticated" && (
        <div className=" w-full flex justify-center">
          <div className=" absolute p-2 top-0 max-w-7xl w-full justify-between flex  ">
            <Button
              onPress={() => router.back()}
              variant="light"
              className=" border text-white w-28"
            >
              {" "}
              Go Back{" "}
            </Button>

            <div className=" flex items-center gap-5">
              <div className=" flex flex-col ">
                <h1 className=" text-sm text-white font-poppinssemi">
                  {" "}
                  {`Hi ${session.user.name}`}{" "}
                </h1>
                <h1 className=" font-poppinsreg5 text-sm text-slate-200">{`${new Date().getHours() < 12
                  ? "Good Morning!"
                  : new Date().getHours() < 18
                    ? "Good Afternoon!"
                    : "Good Evening!"
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
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    onClick={() => router.push("/settings?section=Profile")}
                    key="settings"
                  >
                    Profile
                  </DropdownItem>

                  <DropdownItem
                    onClick={() =>
                      router.push("/settings?section=My-Reservations")
                    }
                    key="analytics"
                  >
                    My Reservations
                  </DropdownItem>
                  {/* <DropdownItem onClick={() =>  router.push('/notifications')} key="system">
      
      
        Notifications
        
        </DropdownItem> */}
                  {/* <DropdownItem onClick={() =>  router.push('/settings?section=Billings')} key="configurations">
       
     
        Payment & Billing
   
        </DropdownItem> */}

                  <DropdownItem
                    onClick={() => signOut()}
                    key="logout"
                    color="danger"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}

      {/* modal for reservaiton  */}

      {/* mobile screen  */}

      {status === "unauthenticated" && (
        <div className=" w-full max-w-7xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 p-2 flex justify-between">
          <div className="  w-full    flex justify-between ">
            <Button
              onPress={() => router.back()}
              variant="light"
              className=" border text-white w-28"
            >
              {" "}
              Go Back{" "}
            </Button>

            {/* wwwwwwwwwwwwwwwwwwwwwwww */}

            <svg
              onClick={() => setopenModal(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 md:hidden flex text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>

          <div className=" absosadlute tasdop-2 rigasdht-2 hidden md:flex gap-3   font-poppinsreg5  items-center">
            <Button
              onPress={() => setShowSignupModel(true)}
              className=" px-8  bg-transparent border-white border-[1px] text-white  rounded-full"
            >
              Sign up
            </Button>
            <Button
              onPress={() => setIsShowLoginModel(true)}
              className=" px-8  bg-transparent border-white border-[1px]  text-white rounded-full"
            >
              Log In
            </Button>
          </div>

          {/* <div className="mt-3 flex flex-col gap-3">
            <h1
              onClick={() => {
                setIsShowLoginModel(true);
                setopenModal(false);
              }}
              className=" text-center font-poppinsreg py-2 rounded-md border"
            >
              {' '}
              Login{' '}
            </h1>

            <h1
              onClick={() => {
                setShowSignupModel(true);
                setopenModal(false);
              }}
              className=" text-center font-poppinsreg py-2 rounded-md border"
            >
              {' '}
              Sign Up{' '}
            </h1>
          </div> */}
        </div>
      )}

      {/* the hamburger sheet  */}

      <div
        ref={absoluteElementRef}
        className={` lg:hidden fixed transition-all  overflow-y-auto   ease-in-out   duration-500 top-0  bg-gray-50 ${openModal ? "right-0 w-[70%]" : " -right-full w-0"
          }  h-full `}
      >
        <div className=" px-3 py-5">
          <div className=" w-full flex border-b pb-3 border-black/20 justify-end">
            {/* <h1 className=" text-2xl"> FILTER </h1> */}

            <svg
              onClick={() => setopenModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
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
                <h1 className=" text-center font-poppinsreg py-2 rounded-md border">
                  {" "}
                  Profile{" "}
                </h1>
                <h1 className=" text-center font-poppinsreg py-2 rounded-md border">
                  {" "}
                  My Reservations{" "}
                </h1>

                <h1 className=" text-center font-poppinsreg py-2 rounded-md border">
                  {" "}
                  Log Out{" "}
                </h1>
              </div>
            )}

            {/* rrrrrrrrrrrrrrrrrrrrr  */}
          </div>

          {/* dropdowns  */}
        </div>
      </div>
      {/* the hamburger sheet  */}

      {/* mobile screen  */}

      {/* md:min-h-fit md:h-fit h-screen  md:max-h-[95vh]  py-3   overflow-y-auto  */}

      {/* md:h-auto h-screen py-3   overflow-y-auto */}

      <Modal
        classNames={{
          backdrop: " bg-black bg-opacity-80",
        }}
        className="  md:min-h-fit md:h-fit  max-h-[90vh]  md:max-h-[95vh]  py-3   overflow-y-auto "
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className=" flex flex-col gap-1">
                  <h1 className="flex flex-col  text-[#FF385C]   font-poppinssemi text-xl gap-1">
                    Booking Confirmation{" "}
                  </h1>
                  <h1 className=" text-slate-500 text-sm font-poppinsreg5">
                    {" "}
                    Ensure all details are correct and confirm to proceed{" "}
                  </h1>
                </div>

                <div className=" mt-4 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {" "}
                    Reservation Details{" "}
                  </h1>

                  <div className=" grid  grid-cols-2">
                    <div className="border-t p-1 border-l">
                      <h1 className=" font-poppinsreg5 "> Reservation Date </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> 04.05.2024 </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {reservationDate}
                      </h1>
                    </div>

                    <div className=" border-t border-r p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Restaurant </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {Reservationrestaurant}
                      </h1>
                    </div>

                    <div className=" border-t p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Table </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> 04 (Max-Seat-Capacity : 02)   </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {Reservationtable}{" "}
                      </h1>
                    </div>

                    <div className="  border p-1">
                      <h1 className=" font-poppinsreg5"> Start Time </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> 16:00   </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {ReservationstartTime}{" "}
                      </h1>
                    </div>

                    <div className="border p-1">
                      <h1 className=" font-poppinsreg5"> End Time </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>  18:30   </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {ReservationendTime}{" "}
                      </h1>
                    </div>

                    <div className=" border-b border-r p-1">
                      <h1 className=" font-poppinsreg5"> Guest </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'>  02   </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {type === "preferred"
                          ? `Up to ${ReservationguestCount} people`
                          : ReservationguestCount}{" "}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className=" mt-4 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {" "}
                    Customer Details{" "}
                  </h1>

                  <div className=" grid  grid-cols-2">
                    <div className="border-t p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Name </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> Jason Roy</h1> */}
                      <h1 className=" overflow-hidden  font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {session?.user?.name}
                      </h1>
                    </div>

                    <div className="  p-1    border">
                      <h1 className=" font-poppinsreg5"> Email </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
                      <h1 className="   overflow-hidden  font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {session?.user?.email}{" "}
                      </h1>
                    </div>

                    <div className="  p-1 border">
                      <h1 className=" font-poppinsreg5"> Phone Number </h1>
                      {/* <h1 className=' font-poppinsreg text-red-500 text-sm'> {` ${false ? "04 (Max-Seat-Capacity : 02)" : "NOT ADDED"} `}    </h1> */}
                      <h1 className=" overflow-hidden  font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {session?.user.phone}{" "}
                      </h1>
                    </div>
                  </div>

                  <p className=" text-xs text-slate-400">
                    {" "}
                    {`To update your details, please visit the settings page. We use the information provided in your profile to ensure the validity of your reservation`}{" "}
                  </p>
                </div>

                <div className=" text-xl mt-4 ">
                  <h1 className="font-poppinsreg5"> Reservation Fee </h1>
                  <h1 className=" font-poppinsreg5 text-slate-500 ">
                    {" "}
                    {reservationfee === 0 ? (
                      <span className="  text-green-700"> FREE </span>
                    ) : (
                      `LKR ${reservationfee}`
                    )}{" "}
                  </h1>

                  <p className=" text-slate-400 text-xs mt-1">
                    {" "}
                    {`This fee secures your reservation and ensures genuine interest. Upon attending the restaurant and completing your reservation, the amount will be fully refunded`}
                  </p>
                  {!isVerified && (
                    <div className=" mt-4 flex flex-col gap-2">
                      <p className=" font-poppinsreg text-sm p-2 bg-red-100 text-red-700 rounded">
                        {`Your email is not yet verified. Please check your email and verify it to continue with your reservation`}{" "}
                      </p>
                      <Button
                        isLoading={resendEmailLoading}
                        onPress={handleResendVerificationEmail}
                        className=" bg-blue-600 text-white font-poppinsreg5 text-xs w-full"
                      >
                        Resend Verification Email
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  isDisabled={!isVerified}
                  isLoading={reservationSubmitLoadingBTN}
                  onPress={reservationTest}
                  className=" bg-[#FF385C] text-white font-poppinsreg5 text-xs mt-4  w-full"
                >
                  Confirm & Proceed
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* modal for reservaiton  */}

      {/* Modal for custom reservation  */}

      {/* modal for reservaiton  */}

      {/* md:min-h-fit md:h-fit h-screen  md:max-h-[95vh]  py-3   overflow-y-auto  */}
      {/* md:h-auto h-screen py-3   overflow-y-auto */}
      <Modal
        // isOpen:customisOpen, onOpen:customonOpen, onClose:customonClose, onOpenChange:customonOpenChange

        classNames={{
          backdrop: " bg-black bg-opacity-80",
        }}
        className="md:min-h-fit md:h-fit  max-h-[90vh]  md:max-h-[95vh]  py-3   overflow-y-auto  "
        size="xl"
        isOpen={customisOpen}
        onOpenChange={customonOpenChange}
      >
        <ModalContent>
          {(customonClose) => (
            <>
              <ModalBody>
                <div className=" flex flex-col gap-1">
                  <h1 className="flex flex-col  text-[#FF385C]   font-poppinssemi text-xl gap-1">
                    Booking Confirmation{" "}
                  </h1>
                  <h1 className=" text-slate-500 text-sm font-poppinsreg5">
                    {" "}
                    Ensure all details are correct and confirm to proceed{" "}
                  </h1>
                </div>

                <div className=" mt-4 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {" "}
                    Reservation Details{" "}
                  </h1>

                  <div className=" grid  grid-cols-2">
                    <div className="border-t border-b p-1 border-l">
                      <h1 className=" font-poppinsreg5 "> Reservation Date </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> 04.05.2024 </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {reservationDate}
                      </h1>
                    </div>

                    <div className=" border-t border-b border-r p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Restaurant </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {Reservationrestaurant}
                      </h1>
                    </div>

                    <div className="  border-b border-r p-1 border-l">
                      <h1 className=" font-poppinsreg5">
                        {" "}
                        Meal From Restaurant{" "}
                      </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {isMealOrdered ? "Yes" : "No"}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Reservation details customer description */}

                <div className=" mt-4 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {" "}
                    Event Details{" "}
                  </h1>

                  <div className=" min-h-fit max-h-[150px] overflow-y-auto border p-1 text-wrap">
                    <p className=" text-slate-500 text-sm">
                      {" "}
                      {customReservationDetail}{" "}
                    </p>
                  </div>
                </div>
                {/* rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}

                {/* Reservation details customer description */}

                <div className=" mt-4 flex flex-col gap-2">
                  <h1 className="  font-poppinssemi text-lg">
                    {" "}
                    Customer Details{" "}
                  </h1>

                  <div className=" grid  grid-cols-2">
                    <div className="border-t p-1 border-l">
                      <h1 className=" font-poppinsreg5"> Name </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> Jason Roy</h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {session?.user?.name}
                      </h1>
                    </div>

                    <div className="  p-1   border">
                      <h1 className=" font-poppinsreg5"> Email </h1>
                      {/* <h1 className=' font-poppinsreg text-slate-500 text-sm'> The Gallery Cafe </h1> */}
                      <h1 className="  font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {session?.user?.email}{" "}
                      </h1>
                    </div>

                    <div className="  p-1 border">
                      <h1 className=" font-poppinsreg5"> Phone Number </h1>
                      {/* <h1 className=' font-poppinsreg text-red-500 text-sm'> {` ${false ? "04 (Max-Seat-Capacity : 02)" : "NOT ADDED"} `}    </h1> */}
                      <h1 className=" font-poppinsreg text-slate-500 text-sm">
                        {" "}
                        {session?.user.phone}{" "}
                      </h1>
                    </div>
                  </div>

                  <p className=" text-xs text-slate-400">
                    {" "}
                    {`To update your details, please visit the settings page. We use the information provided in your profile to ensure the validity of your reservation`}{" "}
                  </p>
                </div>

                {type !== "custom" && (
                  <div className=" text-xl mt-4 ">
                    <h1 className="font-poppinsreg5"> Reservation Fee </h1>
                    <h1 className=" font-poppinsreg5 text-slate-500 ">
                      {" "}
                      LKR {reservationfee}{" "}
                    </h1>

                    <p className=" text-slate-400 text-xs mt-1">
                      {" "}
                      {`This fee secures your reservation and ensures genuine interest. Upon attending the restaurant and completing your reservation, the amount will be fully refunded`}
                    </p>
                  </div>
                )}

                {!isVerified && (
                  <div className=" mt-4 flex flex-col gap-2">
                    <p className=" font-poppinsreg text-sm p-2 bg-red-100 text-red-700 rounded">
                      {`Your email is not yet verified. Please check your email and verify it to continue with your reservation`}{" "}
                    </p>
                    <Button
                      isLoading={resendEmailLoading}
                      onPress={handleResendVerificationEmail}
                      className=" bg-blue-600 text-white font-poppinsreg5 text-xs w-full"
                    >
                      Resend Verification Email
                    </Button>
                  </div>
                )}

                <Button
                  isDisabled={!isVerified}
                  isLoading={customReservationBtnLoad}
                  onPress={createCustomReservation}
                  className=" bg-[#FF385C] text-white font-poppinsreg5 text-xs mt-4  w-full"
                >
                  Confirm & Proceed
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* modal for reservaiton  */}

      {/* Modal for custom reservation  */}

      {/* SUCCESS MODAL  */}

      <Modal
        // isOpen:customisOpen, onOpen:customonOpen, onClose:customonClose, onOpenChange:customonOpenChange

        classNames={{
          backdrop: " bg-black bg-opacity-80",
        }}
        className=" md:h-auto h-fit py-3   overflow-y-auto"
        size="md"
        isOpen={isOpenSuccess}
        onOpenChange={onOpenChangeSuccess}
      >
        <ModalContent>
          {(onCloseSuccess) => (
            <>
              <ModalBody className=" flex justify-center items-center">
                <Image
                  alt="reservation"
                  width={2000}
                  height={2000}
                  src={"/reservation.png"}
                />

                <div className=" flex flex-col gap-2">
                  <h1 className=" font-poppinsreg5 text-xl text-center">
                    {" "}
                    Thank you, {session?.user.name}!{" "}
                  </h1>

                  <h1 className=" text-green-700 text-lg text-center  font-poppinsreg5">
                    {" "}
                    Your reservation has been successfully made!{" "}
                  </h1>

                  <h1 className=" font-poppinsreg5 text-xs text-center text-slate-700">
                    {" "}
                    {`Your reservation is still pending approval from the restaurant. Please check the status of your reservation in the "My Reservations" section`}{" "}
                  </h1>
                </div>

                <Button
                  onPress={() =>
                    router.push("/settings?section=My-Reservations")
                  }
                  className="bg-[#FF385C] mt-2 text-white font-poppinsreg5 "
                >
                  {" "}
                  GO TO MY RESERVATIONS{" "}
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* SUCCESS MODAL  */}

      {/* FAILED MODAL  */}

      {/* SUCCESS MODAL  */}

      <Modal
        // isOpen:customisOpen, onOpen:customonOpen, onClose:customonClose, onOpenChange:customonOpenChange

        classNames={{
          backdrop: " bg-black bg-opacity-80",
        }}
        className=" md:h-auto h-fit py-3   overflow-y-auto"
        size="md"
        isOpen={isOpenFailed}
        onOpenChange={onOpenChangeFailed}
      >
        <ModalContent>
          {(onCloseFailed) => (
            <>
              <ModalBody className=" flex justify-center items-center">
                <Image
                  alt="reservation"
                  width={2000}
                  height={2000}
                  src={"/reservation.png"}
                />

                <div className=" flex flex-col gap-2">
                  <h1 className=" font-poppinsreg5 text-xl text-center">
                    {" "}
                    Oops, {session?.user.name}!{" "}
                  </h1>

                  <h1 className=" text-red-700 text-lg text-center  font-poppinsreg5">
                    {" "}
                    Your payment has failed{" "}
                  </h1>

                  <h1 className=" font-poppinsreg5 text-xs text-center text-slate-700">
                    {" "}
                    {`Unfortunately, we were unable to process your payment. Please check your payment details and try again. If the problem persists, contact support for assistance.`}{" "}
                  </h1>
                </div>

                {/* <Button
                  onPress={() =>
                    router.push('/settings?section=My-Reservations')
                  }
                  className="bg-[#FF385C] mt-2 text-white font-poppinsreg5 "
                >
                  {' '}
                  GO TO MY RESERVATIONS{' '}
                </Button> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* SUCCESS MODAL  */}
      {/* FAILED MODAL  */}

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

      {/* signup success  */}

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

      {/* signup success  */}
    </>
  );
};

export default Page;
