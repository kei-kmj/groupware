import React from "react";

type Room = {
  room_id: number;
  room_name: string;
  capacity: number;

}

export const Rooms: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div>
      <h1>会議室</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.room_id}>
            <a href={`/rooms/${room.room_id}`}>{room.room_name}</a>{room.capacity}人
          </li>
        ))}
      </ul>
    </div>)


}