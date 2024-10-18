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
            <div className="h-full w-full flex flex-col pb-5 overflow-y-scroll scroll-smooth scrollbar-none text-cyan-800 relative">
                {title === "Шаблоны" ||
                    <div className="w-full py-5 px-7 grid grid-cols-2 font-bold sticky top-0 bg-white">
                        <div>Имя</div>
                        <div>Телефон</div>
                    </div>
                }
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
};

export default TableWrapper;




