const { app, BrowserWindow , ipcMain,globalShortcut} = require('electron')
const electronLocalshortcut = require('electron-localshortcut')
let mainwindow;


app.whenReady().then(() => {


  mainwindow = new BrowserWindow({ 
    width: 370,//370
    height: 660,//660 
    resizable: false,
    fullscreen: false,
    maximizable: false,
    center:true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
      }
  });
  mainwindow.setMenu(null);
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

  })

  
const createWindow = () => {

  mainwindow.setMenuBarVisibility(false)
  mainwindow.loadFile('Screens/login.html')
  //mainwindow.webContents.openDevTools();
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




