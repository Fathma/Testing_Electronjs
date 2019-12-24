// this js file is responsible for all the actions associated with update.ejs 
const { ipcRenderer } = require('electron');
const { User } = require('../config/sequelize')
// deletedata 
function deletedata(id) {
    ipcRenderer.send('delete_data', {id})
}

// this redirects the action to ipcMian
function updatedatapage(id){
    ipcRenderer.send('open_update', {id})
}




