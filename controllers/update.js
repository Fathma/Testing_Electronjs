// this js file is responsible for all the actions associated with update.ejs 
const { ipcRenderer } = require('electron');
const { remote } = require("electron");

// update form submit
const updateBtn = document.getElementById('update')
updateBtn.addEventListener('submit', function(event) {
  let FirstName =  document.getElementById("firstname").value
  let LastName = document.getElementById("lastname").value
  let Age = document.getElementById("age").value
  let UserId = document.getElementById("_id").value
  ipcRenderer.send('update_data', { FirstName, LastName, Age, img, UserId })
})

//close button
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function(event) {
  var window = remote.getCurrentWindow();
  window.close();
});