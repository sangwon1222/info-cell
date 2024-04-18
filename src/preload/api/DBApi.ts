interface TypeDBResponse {
  ok: boolean
  msg?: string
  data?: any[]
}

export default class DBapi {
  private mIpcRenderer: any
  constructor(ipcRenderer) {
    this.mIpcRenderer = ipcRenderer
  }
  async connectDB(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_connectDB').then((result) => resolve(result))
    })
  }

  async disconnect() {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('_disconnectDB').then(({ ok, msg }) => resolve({ ok, msg }))
    })
  }

  async getData(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('getData').then((result) => resolve(result))
    })
  }

  async searchData(searchParams: {
    sceneIdx?: string
    place?: string
    img?: string
  }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('searchData', [searchParams]).then((result) => resolve(result))
    })
  }

  async update(sceneData: { [key: string]: string | number }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('update', [sceneData]).then((result) => resolve(result))
    })
  }

  async insert(sceneData: { [key: string]: string | number }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('insert', [sceneData]).then((result) => resolve(result))
    })
  }

  async deleteAll(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('deleteAll').then((result) => resolve(result))
    })
  }

  async readTxt(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      this.mIpcRenderer.invoke('readTxt').then(({ ok, msg, data }) => resolve({ ok, msg, data }))
    })
  }

  async updateTxt({
    host,
    port,
    antenna,
    buzzer,
    powerGain,
    com,
    baudRate,
    byteLength,
    stopCount,
    againCount
  }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const params = {
        host,
        port,
        antenna,
        buzzer,
        powerGain,
        com,
        baudRate,
        byteLength,
        stopCount,
        againCount
      }
      this.mIpcRenderer.invoke('updateTxt', [params]).then((result) => resolve(result))
    })
  }
}
