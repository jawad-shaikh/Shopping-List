const { app, BrowserWindow, Menu, ipcMain } = require("electron");

let mainWindow;
let addWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile("index.html");
};

const createAddItemWindow = () => {
  addWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  addWindow.loadFile("addItem.html");
};

app.whenReady().then(() => {
  createMainWindow();

  mainWindow.on("close", function () {
    app.quit();
  });
});

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "add Item",
        click() {
          createAddItemWindow();
        },
      },
      {
        label: "clear all",
        accelerator: "Ctrl+C",
        click() {
          clearAllItems();
        },
      },
      {
        label: "Exit",
        accelerator: "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);

ipcMain.on("add-item", (event, item) => {
  mainWindow.webContents.send("add-item", item);
  addWindow.close();
});

const clearAllItems = () => {
  mainWindow.webContents.send("clear-all-items");
};
