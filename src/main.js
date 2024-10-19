import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import * as path from 'path';
import {fileURLToPath} from 'url';
import server from "../server/api/server.js";

let serverInstance;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const validateLicenseKey = async (key) => {
    const result = await fetch('https://licence-server.onrender.com/licence/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'ASKLDJsakldjskldjaskldjALKSDJASKLDJaskldjsakldjAKLSDJASKLDJASdalkdjas'
        },
        body: JSON.stringify({key})
    });
    const response = await result.json();
    console.log(response);
    return await response;
}

const electronAlert = async (title, message) => {
    await dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: title,
        message: message,
    });
}

async function gateCreateWindowWithLicense(createWindow) {
    const gateWindow = new BrowserWindow({
        resizable: false,
        frame: false,
        width: 420,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    gateWindow.loadFile(path.join(__dirname, './gate/gate.html'));

    ipcMain.on('GATE_SUBMIT', async (_event, {key}) => {
        const result = await validateLicenseKey(key);

        if (result.error) {
            electronAlert('Ошибка', result.error);
        } else {
            electronAlert('Успешно', "Ваша лицензия действительна до " + new Date(result.expired_at).toString())
                .then(() => {
                    gateWindow.close();

                    const HOST = 'localhost';
                    const PORT = process.env.PORT || 49152;

                    serverInstance = server.listen(PORT, () => {
                        console.log(`Server started at ${HOST}:${PORT}`);
                    })

                    createWindow(key)

                    app.on('activate', () => {
                        if (BrowserWindow.getAllWindows().length === 0) createWindow();
                    });
                });
        }
    })
}

const createWindow = (key) => {
    const mainWindow = new BrowserWindow({
        width: 1250,
        height: 900,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

    const timing = 6 * 60 * 60 * 1000;
    setTimeout(() => {
        setInterval(() => {
            validateLicenseKey(key)
                .then(res => {
                    if (res.error) {
                        electronAlert('Ошибка', res.error).then(() => {
                            serverInstance.close();
                            app.quit();
                        });
                    } else {
                        const nowTimestamp = Date.now();
                        if (res.expired_at - nowTimestamp <= 2 * 24 * 60 * 60 * 1000) {
                            const timeDifference = res.expired_at - nowTimestamp;
                            const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));

                            electronAlert('Внимание', `Осталось менее двух суток! Ваша лицензия истекает через ${hoursRemaining} часов`);
                        }
                    }
                })
        }, timing)
    }, timing)
};

ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {name: 'Images and Videos', extensions: ['jpg', 'png', 'mp4', 'mov']},
        ],
    });
    return result.filePaths;
});

ipcMain.on('restart', () => {
    serverInstance.close();
    app.relaunch();
    app.quit();
});

ipcMain.on('quit', () => {
    serverInstance.close();
    app.quit();
});


app.whenReady().then(() => gateCreateWindowWithLicense(createWindow));

app.on('window-all-closed', () => {
    serverInstance.close();
    if (process.platform !== 'darwin') {
        serverInstance.close();
        app.quit();
    }
});
