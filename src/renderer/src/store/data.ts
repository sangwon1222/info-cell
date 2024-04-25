import { reactive } from 'vue'

export const useDataStore = reactive({
  itemList: [],
  inventory: [],
  rscList: [],
  actorList: [],
  cacheRsc: {}
})
