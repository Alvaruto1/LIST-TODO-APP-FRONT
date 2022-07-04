import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";
import { addList, editList } from "./listSlice";

export default function ListModal(props) {
  const { modal, initial_data } = props;
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
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
    </div>,
  ];
  useEffect(() => {
    if (initial_data) {
      setTitle(initial_data.title);
      setId(initial_data.id);
    }
  }, [initial_data]);
  return (
    <Modal
      modal={modal}
      title="List"
      list_inputs={list_inputs}
      funct={() =>
        dispatch(
          initial_data
            ? editList(list, current_group._id["$oid"], id, okFunction, errorFunction)
            : addList(current_group._id["$oid"], list, okFunction, errorFunction)
        )
      }
    />
  );
}
