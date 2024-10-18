import React from 'react';

type Props = {
    handleSetPage: () => void
    children: React.ReactNode
    isActive?: boolean
    disabled?: boolean;
}

const PaginationButton = ({ isActive = false, children, handleSetPage, disabled = false }: Props) => {
    return (
        <button
            className={`rounded-md mx-1 px-2 hover:cursor-pointer hover:border-0 hover:border-solid ${
                isActive ? 'bg-cyan-800 text-white ' : 'text-cyan-800 bg-white hover:bg-cyan-800/20 hover:text-white'}`}
            onClick={handleSetPage} disabled={disabled}
        >
            {children}
        </button>
    );
};

export default PaginationButton;
