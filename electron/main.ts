const electron = require('electron')
const path = require('path')
const isDev = require('electron')
const app = electron.app;
let browserWindow // : BrowserWindow | undefined;
function createWindow() {
   browserWindow = new electron.BrowserWindow({ width: 800, height: 600, show: false, name: 'eduGO!' });
   let url = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`;
   console.log(`Creating window. Target=${url}`);
   browserWindow.loadURL(url);
   browserWindow.once('ready-to-show', () => {
      if (browserWindow)
            browserWindow.show()
        else
            console.log("Got ready-to-show, but mainwindow is gone. Closed?")
   });
   browserWindow.on('closed', () => {
        browserWindow = undefined;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
   app.quit();
});
