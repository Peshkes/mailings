import React from 'react';

const ErrorBlock = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="grid grid-cols-3 mt-[-20px] gap-4 mb-4">
            <div className="col-span-2 col-start-2 text-red-500">
                {children}
            </div>
        </div>
    );
};

export default ErrorBlock;