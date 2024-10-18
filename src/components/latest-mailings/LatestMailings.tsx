import React, {useContext} from 'react';
import Plus from "../../icons/Plus";
import {ChildWindowContext} from "../context-providers/ChildWindowProvider";
import LatestMailingsGenerator from "./LatestMailingsGenerator";

const LatestMailings = () => {
    const childWindow = useContext(ChildWindowContext);

    const handleOpenChildWindow = () => {
        if (childWindow) {
            childWindow.openChildWindow({type: 'message', id: 0});
        } else
            console.log('childWindow is null');
    };

    return (
        <div className="w-[25%] h-full bg-cyan-800 flex flex-col justify-start px-4 py-4 relative">
            <div className="w-full flex justify-between">
                <h2 className="text-center text-white mb-2 text-2xl">Ближайшие рассылки</h2>
                <div className="flex items-center cursor-pointer"><Plus color="white" onClickFunction={handleOpenChildWindow}/></div>
            </div>
            <div className="w-full h-full overflow-auto scroll-smooth scrollbar-none text-white">
                <LatestMailingsGenerator/>
            </div>
        </div>
    );
};

export default LatestMailings;
