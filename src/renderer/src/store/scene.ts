import { reactive } from 'vue'

export const useSceneStore: TypeSceneStore = reactive({
  sceneName: '',
  place: { name: '', src: '' },
  eventList: [],
  event: { type: '', actor: '', chat: [], placeId: -1, img: [] },
  saveData: [],
  editMode: false,
  currentSceneIndex: 0
})
