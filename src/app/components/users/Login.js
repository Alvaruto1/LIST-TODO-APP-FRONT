import React, { useState } from "react";
import Swal from "sweetalert2";
import { logIn } from "./userSlice";
import SignUser from "./SignUser";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = { user: { username, password } };
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Logged in successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const errorFunction = (error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  };
  const inputs = [
    <input
      type="text"
      className="input-login mx-1 my-5"
      placeholder="Username"
      value={username}
      key={1}
      onChange={(e) => setUsername(e.target.value)}
    />,
    <input
      type="password"
      className="input-login mx-1 my-1"
      placeholder="Password"
      value={password}
      key={2}
      onChange={(e) => setPassword(e.target.value)}
    />,
  ];
  return (
    <SignUser
      inputs={inputs}
      subtitle="Log in to your account"
      link="/signup"
      text_link="Sign up"
      text_button="Login"
      funct={()=>logIn(user, okFunction, errorFunction)}
    />
  );
}
