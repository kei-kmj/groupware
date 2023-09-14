import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/home';
import { Portal } from './pages/portal';
import { Users } from './pages/users/users';
import { UserDetail } from './pages/users/user_detail';
import { UserForm } from './pages/users/user_form';
import { Rooms } from './pages/rooms/rooms';
import { RoomForm } from './pages/rooms/room_form';
import { BookingForm } from './pages/bookings/booking_form';
import { Bookings } from './pages/bookings/bookings';
import { BookingDetail } from './pages/bookings/booking_detail';
import { RoomDetail } from "./pages/rooms/room_detail";


const App: React.FC = () => {
  return (
    <Router><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/portal" element={<Portal/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/users/:user_id" element={<UserDetail/>}/>
      <Route path="/users/new" element={<UserForm/>}/>
      <Route path="/rooms" element={<Rooms/>}/>
      <Route path="/rooms/:room_id" element={<RoomDetail/>}/>
      <Route path="/rooms/new" element={<RoomForm/>}/>
      <Route path="/bookings" element={<Bookings/>}/>
      <Route path="/bookings/:booking_id" element={<BookingDetail/>}/>
      <Route path="/bookings/new" element={<BookingForm/>}/>
    </Routes></Router>
  );
}

export default App;
