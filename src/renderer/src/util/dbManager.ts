interface TypeUserSetting {
  host: string
  port: number
  antenna: number
  buzzer: number
  powerGain: number
  com: string
  baudRate: number
  byteLength: number
  stopCount: number
  againCount: number
}

class DBmanager {
  async connectDB() {
    try {
      const { ok, msg, data } = await window.DBapi.connectDB()
      return { ok, msg, data }
    } catch (e) {
      return { ok: false, msg: e, data: [] }
    }
  }

  async getData() {
    try {
      const result = await window.DBapi.getData()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async searchData(searchParams: { sceneIdx?: string; place?: string; img?: string }) {
    try {
      const result = await window.DBapi.searchData(searchParams)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async update(sceneData: { [key: string]: string | number }) {
    try {
      const result = await window.DBapi.update(sceneData)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async insert(sceneData: { [key: string]: string | number }) {
    try {
      const result = await window.DBapi.insert(sceneData)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async deleteAll() {
    try {
      const result = await window.DBapi.deleteAll()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  // _____________________________________________________________

  async readFile(param) {
    try {
      const { ok, data, msg } = await window.DBapi.readFile(param)
      return { ok, data, msg }
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async getScene(sceneName: string) {
    try {
      const { ok, data, msg } = await window.DBapi.getScene(sceneName)
      return { ok, data, msg }
    } catch (e) {
      console.error(e)
      return e
    }
  }
  // _____________________________________________________________

  async readTxt() {
    try {
      const { ok, data, msg } = await window.DBapi.readTxt()
      return { ok, data, msg }
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async updateTxt(params: TypeUserSetting) {
    try {
      const { ok, msg } = await window.DBapi.updateTxt(params)
      return { ok, msg }
    } catch (e) {
      console.error(e)
      return e
    }
  }
}

export default new DBmanager()
