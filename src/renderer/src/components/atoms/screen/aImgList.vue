<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'
import { map } from 'lodash-es'
import { reactive } from 'vue'

const props = withDefaults(defineProps<{ imgPos: any }>(), {
  imgPos: []
})
const state = reactive({
  drag: false,
  dragImg: { index: -1, id: '' }
})
const onPointerDown = (e, index: number, id: string) => {
  console.log(e)
  e.stopPropagation()
  e.preventDefault()
  state.drag = true
  state.dragImg = { index, id }

  const imgTagList = document.getElementsByTagName('img')
  map(imgTagList, (e: HTMLImageElement) => {
    const index = e.id == id ? '2' : '1'
    e.style.zIndex = index
  })
}
const cancelDrag = (e?) => {
  e?.stopPropagation()
  e?.preventDefault()
  state.drag = false
  state.dragImg = { index: -1, id: '' }
}
const onPointerMove = (e) => {
  e.stopPropagation()
  e.preventDefault()
  const { index, id } = state.dragImg
  const target = document.getElementById(id)
  if (!target) return cancelDrag()

  const x = Math.round(e.x)
  const y = Math.round(e.y)

  target.style.top = `${y}px`
  target.style.left = `${x}px`
  useSceneStore.event.img[index].x = x
  useSceneStore.event.img[index].y = y
}
</script>

<template>
  <div
    class="absolute top-0 left-0 !w-[1280px] !h-[720px]"
    @pointerup="cancelDrag($event)"
    @pointerleave="cancelDrag($event)"
    @pointermove="state.drag ? onPointerMove($event) : null"
  >
    <img
      v-for="(v, i) in useSceneStore.gameScreen.actor"
      :id="`${i}-${v.id}`"
      :key="`${i}-${v.id}`"
      :src="v.data"
      :alt="`${i}-${v.id}-img`"
      class="absolute -translate-x-1/2 -translate-y-1/2 h-fit w-fit animate-fadeIn"
      :style="`top:${props.imgPos[i].y}px;left:${props.imgPos[i].x}px`"
      @pointerdown="onPointerDown($event, i, `${i}-${v.id}`)"
    />
  </div>
</template>
