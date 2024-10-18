import React from 'react';

interface LoaderProps {
    withBackground?: boolean;
    spinnerColor?: string;
}

const Loader: React.FC<LoaderProps> = ({withBackground = false, spinnerColor = 'border-t-cyan-800'}) => {
    return (
        <div className={`absolute inset-0 flex items-center justify-center ${withBackground ? 'bg-white bg-opacity-50 backdrop-blur' : ''} z-50`}>
            <div className={`animate-spin rounded-full h-16 w-16 border-4 border-gray-400 ${spinnerColor}`}/>
        </div>
    );
};

export default Loader;
