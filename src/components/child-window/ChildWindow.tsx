import React from 'react';
import ClientForm from "./foms/ClientForm";
import MessageForm from "./foms/MessageForm";

export type ChildWindowFunctionProps = {
    type: 'client' | 'message' | 'sample';
    id: number;
}

const ChildWindow = ({type, id}: ChildWindowFunctionProps) => {
    return (
        <div className="bg-white border-4 border-solid border-cyan-800/20 rounded-2xl p-4 max-w-[600px] w-full relative">
            {type === 'client' ?
                <ClientForm id={id}/> :
                <MessageForm id={id} isSample={type === 'sample'}/>}
        </div>
    );
};

export default ChildWindow;
