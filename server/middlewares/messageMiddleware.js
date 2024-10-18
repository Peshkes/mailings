import {validateSendingDate, validateMessageText, validateMessageExists,
    validateMediaPath, validateMessageTheme} from '../validators/messageValidator.js';
import {validateClientType} from '../validators/clientValidator.js';

export async function validateMessageData(req, res, next) {
    const {message_text, recipient_type_id, media_path, sending_date, theme} = req.body;

    const isMessageTextValid = validateMessageText(message_text);
    if (!isMessageTextValid) {
        return res.status(400).json({status: 'Invalid message text'});
    }

    const isMediaPathValid = validateMediaPath(media_path);
    if (!isMediaPathValid) {
        return res.status(400).json({status: 'Invalid media path'});
    }

    const isThemeValid = validateMessageTheme(theme);
    if (!isThemeValid) {
        return res.status(400).json({status: 'Invalid theme'});
    }

    const isSendingDateValid = validateSendingDate(sending_date);
    if (!isSendingDateValid) {
        return res.status(400).json({status: 'Invalid sending date'});
    }

    req.validatedMessageData = {message_text, recipient_type_id, media_path, sending_date, theme};
    next();
}

export async function checkMessageExists(req, res, next) {
    const { id } = req.params;
    try {
        const messageValidation = await validateMessageExists(id);
        if (!messageValidation.valid) {
            return res.status(400).json({ status: messageValidation.message });
        }
        next();
    } catch (err) {
        return res.status(500).json({ status: 'Failed to validate message exists', error: err.message });
    }
}

export async function checkClientTypeExists(req, res, next) {
    const { id } = req.params;

    if (id == null) {
        return next();
    }

    try {
        const typeValidation = await validateClientType(id);
        if (!typeValidation.valid) {
            return res.status(400).json({ status: typeValidation.message });
        }
        next();
    } catch (err) {
        return res.status(500).json({ status: 'Failed to validate client type exists', error: err.message });
    }
}

export async function checkNameIsNotNull(req, res, next) {
    const { sample_name } = req.body;
    if (sample_name == null) {
        return res.status(400).json({ status: 'Name cannot be null' });
    }
    req.validatedMessageData.sample_name = sample_name;
    next();
}