import React, {ReactNode} from 'react';

type Props = {
    header:string
    children: ReactNode
}


const MailingFilter = ({children, header}: Props) => {
    return (
        <div
            className="w-[32%] h-full px-7 pb-5 flex flex-col bg-white border-4 border-solid border-cyan-800/20 rounded-2xl">
            <h3 className="font-bold py-5 ">{header}</h3>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default MailingFilter;
