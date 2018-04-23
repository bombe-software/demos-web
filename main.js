const electron = require('electron')
const path = require('path');

const app = electron.app
const BrowserWindow = electron.BrowserWindow


let mainWindow

function createWindow() {
  //Crear y configurar ventana
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: false
    },
    icon: './favicon.ico',
    show: false
  })

  mainWindow.maximize();
  mainWindow.setMenu(null);

  //Correr demos dentro de electron
  const url = require('url');
  const express = require('express');
  const app = express();
  app.use(express.static(__dirname));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
  });
  const port = process.env.PORT || 9000;
  app.listen(port);
  mainWindow.loadURL(`http://localhost:${port}`);
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