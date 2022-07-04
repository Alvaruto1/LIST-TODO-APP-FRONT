import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";

export default function SignUser(props) {
  const { subtitle, inputs, link, text_link, text_button, funct } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(funct())
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };
  return (
    <div className="container-login d-flex justify-content-center align-items-center vh-100">
      <div className="image-background-login w-100 h-100"></div>
      <div className="color-background-login w-100 h-100"></div>
      <div style={{ zIndex: "2" }}>
        <div className="form-login shadow-sm py-5 px-5 rounded w-50 mw-50">
          <div className="d-flex" style={{ fontWeight: "bold" }}>
            <div>
              <i className="bi bi-activity"></i>
            </div>
            <div className="mx-2">LIST TODO APP</div>
          </div>
          <div>
            <p className="text-start">{subtitle}</p>
          </div>
          <form className="row mx-auto" onSubmit={onSubmit}>
            {inputs.map((input) => input)}
            <button
              type="submit"
              className="button-login btn btn-primary mx-1 mt-5"
            >
              {text_button}
            </button>
          </form>
        </div>
        <div className="m-2">
          <Link to={link} className="link-signup-login">
            {text_link}
          </Link>
        </div>
      </div>
    </div>
  );
}
