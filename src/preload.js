const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    ipcRenderer: {
        send: (channel) => ipcRenderer.send(channel),
        sendWithBody: (channel, body) => ipcRenderer.send(channel, body),
        receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
        on: (channel, func) => ipcRenderer.once(channel, (event, ...args) => func(...args))
    },
    process: process
});
