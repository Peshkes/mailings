import {
    Client,
    ClientData,
    ClientPaginationResponse, ClientsComplexObjectRequest,
    ClientSearchParams,
    ClientType,
    Message,
    MessageData,
    MessagePaginationResponse, MessagesComplexObjectRequest,
    MessageSearchObject,
    MessengerType,
    PaginationRequestParams,
    SampleMessage,
    SampleMessageData,
    StatusResponse
} from './types';

const now = Date.now();


const fakeClients: Client[] = [
    // Clients with Telegram error
    {
        id: 19,
        phone_number: '888-999-0000',
        name: 'Client Nineteen',
        type_id: 2,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: null,
        chat_id: null
    },
    {
        id: 18,
        phone_number: '999-000-1111',
        name: 'Client Eighteen',
        type_id: 1,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: null,
        chat_id: null
    },
    // Clients without types
    {
        id: 17,
        phone_number: '000-111-2222',
        name: 'Client Seventeen',
        type_id: null,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 16,
        phone_number: '111-222-3333',
        name: 'Client Sixteen',
        type_id: null,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 1,
        chat_id: null
    },
    //All clients
    {
        id: 15,
        phone_number: '222-333-4444',
        name: 'Client Fifteen',
        type_id: 9,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 14,
        phone_number: '333-444-5555',
        name: 'Client Fourteen',
        type_id: 8,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 13,
        phone_number: '444-555-6666',
        name: 'Client Thirteen',
        type_id: 7,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 12,
        phone_number: '555-666-7777',
        name: 'Client Twelve',
        type_id: 6,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: null
    },
    {
        id: 11,
        phone_number: '666-666-6666',
        name: 'Client Eleven',
        type_id: 3,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 10,
        phone_number: '777-777-7777',
        name: 'Client Ten',
        type_id: 5,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 9,
        phone_number: '888-888-8888',
        name: 'Client Nine',
        type_id: 4,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: null
    },
    {
        id: 8,
        phone_number: '999-999-9999',
        name: 'Client Eight',
        type_id: 1,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 1,
        chat_id: null
    },
    {
        id: 7,
        phone_number: '111-111-1111',
        name: 'Client Seven',
        type_id: 2,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 6,
        phone_number: '222-222-2222',
        name: 'Client Six',
        type_id: 1,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 1,
        chat_id: null
    },
    {
        id: 5,
        phone_number: '333-333-3333',
        name: 'Client Five',
        type_id: 2,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 4,
        phone_number: '444-444-4444',
        name: 'Client Four',
        type_id: 3,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: 1241221241
    },
    {
        id: 3,
        phone_number: '555-555-5555',
        name: 'Client Three',
        type_id: 1,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 1,
        chat_id: null
    },
    {
        id: 2,
        phone_number: '987-654-3210',
        name: 'Client Two',
        type_id: 2,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 2,
        chat_id: null
    },
    {
        id: 1,
        phone_number: '123-456-7890',
        name: 'Client One',
        type_id: 1,
        check_in_date: now,
        check_out_date: now + 86400000,
        messanger_id: 1,
        chat_id: null
    }
];



const nextClientId =() => {return fakeClients[0].id + 1}

const fakeMessages: Message[] = [
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 1, theme: 'Hello', message_text: 'Hello World!', recipient_type_id: 1, sending_date: Date.now() },
    { id: 2, theme: 'Reminder', message_text: 'This is a reminder message.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 3, theme: 'Update', message_text: 'We have an update for you.', recipient_type_id: null, sending_date: Date.now() },
    { id: 4, theme: 'Alert', message_text: 'This is an alert message.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 5, theme: 'Info', message_text: 'Here is some information for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 6, theme: 'Warning', message_text: 'Please be aware of this warning.', recipient_type_id: null, sending_date: Date.now() },
    { id: 7, theme: 'Newsletter', message_text: 'Check out our latest newsletter.', recipient_type_id: 1, sending_date: Date.now() },
    { id: 8, theme: 'Offer', message_text: 'We have a special offer for you.', recipient_type_id: 2, sending_date: Date.now() },
    { id: 9, theme: 'Invitation', message_text: 'You are invited to our event.', recipient_type_id: null, sending_date: Date.now() },
    { id: 10, theme: 'Feedback', message_text: 'We would love your feedback.', recipient_type_id: 1, sending_date: Date.now() },
];


const nextFakeMessageId =() => {return fakeMessages[0].id + 1}
// Sample Messages (continued)
const fakeSampleMessages: SampleMessage[] = [
    { id: 1, sample_name: 'Greeting', theme: 'Welcome', message_text: 'Welcome to our service!', recipient_type_id: 1, media_path: '', sending_date: Date.now() },
    { id: 2, sample_name: 'Follow-Up', theme: 'Check-In', message_text: 'Just checking in to see how you are doing.', recipient_type_id: 2, media_path: '', sending_date: Date.now() },
    { id: 3, sample_name: 'Announcement', theme: 'New Feature', message_text: 'We have just launched a new feature.', recipient_type_id: 3, media_path: '', sending_date: Date.now() },
    { id: 4, sample_name: 'Reminder', theme: 'Appointment', message_text: 'This is a reminder for your appointment.', recipient_type_id: 1, media_path: '', sending_date: Date.now() },
    { id: 5, sample_name: 'Survey', theme: 'Feedback Request', message_text: 'Please fill out this survey.', recipient_type_id: 2, media_path: '', sending_date: Date.now() },
    { id: 6, sample_name: 'Notification', theme: 'Event Reminder', message_text: 'Don\'t forget about the upcoming event.', recipient_type_id: 3, media_path: '', sending_date: Date.now() },
    { id: 7, sample_name: 'Offer', theme: 'Special Deal', message_text: 'Check out our special deal!', recipient_type_id: 1, media_path: '', sending_date: Date.now() },
    { id: 8, sample_name: 'Update', theme: 'Service Update', message_text: 'We have updated our service.', recipient_type_id: 2, media_path: '', sending_date: Date.now() },
    { id: 9, sample_name: 'Welcome', theme: 'New User', message_text: 'Welcome our new users!', recipient_type_id: 3, media_path: '', sending_date: Date.now() },
    { id: 10, sample_name: 'Reminder', theme: 'Subscription', message_text: 'Your subscription is about to expire.', recipient_type_id: 1, media_path: '', sending_date: Date.now() }
];
const nextFakeSampleMessageId =() => {return fakeSampleMessages[0].id + 1}
const fakePaginationResponse = (data: any[], page: number, limit: number) => ({
    data: data.slice((page - 1) * limit, page * limit-1),
    pagination: {
        page,
        limit,
        totalPages: Math.ceil(data.length / limit),
        total: data.length
    }
});

const fakeMessengers: MessengerType[] = [
    {id: 1, messanger_name: 'WhatsApp'},
    {id: 2, messanger_name: 'Telegram'}
];

const fakeClientTypes: ClientType[] = [
    {id: 1, type_name: 'Взрослые'},
    {id: 2, type_name: 'С детьми'}
];

// CLIENTS

export async function addClient(clientData: ClientData): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newClient = { ...clientData, id: nextClientId() } as Client;
            fakeClients.unshift(newClient);
            resolve(newClient.id);
        }, 1000);
    });
}

export async function getClientsByType(typeId: number): Promise<Client[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeClients.filter(client => client.type_id === typeId));
        }, 1000);
    });
}

export async function getClientById(clientId: number): Promise<Client> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const client = fakeClients.find(client => client.id === clientId);
            if (client) {
                resolve(client);
            } else {
                throw new Error('Client not found');
            }
        }, 1000);
    });
}

export async function deleteClientById(clientId: number): Promise<Client> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeClients.findIndex(client => client.id === clientId);
            if (index !== -1) {
                const [deletedClient] = fakeClients.splice(index, 1);
                resolve(deletedClient);
            } else {
                throw new Error('Client not found');
            }
        }, 1000);
    });
}

export async function updateClient(clientId: number, clientData: ClientData): Promise<Client> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeClients.findIndex(client => client.id === clientId);
            if (index !== -1) {
                fakeClients[index] = { ...fakeClients[index], ...clientData };
                resolve(fakeClients[index]);
            } else {
                throw new Error('Client not found');
            }
        }, 1000);
    });
}

export async function updateClientType(clientType: number, clientId: number): Promise<StatusResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (clientId !== -1) {
                const client = fakeClients.find(client => client.id === clientId)
                if (client) client.type_id = clientType;
                resolve({ status: 'Client type updated'});
            } else {
                throw new Error('Client not found');
            }
        }, 1000);
    });
}

export async function updateClientMessenger(clientId: number, messangerId: number): Promise<StatusResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeClients.findIndex(client => client.id === clientId);
            if (index !== -1) {
                fakeClients[index].messanger_id = messangerId;
                resolve({ status: 'Messenger updated'});
            } else {
                resolve({ status: 'Messenger not updated'});
            }
        }, 1000);
    });
}

export async function getAllClients(params: PaginationRequestParams): Promise<ClientPaginationResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakePaginationResponse(fakeClients, params.page || 1, params.limit || 10));
        }, 1000);
    });
}

export async function searchClients(params: ClientSearchParams): Promise<Client[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredClients = fakeClients.filter(client =>
                params.fields.includes('phone') && client.phone_number.includes(params.searchString) ||
                params.fields.includes('name') && client.name.includes(params.searchString)
            );
            resolve(filteredClients);
        }, 1000);
    });
}

export async function getClientsWithUnselectedType(): Promise<Client[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeClients.filter(client => client.type_id === null));
        }, 1000);
    });
}

export async function getClientsWithTelegramError(): Promise<Client[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeClients.filter(item => item.chat_id === null));
        }, 1000);
    });
}

export async function getLastClients(count: number): Promise<Client[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeClients.slice(0, count));
        }, 1000);
    });
}

export async function getAllFilteredClients(complexObject: ClientsComplexObjectRequest): Promise<ClientPaginationResponse> {
     return new Promise((resolve) => {
        setTimeout(() => {
            let filteredClients = [...fakeClients];

            if (complexObject.type_id !== undefined) filteredClients = filteredClients.filter(client => client.type_id === complexObject.type_id);
            if (complexObject.tg_error) filteredClients = filteredClients.filter(client => client.messanger_id === 2 && client.chat_id === null);
            if (complexObject.search_type && complexObject.search_string && complexObject.search_string !== '') {
                filteredClients = filteredClients.filter(client =>
                    String(client[complexObject.search_type as keyof Client]).toLowerCase().includes(complexObject.search_string!.toLowerCase())
                );
            }

            resolve(fakePaginationResponse(filteredClients, complexObject.page || 1, complexObject.limit || 10));
        }, 1000);
    });
}

// MESSAGES

export async function addMessage(messageData: MessageData): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newMessage = {...messageData, id: nextFakeMessageId()} as Message;
            fakeMessages.unshift(newMessage);
            resolve(newMessage.id);
        }, 1000);
    });
}

export async function getMessageById(messageId: number): Promise<Message> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const message = fakeMessages.find(message => message.id === messageId);
            if (message)
                resolve(message);
            else
                throw new Error('Message not found');
        }, 1000);
    });
}

export async function updateMessage(messageId: number, messageData: MessageData): Promise<Message> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeMessages.findIndex(message => message.id === messageId);
            if (index !== -1) {
                fakeMessages[index] = {...fakeMessages[index], ...messageData};
                resolve(fakeMessages[index]);
            } else {
                throw new Error('Message not found');
            }
        }, 1000);
    });
}

export async function deleteMessageById(messageId: number): Promise<Message> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeMessages.findIndex(message => message.id === messageId);
            if (index !== -1) {
                const [deletedMessage] = fakeMessages.splice(index, 1);
                resolve(deletedMessage);
            } else {
                throw new Error('Message not found');
            }
        }, 1000);
    });
}

export async function sendDelayedMessage(messageId: number): Promise<StatusResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({status: 'success'});
        }, 1000);
    });
}

export async function sendMessageNow(message: MessageData): Promise<StatusResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({status: 'success'});
        }, 1000);
    });
}

export async function getAllMessages(): Promise<Message[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeMessages);
        }, 1000);
    });
}

export async function getAllMessagesWithPagination(params: PaginationRequestParams): Promise<MessagePaginationResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakePaginationResponse(fakeMessages, params.page || 1, params.limit || 10));
        }, 1000);
    });
}

export async function getNearestMessages(count: number): Promise<Message[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeMessages.slice(0, count)); // Возвращаем первые сообщения в качестве ближайших
        }, 1000);
    });
}

export async function searchMessages(object: MessageSearchObject): Promise<Message[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredMessages = fakeMessages.filter(message =>
                (!object.string || message.message_text.includes(object.string)) &&
                (!object.date_from || message.sending_date >= object.date_from) &&
                (!object.date_to || message.sending_date <= object.date_to)
            );
            resolve(filteredMessages);
        }, 1000);
    });
}

export async function getMessagesByRecipientType(recipientTypeId: number): Promise<Message[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeMessages.filter(message => message.recipient_type_id === recipientTypeId));
        }, 1000);
    });
}

export async function getAllFilteredMessages(complexObject: MessagesComplexObjectRequest): Promise<MessagePaginationResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredMessages = [...fakeMessages];

            if (complexObject.type_id !== undefined) {
                filteredMessages = filteredMessages.filter(message => message.recipient_type_id === complexObject.type_id);
            }
            if (complexObject.date_from !== undefined) {
                filteredMessages = filteredMessages.filter(message => message.sending_date >= complexObject.date_from!);
            }

            if (complexObject.date_to !== undefined) {
                filteredMessages = filteredMessages.filter(message => message.sending_date <= complexObject.date_to!);
            }

            if (complexObject.search_string && complexObject.search_string !== '') {
                filteredMessages = filteredMessages.filter(message =>
                    message.message_text.toLowerCase().includes(complexObject.search_string!.toLowerCase())
                );
            }

            resolve(fakePaginationResponse(filteredMessages, complexObject.page || 1, complexObject.limit || 10));
        }, 1000);
    });
}

// MESSAGE SAMPLE

export async function addSampleMessage(messageData: SampleMessageData): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newSampleMessage = {...messageData, id: nextFakeSampleMessageId()} as SampleMessage;
            fakeSampleMessages.unshift(newSampleMessage);
            resolve(newSampleMessage.id);
        }, 1000);
    });
}

export async function getSampleMessageById(messageId: number): Promise<SampleMessage> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const sampleMessage = fakeSampleMessages.find(message => message.id === messageId);
            if (sampleMessage) {
                resolve(sampleMessage);
            } else
                throw new Error('Message not found');
        }, 1000);
    });
}


export async function getAllSampleMessages(): Promise<SampleMessage[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeSampleMessages);
        }, 1000);
    });
}

export async function updateSampleMessage(messageId: number, messageData: SampleMessageData): Promise<SampleMessage> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeSampleMessages.findIndex(message => message.id === messageId);
            if (index !== -1) {
                const oldMessage = {...fakeSampleMessages[index]};
                fakeSampleMessages[index] = {...fakeSampleMessages[index], ...messageData};
                resolve(oldMessage);
            } else {
                throw new Error('Message not found');
            }
        }, 1000);
    });
}

export async function deleteSampleMessageById(messageId: number): Promise<SampleMessage> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = fakeSampleMessages.findIndex(message => message.id === messageId);
            if (index !== -1) {
                const [deletedMessage] = fakeSampleMessages.splice(index, 1);
                resolve(deletedMessage);
            } else {
                throw new Error('Message not found');
            }
        }, 1000);
    });
}

export async function getMessengerTypes(): Promise<MessengerType[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeMessengers);
        }, 1000);
    });
}

export async function getRecipientTypes(): Promise<ClientType[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeClientTypes);
        }, 1000);
    });
}
