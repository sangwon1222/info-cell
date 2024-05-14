import App from '@/app'
import { useLayoutStore } from '@/store/loading'
import { useRscDataStore } from '@/store/rscData'
import { useSceneStore } from '@/store/scene'
import jsonApi from '@/util/jsonApi'
import { cloneDeep } from 'lodash-es'
import * as PIXI from 'pixi.js'
import { useToast } from 'vue-toastification'
const toast = useToast()

export const downloadRsc = async () => {
  const { ok, data } = await jsonApi.downloadRsc()
  return { ok, data }
}

export const getItemList = async () => {
  const itemData = await jsonApi.getItemList()
  if (itemData.ok) useRscDataStore.itemList = itemData.data
}
export const getInventory = async () => {
  const inventoryData = await jsonApi.getInventoryData()
  if (inventoryData.ok) useRscDataStore.inventory = inventoryData.data
}

export const uploadActor = ({ src, name }: { src: string; name: string }) => {
  App.getHandle.getScene.addActor(name)
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
export const getRsc = async (src: string) => {
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
    console.warn('renderer/src.util/common/getImgData()')
    console.error(e)
    return null
  }
}

export const prev = async () => {
  console.log('util/index.ts => prev()')
  const prevIndex = useSceneStore.eventIndex - 1
  const prevData = useSceneStore.list[prevIndex]
  if (prevData) {
    useSceneStore.data = cloneDeep(prevData)
    useSceneStore.eventIndex = prevIndex
    await setGameData()
  }
}
export const next = async () => {
  console.log('util/index.ts => next()')
  const nextIndex = useSceneStore.eventIndex + 1
  const nextData = useSceneStore.list[nextIndex]
  if (nextData) {
    useSceneStore.data = cloneDeep(nextData)
    useSceneStore.eventIndex = nextIndex
    await setGameData()
  }
}

export const setGameData = async () => {
  console.log('util/index.ts => setGameData()')
  const idx = useSceneStore.eventIndex
  const list = cloneDeep(useSceneStore.list)
  useSceneStore.data = list[idx]
  switch (useSceneStore.data.type) {
    case 'interaction':
      console.error('interaction')
      break
    case 'chat':
      console.error('chat')
      break
  }

  App.getHandle.getScene.startEvent()
}

interface TypeSceneData {
  eventList: any[]
  sceneName: string
}
export const setSceneData = async ({ eventList, sceneName }: TypeSceneData) => {
  console.log('util/index.ts => setSceneData()')
  if (eventList.length > 0 && sceneName) {
    useSceneStore.list = eventList
    useSceneStore.sceneName = sceneName
    useSceneStore.eventIndex = 0
    useSceneStore.data = eventList[0]
    await setGameData()
  } else {
    useSceneStore.list = []
    useSceneStore.data = {}
    useSceneStore.sceneName = ''
    useSceneStore.eventIndex = 0
    toast.error('조회 실패')
  }
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
