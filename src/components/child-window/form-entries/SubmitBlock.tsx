import React from 'react';

type Props = {
    id: number;
    stringEnd: string;
}

const SubmitBlock = ({id, stringEnd}: Props) => {
    return (
        <div className="flex justify-center mt-6">
            <button type="submit"
                    className="bg-cyan-600 text-white w-full max-w-xs py-3 rounded-md border
                    border-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                {id > 0 ? 'Обновить ' + stringEnd : 'Добавить ' + stringEnd}
            </button>
        </div>
    );
};

export default SubmitBlock;