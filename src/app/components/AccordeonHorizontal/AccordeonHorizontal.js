import React, { useState } from "react";
import Groups from "../groups/Groups";
import Lists from "../lists/Lists";
import "./accordeonHorizontal.css";

export default function AccordeonHorizontal(props) {
  const [isActivedGroups, setIsActivedGroups] = useState(false);
  const [isActivedLists, setIsActivedLists] = useState(true);
  const [isActivedButtonList, setIsActivedButtonList] = useState(false);

  return (
    <div className="d-flex">
      <Groups
        isActivedGroups={isActivedGroups}
        setIsActivedGroups={setIsActivedGroups}
        setIsActivedLists={setIsActivedLists}
        setIsActivedButtonList={setIsActivedButtonList}
        {...props}
      ></Groups>
      <Lists
        isActivedLists={isActivedLists}
        setIsActivedLists={setIsActivedLists}
        isActivedButtonList={isActivedButtonList}
      ></Lists>
      <div className="flex-fill">Main</div>
    </div>
  );
}
