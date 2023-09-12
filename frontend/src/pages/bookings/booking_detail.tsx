import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


type Booking = {
  booking_id: number;
  room_id: number;
  user_id: number;
  start_time: string;
  end_time: string;
}

export const BookingDetail: React.FC = () => {
  const { booking_id:bookingIdString } = useParams<{booking_id: string}>();
  const booking_id = parseInt(bookingIdString ?? "0", 10);
  const [booking, setBooking] = React.useState<Booking | null>(null);

  useEffect(() => {
    if (booking_id === 0) {
      return;
    }
    axios.get(`http://localhost:8000/bookings/${booking_id}`)
      .then((response) =>{
        setBooking(response.data)
      });
  }, [booking_id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Detail</h1>
      <p>{booking.booking_id}</p>
      <p>{booking.room_id}</p>
      <p>{booking.user_id}</p>
      <p>{booking.start_time}</p>
      <p>{booking.end_time}</p>
    </div>
  );
}