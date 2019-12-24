// This is the Starting point of the app. It Basically creates the main.ejs with user data user registration form and a search 
// It has got some of the the icpMian event which have been passed from different js file
const electron= require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path');
const url = require('url');
const ejse = require('ejs-electron');
const { ipcMain } = require('electron');
var fs = require('fs'); 
const { dialog } = require('electron')
const { User, Post } = require('./config/sequelize')
const Sequelize = require('sequelize');
var mainWindow;

// initializing language
var lan = 'en'
ejse.data('la', lan)

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

ipcMain.on('change_lan',async (e, obj)=>{
    ejse.data('la', obj.selected)
    mainWindow.reload();
})

ipcMain.on('search',async (e, obj)=>{
    let window = mainWindow
    const Op = Sequelize.Op;
    const modalPath = path.join(__dirname, './views/main.ejs')
    let result = await User.findAll({ 
        where: {
            [Op.or]:[
                {
                    FirstName: {
                        [Op.like]: '%'+obj.key+'%'
                    }
                },
                {
                    LastName: {
                        [Op.like]: '%'+obj.key+'%'
                    }
                },
                {
                    FirstName:  obj.key
                }
            ]
        }
    })
    result.key = obj.key
    ejse.data('data', result)
    window.loadURL(modalPath)
})

ipcMain.on('open_update',async (e, obj)=>{
    const modalPath = path.join(__dirname, "./views/update.ejs");
    let result = await User.findByPk(obj.id)
    result.img = '../static/img/'+obj.id+'.png'
    ejse.data('data1', result)
    
    let win = new BrowserWindow({
        webPreferences: {
        nodeIntegration: true
        },
        alwaysOnTop: true,
        width: 600,
        height: 700
    });
    win.on("close", function() {
        win = null;
    });
    win.loadURL(modalPath);

    // let window = mainWindow
    // const modalPath = path.join(__dirname, './views/update.ejs')
    // let result = await User.findByPk(obj.id)
    // result.img = '../static/img/'+obj.id+'.png'
    // ejse.data('data1', result)
    
    // window.loadURL(modalPath)
})

ipcMain.on('Load_reg',async (e, obj)=>{
    const modalPath = path.join(__dirname, './views/reg.ejs')
    mainWindow.loadURL(modalPath)
})


ipcMain.on('load_main',async (e, obj)=>{
    const modalPath = path.join(__dirname, './views/main.ejs')
    mainWindow.loadURL(modalPath)
})


ipcMain.on('save_data', async (e, obj)=>{
    try{
        User.create(obj.body).then((u)=>{
            // Post.create({ body: "lalala", UserUserId: u.UserId }).then((ur)=>{
                var base64Data = obj.img.replace(/^data:image\/jpeg;base64,/, "");
                require("fs").writeFile("./static/img/"+ u.UserId +".png", base64Data, 'base64', function(err) {
                    if(err) console.log(err);
                })
                loadMain()
            // })
        })
    }catch(e){
        console.log(e)
    }
})


ipcMain.on('update_data', async (e, obj)=>{
    let FirstName = obj.FirstName
    let LastName = obj.LastName
    let Age = obj.Age
    User.update({
        FirstName,
        LastName,
        Age
    }, {
        where: {
            UserId:  obj.UserId
        }
    }).then(()=>{
        loadMain()
    })
})


ipcMain.on('delete_data', (e, obj)=>{
    //Deletes the image file with id.png    
    var filepath ="./static/img/"+obj.id+".png"// Previously saved path somewhere
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            if (err) {
                dialog.showMessageBox("msg","An error ocurred updating the file" + err.message);
                console.log(err);
                return;
            }
        });
    } else {
        dialog.showMessageBox("msg","This file doesn't exist, cannot delete");
    }

    // Deletes from db 
    const ID = Number(obj.id)
    User.destroy({
        where: {
            UserId: ID
        }
    }).then(()=>{
        loadMain()
    })
})


app.on("ready", () => {
    mainWindow = new BrowserWindow({ height: 800, width: 800, show: false , webPreferences: { nodeIntegration: true }})
    loadMain()
});


async function loadMain(){
    let re = await Post.findAll({ include:[User] })
    console.log(re)
    let resu = await User.findAll()
    ejse.data('data', resu)
    ejse.data('da', re)

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './views/main.ejs'),
        protocol: 'file',
        slashes: true
    }));
   
    mainWindow.once("ready-to-show", () => { mainWindow.show() })
}


app.on("window-all-closed", () => { app.quit() })


function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};
