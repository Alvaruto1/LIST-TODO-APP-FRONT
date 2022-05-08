import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogIn } from "../../actions/user_actions";

export default function Auth(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { children } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLogIn());
  }, [dispatch]);
  if (user && !user.logged_in) {
    navigate("/login");
    return <></>;
  }
  
  return user && user.logged_in ? children : <></>;
}
