import React, {useContext} from 'react';

import {TypesContext} from "../context-providers/TypesProvider";
import {useClientFilter} from "../../stores/useClientFilter";
import RadioButton from "../common-components/RadioButton";
import RadioDataFilter from "./RadioDataFilter";

type Props = {
    header: string
}

const ClientsRadioTypeFilter = ({header}:Props) => {
    const {clientTypes} = useContext(TypesContext);
    const {type_id, setTypeId} = useClientFilter();

    const handleSetTypeId = (type_id: number) => {
        setTypeId(type_id);
    }

    return (
        <RadioDataFilter  header={header}>
            {clientTypes.length > 0 && clientTypes.map(item  => (
                <RadioButton name={'client_type_filter'}  onChange={() => handleSetTypeId(item.id)} value={item.type_name} checked={type_id === item.id} key={item.id}/>
            ))}
        </RadioDataFilter>

    );
};

export default ClientsRadioTypeFilter;