import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import ItemModal from "./ItemModal";
import "./items.css";

export default function List() {
  const current_list_object = useSelector((state) => state.list.current_list);
  const current_item_object = useSelector((state) => state.item.current_item);
  const items_current_list = useSelector((state) => state.item.item.items);
  const current_group_object = useSelector(
    (state) => state.group.current_group
  );
  const hexToRgb = (hex) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));
  const getRGBItem = (hex) => {
    const list_hex = hexToRgb(hex);
    return `rgba(${list_hex[0]}, ${list_hex[1]}, ${list_hex[2]}, 0.2)`;
  };

  return (
    <div className="flex-fill m-2 mx-auto p-2">
      <h2 className="text-uppercase font-weight-bold">
        {current_list_object?.title}
      </h2>

      <div
        className="mx-auto shadow rounded m-5 content-items"
        style={{
          background: current_group_object
            ? getRGBItem(current_group_object?.color)
            : "",
        }}
      >
        {current_list_object
          ? items_current_list?.map((item, index) => (
              <Item
                item_object={item}
                group_id={current_list_object?.group_list_id.$oid}
                list_id={current_list_object?._id.$oid}
              ></Item>
            ))
          : null}
      </div>

      <div>
        {current_list_object ? (
          <button
            type="button"
            className="btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#itemModal"
            data-bs-whatever="@mdo"
          >
            Add
          </button>
        ) : null}
      </div>
      <ItemModal modal="itemModal"></ItemModal>
      <ItemModal
        modal="itemModalEdit"
        initial_data={{
          description: current_item_object?.description,
          state: current_item_object?.state,
          id: current_item_object?._id["$oid"],
        }}
      ></ItemModal>
    </div>
  );
}
