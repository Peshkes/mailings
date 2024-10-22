import React, { useContext} from 'react';
import RadioButton from "../common-components/RadioButton";
import MailingFilter from "./MailingFilter";
import {TypesContext} from "../context-providers/TypesProvider";
import {useMailingsFilter} from "../../stores/useMailingsFilter";

const TypeFilterBlock = () => {
    const {clientTypes} = useContext(TypesContext);
    const {type_id, setTypeId} = useMailingsFilter();

    const handleSetTypeId = (type_id: number) => {
        setTypeId(type_id);
    }

    return (
        <MailingFilter header={"Фильтр по типу"}>
            {clientTypes.length > 0 && clientTypes.map(item => (
                <RadioButton name={'mailing_filter'} onChange={() => handleSetTypeId(item.id)} value={item.type_name}
                             checked={type_id === item.id} key={item.id}/>
            ))}
        </MailingFilter>
    );
};

export default TypeFilterBlock;
