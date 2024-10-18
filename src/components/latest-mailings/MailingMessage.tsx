import React, {useContext} from 'react';
import { Message} from "../../api/types";
import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import {timestampToDateFormatted} from "../../api/parser";
import {TypesContext} from "../context-providers/TypesProvider";

type Props = {
    item: Message
}

const MailingMessage = (props: Props) => {
    let type_id = props.item.recipient_type_id;
    const childWindow = useContext(ChildWindowContext);
    const clientTypes = useContext(TypesContext).clientTypes;

    const handleOpenMessage = (id:number) => childWindow?.openChildWindow({type: 'message', id: id});

    return (
        <div tabIndex={props.item.id} onClick={(e) => handleOpenMessage(e.currentTarget.tabIndex)}
            className="w-full px-3 py-3 my-4 mx-auto h-auto bg-white/20 border-0 rounded-2xl shadow-xl shadow-slate-700 cursor-pointer  hover:shadow-none">
            <div className="flex justify-between text-white"><p>Тема: </p><p>{props.item.theme}</p>
            </div>
            <div className="pt-1 flex justify-between text-white"><p>Тип: </p>{clientTypes.map((item, index) => (
                item.id == type_id && <p key={item.type_name}>{item.type_name}</p>
            ))}</div>
            <div className="pt-1 flex justify-between text-white"><p>Медиа: </p><p>{props.item.media_path}</p></div>
            <div className="pt-1 flex justify-between text-white"><p>Дата: </p><p>{timestampToDateFormatted(props.item.sending_date)}</p></div>
        </div>
    );
};

export default MailingMessage;
