window.addEventListener('DOMContentLoaded', () => {
    const gate = document.getElementById('license-gate');

    const savedKey = localStorage.getItem('licenseKey');
    if (savedKey) {
        document.getElementById('key').value = savedKey;
    }

    gate.addEventListener('submit', async event => {
        event.preventDefault();

        const data = new FormData(gate);
        const key = data.get('key');

        console.log(key);

        localStorage.setItem('licenseKey', key);

        window.electron.ipcRenderer.sendWithBody('GATE_SUBMIT', { key });
    });
});