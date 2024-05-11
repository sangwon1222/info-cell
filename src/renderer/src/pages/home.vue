<script setup lang="ts" scoped>
import tGameScreen from '@/components/template/tGameScreen.vue'
import { useSceneStore } from '@/store/scene'
import { onMounted } from 'vue'
onMounted(() => (useSceneStore.editMode = false))

const fullScreen = async () => {
  const el = document.getElementById('game-screen') as HTMLDivElement

  if (document?.fullscreenElement) {
    await closeFull()
    return
  }
  if (el.requestFullscreen) {
    await el.requestFullscreen()
  } else if (el.webkitRequestFullscreen) {
    /* Safari */
    await el.webkitRequestFullscreen()
  } else if (el.msRequestFullscreen) {
    /* IE11 */
    await el.msRequestFullscreen()
  }
}

const closeFull = async () => {
  if (!document?.fullscreenElement) return
  if (document?.exitFullscreen) {
    await document?.exitFullscreen()
  } else if (document?.webkitExitFullscreen) {
    /* Safari */
    await document?.webkitExitFullscreen()
  } else if (document?.msExitFullscreen) {
    /* IE11 */
    await document?.msExitFullscreen()
  }
}
</script>

<template>
  <div
    id="game-screen"
    class="relative flex flex-col flex-wrap items-center justify-center w-full h-full"
  >
    <button class="fixed top-0 right-0 text-white text-9xl" @click="fullScreen">+</button>
    <t-game-screen />
  </div>
</template>
