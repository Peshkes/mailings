import React, {ReactNode} from 'react';
import DashboardTableHeader from "./DashboardTableHeader";


type Props = {
    title: string
    plusFunction?: () => void | undefined
    children: ReactNode
}


const TableWrapper = ({title, plusFunction, children}: Props) => {

    return (
        <div
            className="w-full h-full flex flex-col justify-start bg-white border-4 border-solid border-cyan-800/20 rounded-2xl">
            <DashboardTableHeader title={title} plusFunction={plusFunction}/>
            <div className="mr-2 my-2 flex flex-col pb-5 overflow-y-auto scroll-smooth scrollbar scrollbar-w-1 scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-corner-rounded-md scrollbar-thumb-cyan-800 scrollbar-track-cyan-800/10 text-cyan-800">
                <div
                    className="h-full w-full  relative">
                    {title === "Шаблоны" ||
                        <div className="w-full py-5 px-7 grid grid-cols-2 font-bold sticky top-0 bg-white">
                            <div>Имя</div>
                            <div>Телефон</div>
                        </div>
                    }
                    <div className="flex-1 ">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default TableWrapper;




