import { reactive } from 'vue'

export const useSceneStore: TypeSceneStore = reactive({
  sceneName: '',
  events: [],
  saveData: [],
  editMode: false
})
