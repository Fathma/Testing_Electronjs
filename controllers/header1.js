// this js file is responsible for all the actions associated with navbar 

// deletedata 
function search() {
    var key = document.getElementById('key').value
    ipcRenderer.send('search', { key })
}

function loadReg(){
    ipcRenderer.send('Load_reg')
}

function loadMain(){
    ipcRenderer.send('load_main')
}

// registration form submit
const lan = document.getElementById('lan')
lan.addEventListener('change', async function(event) {
    var selected =  document.getElementById('lan').value
    ipcRenderer.send('change_lan', {selected})
})

