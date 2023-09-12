import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


type User = {
  user_id: number;
  username: string;
}

export const UserDetail: React.FC = () => {
  const { user_id:userIdString } = useParams<{user_id: string}>();
  const user_id = parseInt(userIdString ?? "0", 10);
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    if (user_id === 0) {
      return;
    }
    axios.get(`http://localhost:8000/users/${user_id}`)
      .then((response) =>{
        setUser(response.data)
      });
  }, [user_id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      <p>{user.username}</p>
    </div>
  );
}