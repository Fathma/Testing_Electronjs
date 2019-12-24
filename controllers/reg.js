const { ipcRenderer } = require('electron');
const Joi = require('joi')
const { dialog } = require('electron').remote


const Reg = Joi.object().keys({
    FirstName: Joi.string().trim().required(),
    LastName: Joi.string().trim().required(),
    Age: Joi.string().trim().required()
})


// registration form submit
const notifyBtn = document.getElementById('formS')
notifyBtn.addEventListener('submit', async function(event) {
  event.preventDefault()
  let body={
    FirstName: document.getElementById("firstname").value,
    LastName: document.getElementById("lastname").value,
    Age: document.getElementById("age").value
  }

  Joi.validate(body, Reg, (err, result)=>{
    if(err){
      console.log({err})
      
    }else{
      let img = document.getElementById("test").value
      ipcRenderer.send('save_data', { body, img })
    }
  })
 
})