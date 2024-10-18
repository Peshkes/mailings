import { ClientType, MessengerType } from "../../api/types";
import React, {useEffect, useMemo, useState} from "react";
import { getMessengerTypes, getRecipientTypes } from "../../api/server";
import useModal from "../modal-window/useModal";


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
    const [messengerTypes, setMessengerTypes] = useState<MessengerType[]>([]);
    const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
    const { handleOpenModal, ModalComponent } = useModal();

    const fetchTypes = async () => {
        try {
            const [messengerRes, clientRes] = await Promise.all([
                getMessengerTypes(),
                getRecipientTypes()
            ]);
            console.log(clientRes)
            setMessengerTypes(messengerRes);
            setClientTypes(clientRes);
        } catch (err) {
            handleOpenModal(
                'Ошибка при загрузке данных. Попробуйте снова.',
                undefined,
                undefined,
                retryFetch
            );
        }
    };

    const retryFetch = () => {
        fetchTypes();
    };

    useEffect(() => {
        fetchTypes();
    }, []);

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
