import React from 'react';


import {useClientFilter} from "../../stores/useClientFilter";
import RadioDataFilter from "./RadioDataFilter";
import RadioButton from "../common-components/RadioButton";

type Props = {
    header: string
}
const ClientsRadioDataFilter = ({header}:Props) => {
    const obj = [
        {name:"Имени", value:"name"},
        {name:"Телефону", value:"phone_number"}];

    const {search_type, setSearchType} = useClientFilter();

    const handleSetSearchType = (search_type: string) => {
        setSearchType(search_type);
    }
    return (
        <RadioDataFilter header={header}>
            {obj.map(item  => (
                <RadioButton name={'client_data_filter'}  onChange={() => handleSetSearchType(item.value)} value={item.name} checked={search_type === item.value} key={item.value}/>
            ))}
        </RadioDataFilter>

    );
};

export default ClientsRadioDataFilter;