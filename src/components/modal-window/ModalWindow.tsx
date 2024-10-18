import React from 'react';
import WrapperBackgroundModal from "../WrapperBackgroundModal";

type ModalWindow = {
    text: string;
    onCancel: () => void;
    onGetBack?: (data?: any) => void;
    onOk?: () => void;
}


const ModalWindow = ({onCancel, onGetBack, text, onOk}: ModalWindow) => {
    return (
        <WrapperBackgroundModal closeFunction={onCancel}>
            <div className="bg-white border-4 border-solid border-cyan-800/20 rounded-2xl p-4 max-w-lg w-full relative">
                <h2 className="text-cyan-800 font-semibold text-center mb-6">
                    {text}
                </h2>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onOk || onCancel}
                        className="bg-cyan-600 text-white py-2 px-4 rounded-md border border-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        ОК
                    </button>
                    { onGetBack && <button
                        onClick={onGetBack}
                        className="bg-gray-300 text-gray-700 py-1 px-3 rounded-md border border-gray-400 hover:bg-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Отменить
                    </button>}
                </div>
            </div>
        </WrapperBackgroundModal>
    );
};

export default ModalWindow;
