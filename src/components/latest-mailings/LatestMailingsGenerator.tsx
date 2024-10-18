import React from 'react';
import {useQuery} from "react-query";
import {getNearestMessages} from "../../api/server";

import MailingMessage from "./MailingMessage";
import Loader from "../Loader";

const numberOfMessagesShown: number = 10;

const LatestMailingsGenerator = () => {

    const { data, isLoading, isError } = useQuery(
        ['messages','setNearestMessages'],
        () => getNearestMessages(numberOfMessagesShown),
        {
            keepPreviousData: true,
        }
    );

    if (isLoading) return <Loader spinnerColor={'border-t-white'}/>;
    if (isError) return <div className="flex justify-center items-center w-full h-full">Произошла ошибка</div>;
    if (!data) return <div className="flex justify-center items-center w-full h-full">Нет данных</div>;
    return (
        <>
            {data.map((item) => (
                <MailingMessage key={item.id} item={item}/>
            ))}
        </>
    );
};

export default LatestMailingsGenerator;
