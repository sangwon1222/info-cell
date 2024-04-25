import { useDataStore } from '@/store/data'
import { find } from 'lodash-es'
import jsonApi from './jsonApi'

export const groupLog = (ok: boolean, label: string, ary: string[]) => {
  const color = ok ? 'color:#000000; background: #5eead4;' : 'color:#fff; background: #ef4444;'
  const subColor = ok ? 'color:#ffffff; background: #35796e;' : 'color:#fff; background: #7b1616;'
  const style = 'padding: 4px; '

  console.groupCollapsed(`%c ${label}`, `${style} ${color}`)
  for (let i = 0; i < ary.length; i++) {
    if (ary[i]) console.log(`%c ${ary[i]}`, `${style}  ${subColor}`)
  }
  console.groupEnd()
}

export const cmdLog = (label: string, ary: string[]) => {
  console.groupCollapsed(`%c ${label}`, `padding: 4px; background: #bcbcbc; color: #000000;`)
  for (let i = 0; i < ary.length; i++) {
    console.log(`%c ${ary[i]}`, `padding: 4px; background: #000000; color: #ffffff;`)
  }
  console.groupEnd()
}

export const updateActorList = async () => {
  const actorData = await jsonApi.getActorList()
  if (actorData.ok) useDataStore.actorList = actorData.data
}
export const updateItemList = async () => {
  const itemData = await jsonApi.getItemList()
  if (itemData.ok) useDataStore.itemList = itemData.data
}
export const updateRscList = async () => {
  const actorData = await jsonApi.getRscList()
  if (actorData.ok) useDataStore.rscList = actorData.data
}
export const updateInventory = async () => {
  const inventoryData = await jsonApi.getInventoryData()
  if (inventoryData.ok) useDataStore.inventory = inventoryData.data
}

export const getRscData = async (idList: number[]) => {
  try {
    for (let i = 0; i < idList.length; i++) {
      const id = idList[i]
      const seactRsc = find(useDataStore.rscList, (rsc) => rsc.id == id)

      if (useDataStore.cacheRsc[seactRsc.name]) continue

      const { ok, data } = await jsonApi.getRsc(seactRsc.src)
      if (ok) {
        useDataStore.cacheRsc[seactRsc.name] = { id: seactRsc.id, name: seactRsc.name, src: data }
        return { src: data, name: seactRsc.name }
      } else {
        return { src: '', name: '' }
      }
    }
  } catch (e) {
    return { src: '', name: '' }
  }
}
