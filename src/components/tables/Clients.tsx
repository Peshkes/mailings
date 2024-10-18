import React, {useContext} from 'react';
import {Client} from "../../api/types";
import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import {useQuery} from "react-query";
import Loader from "../Loader";
import PageStatusDiv from "../common-components/PageStatusDiv";


type Props = {
    functionToCall: (numberOfShownClients?: number) => Promise<Client[]>
}

const Clients = (props: Props) => {
    const { data, isLoading, isError } = useQuery(
        [ 'clients',`${props.functionToCall}`],
        () => props.functionToCall(),
        {
            keepPreviousData: true,
        }
    );

    const childWindow = useContext(ChildWindowContext);
    const handleOpenClient = (id:number) => childWindow?.openChildWindow({type: 'client', id: id});

    if (isLoading) return <Loader spinnerColor={'border-t-cyan-800'}/>;
    if (isError) return <PageStatusDiv>Ошибка</PageStatusDiv>;
    if (!data) return <PageStatusDiv>Нет данных</PageStatusDiv>;

    return (
        data.map((item, index) => (
            <div key={index} tabIndex={item.id} onClick={(e) => handleOpenClient(e.currentTarget.tabIndex)}
                 className="px-7 grid grid-cols-2 pt-1 cursor-pointer hover:border-0 hover:border-solid hover:border-cyan-800 hover:rounded-md hover:bg-cyan-800/80 hover:text-white ">
                <div >{item.name}</div>
                <div>{item.phone_number}</div>
            </div>)
        ));
};

export default Clients;
