import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";


type Room = {
  room_name: string;
  capacity: number;
}

export const RoomForm: React.FC = () => {
  const [room, setRoom] = React.useState<Room>({
    room_name: "",
    capacity: 10,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/rooms", room);
      console.log("Room created", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        会議室登録
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="room_name"
          label="会議室名"
          name="room_name"
          autoComplete={"room_name"}
          autoFocus
          onChange={handleInputChange}/>
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="capacity"
          label="定員"
          name="capacity"
          autoComplete={"capacity"}
          autoFocus
          inputProps={{ min: 1, step: 1 }}
          onChange={handleInputChange}/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >登録</Button>
      </form>
    </Container>)
}