import React from 'react'
import { useSelector } from 'react-redux';

export default function List() {
    const current_list_object = useSelector ((state) => state.list.current_list);
    return <div className="flex-fill">{current_list_object.title}</div>;
}
