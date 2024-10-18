import React from 'react';
import MailingFilter from "./MailingFilter";
import {useMailingsFilter} from "../../stores/useMailingsFilter";
import {stringToTimestamp, timestampToString} from "../../api/parser";

const DateMailingFilter = () => {
    const {date_from, date_to, setFromDate, setToDate} = useMailingsFilter();
    return (
        <MailingFilter header={"Фильтр по дате"}>
            {
                <>
                    <input id="date-from" type="datetime-local" name="date-from" value={date_from && timestampToString(date_from)}
                           onChange={(e) => setFromDate(stringToTimestamp(e.target.value))}/>
                    <input id="date-to" type="datetime-local" name="date-to" value={date_to && timestampToString(date_to)}
                           onChange={(e) => setToDate(stringToTimestamp(e.target.value))}/>
                </>
            }
        </MailingFilter>
    );
};

export default DateMailingFilter;
