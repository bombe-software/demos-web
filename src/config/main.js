const electron = require('electron')
const path = require('path');

const app = electron.app
const BrowserWindow = electron.BrowserWindow
let mainWindow;

function createWindow() {
  //Crear y configurar ventana
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true
    },
    icon: './build/favicon.ico',
    show: false
  })

  
  mainWindow.maximize();
  //mainWindow.setMenu(null);

  mainWindow.loadURL('file://' + __dirname + '/build/index.html');
  
  mainWindow.show();
  //Configurar cierre de ventana
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

//Crea la ventana una vez acabdo el metodo de configuracion
app.on('ready', createWindow)

// Configura el cierre de la ventana
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // Validacion para OSX
  if (mainWindow === null) {
    createWindow()
  }
})