import {create} from "zustand/react";
import {MessagePaginationResponse, MessagesComplexObjectRequest} from "../api/types";
import {getAllFilteredMessages} from "../api/server";

export type MailingStore = {
    type_id?: number;
    date_from?: number;
    date_to?: number;
    search_string: string;
    page: number;
    limit: number;

    setTypeId: (type: number) => void;
    setFromDate: (date: number) => void;
    setToDate: (date: number) => void;
    setSearchString: (string: string) => void;
    setPage: (page: number) => void;

    fetchMailings: () => Promise<MessagePaginationResponse>
    clearFilter: () => void

}

export const useMailingsFilter = create<MailingStore>((set, getState) => ({
    type_id: undefined,
    date_from: undefined,
    date_to: undefined,
    search_string: '',
    page: 1,
    limit: 15,

    setTypeId: (type_id: number) => set({type_id}),
    setFromDate: (date_from: number) => set({date_from}),
    setToDate: (date_to: number) => set({date_to}),
    setSearchString: (search_string: string) => set({search_string}),
    setPage: (page: number) => set({page}),

    fetchMailings: async () => {
        const {type_id, date_from, date_to, search_string, page, limit} = getState();
        const payload: MessagesComplexObjectRequest = {
            ...(type_id !== undefined && {type_id}),
            ...(date_from !== undefined && {date_from}),
            ...(date_to !== undefined && {date_to}),
            ...(search_string !== '' && {search_string}),
            page,
            limit
        }
        return getAllFilteredMessages(payload);
    },

    clearFilter: () => set({type_id: undefined, date_from: undefined, date_to: undefined, search_string: ''})
}));
