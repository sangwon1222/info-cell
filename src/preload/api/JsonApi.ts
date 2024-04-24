interface TypeDBResponse {
  ok: boolean
  msg?: string
  data?: any[]
}

export default class JsonApi {
  private mIpcRenderer: any
  constructor(ipcRenderer) {
    this.mIpcRenderer = ipcRenderer
  }

  async connect(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_connect').then((result) => resolve(result))
    })
  }

  async getSceneList(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('getSceneList').then((result) => resolve(result))
    })
  }

  async getScene(sceneName: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('getScene', [sceneName]).then((result) => resolve(result))
    })
  }

  async getRsc(rsc: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('getRsc', [rsc]).then((result) => resolve(result))
    })
  }

  async uploadRsc({ path, name }: { path: string; name: string }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('uploadRsc', [{ path, name }]).then((result) => resolve(result))
    })
  }
}
