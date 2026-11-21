import {app, BrowserWindow} from 'electron';
import path from 'node:path';
import {registerItems} from './items';

function createWindow() {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    const devURL = process.env.VITE_DEV_SERVER_URL;
    if (devURL) {
        void window.loadURL(devURL);
    } else {
        void window.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    registerItems();
    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
