import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";
import { addGroup, editGroup } from "./groupSlice";

export default function GroupModal(props) {
  const { modal, initial_data } = props;
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");
  const group = { group_list: { name, color } };
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Group added successfully",
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

  const cleanForm = () => {
    setName("");
    setColor("");
  };

  const list_inputs = [
    <div className="mb-3" key={1}>
      <label className="form-label" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Enter name group"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>,
    <div className="mb-3" key={2}>
      <label className="form-label" htmlFor="color">
        Color
      </label>
      <input
        type="color"
        className="form-control"
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>,
  ];
  useEffect(() => {
    if (initial_data) {
      setName(initial_data.name);
      setColor(initial_data.color);
      setId(initial_data.id);
    }
  }, [initial_data]);
  return (
    <Modal
      modal={modal}
      title="Group"
      list_inputs={list_inputs}
      funct={() =>
        dispatch(
          initial_data
            ? editGroup(group, id, okFunction, errorFunction)
            : addGroup(group, okFunction, errorFunction)
        ).then(() => {
          cleanForm();
        })
      }
    />
  );
}
