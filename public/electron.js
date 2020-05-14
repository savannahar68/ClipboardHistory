const electron = require("electron");
const path = require("path");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");

const app = electron.app;
const dialog = electron.dialog;
const clipboard = electron.clipboard;
const globalShortcut = electron.globalShortcut;
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;
const { exec } = require("child_process");

const ITEM_MAX_LENGTH = 100;
var STACK_SIZE = 10;

function addToStack(item, stack = []) {
  if (item) {
    var index = stack.indexOf(item);
    if (index !== -1) stack.splice(index, 1);
    return [item].concat(
      stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack
    );
  } else {
    return stack;
  }
}

function formatItem(item) {
  return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH) + "..."
    : item;
}

function formatMenuTemplateForStack(clipboard, stack) {
  let contextMenu = null;
  if (stack.length !== 0) {
    contextMenu = stack.map((item, i) => ({
      label: `${formatItem(item)}`,
      click: (_) => clipboard.writeText(item),
      accelerator: `CmdOrCtrl+Alt+${i + 1}`,
      type: "radio",
      checked: i === 0 ? true : false,
    }));
  } else {
    contextMenu = [{ label: "<Empty>", enabled: false }];
  }
  contextMenu.push({
    label: `Clipboard history limit (${STACK_SIZE} clips)`,
    type: "submenu",
    submenu: Menu.buildFromTemplate(submenuHistoryLimitTemplate()),
    id: "submenuHistoryLimit",
  });
  contextMenu.push({
    label: "Quit",
    click: () => {
      app.quit();
    },
  });
  return contextMenu;
}

function submenuHistoryLimitTemplate() {
  const limits = [10, 25, 50, 75, 100];

  return limits.map((limit) => {
    const checked = limit === STACK_SIZE;
    return {
      label: `${limit} clips`,
      click: () => {
        STACK_SIZE = limit;
        stack = stack.length >= STACK_SIZE ? stack.slice(0, STACK_SIZE) : stack;
        tray.setContextMenu(
          Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack))
        );
      },
      type: "radio",
      checked: checked,
    };
  });
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
  for (let i = 0; i < 5; ++i) {
    globalShortcut.register(`CmdOrCtrl+Alt+${i + 1}`, (_) => {
      clipboard.writeText(stack[i]);
    });
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, "tray.png"));
  tray.setToolTip("Clipboard History");
  //TODO : Add a limit option to tray

  tray.setContextMenu(
    Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack))
  );
}

function startMonitoringTray() {
  if (process.platform !== "linux") return;

  const monit = exec(`
    dbus-monitor --session "type='signal',interface='org.gnome.ScreenSaver'" |
    while read x; do
      case "$x" in 
        *"boolean true"*) echo SCREEN_LOCKED;;
        *"boolean false"*) echo SCREEN_UNLOCKED;;  
      esac
    done
  `);

  monit.stdout.on("data", (data) => {
    const out = data.toString().trim();
    if (out === "SCREEN_UNLOCKED") {
      tray.destroy();
      createTray();
    }
  });
}

//TOOD : Add a Quit button to tray
var win = null;
var tray = null;
let stack = [];

app.on("ready", (_) => {
  console.log("Ready");
  createTray();
  globalShortcut.unregisterAll();
  globalShortcut.register("CmdOrCtrl+L", () => {
    win = new BrowserWindow({
      width: 400,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    win.removeMenu();
    win.on("closed", (e) => {
      win = null;
    });

    win.on("window-all-closed", (e) => e.preventDefault());
    win.loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // if (isDev) {
    //   win.webContents.openDevTools();
    // }

    win.webContents.on("did-finish-load", () => {
      win.webContents.send("clipboardContents", stack);
    });
  });

  checkClipboardForChange(clipboard, (text) => {
    stack = addToStack(text, stack);
    tray.setContextMenu(
      Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack))
    );
    if (win !== null) {
      win.webContents.send("clipboardContents", stack);
    }
    //registerShortcuts(globalShortcut, clipboard, stack);
  });
});

app.on("window-all-closed", (e) => e.preventDefault());

app.on("will-quit", (_) => {
  globalShortcut.unregisterAll();
});

app.requestSingleInstanceLock();
app.on("second-instance", () => {
  dialog.showMessageBox({
    type: "info",
    title: "Clipboard History",
    message: "An instance of Clipboard History already open",
    buttons: ["Ok"],
  });
});

app.allowRendererProcessReuse = true;

ipcMain.handle("setClipboard", (events, args) => {
  clipboard.writeText(args.name);
  win.close();
});

//This will handle tray disappearing bug in linux
startMonitoringTray();
