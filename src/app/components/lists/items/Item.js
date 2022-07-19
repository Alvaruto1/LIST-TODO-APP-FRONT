import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, editItem } from "./itemSlice";

export default function Item(props) {
  const { item_object, group_id, list_id } = props;
  const { description, state_id } = item_object;
  const [edited_description, setEditedDescription] = useState(description);
  const [state_input, setState] = useState(
    state_id?.name === "pending" ? false : true
  );
  const [edited, setEdited] = useState(false);
  const dispatch = useDispatch();

  const onClickdeleteItem = () => {
    dispatch(
      deleteItem(
        group_id,
        list_id,
        item_object._id["$oid"],
        () => {},
        () => {}
      )
    );
  };
  const handleChangeStateItem = () => {
    const item = {
      item: {
        description: description,
        state: state_id?.name == "pending" ? "done" : "pending",
      },
    };
    dispatch(
      editItem(
        item,
        group_id,
        list_id,
        item_object._id["$oid"],
        () => {},
        () => {}
      )
    ).then(() => {
      setState(!state_input);
    });
  };
  const handleEditItem = () => {
    const item = {
      item: {
        description: edited_description,
        state: state_id?.name,
      },
    };
    return dispatch(
      editItem(
        item,
        group_id,
        list_id,
        item_object._id["$oid"],
        () => {},
        () => {}
      )
    );
  };
  return (
    <div
      onDoubleClick={() => {
        setEdited(true);
      }}
      className="d-flex flex-row justify-content-between p-2 px-5"
    >
      {!edited ? (
        <div>{description}</div>
      ) : (
        <input
          type="text"
          class="form-control w-75"
          value={edited_description}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={() => {
            handleEditItem().then(() => {
              setEdited(false);
            });
          }}
        ></input>
      )}
      <div class="form-check d-flex align-items-center justify-content-between m-1">
        <input
          class="form-check-input m-2"
          type="checkbox"
          id="flexCheckDefault"
          checked={state_input}
          onChange={handleChangeStateItem}
        />
        <div onClick={() => onClickdeleteItem()}>
          <i class="bi bi-x"></i>
        </div>
      </div>
    </div>
  );
}
