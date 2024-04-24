class jsonApi {
  async connect() {
    try {
      const result = await window.jsonApi.connect()
      return result
    } catch (e) {
      return { ok: false, msg: e, data: [] }
    }
  }

  async getSceneList() {
    try {
      const result = await window.jsonApi.getSceneList()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async getScene(sceneName: string) {
    try {
      const result = await window.jsonApi.getScene(sceneName)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async getRsc(rscName: string) {
    try {
      const result = await window.jsonApi.getRsc(rscName)
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async uploadRsc({ path, name }: { path: string; name: string }) {
    try {
      const result = await window.jsonApi.uploadRsc({ path, name })
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
}

export default new jsonApi()
