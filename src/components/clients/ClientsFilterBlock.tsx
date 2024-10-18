import React from 'react';
import ClientsRadioTypeFilter from "./ClientsRadioTypeFilter";
import ClientsRadioTGErrorFilter from "./ClientsRadioTGErrorFilter";
import ClientsRadioDataFilter from "./ClientsRadioDataFilter";
import Search from "../common-components/Search";


const ClientsFilterBlock = () => {

    return (
        <div className="w-full mx-auto mb-4 flex justify-between">
            <ClientsRadioDataFilter header={"Искать по"}/>
            <ClientsRadioTypeFilter header={"Фильтр по типу"}/>
            <ClientsRadioTGErrorFilter header={"Ошибка"}/>
            <div className="w-[24%] h-full flex flex-col justify-between">
                <Search  type="clients"/>
            </div>
        </div>
    );
};

export default ClientsFilterBlock;