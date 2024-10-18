import React from 'react';
import Plus from "../../icons/Plus";

type Props = {
   title:String
    plusFunction?: () => void | undefined
}

const DashboardTableHeader = (props:Props) => {
    return (
        <div className="w-full py-5  flex justify-between border-b-4 border-solid border-cyan-800/20">
            <p className="pl-7 text-2xl text-cyan-800">{props.title}</p>
            {
                props.plusFunction &&
                <div className="flex items-center pr-7 cursor-pointer">
                    <Plus color={"#155e75"} onClickFunction={props.plusFunction}/>
                </div>}
        </div>
    );
};

export default DashboardTableHeader;