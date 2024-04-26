<script setup lang="ts" scoped>
import { useGameDataStore } from '@/store/gameData'

const showList = () => {
  //
}
</script>

<template>
  <div class="absolute w-[1280px] h-[720px] z-40">
    <button
      class="absolute w-[160px] h-[60px] rounded top-[100px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 duration-700 font-bold"
      :class="useGameDataStore.examine.length > 0 ? 'right-[20px]' : '-right-[200px]'"
      @click="showList"
    >
      조사하기
    </button>
  </div>
</template>
