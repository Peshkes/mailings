import React, {useContext} from 'react';
import {updateClientType} from "../../api/server";
import {Client} from "../../api/types";
import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import {TypesContext} from "../context-providers/TypesProvider";
import {useQueryClient} from "react-query";

type Props = {
    item: Client
}

const ClientWIthUnselectedType = (props: Props) => {
    const childWindow = useContext(ChildWindowContext);
    const clientTypes = useContext(TypesContext).clientTypes;
    const queryClient = useQueryClient();
    const handleOpenClient = (id: number) => childWindow?.openChildWindow({type: 'client', id: id});
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateClientType(+e.target.value, props.item.id)
            .finally(() => queryClient.invalidateQueries('getClientsWithUnselectedType')
        );
    }

    return (
        <div id="tab" tabIndex={props.item.id} onClick={(e) => handleOpenClient(e.currentTarget.tabIndex)}
             className="w-full px-3 py-3 my-4 mx-auto h-auto bg-white/20 border-0 rounded-2xl shadow-xl shadow-slate-700 cursor-pointer hover:shadow-none">
            <div className="flex justify-between text-white"><p>ФИО: </p><p>{props.item.name}</p>
            </div>
            <div className="pt-1 flex justify-between text-white"><p>Телефон: </p><p>{props.item.phone_number}</p></div>
            <div className="pt-1 flex justify-between text-white">
                <p>Тип: </p>
                <select id="selector" name="type_selector" defaultValue="Выберите тип"
                        className="text-cyan-800 text-center border-0 rounded-2xl" required
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()}>)
                    <option value="Выберите тип" disabled>Выберите тип</option>
                    {clientTypes && clientTypes.map(item => <option value={item.id}>{item.type_name}</option>)}
                </select>
            </div>
        </div>
    );
};

export default ClientWIthUnselectedType;
