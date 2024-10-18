import {
    ApiResponse,
    Client,
    ClientData,
    ClientPaginationResponse,
    ClientsComplexObjectRequest,
    ClientSearchParams,
    ClientType,
    Message,
    MessageData,
    MessagePaginationResponse,
    MessagesComplexObjectRequest,
    MessageSearchObject,
    MessengerType,
    PaginationRequestParams,
    SampleMessage,
    SampleMessageData,
    Settings,
    StatusResponse
} from './types';

export const server = 'http://localhost:49152';

// CLIENTS

// Добавить нового клиента
export async function addClient(clientData: ClientData): Promise<number> {
    return request('/client', 'POST', clientData);
}

// Получить клиентов по ID типа
export async function getClientsByType(typeId: number): Promise<Client[]> {
    return request(`/client/${typeId}`);
}

// Получить клиента по ID
export async function getClientById(clientId: number): Promise<Client> {
    return request(`/client/${clientId}`);
}

// Удалить клиента по ID
export async function deleteClientById(clientId: number): Promise<Client> {
    return request(`/client/${clientId}`, 'DELETE');
}

// Обновить информацию о клиенте
export async function updateClient(clientId: number, clientData: ClientData): Promise<Client> {
    return request(`/client/${clientId}`, 'PUT', clientData);
}

// Обновить мессенджер клиента
export async function updateClientMessenger(clientId: number, messangerId: number): Promise<StatusResponse> {
    return request(`/client/${clientId}/messanger/${messangerId}`, 'PUT');
}

// Обновить тип клиента
export async function updateClientType(clientId: number, typeId: number): Promise<StatusResponse> {
    return request(`/client/${clientId}/type/${typeId}`, 'PUT');
}

// Получить всех клиентов с пагинацией
export async function getAllClients(params: PaginationRequestParams): Promise<ClientPaginationResponse> {
    const query = new URLSearchParams(params as any).toString();
    return request(`/client?${query}`);
}

// Получить кликентов по поисковому запросу
export async function searchClients(params: ClientSearchParams): Promise<Client[]> {
    const queryParams = new URLSearchParams({
        fields: params.fields.join(',')
    }).toString();
    return request(`/client/search/${params.searchString}?${queryParams}`);
}

// Получить клиентов с без типов
export async function getClientsWithUnselectedType(): Promise<Client[]> {
    return request(`/client/all/without_types`);
}

// Получить клиентов с телеграм ошибкой
export async function getClientsWithTelegramError(): Promise<Client[]> {
    return request(`/client/all/telegram_error`);
}

// Получить последних добавленных клиентов
export async function getLastClients(count: number): Promise<Client[]> {
    return request(`/client/all/last/${count}`);
}

// Получить клиентов по всем фильтрам
export async function getAllFilteredClients(complexObject: ClientsComplexObjectRequest): Promise<ClientPaginationResponse> {
   const params = new URLSearchParams();

    // Добавляем параметры, если они определены
    if (complexObject.page) {
        params.append('page', complexObject.page.toString());
    }
    if (complexObject.limit) {
        params.append('limit', complexObject.limit.toString());
    }
    if (complexObject.type_id !== undefined) {
        params.append('type_id', complexObject.type_id.toString());
    }
    if (complexObject.search_string) {
        params.append('search_string', complexObject.search_string);
    }
    if (complexObject.search_type !== undefined) {
        params.append('search_type', complexObject.search_type.toString());
    }
    if (complexObject.tg_error !== undefined) {
        params.append('tg_error', complexObject.tg_error.toString());
    }

    // Используем собранные параметры для запроса
    return request(`/client/all/full_filtered?${params.toString()}`, 'GET');
}

//MESSAGES

// Добавить новое сообщение
export async function addMessage(messageData: MessageData): Promise<number> {
    return request('/message', 'POST', messageData);
}

// Получить сообщение по ID
export async function getMessageById(messageId: number): Promise<Message> {
    return request(`/message/${messageId}`);
}

// Обновить сообщение по ID
export async function updateMessage(messageId: number, messageData: MessageData): Promise<Message> {
    return request(`/message/${messageId}`, 'PUT', messageData);
}

// Удалить сообщение по ID
export async function deleteMessageById(messageId: number): Promise<Message> {
    return request(`/message/${messageId}`, 'DELETE');
}

// Отправить ранее отложненное сообщение
export async function sendDelayedMessage(messageId: number): Promise<StatusResponse> {
    return request(`/message/send-now/${messageId}`, 'POST');
}

// Немедленно отправить сообщение
export async function sendMessageNow(messageData: MessageData): Promise<StatusResponse> {
    return request(`/message/send-now`, 'POST', messageData);
}

// Получить все сообщения
export async function getAllMessages(): Promise<Message[]> {
    return request(`/message/all`);
}

// Получить все сообщения с пагинацией
export async function getAllMessagesWithPagination(params: PaginationRequestParams): Promise<MessagePaginationResponse> {
    const query = new URLSearchParams(params as any).toString();
    return request(`/message/all/paginated?${query}`);
}

// Получить все сообщения со всеми фильтрациями
export async function getAllFilteredMessages(complexObject: MessagesComplexObjectRequest): Promise<MessagePaginationResponse> {
    const params = new URLSearchParams();

    // Добавляем параметры, если они определены
    if (complexObject.page) {
        params.append('page', complexObject.page.toString());
    }
    if (complexObject.limit) {
        params.append('limit', complexObject.limit.toString());
    }
    if (complexObject.type_id !== undefined) {
        params.append('type_id', complexObject.type_id.toString());
    }
    if (complexObject.search_string) {
        params.append('search_string', complexObject.search_string);
    }
    if (complexObject.date_from !== undefined) {
        params.append('date_from', complexObject.date_from.toString());
    }
    if (complexObject.date_to !== undefined) {
        params.append('date_to', complexObject.date_to.toString());
    }

    // Используем собранные параметры для запроса
    return request(`/message/all/full_filtered?${params.toString()}`, 'GET');
}

// Получить ближайшие сообщения
export async function getNearestMessages(count: number): Promise<Message[]> {
    return request(`/message/all/upcoming/${count}`);
}

// Поиск по тексту и диапазону дат
export async function searchMessages(object: MessageSearchObject): Promise<Message[]> {
    const hasProperties = Object.keys(object).length > 0;
    if (!hasProperties) {
        throw new Error('Search object is empty');
    }
    const query = new URLSearchParams(object as any).toString();
    return request(`/message/all/search?${query}`);
}

// Получить сообщения по типу получателя
export async function getMessagesByRecipientType(recipientTypeId: number): Promise<Message[]> {
    return request(`/message/all/recipient-type/${recipientTypeId}`);
}

// MESSAGE SAMPLE

// Добавить новый шаблон
export async function addSampleMessage(messageData: SampleMessageData): Promise<number> {
    return request('/message/sample', 'POST', messageData);
}

// Получить шаблон по ID
export async function getSampleMessageById(messageId: number): Promise<SampleMessage>{
    return request(`/message/sample/${messageId}`);
}

// Получить все шаблоны
export async function getAllSampleMessages(): Promise<SampleMessage[]> {
    return request(`/message/sample/all`);
}

// Обновить шаблон по ID
export async function updateSampleMessage(messageId: number, messageData: SampleMessageData): Promise<SampleMessage> {
    return request(`/message/sample/${messageId}`, 'PUT', messageData);
}

// Удалить шаблон по ID
export async function deleteSampleMessageById(messageId: number): Promise<SampleMessage> {
    return request(`/message/sample/${messageId}`, 'DELETE');
}

// UTILITIES

// Типы мессенджеров
export async function getMessengerTypes(): Promise<MessengerType[]> {
    return request(`/utility/messenger-types`);
}

// Типы получателей
export async function getRecipientTypes(): Promise<ClientType[]> {
    return request(`/utility/recipient-types`);
}

export async function getSettings(): Promise<Settings> {
    return request('/utility/settings');
}

export async function updateSettings(settings: Settings): Promise<string> {
    return request('/utility/settings', 'PUT', settings);
}


async function request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
    console.log(server + endpoint)
    const response = await fetch(`${server}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    console.log(server + endpoint)

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
        throw new Error((result as StatusResponse).status || 'Network response was not ok.');
    }
    return result as T;
}
