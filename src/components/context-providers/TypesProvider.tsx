import { ClientType, MessengerType } from "../../api/types";
import React, {useEffect, useMemo, useState} from "react";
import { getMessengerTypes, getRecipientTypes } from "../../api/server";
import useModal from "../modal-window/useModal";
import {useQuery} from "react-query";


type TypesContextProps = {
    messengerTypes: MessengerType[];
    clientTypes: ClientType[];
    getClientTypeById: (id: number) => ClientType | undefined;
    getMessengerTypeById: (id: number) => MessengerType | undefined;
    getClientTypeByName: (name: string) => ClientType | undefined;
    getMessengerTypeByName: (name: string) => MessengerType | undefined;
}

const TypesContext = React.createContext<TypesContextProps>({
    messengerTypes: [],
    clientTypes: [],
    getClientTypeById: () => undefined,
    getMessengerTypeById: () => undefined,
    getClientTypeByName: () => undefined,
    getMessengerTypeByName: () => undefined
});

type TypesProviderProps = {
    children: React.ReactNode;
}

const TypesProvider: React.FC<TypesProviderProps> = ({ children }) => {
    const { handleOpenModal, ModalComponent } = useModal();

    const { data: messengerTypes = [], error: messengerError, refetch: refetchMessengerTypes } = useQuery({
        queryKey: ['messengerTypes'],
        queryFn: getMessengerTypes,
        onError: () => {
            handleOpenModal(
                'Ошибка при загрузке данных о мессенджерах. Попробуйте снова.',
                undefined,
                undefined,
                refetchMessengerTypes
            );
        }
    });

    const { data: clientTypes = [], error: clientError, refetch: refetchClientTypes } = useQuery({
        queryKey: ['recipient-types'],
        queryFn: getRecipientTypes,
        onError: () => {
            handleOpenModal(
                'Ошибка при загрузке данных о клиентах. Попробуйте снова.',
                undefined,
                undefined,
                refetchClientTypes
            );
        }
    });

    const value = useMemo(() => ({
        messengerTypes,
        clientTypes,
        getClientTypeById: (id: number) => clientTypes.find(type => type.id === id),
        getMessengerTypeById: (id: number) => messengerTypes.find(type => type.id === id),
        getClientTypeByName: (name: string) => clientTypes.find(type => type.type_name === name),
        getMessengerTypeByName: (name: string) => messengerTypes.find(type => type.messanger_name === name),
    }), [messengerTypes, clientTypes]);

    return (
        <>
            <TypesContext.Provider value={value}>
                {children}
            </TypesContext.Provider>
            {ModalComponent}
        </>
    );
};

export {TypesProvider, TypesContext};
