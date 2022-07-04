import React from "react";

export default function ItemMenu(props) {
  const { title, children, isActived, setIsActived} = props;
  
  return (
    <>
      <div
        className="accordeon-item d-flex justify-content-center"
        onClick={() => setIsActived(!isActived)}
      >
        <div className="accordeon-item-title h-100">
          <b>{title}</b>
        </div>
      </div>
      <div hidden={isActived}>{children}</div>
    </>
  );
}
