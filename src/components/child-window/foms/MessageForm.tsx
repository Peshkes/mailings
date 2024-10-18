import React, {useContext, useState} from "react";
import FormField from "../form-entries/FormField";
import {
    addMessage,
    addSampleMessage,
    deleteMessageById,
    deleteSampleMessageById,
    getMessageById,
    getSampleMessageById,
    sendMessageNow,
    updateMessage,
    updateSampleMessage
} from "../../../api/server";
import useModal from "../../modal-window/useModal";
import {ChildWindowContext} from "../../context-providers/ChildWindowProvider";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {stringToTimestamp, timestampToString} from "../../../api/parser";
import {TypesContext} from "../../context-providers/TypesProvider";
import FormSelectField from "../form-entries/FormSelectField";
import DeleteBlock from "../form-entries/DeleteBlock";
import Loader from "../../Loader";
import {Message, MessageData, SampleMessage, SampleMessageData} from "../../../api/types";
import ErrorBlock from "../form-entries/ErrorBlock";

type CombineMessage = Message | SampleMessage;

type Errors = {
    sampleName: string,
    theme: string,
    message_text: string,
    recipient_type_id: string | null,
    media_path: string | null,
    sending_date: string
}

const defaultErrors = {
    sampleName: '',
    theme: '',
    message_text: '',
    recipient_type_id: null,
    media_path: null,
    sending_date: ''
}

const MessageForm: React.FC<{ id: number; isSample?: boolean }> = ({id, isSample = false}) => {
    const [theme, setTheme] = useState('');
    const [messageText, setMessageText] = useState('');
    const [mediaPath, setMediaPath] = useState('');
    const [sendingDate, setSendingDate] = useState('');
    const [recipientTypeId, setRecipientTypeId] = useState<number | ''>('');
    const [sampleName, setSampleName] = useState('');
    const [isImmediateSend, setIsImmediateSend] = useState(false);
    const [errors, setErrors] = useState<Errors>(defaultErrors);

    const {handleOpenModal, ModalComponent} = useModal();
    const childWindow = useContext(ChildWindowContext);
    const closeAllWindows = () => childWindow?.closeChildWindow();


    const {clientTypes} = useContext(TypesContext);
    const isItUpdate = id > 0;

    const resetForm = () => {
        setTheme('');
        setMessageText('');
        setMediaPath('');
        setSendingDate('');
        setRecipientTypeId('');
        if (isSample) setSampleName('');
    };

    const queryClient = useQueryClient();
    const {isLoading: isLoadingData} = useQuery(
        [isSample ? 'samples' : 'message', id],
        isSample ? () => getSampleMessageById(id) : () => getMessageById(id),
        {
            enabled: isItUpdate,
            onSuccess: (data: CombineMessage) => {
                setTheme(data.theme);
                setMessageText(data.message_text);
                if (data.recipient_type_id) setRecipientTypeId(data.recipient_type_id);
                if (data.media_path) setMediaPath(data.media_path);
                if (data.sending_date) setSendingDate(timestampToString(data.sending_date));
                if (isSample && 'sample_name' in data) setSampleName(data.sample_name);
            },
            onError: (error: Error) => handleOpenModal(`Ошибка: ${error.message}`, undefined, closeAllWindows)
        });

    const validate = () => {
        let isValid = true;
        let newErrors: Errors = {
            sampleName: '',
            theme: '',
            message_text: '',
            recipient_type_id: null,
            media_path: null,
            sending_date: ''
        };

        if (isSample && sampleName.trim() === '') {
            newErrors.sampleName = 'Заполните тему рассылки';
            isValid = false;
        }

        if (theme.trim() === '') {
            newErrors.theme = 'Заполните тему рассылки';
            isValid = false;
        }

        if (messageText.trim().length > 4096) {
            newErrors.message_text = 'Превышена допустимая длина сообщения';
            isValid = false;
        }

        if (recipientTypeId === null) {
            newErrors.recipient_type_id = 'Выберите тип клиента';
            isValid = false;
        }

        const now = new Date().getTime() ;
        const sendingDateTimestamp = stringToTimestamp(sendingDate);

        if (sendingDateTimestamp === null) {
            newErrors.sending_date = 'Заполните дату отправки рассылки';
            isValid = false;
        }

        if (sendingDateTimestamp < (now - 10 * 60 * 1000)) {
            newErrors.sending_date = 'Дата отправки должна быть в будущем';
            isValid = false;
        }

        if (!isValid)
            setErrors(newErrors);

        return isValid;
    };

    const createMessageMutation = (mutationFn: (data: any) => Promise<any>, onSuccessMessage: string, getBack?: (data: any) => void) => {
        return useMutation(mutationFn, {
            onSuccess: (data) => {
                handleOpenModal(onSuccessMessage, getBack ? () => getBack(data) : undefined, closeAllWindows);
                queryClient.invalidateQueries(isSample ? 'samples' : 'messages');
                resetForm();
            },
            onError: (error: Error) => handleOpenModal(`Ошибка: ${error.message}`, closeAllWindows),
        });
    };

    const useAddMessageMutation = createMessageMutation(
        async (messageData: MessageData | SampleMessageData) => {
            return isSample ? await addSampleMessage(messageData as SampleMessageData) : await addMessage(messageData as MessageData);
        },
        isSample ? 'Шаблон добавлен успешно' : 'Сообщение добавлено успешно',
        (data: any) => isSample ? deleteSampleMessageById(data) : deleteMessageById(data)
            .then(_ => handleOpenModal(isSample ? 'Шаблон не был добавлен' : 'Сообщение не было добавлено'))
            .catch(error => handleOpenModal('Ошибка удаления: ' + error, undefined, closeAllWindows))
    );

    const useUpdateMessageMutation = createMessageMutation(
        async (messageData: MessageData | SampleMessageData) => {
            return isSample ? await updateSampleMessage(id, messageData as SampleMessageData) : await updateMessage(id, messageData as MessageData);
        },
        isSample ? 'Шаблон обновлен успешно' : 'Сообщение обновлено успешно',
        (data: any) => isSample ? updateSampleMessage(id, data) : updateMessage(id, data)
            .then(_ => handleOpenModal(isSample ? 'Вернуть шаблон не удалось' : 'Вернуть сообщение не удалось'))
            .catch(error => handleOpenModal('Ошибка обновления: ' + error, undefined, closeAllWindows))
    );

    const useDeleteMessageMutation = createMessageMutation(
        async (id: number) => {
            return isSample ? await deleteSampleMessageById(id) : await deleteMessageById(id);
        },
        isSample ? 'Шаблон удален успешно' : 'Сообщение удалено успешно',
        (data: MessageData | SampleMessageData) => isSample ? addSampleMessage(data as SampleMessageData) : addMessage(data as MessageData)
            .then(_ => handleOpenModal(isSample ? 'Шаблон не был удален' : 'Сообщение не было удалено'))
            .catch(error => handleOpenModal('Ошибка удаления: ' + error, undefined, closeAllWindows))
    );

    const useSendMessageMutation = createMessageMutation(
        async (messageData: MessageData | SampleMessageData) => {
            await sendMessageNow(messageData);
        },
        'Сообщение отправлено успешно'
    );

    const handleSendMessage = () => {
        const data = {
            theme,
            message_text: messageText,
            recipient_type_id: recipientTypeId || null,
            media_path: mediaPath || null,
            sending_date: stringToTimestamp(sendingDate),
        };
        if (isImmediateSend) {
            useSendMessageMutation.mutate(data);
        } else
            useAddMessageMutation.mutate(data);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            const data = {
                theme,
                message_text: messageText,
                recipient_type_id: recipientTypeId || null,
                media_path: mediaPath || null,
                sending_date: stringToTimestamp(sendingDate),
                ...(isSample && {sample_name: sampleName})
            };
            if (isImmediateSend && !isItUpdate && !isSample) {
                useSendMessageMutation.mutate(data);
            } else {
                isItUpdate ? useUpdateMessageMutation.mutate(data) : useAddMessageMutation.mutate(data);
            }
        } else
            return;

    };

    const handleSetNow = () => {
        setIsImmediateSend(prevState => !prevState);
        const now = new Date();
        setSendingDate(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
    }

    const handleFileSelect = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await window.electron.openFile();
        if (result.length > 0) {
            setMediaPath(result[0]);
        }
    }

    const isLoading = isLoadingData || useSendMessageMutation.isLoading || useAddMessageMutation.isLoading || useUpdateMessageMutation.isLoading || useDeleteMessageMutation.isLoading;

    return (
        <>
            <form onSubmit={handleSubmit} className={`p-6 bg-white border border-cyan-800/20 rounded-lg relative`}>
                {isSample && (
                    <FormField
                        id="sample_name"
                        label="Название образца"
                        type="text"
                        value={sampleName}
                        onChange={(e) => setSampleName(e.target.value)}
                        required
                    />
                )}
                {isSample && errors.sampleName && <ErrorBlock>{errors.sampleName}</ErrorBlock>}
                <FormField
                    id="theme"
                    label="Тема"
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    required
                />
                {errors.theme && <ErrorBlock>{errors.theme}</ErrorBlock>}
                <div className="flex items-center mb-4">
                    <label htmlFor="message_text" className="text-cyan-800 font-semibold mr-10">Текст сообщения</label>
                    <textarea
                        id="message_text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-grow resize-none border border-cyan-800/40 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        rows={4}
                        required
                    />
                </div>
                {errors.message_text && <ErrorBlock>{errors.message_text}</ErrorBlock>}
                <FormField
                    id="media_path"
                    label="Путь к медиа"
                    type="text"
                    value={mediaPath}
                    onChange={(e) => setMediaPath(e.target.value)}
                >
                    <button
                        className="bg-cyan-600 text-white w-full px-2 rounded-md border border-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        onClick={handleFileSelect}
                    >Файл
                    </button>
                </FormField>
                <FormField
                    id="sending_date"
                    label="Дата отправки"
                    type="datetime-local"
                    disabled={isImmediateSend}
                    value={sendingDate}
                    onChange={(e) => setSendingDate(e.target.value)}
                    onKeyDown={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                >
                    <button
                        type="button" onClick={handleSetNow}
                        className="bg-cyan-600 text-white w-full px-2 rounded-md border border-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        {isImmediateSend ? 'Потом' : 'Сразу'}
                    </button>
                </FormField>
                {errors.sending_date && <ErrorBlock>{errors.sending_date}</ErrorBlock>}
                <FormSelectField id="recipient_type_id" label="Тип получателя" value={recipientTypeId || ''}
                                 onChange={(e) => setRecipientTypeId(parseInt(e.target.value))}
                                 options={clientTypes.map(type => ({value: type.id, label: type.type_name}))}
                                 startOption={{value: '', label: 'Все', isDisabled: false}}
                />
                {errors.recipient_type_id && <ErrorBlock>{errors.recipient_type_id}</ErrorBlock>}
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        type="submit"
                        className="bg-cyan-600 text-white w-full max-w-xs py-3 rounded-md border border-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        {id > 0 ? 'Обновить' : 'Добавить'} {isSample ? 'образец' : 'сообщение'}
                    </button>
                    {isSample && id > 0 && handleSendMessage &&
                        <button
                            className="bg-cyan-600 text-white w-full max-w-xs py-3 rounded-md border border-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            onClick={handleSendMessage}>
                            Добавить рассылку
                        </button>}
                </div>
                {isItUpdate && <DeleteBlock onDelete={() => useDeleteMessageMutation.mutate(id)}/>}
                {isLoading && <Loader withBackground={true}/>}
            </form>
            {ModalComponent}
        </>
    );
};

export default MessageForm;
