import React, { useState } from "react";
import AccordeonHorizontal from "./AccordeonHorizontal/AccordeonHorizontal";
import Navbar from "./Navbar";
import TrashDelete from "./TrashDelete";

export default function Home() {
  const [activedTrashGroup, setActivedTrashGroup] = useState(true);

  return (
    <div>
      <Navbar></Navbar>
      <AccordeonHorizontal
        setActivedTrash={setActivedTrashGroup}
      ></AccordeonHorizontal>
      <TrashDelete activedTrash={activedTrashGroup} element="Group" />
      <TrashDelete activedTrash={activedTrashGroup} element="List" />
    </div>
  );
}
