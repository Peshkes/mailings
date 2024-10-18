import React from 'react';
import {useQuery} from "react-query";
import {getClientsWithUnselectedType} from "../../api/server";
import ClientWIthUnselectedType from "./ClientWIthUnselectedType";
import Loader from "../Loader";
import PageStatusDiv from "../common-components/PageStatusDiv";

const ClientsWithUnselectedTypeGenerator = () => {

    const {data, isLoading, isError} = useQuery(
        ['getClientsWithUnselectedType'],
        () => getClientsWithUnselectedType(),
        {
            keepPreviousData: true,
        }
    );

    if (isLoading) return <Loader spinnerColor={'border-t-white'}/>;
    if (isError) return <PageStatusDiv>Ошибка</PageStatusDiv>;
    if (!data) return <PageStatusDiv>Нет данных</PageStatusDiv>;

    return (
        <>
            {data && data.map((item) => (
                <ClientWIthUnselectedType key={item.id} item={item}/>
            ))}
        </>
    );
};

export default ClientsWithUnselectedTypeGenerator;
