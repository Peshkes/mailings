import express from 'express';
const router = express.Router();
import { validateMessageData, checkMessageExists, checkClientTypeExists, checkNameIsNotNull }  from "../middlewares/messageMiddleware.js";
import { addMessage, getMessages, getMessageById, updateMessage, deleteMessage,
    searchMessages, getMessagesByRecipientType, getMessagesWithPaginationAndFilter,
    getUpcomingMailings, getFilteredMessages } from '../services/messageService.js';
import { getSample, addSample, getSamples, updateSample, deleteSample} from '../services/sampleMessageService.js';
import { sendDelayedMessageNow, sendMessageImmediately } from '../services/sendingService.js';

router.post('/send-now/:id', checkMessageExists, async (req, res) => {
    const { id } = req.params;
    try {
        await sendDelayedMessageNow(id);
        res.status(200).json({ status: 'Message sent immediately'});
    } catch (err) {
        res.status(500).json({ status: 'Failed to send message immediately: ' + err.message });
    }
});

router.post('/send-now', async (req, res) => {
    const { message_text, recipient_type_id, media_path } = req.body;
    try {
        await sendMessageImmediately(message_text, recipient_type_id, media_path);
        res.status(200).json({ status: 'Message sent immediately'});
    } catch (err) {
        res.status(500).json({ status: 'Failed to send message immediately: ' + err.message });
    }
});

// Маршруты для работы с выборками сообщений
router.get('/all', async (req, res) => {
    try {
        const messages = await getMessages();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve messages:' + err.message });
    }
});

router.get('/all/paginated', async (req, res) => {
    const { page = 1, limit = 10, type } = req.query;
    try {
        const messages = await getMessagesWithPaginationAndFilter({ page, limit, type });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve messages:' + err.message });
    }
});

router.get('/all/search', async (req, res) => {
    const { text, date_from, date_to } = req.query;
    try {
        const messages = await searchMessages(text, date_from, date_to);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ status: 'Failed to search messages:' + err.message });
    }
});

router.get('/all/full_filtered', async (req, res) => {
    const { page = 1, limit = 10, type_id, search_string, date_to, date_from } = req.query;
    try {
        const messages = await getFilteredMessages({ page, limit, type_id, search_string, date_to, date_from });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve messages: ' + err.message });
    }
});

router.get('/all/upcoming/:count', async (req, res) => {
    const { count } = req.params;
    try {
        const upcomingMailings = await getUpcomingMailings(count);
        res.status(200).json(upcomingMailings);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve upcoming mailings:' + err.message });
    }
});

router.get('/all/recipient-type/:id', checkClientTypeExists, async (req, res) => {
    const { id } = req.params;
    try {
        const messages = await getMessagesByRecipientType(id);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve messages: ' + err.message });
    }
});

// Маршруты для работы с образцами сообщений
router.post('/sample', validateMessageData, checkNameIsNotNull, async (req, res) => {
    const { sample_name, message_text, recipient_type_id, media_path, sending_date, theme } = req.body;
    try {
        const sample_id = await addSample(sample_name, message_text, recipient_type_id, media_path, sending_date, theme);
        res.status(200).json(sample_id);
    } catch (err) {
        res.status(500).json({ status: 'Failed to add sample: ' + err.message });
    }
});

router.put('/sample/:id', validateMessageData, checkNameIsNotNull, async (req, res) => {
    try {
        const sample = await updateSample(req.params.id, req.body);
        res.status(200).json(sample);
    } catch (err) {
        res.status(500).json({ status: 'Failed to update sample: ' + err.message });
    }
});

router.delete('/sample/:id', async (req, res) => {
    try {
        const sample = await deleteSample(req.params.id);
        res.status(200).json(sample);
    } catch (err) {
        res.status(500).json({ status: 'Failed to delete sample:' + err.message });
    }
});

router.get('/sample/all', async (req, res) => {
    try {
        const samples = await getSamples();
        res.status(200).json(samples);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve samples: ' + err.message });
    }
});

router.get('/sample/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sample = await getSample(id);
        res.status(200).json(sample);
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve sample:' + err.message });
    }
});



// Маршруты для работы с конкретными сообщениями (обновление, удаление)
router.put('/:id', checkMessageExists, validateMessageData, async (req, res) => {
    const { id } = req.params;
    const { message_text, recipient_type_id, media_path, sending_date, theme } = req.validatedMessageData;
    try {
        const message = await updateMessage(id, message_text, recipient_type_id, media_path, sending_date, theme);
        res.status(200).json({ status: 'Message updated successfully', message });
    } catch (err) {
        res.status(500).json({ status: 'Failed to update message: ' + err.message });
    }
});

router.delete('/:id', checkMessageExists, async (req, res) => {
    const { id } = req.params;
    try {
        const message = await deleteMessage(id);
        console.log(message)
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ status: 'Failed to delete message: ' + err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const message = await getMessageById(id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ status: 'Message not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'Failed to retrieve message: ' + err.message });
    }
});

router.post('/', validateMessageData, async (req, res) => {
    const { message_text, recipient_type_id, media_path, sending_date, theme } = req.validatedMessageData;
    try {
        const result = await addMessage(message_text, recipient_type_id, media_path, sending_date, theme);
        res.status(201).json(result.id);
    } catch (err) {
        res.status(500).json({ status: 'Failed to add message: ' + err.message });
    }
});


export default router;

