import React, {useContext, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {addClient, deleteClientById, getClientById, updateClient} from "../../../api/server";
import {dateToTimestamp, timestampToDate} from "../../../api/parser";
import FormField from "../form-entries/FormField";
import DeleteBlock from "../form-entries/DeleteBlock";
import {ChildWindowContext} from "../../context-providers/ChildWindowProvider";
import useModal from "../../modal-window/useModal";
import {TypesContext} from "../../context-providers/TypesProvider";
import FormSelectField from "../form-entries/FormSelectField";
import SubmitBlock from "../form-entries/SubmitBlock";
import Loader from "../../Loader";
import ErrorBlock from "../form-entries/ErrorBlock";
import FormDataTimePicker from "../form-entries/FormDataTimePicker";


type ClientFormEntrailsProps = {
    id: number;
}

type Errors = {
    phoneNumber: string,
    name: string,
    typeId: string,
    date: string,

}



const defaultErrors = {
    phoneNumber: '',
    name: '',
    typeId: '',
    date: ''
}

const ClientForm: React.FC<ClientFormEntrailsProps> = ({id}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [typeId, setTypeId] = useState<number | null>(null);
    const [messangerId, setMessangerId] = useState<number | null>(null);
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [chatId, setChatId] = useState<number | null>(null);

    const [errors, setErrors] = useState<Errors>(defaultErrors);

    const {handleOpenModal, ModalComponent} = useModal();
    const childWindow = useContext(ChildWindowContext);
    const closeAllWindows = () => childWindow?.closeChildWindow();
    const types = useContext(TypesContext);
    const queryClient = useQueryClient();

    const isItUpdate = id > 0;

    const {isLoading: isClientLoading} = useQuery(
        ['client', id],
        () => getClientById(id),
        {
            enabled: isItUpdate,
            onSuccess: data => {
                setPhoneNumber(data.phone_number);
                setName(data.name);
                setTypeId(data.type_id);
                if (data.messanger_id) setMessangerId(data.messanger_id);
                setCheckInDate(timestampToDate(data.check_in_date));
                setCheckOutDate(timestampToDate(data.check_out_date));
                if (data.chat_id) setChatId(data.chat_id);
            },
            onError: (error: Error) => handleOpenModal('Получение клиента не удалось: ' + error.message, undefined, closeAllWindows)
        }
    );

    const validate = () => {
        let isValid = true;
        let newErrors: Errors = {phoneNumber: '', name: '', typeId: '', date: ''};

        if (!phoneNumber.match(/^\+?[0-9]{7,14}$/)) {
            newErrors.phoneNumber = 'Введите корректный номер телефона';
            isValid = false;
        }

        if (name.trim() === '') {
            newErrors.name = 'Имя не должно быть пустым';
            isValid = false;
        }

        if (typeId === null) {
            newErrors.typeId = 'Выберите тип клиента';
            isValid = false;
        }

        const checkInTimestamp = checkInDate ? dateToTimestamp(checkInDate) : null;
        const checkOutTimestamp = checkOutDate ? dateToTimestamp(checkOutDate) : null;

        if (checkInTimestamp === null || checkOutTimestamp === null) {
            newErrors.date = 'Выберите даты заезда и выезда';
            isValid = false;
        } else if (checkOutTimestamp <= checkInTimestamp) {
            newErrors.date = 'Дата заезда должна быть позже даты выезда';
            isValid = false;
        }

        if (!isValid)
            setErrors(newErrors);

        return isValid;
    };

    const createClientMutation = (mutationFn: (data: any) => Promise<any>, onSuccessMessage: string, getBack?: (data: any) => void) => {
        return useMutation(mutationFn, {
            onSuccess: (data) => {
                handleOpenModal(onSuccessMessage, getBack ? () => getBack(data) : undefined, closeAllWindows);
                queryClient.invalidateQueries('clients');
                resetForm();
                setErrors(defaultErrors);
            },
            onError: (error: Error) => handleOpenModal(`Ошибка: ${error.message}`, closeAllWindows),
        });
    };

    const useAddClientMutation = createClientMutation(
        async (clientData) => await addClient(clientData),
        'Клиент добавлен успешно',
        (data: any) => deleteClientById(data)
            .then(_ => handleOpenModal('Клиент не был добавлен'))
            .catch(error => handleOpenModal('Ошибка удаления: ' + error, undefined, closeAllWindows))
    )

    const useUpdateClientMutation = createClientMutation(
        async (clientData) => await updateClient(id, clientData),
        'Клиент обновлен успешно',
        (data: any) => updateClient(id, data)
            .then(_ => handleOpenModal('Клиент не был обновлен'))
            .catch(error => handleOpenModal('Ошибка обновления: ' + error, undefined, closeAllWindows))
    )

    const useDeleteClientMutation = createClientMutation(
        async (id: number) => await deleteClientById(id),
        'Клиент удален успешно',
        (data: any) => addClient(data)
            .then(_ => handleOpenModal('Клиент не был удален'))
            .catch(error => handleOpenModal('Ошибка удаления: ' + error, undefined, closeAllWindows))
    );

    const resetForm = () => {
        setPhoneNumber('');
        setName('');
        setTypeId(null);
        setMessangerId(null);
        setCheckInDate(null);
        setCheckOutDate(null);
        setChatId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            const clientData = {
                phone_number: phoneNumber,
                name: name,
                type_id: typeId,
                messanger_id: messangerId,
                check_in_date: checkInDate ? dateToTimestamp(checkInDate) : null,
                check_out_date: checkOutDate ? dateToTimestamp(checkOutDate) : null,
                chat_id: chatId,
            };
            console.log(clientData);
            if (isItUpdate) {
                useUpdateClientMutation.mutate(clientData);
            } else {
                useAddClientMutation.mutate(clientData);
            }
        } else
            return;

    };


    const isLoading = isClientLoading || useAddClientMutation.isLoading || useUpdateClientMutation.isLoading || useDeleteClientMutation.isLoading;
    return (
        <>
            <form onSubmit={handleSubmit} className="relative p-6 bg-white border border-cyan-800/20 rounded-lg">
                <FormField id="phone_number" label="Номер телефона" type="text" value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)} required/>
                {errors.phoneNumber && <ErrorBlock>{errors.phoneNumber}</ErrorBlock>}
                <FormField id="name" label="Имя" type="text" value={name}
                           onChange={(e) => setName(e.target.value)} required/>
                {errors.name && <ErrorBlock>{errors.name}</ErrorBlock>}
                <FormDataTimePicker label={"Дата заезда"} value={checkInDate} onChange={setCheckInDate} defaultHours={14}/>
                <FormDataTimePicker label={"Дата выезда"} value={checkOutDate} onChange={setCheckOutDate} defaultHours={12}/>
                <FormSelectField id="type_id" label="Тип" value={typeId || ''}
                                 onChange={(e) => setTypeId(parseInt(e.target.value, 10) || null)}
                                 options={types.clientTypes.map(type => ({value: type.id, label: type.type_name}))}/>
                {errors.typeId && <ErrorBlock>{errors.typeId}</ErrorBlock>}
                <FormSelectField id="messanger_id" label="Мессенджер" value={messangerId || ''}
                                 required={true}
                                 onChange={(e) => setMessangerId(parseInt(e.target.value, 10) || null)}
                                 options={types.messengerTypes.map(messanger => ({
                                     value: messanger.id,
                                     label: messanger.messanger_name
                                 }))}/>
                {errors.date && <ErrorBlock>{errors.date}</ErrorBlock>}
                <SubmitBlock id={id} stringEnd={'клиента'}/>
                {id > 0 && <DeleteBlock onDelete={() => useDeleteClientMutation.mutate(id)}/>}
                {isLoading && <Loader withBackground={true}/>}
            </form>
            {ModalComponent}
        </>
    );
};

export default ClientForm;
