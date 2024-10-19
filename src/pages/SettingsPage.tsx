import React, {useEffect} from 'react';
import {getSettings, updateSettings} from "../api/server";
import {Settings} from "../api/types";
import useModal from "../components/modal-window/useModal";

const SettingsPage = () => {
    const [serverData, setServerData] = React.useState<Settings>();
    const [telegramInput, setTelegramInput] = React.useState("");
    const [whatsappInput, setWhatsappInput] = React.useState("");
    const {handleOpenModal, ModalComponent} = useModal();

    useEffect(() => {
        getSettings()
            .then(res => {
                setServerData(res);
                setTelegramInput(res.telegram);
                setWhatsappInput(res.whatsapp);
            })
    }, []);

    const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {setTelegramInput(e.target.value);};
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {setWhatsappInput(e.target.value);};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!serverData?.telegram || serverData?.telegram !== telegramInput || !serverData?.whatsapp || serverData?.whatsapp !== whatsappInput)
            updateSettings({
                telegram: telegramInput,
                whatsapp: whatsappInput,
            }).then(res => handleOpenModal(res + '. Приложение нужно запустить снова!', undefined, () => window.electron.ipcRenderer.send(('quit'))));
    }

    return (
        <div className="max-w-md mx-auto h-full p-4 flex flex-col justify-center items-center">
            <div>
                <h1 className="text-2xl font-semibold mb-4 text-cyan-800 text-left">Настройки</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition duration-200"
                    >
                        Сохранить настройки
                    </button>
                </form>
            </div>
            {ModalComponent}
        </div>
    );
};

export default SettingsPage;