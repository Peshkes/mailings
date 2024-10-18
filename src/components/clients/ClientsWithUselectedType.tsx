import React from 'react';
import ClientsWithUnselectedTypeGenerator from "./ClientsWithUnselectedTypeGenerator";

const ClientsWithUnselectedType = () => {

    return (
        <div className="w-[25%] h-full bg-cyan-800 flex flex-col justify-start px-4 py-4">
            <div className="w-full flex justify-between">
                <h2 className="text-start text-white mb-2 text-2xl">Необходимо выбрать тип</h2>
            </div>
            <div className="w-full h-full overflow-auto scroll-smooth scrollbar-none text-white relative">
                <ClientsWithUnselectedTypeGenerator/>
            </div>
        </div>
    );
};

export default ClientsWithUnselectedType;
