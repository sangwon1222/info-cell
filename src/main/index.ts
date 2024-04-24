import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/64x64.png?asset'
import ApplicationMenu from './appMenu/menu'
import MeddleWare from './middleWare'
import tray from './tray/tray'
import JsonApi from './util/JsonApi'

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: true,
    title: 'INFO-CELL',
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    // frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  tray.init(mainWindow, icon)

  mainWindow.on('close', async function (event) {
    event.preventDefault()
    app.exit()
    // if (tray.quitMode) {
    //   app.exit()
    // } else {
    //   mainWindow.hide()
    // }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.moveTop()
    mainWindow.setKiosk(false)
    mainWindow.maximize()
    mainWindow.show()
    ApplicationMenu.init(mainWindow)
  })

  const mw = new MeddleWare(mainWindow.webContents)
  await mw.registMiddleware(JsonApi, 'jsonApi')

  ipcMain.handle('openDevTools', () => {
    mainWindow.webContents.openDevTools()
  })
  ipcMain.handle('getVersion', () => {
    return app.getVersion()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', async () => {
  console.log('window-all-closed', process.platform)
  if (process.platform === 'darwin') return
  app.quit()
})
