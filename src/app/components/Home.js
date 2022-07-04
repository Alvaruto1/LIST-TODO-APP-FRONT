import React, { useState } from "react";
import AccordeonHorizontal from "./AccordeonHorizontal/AccordeonHorizontal";
import { deleteGroup } from "./groups/groupSlice";
import { deleteList } from "./lists/listSlice";
import Navbar from "./Navbar";
import TrashDelete from "./TrashDelete";

export default function Home() {
  const [activedTrashGroup, setActivedTrashGroup] = useState(true);
  const [activedTrashList, setActivedTrashList] = useState(true);

  return (
    <div>
      <Navbar></Navbar>
      <AccordeonHorizontal
        setActivedTrashGroup={setActivedTrashGroup}
        setActivedTrashList={setActivedTrashList}
      ></AccordeonHorizontal>
      <TrashDelete
        functionDelete={deleteGroup}
        activedTrash={activedTrashGroup}
        element="Group"
      />
      <TrashDelete
        functionDelete={deleteList}
        activedTrash={activedTrashList}
        element="List"
      />
    </div>
  );
}
