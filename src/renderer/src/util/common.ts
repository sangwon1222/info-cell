import { useGameDataStore } from '@/store/gameData'
import { useLayoutStore } from '@/store/loading'
import { useRscDataStore } from '@/store/rscData'
import { useSceneStore } from '@/store/scene'
import jsonApi from '@/util/jsonApi'
import { cloneDeep, find } from 'lodash-es'
import { useToast } from 'vue-toastification'
const toast = useToast()

export const updateActorList = async () => {
  const actorData = await jsonApi.getActorList()
  if (actorData.ok) useRscDataStore.actorList = actorData.data
}
export const updateItemList = async () => {
  const itemData = await jsonApi.getItemList()
  if (itemData.ok) useRscDataStore.itemList = itemData.data
}
export const updateRscList = async () => {
  const actorData = await jsonApi.getRscList()
  if (actorData.ok) useRscDataStore.rscList = actorData.data
}
export const updateInventory = async () => {
  const inventoryData = await jsonApi.getInventoryData()
  if (inventoryData.ok) useRscDataStore.inventory = inventoryData.data
}

export const uploadActor = ({ src, name }: { src: string; name: string }) => {
  useRscDataStore.cacheRsc[name] = src
}

export const uploadBg = (src: string) => {
  // state.place.src = src
}

export const resetData = {
  id: -1,
  data: '',
  src: '',
  name: '',
  start: { x: 0, y: 0 },
  x: 0,
  y: 0
}
export const getPlaceData = async (id: number) => {
  try {
    const searchRsc = find(useRscDataStore.rscList, (rsc) => rsc.id == id)

    const cache = useRscDataStore.cacheRsc[searchRsc.src]

    if (cache) {
      useSceneStore.gameScreen.place = cache
      return
    }

    if (!searchRsc.src) {
      toast.error(`db/json/data/rscList.json 확인 필요 [ ${searchRsc.src} ] 없음 `)
      useSceneStore.gameScreen.place = resetData
      return
    }

    const { ok, data } = await jsonApi.getRsc(searchRsc.src)
    if (ok) {
      useRscDataStore.cacheRsc[searchRsc.src] = {
        id: searchRsc.id,
        name: searchRsc.name,
        src: searchRsc.src,
        data,
        start: { x: 0, y: 0 },
        x: 0,
        y: 0
      }
      useSceneStore.gameScreen.place = useRscDataStore.cacheRsc[searchRsc.src]
    } else {
      toast.error(`[ ${searchRsc.src} ] 로딩 실패 `)
      useSceneStore.gameScreen.place = resetData
    }
  } catch (e) {
    console.warn('renderer/src.util/common/getPlaceData()')
    console.error(e)
    useSceneStore.gameScreen.place = resetData
  }
}

export const resetInteraction = async (imgDataList: TypeRsc[]) => {
  useGameDataStore.examine = []
  useGameDataStore.move = []
  useGameDataStore.talk = []
  useGameDataStore.use = []
}

export const getActorData = async (imgDataList: TypeRsc[]) => {
  const list = [...imgDataList]
  if (!list?.length) {
    useSceneStore.gameScreen.actor = []
    return
  }
  try {
    useSceneStore.gameScreen.actor = []
    const actorList = []
    for (let i = 0; i < list.length; i++) {
      const imgList = cloneDeep(list[i])
      const id = imgList.id
      const searchRsc = find([...useRscDataStore.rscList], (rsc) => rsc.id == id)
      const cache = useRscDataStore.cacheRsc[searchRsc.src]

      if (cache) {
        actorList.push({ ...imgList, data: cache })
        continue
      }
      if (!searchRsc.src) {
        toast.error('')
        continue
      }

      const { ok, data } = await jsonApi.getRsc(searchRsc.src)
      if (ok) {
        useRscDataStore.cacheRsc[searchRsc.src] = data
        actorList.push({ ...imgList, data })
      } else {
        delete useRscDataStore.cacheRsc[searchRsc.src]
        continue
      }
    }
    useSceneStore.gameScreen.actor = actorList
  } catch (e) {
    console.warn('renderer/src.util/common/getActorData()')
    console.error(e)
    useSceneStore.gameScreen.actor = []
  }
}

export const next = async () => {
  const nextIndex = useSceneStore.eventIndex + 1
  const nextData = useSceneStore.eventList[nextIndex]
  if (!nextData) return

  useSceneStore.eventIndex += 1
  await setGameData()
}

export const setGameData = async () => {
  const idx = useSceneStore.eventIndex
  const data = cloneDeep(useSceneStore.eventList[idx])
  const { type } = useSceneStore.eventList[idx]
  switch (type) {
    case 'interaction':
      useGameDataStore.examine = data.examine
      break
    case 'chat':
      useGameDataStore.examine = []
      break
  }
  useSceneStore.event = data
  await getPlaceData(useSceneStore.event.placeId)
  await getActorData(useSceneStore.event.img)
}

interface TypeSceneData {
  eventList: TypeInterActiveEvents | TypeChatEvents[]
  sceneName: string
}
export const setSceneData = async ({ eventList, sceneName }: TypeSceneData) => {
  useGameDataStore.chat = ''
  useGameDataStore.actor = ''
  useSceneStore.eventList = eventList
  useSceneStore.sceneName = sceneName
  useSceneStore.eventIndex = 0

  useSceneStore.event = eventList[0]

  await setGameData()
}

export const save = async () => {
  const { event, eventList } = useSceneStore
  if (!eventList) return toast.error('씬이 없습니다.')
  if (!event.type) return toast.error('이벤트가 없습니다.')

  useLayoutStore.isLoading = true
  const { msg } = await jsonApi.updateSceneData()
  toast.info(msg)
  useLayoutStore.isLoading = false
}
