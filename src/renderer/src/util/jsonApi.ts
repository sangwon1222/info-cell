import { useSceneStore } from '@/store/scene'

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
      const search = await window.jsonApi.getRsc(name)
      if (search.ok && !confirm('같은 이름의 리소스가 존재합니다. 덮어씌우겠습니까?')) return
      const result = await window.jsonApi.uploadRsc({ path, name })
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async getActorList() {
    try {
      const result = await window.jsonApi.getActorList()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
  async getItemList() {
    try {
      const result = await window.jsonApi.getItemList()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
  async getRscList() {
    try {
      const result = await window.jsonApi.getRscList()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
  async getInventoryData() {
    try {
      const result = await window.jsonApi.getInventoryData()
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async updateSceneData() {
    try {
      const { sceneName, event, eventIndex } = useSceneStore
      useSceneStore.eventList[eventIndex] = event
      console.log(useSceneStore.eventList)
      const result = await window.jsonApi.updateSceneData(
        sceneName,
        `{
          "script":${JSON.stringify(useSceneStore.eventList)}
        }
          `
      )
      return result
    } catch (e) {
      console.error(e)
      return e
    }
  }
}

export default new jsonApi()
