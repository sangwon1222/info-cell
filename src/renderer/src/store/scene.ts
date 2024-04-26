import { reactive } from 'vue'

export const useSceneStore: TypeSceneStore = reactive({
  sceneName: '',
  gameScreen: {
    place: { id: -1, data: '', start: { x: 0, y: 0 }, x: 0, y: 0, name: '', src: '' },
    actor: []
  },
  eventList: [],
  event: {},
  saveData: [],
  editMode: false,
  eventIndex: 0
})

// gameScreen: {
//   place: { id: -1, data: '', start: { x: 0, y: 0 }, x: 0, y: 0, name: '', src: '' },
//   actor: [{ id: -1, data: '', start: { x: 0, y: 0 }, x: 0, y: 0, name: '', src: '' }]
// },
