import React, {useState} from 'react';
import {useMailingsFilter} from "../../stores/useMailingsFilter";
import {useClientFilter} from "../../stores/useClientFilter";


type Props = {
    type: string
}
const Search = ({type}: Props) => {

    const {search_string, setSearchString, clearFilter} = type === "clients" ? useClientFilter() : useMailingsFilter();
    const [searchValue, setSearchValue] = useState(search_string);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleSearchChange = (value: string) => {
        timeoutId && clearTimeout(timeoutId);
        setSearchValue(value);
        const timeout = setTimeout(() => {
            setSearchString(searchValue);
        }, 1000);
        setTimeoutId(timeout);
    }

    const handleClear = () =>{
        clearFilter();
        setSearchValue('');
    }

    return (
        <>
            <div
                className="w-full h-[45%] px-7 py-5 flex flex-col justify-center bg-white border-4 border-solid border-cyan-800/20 rounded-2xl">
                <input
                    type="text"
                    placeholder="Поиск"
                    className="w-full"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}/>
            </div>
            <div
                className="w-full h-[45%] flex flex-col justify-center px-7 py-5 bg-white border-4 border-solid border-cyan-800/20 rounded-2xl shadow-md shadow-slate-700 cursor-pointer hover:shadow-none"
                onClick={handleClear}>
                Сбросить фильтры
            </div>
        </>


    );
};

export default Search;
