const electron = require("electron");
const path = require("path");

const app = electron.app;
const clipboard = electron.clipboard;
const globalShortcut = electron.globalShortcut;
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

const ITEM_MAX_LENGTH = 20;
const STACK_SIZE = 5;

function addToStack(item, stack = []) {
  return [item].concat(
    stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack
  );
}

function formatItem(item) {
  return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH) + "..."
    : item;
}

function formatMenuTemplateForStack(clipboard, stack) {
  return stack.map((item, i) => ({
    label: `Copy: ${formatItem(item)}`,
    click: (_) => clipboard.writeText(item),
    accelerator: `Cmd+Alt+${i + 1}`,
  }));
}

function checkClipboardForChange(clipboard, onChange) {
  let cache = clipboard.readText();
  let latest;
  setInterval((_) => {
    latest = clipboard.readText();
    if (latest !== cache) {
      cache = latest;
      onChange(cache);
    }
  }, 1000);
}

function registerShortcuts(globalShortcut, clipboard, stack) {
  globalShortcut.unregisterAll();
  for (let i = 0; i < STACK_SIZE; ++i) {
    globalShortcut.register(`CmdOrCtrl+Alt+${i + 1}`, (_) => {
      clipboard.writeText(stack[i]);
    });
  }
}

app.on("ready", (_) => {
  console.log("Ready");
  let stack = [];
  const tray = new Tray(path.join("src", "trayIcon.png"));
  //TOOD : Add a Quit button to tray
  //TODO : Add a limit option to tray
  tray.setContextMenu(
    Menu.buildFromTemplate([{ label: "<Empty>", enabled: false }])
  );

  globalShortcut.unregisterAll();
  globalShortcut.register("CmdOrCtrl+L", () => {
    let win = new BrowserWindow({ width: 400, height: 600 });
    win.removeMenu();
    win.webContents.openDevTools();
    win.on("closed", (e) => {
      win = null;
    });

    win.on("window-all-closed", (e) => e.preventDefault());

    //win.loadURL(`file://${__dirname}/index.html`);
    win.loadURL("http://localhost:3000/");
  });

  checkClipboardForChange(clipboard, (text) => {
    stack = addToStack(text, stack);
    tray.setContextMenu(
      Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack))
    );
    //registerShortcuts(globalShortcut, clipboard, stack)
  });
});

app.on("window-all-closed", (e) => e.preventDefault());

app.on("will-quit", (_) => {
  globalShortcut.unregisterAll();
});
