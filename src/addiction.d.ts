export {}

// preload.d.ts
declare global {
    interface Window {
        electron: {
            openFile: () => Promise<string[]>;
            ipcRenderer: {
                send: (channel: string) => void;
                receive: (channel: string, func: (...args: any[]) => void) => void;
            };
            process: typeof process;
        };
    }
}