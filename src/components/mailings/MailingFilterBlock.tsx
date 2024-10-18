import React from 'react';
import TypeMailingFilter from "./TypeMailingFilter";
import DateMailingFilter from "./DateMailingFilter";


import Search from "../common-components/Search";

const MailingFilterBlock = () => {

    return (
        <div className="w-full mx-auto mb-4 flex justify-between">
            <TypeMailingFilter/>
            <DateMailingFilter/>
            <div className="w-[32%] h-full flex flex-col justify-between">
                <Search type="messages"/>
            </div>
        </div>
    );
};

export default MailingFilterBlock;
