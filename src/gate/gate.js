window.addEventListener('DOMContentLoaded', () => {
    const gate = document.getElementById('license-gate');
    const loader = document.getElementById('loader');

    const savedKey = localStorage.getItem('licenseKey');

    if (savedKey) {
        window.electron.ipcRenderer.sendWithBody('GATE_SUBMIT', { key: savedKey });
        loader.style.display = 'flex';
    }

    gate.addEventListener('submit', async event => {
        event.preventDefault();

        const data = new FormData(gate);
        const key = data.get('key');

        console.log(key);

        localStorage.setItem('licenseKey', key);

        loader.style.display = 'flex';
        window.electron.ipcRenderer.sendWithBody('GATE_SUBMIT', { key });
    });

    window.electron.ipcRenderer.on('GATE_BAD_RESPONSE', () => {
        document.getElementById('key').value = savedKey;
        loader.style.display = 'none';
    });
})