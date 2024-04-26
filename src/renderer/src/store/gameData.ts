import { reactive } from 'vue'

export const useGameDataStore = reactive({
  examine: [],
  move: [],
  talk: [],
  use: [],
  chat: '',
  actor: ''
})
