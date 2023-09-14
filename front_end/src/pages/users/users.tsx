import React, { useEffect } from 'react';
import axios from "axios";


type User = {
  user_id: number;
  username: string;
}

export const Users: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users")
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <a href={`/users/${user.user_id}`}>{user.username}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}