window.addEventListener('DOMContentLoaded', () => {
    const gate = document.getElementById('license-gate')

    gate.addEventListener('submit', async event => {
        event.preventDefault()
        const data = new FormData(gate)
        const key = data.get('key')
        console.log(key);
        window.electron.ipcRenderer.sendWithBody('GATE_SUBMIT', { key });
    })
})