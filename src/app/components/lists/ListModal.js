import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";
import { addList } from "./listSlice";

export default function ListModal() {
  const [title, setTitle] = useState("");
  const current_group = useSelector((state) => state.group.current_group);
  const list = {
    list: {
      title,
    },
  };
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "List added successfully",
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

  const list_inputs = [
    <div className="mb-3" key={1}>
      <label className="form-label" htmlFor="list">
        List
      </label>
      <input
        type="text"
        className="form-control"
        id="list"
        placeholder="Enter title list"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  ];
  return (
    <Modal
      modal="listModal"
      title="List"
      list_inputs={list_inputs}
      funct={() => dispatch(addList(current_group._id["$oid"], list, okFunction, errorFunction))}
    />
  );
}
