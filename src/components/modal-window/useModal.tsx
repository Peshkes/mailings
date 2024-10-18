import React from 'react';
import {useState} from 'react';
import ModalWindow from './ModalWindow';
import WrapperBackgroundModal from "../WrapperBackgroundModal";

interface ModalWindowProps {
    text: string;
    onCancel?: () => void;
    onGetBack?: (data?: any) => void;
    onOk?: () => void;
}

const useModal = () => {
    const [modalWindow, setModalWindow] = useState<ModalWindowProps | null>(null);

    const closeModal = () => setModalWindow(null);

    const handleOpenModal = (text: string, onGetBack?: (data: any) => void, onCancel: () => void = closeModal, onOk?: () => void) => {
        setModalWindow({text, onCancel, onGetBack, onOk});
    };

    const ModalComponent = modalWindow && modalWindow.onCancel ? (
        <WrapperBackgroundModal closeFunction={modalWindow.onCancel}>
            <ModalWindow text={modalWindow.text} onGetBack={modalWindow.onGetBack} onCancel={modalWindow.onCancel}/>
        </WrapperBackgroundModal>
    ) : null;

    return {
        handleOpenModal,
        ModalComponent
    };
};

export default useModal;
