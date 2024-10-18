import { create } from "zustand";

export type ClientStore = {
    telegram_string: string;
    setTelegramString: (string: string) => void;
    whatsapp_string: string;
    setWhatsappString: (string: string) => void;
    licence: string;
    setLicence: (licence: string) => void;
}

export const useClientFilter = create<ClientStore>((set) => ({
    telegram_string: '',
    whatsapp_string: '',
    licence: '',
    setTelegramString: (telegram_string: string) => {

        set({ telegram_string });
    },
    setWhatsappString: (whatsapp_string: string) => {
        set({ whatsapp_string });
    },
    setLicence: (licence: string) => {
        set({ licence });
    },
}));