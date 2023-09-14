import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { DateTime } from "luxon";


type Booking = {
  user_id: number;
  room_id: number;
  booked_num: number;
  meeting_name: string;
  start_datetime: string;
  end_datetime: string;
}

type Room = {
  room_id: number;
  room_name: string;
  capacity: number;
}


export const BookingForm: React.FC = () => {

  const now: DateTime = DateTime.now().setZone("Asia/Tokyo");
  const nowISO: string = now.toISO()!;
  const oneHourLaterISO: string = now.plus({ hours: 1 }).toISO()!;

  const [booking, setBooking] = React.useState<Booking>({
    user_id: 1,
    room_id: 1,
    booked_num: 1,
    meeting_name: "",
    start_datetime: nowISO,
    end_datetime: oneHourLaterISO,
  });

  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = React.useState<number | undefined>(undefined);

  useEffect(() => {
    axios.get("http://localhost:8000/rooms")
      .then((response) => {
        setRooms(response.data)
        setSelectedRoomId(response.data[0].room_id ?? undefined)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRoomChange = (event: SelectChangeEvent<number | undefined>) => {
    setSelectedRoomId(event.target.value as number | undefined);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/bookings", booking);
      console.log("Booking created", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const newEndDate = DateTime.fromISO(booking.start_datetime).plus({ hours: 1 }).toISO()!;
    setBooking(prevBooking => ({
      ...prevBooking,
      end_datetime: newEndDate,
    }));
  }, [booking.start_datetime]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBooking({ ...booking, [event.target.name]: event.target.value });
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        予約登録
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="user_id"
          label="ユーザーID"
          name="user_id"
          autoComplete={"user_id"}
          autoFocus
          onChange={handleInputChange}/>
        <Select
          labelId="room-select-label"
          fullWidth
          label="会議室"
          id="room-select"
          value={selectedRoomId ?? ""}
          onChange={handleRoomChange}

        >
          {rooms.map((room) => (
            <MenuItem key={room.room_id} value={room.room_id}>
              {room.room_name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          id="meeting_name"
          label="会議名"
          name="meeting_name"
          autoComplete={"meeting_name"}
          autoFocus
          onChange={handleInputChange}/>
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="booked_num"
          label="予約人数"
          name="booked_num"
          autoComplete={"booked_num"}
          autoFocus
          onChange={handleInputChange}/>
        <TextField
          type="datetime-local"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="start_datetime"
          label="開始時間"
          name="start_datetime"
          autoComplete={"start_datetime"}
          autoFocus
          InputLabelProps={{ shrink: true }}
          defaultValue={nowISO.slice(0, 16)}
          onChange={handleInputChange}/>
        <TextField
          type="datetime-local"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="end_datetime"
          label="終了時間"
          name="end_datetime"
          autoComplete={"end_datetime"}
          autoFocus
          InputLabelProps={{ shrink: true }}
          value={booking.end_datetime.slice(0, 16)}
          onChange={handleInputChange}/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >登録</Button></form>
    </Container>)
}
