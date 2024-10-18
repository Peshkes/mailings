import React, {useContext} from 'react';
import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import TableWrapper from "./TableWrapper";
import TemplateMessages from "../tables/TemplateMessages";
import Clients from "../tables/Clients";
import {getClientsWithTelegramError, getClientsWithUnselectedType, getLastClients} from "../../api/server";

const DashBoardComponent = () => {
    const childWindow = useContext(ChildWindowContext);
    const handleOpenClient = () => childWindow?.openChildWindow({type: 'client', id: 0});
    const handleOpenSample = () => childWindow?.openChildWindow({type: 'sample', id: 0});

    const numberOfShownClients: number = 10;

    return (
        <div className="w-[75%] h-full mx-auto flex flex-col justify-start text-cyan-800 p-4">
            <h2 className="w-full text-3xl pt-2 pb-6">Панель</h2>
            <div className="w-full h-full flex flex-col justify-start">
                <div className="w-full h-[38%] flex mb-4">
                    <div className="w-[55%] mr-4">
                        <TableWrapper title="Клиенты без типа">
                            <Clients functionToCall={getClientsWithUnselectedType}/>
                        </TableWrapper>
                    </div>
                    <div className="w-[45%]">
                        <TableWrapper title="Шаблоны" plusFunction={handleOpenSample}>
                            <TemplateMessages/>
                        </TableWrapper>
                    </div>
                </div>
                <div className="w-full h-[62%] flex">
                    <div className="w-[55%] mr-4">
                        <TableWrapper title="Последние клиенты" plusFunction={handleOpenClient}>
                            <Clients functionToCall={() => getLastClients(numberOfShownClients)}/>
                        </TableWrapper>
                    </div>
                    <div className="w-[45%]">
                        <TableWrapper title="Ошибки в телеграме">
                            <Clients functionToCall={getClientsWithTelegramError}/>
                        </TableWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardComponent;
