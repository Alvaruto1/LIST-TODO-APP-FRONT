import React, { useState } from "react";
import Swal from "sweetalert2";
import { signUp } from "./userSlice"
import SignUser from "./SignUser";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const user = { user: { username, password, password_confirmation, email } };

  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Signed up successfully",
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
      type="email"
      className="input-login mx-1 mb-5"
      placeholder="Email"
      value={email}
      key={2}
      onChange={(e) => setEmail(e.target.value)}
    />,
    <input
      type="password"
      className="input-login mx-1 mb-5"
      placeholder="Password"
      value={password}
      key={3}
      onChange={(e) => setPassword(e.target.value)}
    />,
    <input
      type="password"
      className="input-login mx-1 my-1"
      placeholder="Confirm Password"
      value={password_confirmation}
      key={4}
      onChange={(e) => setPasswordConfirmation(e.target.value)}
    />,
  ];
  return (
    <SignUser
      inputs={inputs}
      subtitle="Sign up"
      link="/login"
      text_link="Log in"
      text_button="Sign up"
      funct={() => signUp(user, okFunction, errorFunction)}
    />
  );
}
