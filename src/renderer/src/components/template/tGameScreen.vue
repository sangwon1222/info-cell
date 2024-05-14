<script setup lang="ts" scoped>
import App from '@/app'
import aChat from '@/components/atoms/screen/aChat.vue'
import tBtnWrap from '@/components/template/tBtnWrap.vue'
import { useLayoutStore } from '@/store/loading'
import { useSceneStore } from '@/store/scene'
import { next } from '@/util'
import { canvasInfo } from '@/util/canvas'
import { onMounted } from 'vue'

const { backgroundColor, width, height } = canvasInfo
onMounted(async () => {
  useLayoutStore.isLoading = true

  const canvasElement = document.getElementById('pixi-canvas') as HTMLCanvasElement

  window['app'] = new App()
  await window['app'].init({
    background: backgroundColor,
    width,
    height,
    canvas: canvasElement
  })
  await window['app'].ready()

  useLayoutStore.isLoading = false
})

const onClick = async () => {
  if (useSceneStore.editMode) return
  await next()
}
</script>

<template>
  <div
    class="relative overflow-hidden flex flex-col justify-end !w-[1280px] !h-[720px] border-2 bg-black"
    :class="useSceneStore.editMode ? 'cursor-default' : 'cursor-pointer'"
    @click="onClick"
  >
    <t-btn-wrap v-if="useSceneStore?.data?.type == 'interaction'" />
    <canvas id="pixi-canvas" class="absolute top-0 left-0 !w-[1280px] !h-[720px] z-0" />
    <a-chat />
  </div>
</template>
