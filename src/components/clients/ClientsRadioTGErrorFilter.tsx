import React from 'react';

import RadioTGErrorFilter from "./RadioTypeFilter";
import {useClientFilter} from "../../stores/useClientFilter";
import RadioButton from "../common-components/RadioButton";

type Props = {
    header: string
}
const ClientsRadioTGErrorFilter = ({header}:Props) => {
    const obj = [
        {id:true,value:"Да"},
        {id:false,value:"Нет"}];

    const {tg_error, isTgError} = useClientFilter();

    const handleSetTgError = (tg_error: boolean) => {
        isTgError(tg_error);
    }
    return (
        <RadioTGErrorFilter header={header}>
            {obj.map((item,index)  => (
                <RadioButton name={'client_tg_error_filter'}  onChange={() => handleSetTgError(item.id)} value={item.value} checked={tg_error === item.id} key={index+1}/>
            ))}
        </RadioTGErrorFilter>

    );
};

export default ClientsRadioTGErrorFilter;