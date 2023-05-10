import { useEffect, useState } from 'react';
import { BookingInfo } from '../types/booking';

export default function useCurrentBookingInfoId(bookingInfoList: BookingInfo[]) {

  const [currentBookingInfoId, setCurrentBookingInfoId] = useState(
    bookingInfoList.length > 0 ? bookingInfoList[0].id : null
  );

  useEffect(() => {
    if (bookingInfoList.length > 0) {
      setCurrentBookingInfoId(bookingInfoList[0].id);
    }
  }, [bookingInfoList]);

  return {currentBookingInfoId, setCurrentBookingInfoId};
}
