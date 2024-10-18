import React, {ReactNode} from 'react';


type Props = {
    children: ReactNode
};

const PageStatusDiv = ({children}: Props) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            {children}
        </div>
    );
};

export default PageStatusDiv;