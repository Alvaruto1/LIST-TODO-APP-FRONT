import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function TrashDelete(props) {
  const { activedTrash, element, functionDelete } = props;
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: `${element} deleted successfully`,
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
  const onDrop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("data");
    let array_data = data.split(",");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(functionDelete(...array_data, okFunction, errorFunction));
      }
    });
  };

  return (
    <div className="background-trash" hidden={activedTrash}>
      <div
        className="container-trash shadow-sm p-3 mb-5 rounded"
        onDrop={(e) => {
          onDrop(e);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <i className="item-trash bi bi-trash text-white"></i>
      </div>
    </div>
  );
}
