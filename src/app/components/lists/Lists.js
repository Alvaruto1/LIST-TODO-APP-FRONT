import React from 'react'
import { useSelector } from 'react-redux';
import ItemMenu from '../AccordeonHorizontal/ItemMenu';
import ListModal from './ListModal';

export default function Lists(props) {
    const lists = useSelector((state) => state.list.list.lists);
    const { isActivedLists, setIsActivedLists, isActivedButtonList } = props;
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
                  <a key={index} href="" style={{ background: list.color }}>
                    {list.title}
                  </a>
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
        <ListModal></ListModal>
      </>
    );
}
