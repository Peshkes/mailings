import React, {useContext, useEffect, useState} from 'react';
import {getSettings, updateRecipientTypes, updateSettings} from "../api/server";
import {Settings, ClientType} from "../api/types";
import useModal from "../components/modal-window/useModal";
import {TypesContext} from "../components/context-providers/TypesProvider";
import lodash from 'lodash';
import Loader from "../components/Loader";

const SettingsPage = () => {
    const [serverData, setServerData] = useState<Settings>();
    const [telegramInput, setTelegramInput] = useState("");
    const [whatsappInput, setWhatsappInput] = useState("");
    const {handleOpenModal, ModalComponent} = useModal();
    const {clientTypes} = useContext(TypesContext);
    const [clientTypesState, setClientTypesState] = useState<ClientType[]>(clientTypes);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setClientTypesState(clientTypes);
    }, [clientTypes]);

    useEffect(() => {
        getSettings()
            .then(res => {
                setServerData(res);
                setTelegramInput(res.telegram);
                setWhatsappInput(res.whatsapp);
            });
    }, []);

    const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelegramInput(e.target.value);
    };

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWhatsappInput(e.target.value);
    };

    const handleClientTypeChange = (id: number, newName: string) => {
        setClientTypesState(prevTypes =>
            prevTypes.map(type =>
                type.id === id ? { ...type, type_name: newName } : type
            )
        );
    };

    const handleAddClientType = () => {
        if (clientTypesState.length < 9) {
            const newType: ClientType = {
                id: clientTypesState.length + 1,
                type_name: "",
            };
            setClientTypesState([...clientTypesState, newType]);
        } else {
            handleOpenModal('Нельзя добавить больше 9 типов клиентов.');
        }
    };

    const handleRemoveClientType = (id: number) => {
        setClientTypesState(prevTypes => prevTypes.filter(type => type.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const promises = [];

        if (serverData?.telegram !== telegramInput || serverData?.whatsapp !== whatsappInput) {
            setIsLoading(true);
            const settingsPromise = updateSettings({ telegram: telegramInput, whatsapp: whatsappInput })
                .then(() => {
                    handleOpenModal('Настройки успешно обновлены. Приложение нужно перезапустить!',
                        undefined,
                        () => window.electron.ipcRenderer.send('quit'));
                })
                .catch((error) => {
                    handleOpenModal('Ошибка при обновлении настроек Telegram и WhatsApp:' + error);
                });
            promises.push(settingsPromise);
        }

        if (!lodash.isEqual(clientTypes, clientTypesState)) {
            setIsLoading(true);
            const clientTypesPromise = updateRecipientTypes(clientTypesState)
                .then(() => {
                    handleOpenModal('Типы клиентов успешно обновлены!');
                })
                .catch((error) => {
                    handleOpenModal('Ошибка при обновлении типов клиентов:' + error);
                });
            promises.push(clientTypesPromise);
        }

        await Promise.all(promises);
        setIsLoading(false);
    };

    return (
        <div className="max-w-md mx-auto h-full p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6 text-cyan-800 text-center">Настройки приложения</h1>
            <div>
                <form className={"flex flex-col justify-center"} onSubmit={handleSubmit}>
                    {/* Блок с настройками ссылок */}
                    <div className={"flex flex-row space-x-6"}>
                        <div className={"flex flex-col items-start"}>
                            <h2 className="text-lg font-semibold mb-2 text-cyan-800">Ссылки</h2>
                            <div>
                                <label htmlFor="telegram" className="block text-sm font-medium text-cyan-800">
                                    Telegram
                                </label>
                                <input
                                    id="telegram"
                                    type="text"
                                    value={telegramInput}
                                    onChange={handleTelegramChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="whatsapp" className="block text-sm font-medium text-cyan-800">
                                    WhatsApp
                                </label>
                                <input
                                    id="whatsapp"
                                    type="text"
                                    value={whatsappInput}
                                    onChange={handleWhatsappChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>

                        {/* Блок с типами клиентов */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2 text-cyan-800">Типы клиентов</h2>
                            {clientTypesState.map((type) => (
                                <div key={type.id} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        maxLength={8}
                                        value={type.type_name}
                                        onChange={(e) => handleClientTypeChange(type.id, e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveClientType(type.id)}
                                        className="ml-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddClientType}
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 mt-2"
                                disabled={clientTypesState.length >= 9}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 bg-cyan-600 text-white py-2 px-5 rounded-md hover:bg-cyan-700 transition duration-200"
                    >
                        Сохранить настройки
                    </button>
                </form>
            </div>
            {isLoading && <Loader withBackground={true}/>}
            {ModalComponent}
        </div>
    );
};

export default SettingsPage;