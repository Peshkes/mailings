import React, {ReactNode} from 'react';

type Props = {
    children: ReactNode
    header: string
}
const RadioDataFilter = ({children, header}:Props) => {
    return (
        <div
            className="w-[24%] h-full px-7 pb-5 flex flex-col bg-white border-4 border-solid border-cyan-800/20 rounded-2xl">
            <h3 className="font-bold py-5 ">{header}</h3>
            <div className="flex flex-col overflow-y-auto scroll-smooth scrollbar scrollbar-w-1 scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-corner-rounded-md scrollbar-thumb-cyan-800 scrollbar-track-cyan-800/10 max-h-16">
                {children}
            </div>
        </div>
    );
};

export default RadioDataFilter;