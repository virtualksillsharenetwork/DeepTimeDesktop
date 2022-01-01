const { app, BrowserWindow , ipcMain,globalShortcut} = require('electron')
const electronLocalshortcut = require('electron-localshortcut')
//var JavaScriptObfuscator = require('javascript-obfuscator');
let mainwindow;
//var fs = require('fs');





app.whenReady().then(() => {


    // fs.readFile('./ScreensBackend/designPage.js', "UTF-8", function(err, data) {
    //     if (err) {
    //         throw err;
    //     }
    
    //     // Obfuscate content of the JS file
    //     var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
        
    //     // Write the obfuscated code into a new file
    //     fs.writeFile('./ScreensBackend/designPagee.js', obfuscationResult.getObfuscatedCode() , function(err) {
    //         if(err) {
    //             return console.log(err);
    //         }
    //     });
    // });




  mainwindow = new BrowserWindow({ 
    width: 700,//330
    height: 600,//660 
    resizable: true,
    fullscreen: false,
    maximizable: false,
    center:true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
      }
  });
  //mainwindow.setMenu(null);
  createWindow();
  



  ipcMain.on("createIndexWindow", (event, arg) => {
    createIndexWindow();
  });
  ipcMain.on("createWindow", (event, arg) => {
    createWindow();
  });
  ipcMain.on("createTrackingWindow", (event, arg) => {
    createTrackingWindow();
  });
  ipcMain.on("gotoSelection", (event, arg) => {
    gotoSelection();
  });
  ipcMain.on("gotoLogin", (event, arg) => {
    gotoLogin();
  });

  })

  
const createWindow = () => {

  mainwindow.setMenuBarVisibility(false)
  mainwindow.loadFile('Screens/login.html')
  mainwindow.webContents.openDevTools();
  }



  function createIndexWindow() {
    mainwindow.setMenuBarVisibility(false)
    mainwindow.loadFile('Screens/index.html')
    //mainwindow.webContents.openDevTools();
    // childWindow.once("ready-to-show", () => {
    //   childWindow.show();
    // });
  }

  function createTrackingWindow() {
    mainwindow.setMenuBarVisibility(false)
    mainwindow.loadFile('Screens/designPage.html')
    //mainwindow.webContents.openDevTools();
    // childWindow.once("ready-to-show", () => {
    //   childWindow.show();
    // });
  }
    
  function gotoSelection() {
    mainwindow.setMenuBarVisibility(false)
    mainwindow.loadFile('Screens/index.html')
    //mainwindow.webContents.openDevTools();
    // childWindow.once("ready-to-show", () => {
    //   childWindow.show();
    // });
  }


  function gotoLogin() {
    mainwindow.setMenuBarVisibility(false)
    mainwindow.loadFile('Screens/login.html')
    //mainwindow.webContents.openDevTools();
    // childWindow.once("ready-to-show", () => {
    //   childWindow.show();
    // });
  }




