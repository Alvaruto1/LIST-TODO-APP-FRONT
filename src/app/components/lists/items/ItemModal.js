import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "../../Modal/Modal";
import { addItem, editItem } from "./itemSlice";

export default function ItemModal(props) {
  const { modal, initial_data } = props;

  const list_id = useSelector((state) => state.list?.current_list?._id["$oid"]);
  const group_id = useSelector(
    (state) => state.group.current_group?._id["$oid"]
  );
  const [description, setDescription] = useState("");
  const [state, setState] = useState("pending");
  const [id, setId] = useState("");
  const item = { item: { description, state } };
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Item added successfully",
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
    setDescription("");
  };

  const list_inputs = [
    <div classDescription="mb-3" key={1}>
      <label classDescription="form-label" htmlFor="description">
        Description
      </label>
      <input
        className="m-1"
        type="text"
        classDescription="form-control"
        id="description"
        placeholder="Enter description item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>,
  ];
  useEffect(() => {
    if (initial_data) {
      setDescription(initial_data.description);
      setState(initial_data.state);
      setId(initial_data.id);
    }
  }, [initial_data]);
  return (
    <Modal
      modal={modal}
      title="Item"
      list_inputs={list_inputs}
      funct={() =>
        dispatch(
          initial_data
            ? editItem(item, group_id, list_id, id, okFunction, errorFunction)
            : addItem(group_id, list_id, item, okFunction, errorFunction)
        ).then(() => {
          cleanForm();
        })
      }
    />
  );
}
