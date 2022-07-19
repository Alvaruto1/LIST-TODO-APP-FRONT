import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemMenu from "../AccordeonHorizontal/ItemMenu";
import { getLists } from "../lists/listSlice";
import GroupModal from "./GroupModal";
import { current_group, getGroups } from "./groupSlice";
import { delete_current_list } from "../lists/listSlice";
import "./groups.css";
import { Modal } from "bootstrap";

export default function Groups(props) {
  const { setActivedTrashGroup } = props;
  const setActivedTrash = setActivedTrashGroup;
  const {
    isActivedGroups,
    setIsActivedGroups,
    setIsActivedLists,
    setIsActivedButtonList,
  } = props;
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.group.groups);
  const current_group_object = useSelector(
    (state) => state.group.current_group
  );

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const onDoubleClickEdit = (e) => {
    const modalEdit = new Modal(document.getElementById("groupModalEdit"));
    modalEdit.show();
  };

  return (
    <>
      <ItemMenu
        title="Groups"
        isActived={isActivedGroups}
        setIsActived={setIsActivedGroups}
      >
        <div className="container-items container h-100 d-flex flex-column justify-content-between">
          <div className="text-start d-flex flex-column">
            {groups ? (
              groups.map((group, index) => (
                <div
                  onDoubleClick={(e) => onDoubleClickEdit(e)}
                  className="group-item"
                  onDragStart={(e) => {
                    setActivedTrash(false);
                    e.dataTransfer.setData("data", [group._id["$oid"]]);
                  }}
                  onDragEnd={(e) => {
                    setActivedTrash(true);
                  }}
                  draggable="true"
                  key={index}
                  onClick={() => {
                    dispatch(getLists(group._id["$oid"])).then(() => {
                      setIsActivedLists(false);
                      setIsActivedButtonList(true);
                      dispatch(current_group(group));
                      dispatch(delete_current_list());
                    });
                  }}
                  style={{ background: group.color }}
                >
                  {group.name}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#groupModal"
            data-bs-whatever="@mdo"
          >
            Add
          </button>
        </div>
      </ItemMenu>
      <GroupModal modal="groupModal"></GroupModal>
      <GroupModal
        modal="groupModalEdit"
        initial_data={{
          name: current_group_object?.name,
          color: current_group_object?.color,
          id: current_group_object?._id["$oid"],
        }}
      ></GroupModal>
    </>
  );
}
