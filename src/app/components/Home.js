import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div>Home</div>
      <div>{user.user ? user.user.username : ""}</div>
      <div>{user.user ? user.user.email : ""}</div>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
