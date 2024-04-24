import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import JsonApi from './api/JsonApi'

const jsonApi = new JsonApi(ipcRenderer)

interface TypeApi {
  [key: string]: any
}

declare global {
  interface Window {
    electron?: ElectronAPI
    api?: any
    jsonApi: TypeApi
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
    contextBridge.exposeInMainWorld('DBapi', jsonApi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI as ElectronAPI
  window.jsonApi = jsonApi as TypeApi
  window.openDevTool = { openDevTools: () => ipcRenderer.invoke('openDevTools') } as TypeApi
  window.version = { getVersion: () => ipcRenderer.invoke('getVersion') } as TypeApi
}
