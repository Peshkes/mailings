import React, {useContext} from 'react';
import {getAllSampleMessages} from "../../api/server";
import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import {useQuery} from "react-query";
import Loader from "../Loader";
import PageStatusDiv from "../common-components/PageStatusDiv";

const TemplateMessages = () => {
    const { data, isLoading, isError } = useQuery(
        ['samples','getSamples'],
        () => getAllSampleMessages(),
        {
            keepPreviousData: true,
        }
    );
    const childWindow = useContext(ChildWindowContext);

    const handleOpenSample = (id:number) => childWindow?.openChildWindow({type: 'sample', id: id});

    if (isLoading) return <Loader spinnerColor={'border-t-cyan-800'}/>;
    if (isError) return <PageStatusDiv>Ошибка</PageStatusDiv>;
    if (!data) return <PageStatusDiv>Нет данных</PageStatusDiv>;

    return (
        data.map((item, index) => (
            <div key={index} tabIndex={item.id} onClick={(e) => handleOpenSample(e.currentTarget.tabIndex)}
                 className="px-7 pt-1 cursor-pointer hover:border-0 hover:border-solid hover:border-cyan-800 hover:rounded-md hover:bg-cyan-800/80 hover:text-white ">
                <div>{item.theme}</div>
            </div>)
        ));
};

export default TemplateMessages;
