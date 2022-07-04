import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemMenu from "../AccordeonHorizontal/ItemMenu";
import { Modal } from "bootstrap";
import ListModal from "./ListModal";
import { current_list } from "./listSlice";

export default function Lists(props) {
  const lists = useSelector((state) => state.list.list.lists);
  const {
    isActivedLists,
    setIsActivedLists,
    isActivedButtonList,
    setActivedTrashList,
  } = props;
  const setActivedTrash = setActivedTrashList;
  const dispatch = useDispatch();
  const current_group_object = useSelector(
    (state) => state.group.current_group
  );
  const current_list_object = useSelector((state) => state.list.current_list);

  const onDoubleClickEdit = (e) => {
    const modalEdit = new Modal(document.getElementById("listModalEdit"));
    modalEdit.show();
  };

  return (
    <>
      <ItemMenu
        title="Lists"
        isActived={isActivedLists}
        setIsActived={setIsActivedLists}
      >
        <div className="container-items container h-100 d-flex flex-column justify-content-between">
          <div className="text-start d-flex flex-column">
            {lists ? (
              lists.map((list, index) => (
                <div
                  onDoubleClick={(e) => onDoubleClickEdit(e)}
                  onDragStart={(e) => {
                    setActivedTrash(false);
                    e.dataTransfer.setData("data", [
                      current_group_object._id["$oid"],
                      list._id["$oid"],
                    ]);
                  }}
                  onDragEnd={(e) => {
                    setActivedTrash(true);
                  }}
                  draggable="true"
                  key={index}
                  style={{ background: current_group_object.color }}
                  className="group-item"
                  onClick={() => {
                    dispatch(current_list(list));
                  }}
                >
                  {list.title}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <button
            hidden={!isActivedButtonList}
            type="button"
            className="btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#listModal"
            data-bs-whatever="@mdo"
          >
            Add
          </button>
        </div>
      </ItemMenu>
      <ListModal modal="listModal"></ListModal>
      <ListModal
        modal="listModalEdit"
        initial_data={{
          title: current_list_object?.title,
          id: current_list_object?._id["$oid"],
        }}
      ></ListModal>
    </>
  );
}
