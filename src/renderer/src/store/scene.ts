import { reactive } from 'vue'

export const useSceneStore: any = reactive({
  list: [],
  data: {
    type: 'chat',
    isShow: true,
    isComplete: false,
    condition: false,
    actor: '',
    chat: '',
    place: '',
    placeName: '',
    img: []
  },
  eventIndex: 0,
  sceneName: ''
})
