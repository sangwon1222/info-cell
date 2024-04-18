<script setup lang="ts" scoped>
import { useLayoutStore } from '../../store/loading'
</script>

<template>
  <div class="fixed flex items-center justify-center w-screen h-screen t-0 l-0 z-100">
    <div class="fixed w-full h-full bg-black opacity-50">
      <div class="circle w-[200px] h-[200px] border-[20px]" />
    </div>
    <div class="relative px-6 mt-[200px] text-white bg-black min-w-[200px] text-center">
      {{ useLayoutStore.loadingText }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.circle {
  @apply fixed top-1/2 left-1/2 -mt-[100px] border-transparent border-t-white rounded-full animate-spin;
}
</style>
