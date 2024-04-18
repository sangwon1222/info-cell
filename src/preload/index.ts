import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import DBApi from './api/DBApi'

const DBapi = new DBApi(ipcRenderer)

interface TypeApi {
  [key: string]: any
}

declare global {
  interface Window {
    electron?: ElectronAPI
    api?: any
    DBapi: TypeApi
    Serialapi: TypeApi
    TCPapi: TypeApi
    openDevTool: TypeApi
    version: TypeApi
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('openDevTool', {
      openDevTools: () => ipcRenderer.invoke('openDevTools')
    })
    contextBridge.exposeInMainWorld('version', {
      getVersion: () => ipcRenderer.invoke('getVersion')
    })
    contextBridge.exposeInMainWorld('DBapi', DBapi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI as ElectronAPI
  window.DBapi = DBapi as TypeApi
  window.openDevTool = { openDevTools: () => ipcRenderer.invoke('openDevTools') } as TypeApi
  window.version = { getVersion: () => ipcRenderer.invoke('getVersion') } as TypeApi
}
