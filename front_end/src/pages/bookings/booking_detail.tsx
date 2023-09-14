import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


type Booking = {
  booking_id: number;
  room_id: number;
  user_id: number;
  meeting_name: string;
  room_name: string;
  username: string;
  start_datetime: string;
  end_datetime: string;
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
      <p>会議室：<a href={`/rooms/${booking.room_id}`}>{booking.room_name}</a></p>
      <p>会議名：{booking.meeting_name}</p>
      <p>予約者：<a href={`/users/${booking.user_id}`}>{booking.username}</a></p>
      <p>開始：{booking.start_datetime}</p>
      <p>終了：{booking.end_datetime}</p>
    </div>
  );
}