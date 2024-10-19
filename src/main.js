import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import server from "../server/api/server.js";

let serverInstance;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function gateCreateWindowWithLicense(createWindow) {
    const gateWindow = new BrowserWindow({
        // resizable: false,
        frame: false,
        width: 420,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
        },
    })

    gateWindow.loadFile(path.join(__dirname, './gate/gate.html'));

    ipcMain.on('GATE_SUBMIT', async (_event, { key }) => {
        console.log('sd')
        gateWindow.close()

        const HOST = 'localhost';
        const PORT = process.env.PORT || 49152;

        serverInstance = server.listen(PORT, () => {
            console.log(`Server started at ${HOST}:${PORT}`);
        })

        createWindow()

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    })
}

const createWindow = () => {
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
};

ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Images and Videos', extensions: ['jpg', 'png', 'mp4', 'mov'] },
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
        app.quit();
    }
});
