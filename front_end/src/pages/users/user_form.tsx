import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";


type User = {
  username: string;
}

export const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/users", user);
      console.log("User created", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        ユーザー登録
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="ユーザー名"
          name="username"
          autoComplete={"username"}
          autoFocus
          onChange={handleInputChange}/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >

          登録</Button></form>
    </Container>)
}

