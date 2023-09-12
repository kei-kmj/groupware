import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime} from "luxon";

type Booking = {
  booking_id: number;
  room_id: number;
  user_id: number;
  username: string;
  room_name: string;
  meeting_name: string;
  booked_num: number;
  start_datetime: string;
  end_datetime: string;
}

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);


  useEffect(() => {
    axios.get("http://localhost:8000/bookings")
      .then((response) => {
        setBookings(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getStartDatetime(time: string) {
    return DateTime.fromISO(time).setZone("Asia/Tokyo").toFormat("yyyy/MM/dd(EEE) HH:mm");
  }

  function getEndTime(time: string) {
    return DateTime.fromISO(time).setZone("Asia/Tokyo").toFormat("HH:mm");
  }

  return (
    <div>
      <h1>予約状況</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            <a href={`/bookings/${booking.booking_id}`}>{booking.meeting_name}
              {getStartDatetime(booking.start_datetime)}-{getEndTime(booking.end_datetime)}</a>
              <a href={`/rooms/${booking.room_id}`}>{booking.room_name}</a>
             <a href={`/users/${booking.user_id}`}>{booking.username}</a>
          </li>
        ))}
      </ul>
    </div>

  );
}