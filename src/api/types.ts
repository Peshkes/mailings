export type StatusResponse = {
    status: string;
}

export type ApiResponse<T> = T | StatusResponse;

export type Id = {
    "id": number;
}

// CLIENTS

export type ClientData = {
    phone_number: string;
    name: string;
    type_id: number | null;
    check_in_date: number;
    check_out_date: number;
    messanger_id?: number | null;
    chat_id?: number | null;
}

export type Client = ClientData & Id

export type SearchField = 'phone' | 'name';

export type ClientSearchParams = {
    searchString: string;
    fields: Array<SearchField>;
}

export type PaginationParams = {
    page: number;
    limit: number;
}

export type PaginationRequestParams = {
    type?: number
} & PaginationParams

export type PaginationResponseParams = {
    totalPages: number;
    total: number
} & PaginationParams

export type ClientPaginationResponse = {
    data: Client[];
    pagination: PaginationResponseParams;
}

export type ClientsComplexObjectRequest = {
    type_id?: number;
    search_type?: string;
    search_string?: string;
    tg_error?: boolean;
} & PaginationParams

//MESSAGES

export type messageSkeleton = {
    theme: string;
    message_text: string;
    recipient_type_id: number | null;
    media_path?: string | null;
}

export type MessageData = messageSkeleton & {
    sending_date: number;
}

export type Message = MessageData & Id;

export type SampleMessageData = MessageData & {
    sample_name: string;
}

export type SampleMessage = SampleMessageData & Id;

export type MessagePaginationResponse = {
    data: Message[];
    pagination: PaginationResponseParams;
}

export type MessageSearchObject = {
    string?: string;
    date_from?: number;
    date_to?: number;
}

export type MessagesComplexObjectRequest = {
    type_id?: number;
    date_from?: number;
    date_to?: number;
    search_string?: string;
} & PaginationParams

// UTILITIES

export type MessengerType = {
    id: number;
    messanger_name: string;
}

export type ClientType = {
    id: number;
    type_name: string;
}

export type Settings = {
    telegram: string;
    whatsapp: string;
    licence: string;
}


