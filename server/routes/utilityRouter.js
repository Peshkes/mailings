import express from 'express';
import {
    getRecipientTypes,
    getMessengerTypes,
    updateSettings,
    getSettings,
    updateRecipientTypes
} from "../services/utilityService.js";
import emitter from "../api/emmiter.js";
const router = express.Router();

router.get('/recipient-types', async (req, res) => {
    try {
        const types = await getRecipientTypes();
        if (types) {
            res.status(200).json(types);
        } else {
            res.status(404).json({status: 'Types not found'});
        }
    } catch (err) {
        res.status(500).json({status: 'Failed to find types: ' + err.message});
    }
});

router.put('/recipient-types', async (req, res) => {
    try {
        await updateRecipientTypes(req.body);
        emitter.emit('update', 'recipient-types');
        res.status(200).json({status: 'Types updated'});
    } catch (err) {
        res.status(500).json({status: 'Failed to update types: ' + err.message});
    }
});

router.get('/messenger-types', async (req, res) => {
    try {
        const types = await getMessengerTypes();
        if (types) {
            res.status(200).json(types);
        } else {
            res.status(404).json({status: 'Types not found'});
        }
    } catch (err) {
        res.status(500).json({status: 'Failed to find types: ' + err.message});
    }
});

router.get('/settings', async (req, res) => {
    try {
        const settings = await getSettings();
        if (settings) {
            res.status(200).json(settings);
        } else {
            res.status(404).json({status: 'Settings not found'});
        }
    } catch (err) {
        res.status(500).json({status: 'Failed to find settings: ' + err.message});
    }
});

router.put('/settings', async (req, res) => {
    try {
         const status = await updateSettings(req.body);
         res.status(200).json(status);
    } catch (err) {
        res.status(500).json({status: 'Failed to update settings: ' + err.message});
    }
})
export default router;