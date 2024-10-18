import {create} from "zustand/react";
import {ClientPaginationResponse, ClientsComplexObjectRequest} from "../api/types";
import {getAllFilteredClients} from "../api/server";

export type ClientStore = {
    type_id?: number;
    search_type?: string;
    search_string: string;
    tg_error?: boolean;
    page: number;
    limit: number;

    setTypeId: (type: number) => void;
    setSearchType: (type: string) => void;
    setSearchString: (string: string) => void;
    isTgError: (error: boolean) => void;

    setPage: (page: number) => void;
    fetchClients: () => Promise<ClientPaginationResponse>
    clearFilter: () => void

}

export const useClientFilter = create<ClientStore>((set, getState) => ({
    type_id: undefined,
    search_type: 'name',
    search_string: '',
    tg_error: undefined,
    page: 1,
    limit: 15,

    setTypeId: (type_id: number) => set({type_id}),
    setSearchType: (search_type: string) => set({search_type}),
    setSearchString: (search_string: string ) => set({search_string}),
    isTgError: (tg_error: boolean ) => set({tg_error}),
    setPage: (page: number) => set({page}),

    fetchClients: async () => {

        const {type_id, search_type, search_string, tg_error, page, limit} = getState();
        const payload: ClientsComplexObjectRequest = {
            ...(type_id !== undefined && {type_id}),
            ...(search_type !== undefined && {search_type}),
            ...(search_string !== '' && {search_string}),
            ...(tg_error !== undefined && {tg_error}),
            page,
            limit
        }

        return getAllFilteredClients(payload);
    },

    clearFilter: () => set({type_id: undefined, search_type: undefined, search_string: '', tg_error: undefined})
}));
