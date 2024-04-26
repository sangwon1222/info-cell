import { reactive } from 'vue'

export const useRscDataStore = reactive({
  itemList: [],
  inventory: [],
  rscList: [],
  actorList: [],
  cacheRsc: {}
})
