import App from '@/app'
import { useGameDataStore } from '@/store/gameData'
import { useLayoutStore } from '@/store/loading'
import { useRscDataStore } from '@/store/rscData'
import { useSceneStore } from '@/store/scene'
import jsonApi from '@/util/jsonApi'
import * as PIXI from 'pixi.js'
import { cloneDeep, find, isNaN, xor } from 'lodash-es'
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
  App.getHandle.getScene.addActor(name)
}

export const uploadBg = (src: string) => {
  // state.place.src = src
}

export const getAlphaInImg = (sprite: PIXI.Sprite, x: number, y: number) => {
  const canvas = App.getHandle.renderer.extract.canvas(sprite)
  const localPos = sprite.toLocal(new PIXI.Point(x, y))
  const ctx = canvas.getContext('2d')
  const pixelData = ctx.getImageData(
    localPos.x + sprite.width / 2,
    localPos.y + sprite.height / 2,
    1,
    1
  ).data
  // 알파 값을 추정합니다.
  const alpha = pixelData[3] / 255 // 알파 값은 0에서 1 사이의 값으로 정규화됩니다.

  return !!alpha
}

/**
 * @description 탭이 안보일 때 => onHiddenTab()
 * @description 탭이 보일 때 => onViewTab()
 * */
export const registVisibleChange = () => {
  document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden
    if (isHidden) App.getHandle.onHiddenTab()
    if (!isHidden) App.getHandle.onViewTab()
  })
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
export const getPlaceData = async (src: string) => {
  try {
    const { ok, data } = await jsonApi.getRsc(src)
    if (ok) {
      return {
        src: src,
        data,
        start: { x: 0, y: 0 },
        x: 0,
        y: 0
      }
    } else {
      toast.error(`[ ${src} ] 로딩 실패 `)
      return resetData
    }
  } catch (e) {
    console.warn('renderer/src.util/common/getPlaceData()')
    console.error(e)
    return null
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
  } else {
    try {
      useSceneStore.gameScreen.actor = []
      const actorList = []
      for (let i = 0; i < list.length; i++) {
        const imgList = cloneDeep(list[i])
        const { src, start, x, y } = imgList
        const { name } = find([...useRscDataStore.rscList], (rsc) => rsc.src == src)
        actorList.push({ start, x, y, src, name })
      }

      useSceneStore.gameScreen.actor = actorList
    } catch (e) {
      console.warn('renderer/src.util/common/getActorData()')
      console.error(e)
      useSceneStore.gameScreen.actor = []
    }
  }
  App.getHandle.getScene.next()
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
  useSceneStore.gameScreen.place = await getPlaceData(useSceneStore.event.place)

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
  const { msg, data } = await jsonApi.updateSceneData()
  console.log(data)
  toast.info(msg)
  useLayoutStore.isLoading = false
}
