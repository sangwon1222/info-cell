<script setup lang="ts" scoped>
import aInteractionBtn from '@/components/atoms/aInteractionBtn.vue'
import aChat from '@/components/atoms/screen/aChat.vue'
import { useSceneStore } from '@/store/scene'
import { next } from '@/util'
import { onMounted } from 'vue'
import { canvasInfo } from '@/util/canvas'
import { useLayoutStore } from '@/store/loading'
import App from '@/app'

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
    <a-interaction-btn
      :class="
        useSceneStore.editMode &&
        useSceneStore?.eventList[useSceneStore.eventIndex]?.type == 'interaction'
          ? ''
          : 'hidden'
      "
    />
    <canvas id="pixi-canvas" class="absolute top-0 left-0 !w-[1280px] !h-[720px] z-0" />
    <!-- <a-bg />
    <a-img-list :img-pos="state.imgPos" /> -->
    <a-chat />
  </div>
</template>
