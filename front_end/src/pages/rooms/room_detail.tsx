import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Room = {
  room_id: number;
  room_name: string;
  capacity: number;
}

export const RoomDetail: React.FC = () => {
  const { room_id:roomIdString } = useParams<{room_id: string}>();
  const room_id = parseInt(roomIdString ?? "0", 10);
  const [room, setRoom] = React.useState<Room | null>(null);

  useEffect(() => {
    if (room_id === 0) {
      return;
    }
    axios.get(`http://localhost:8000/rooms/${room_id}`)
      .then((response) =>{
        setRoom(response.data)
      });
  }, [room_id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Room Detail</h1>
      <p>{room.room_name}</p>
      <p>{room.capacity}</p>
    </div>
  );
}