import React, {useContext} from 'react';

import Pagination from "../pagination/Pagination";
import {useQuery} from "react-query";
import {sendDelayedMessage} from "../../api/server";
import {timestampToDateFormatted} from "../../api/parser";
import Sending_plane from "../../icons/Sending_plane";

import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import {TypesContext} from "../context-providers/TypesProvider";
import {useMailingsFilter} from "../../stores/useMailingsFilter";
import Loader from "../Loader";
import PageStatusDiv from "../common-components/PageStatusDiv";

const AllMailingsTable = () => {
    const {page, setPage, fetchMailings, type_id, date_to, date_from, search_string} = useMailingsFilter();
    const {data, isLoading, isError} = useQuery(
        ['messages', 'fetchMailings', page, type_id, date_to, date_from, search_string],
        () => fetchMailings(),
        {
            keepPreviousData: false,
        }
    );

    const childWindow = useContext(ChildWindowContext);
    const {clientTypes, getClientTypeById} = useContext(TypesContext);

    if (isLoading) return <Loader spinnerColor={'border-t-cyan-800'}/>;
    if (isError) return <PageStatusDiv>Ошибка</PageStatusDiv>;
    if (!data || !data.data ) return <PageStatusDiv>Нет данных</PageStatusDiv>;

    const handleSendRightNow = (e: number) => {
        return sendDelayedMessage(e);
    }

    const handleOpenMessage = (id: number) => childWindow?.openChildWindow({type: 'message', id: id});

    return (
        <>
            <div>
                <div className="w-[75%] py-5 px-7 grid grid-cols-3 font-bold sticky top-0 bg-white">
                    <div>Тема</div>
                    <div>Тип</div>
                    <div>Дата</div>
                </div>
                <div className="overflow-auto relative">
                    {isLoading ? <Loader spinnerColor={'border-t-cyan-800'}/> :
                        data.data.map(item => (
                            <div className="w-full flex" key={item.id}>
                                <div
                                    key={item.id}
                                    tabIndex={item.id}
                                    className="w-[75%] px-7 grid grid-cols-3 pt-1 cursor-pointer hover:border-0 hover:border-solid hover:border-cyan-800 hover:rounded-md hover:bg-cyan-800/80 hover:text-white"
                                    onClick={(e) => handleOpenMessage(e.currentTarget.tabIndex)}>
                                    <div>{item.theme}</div>
                                    <div>
                                        <p key={item.id}>{ item.recipient_type_id ? getClientTypeById(item.recipient_type_id)?.type_name : "Все"}</p>
                                    </div>
                                    <div>{timestampToDateFormatted(item.sending_date)}</div>
                                </div>
                                <div className="w-[25%] flex justify-center cursor-pointer"
                                     onClick={() => handleSendRightNow(item.id)}>
                                    <Sending_plane color="#155e75"/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {data.pagination && (
                <div className="w-full text-center pb-4">
                    <Pagination
                        currentPage={page}
                        totalPages={data.pagination.totalPages}
                        handleSetPage={setPage}
                    />
                </div>
            )}
        </>
    );
};

export default AllMailingsTable;
