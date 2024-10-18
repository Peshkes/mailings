const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    ipcRenderer: {
        send: (channel) => ipcRenderer.send(channel),
        receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    },
    process: process
});
