import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../actions/user_actions";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logOut()).then(() => {
      navigate("/login");
    });
  }, [dispatch]);
  return <></>;
}
