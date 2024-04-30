<script setup lang="ts" scoped>
import { useGameDataStore } from '@/store/gameData'
import { useSceneStore } from '@/store/scene'
import { reactive } from 'vue'

const state = reactive({
  moveEditorList: [],
  examineEditorList: []
})

const showExamine = () => {
  console.log(useSceneStore)
  console.log(useGameDataStore)
  if (useSceneStore.editMode) {
    console.log('편집기능')
  } else {
    console.log('진행 기능')
  }
}
const showMove = () => {
  console.log('이동하기 클릭')
  if (useSceneStore.editMode) {
    console.log('편집기능')
  } else {
    console.log('진행 기능')
  }
}
const addExamine = () => {
  if (!useSceneStore.editMode) return
}
const addMove = () => {
  if (!useSceneStore.editMode) return
}
</script>

<template>
  <div class="absolute w-[1280px] h-[720px] z-40 pointer-events-none">
    <button
      class="pointer-events-auto absolute w-[160px] h-[60px] rounded top-[100px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 duration-700 font-bold"
      :class="useGameDataStore.examine.length > 0 ? 'right-[20px]' : '-right-[200px]'"
      @click="showExamine"
    >
      조사하기
    </button>
    <button
      class="pointer-events-auto absolute w-[160px] h-[60px] rounded top-[180px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 duration-700 font-bold"
      :class="useGameDataStore.move.length > 0 ? 'right-[20px]' : '-right-[200px]'"
      @click="showMove"
    >
      이동하기
    </button>

    <div v-if="useSceneStore.editMode">
      <button
        class="pointer-events-auto absolute w-[160px] right-[200px] h-[60px] rounded top-[100px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 duration-700 font-bold"
        @click="addExamine"
      >
        조사 추가
      </button>
      <button
        class="pointer-events-auto absolute w-[160px] right-[200px] h-[60px] rounded top-[180px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 duration-700 font-bold"
        @click="addMove"
      >
        이동 추가
      </button>

      <div id="examine-editor" class="flex flex-col">
        <div v-for="(v, i) in state.moveEditorList" :key="i" class="flex gap-1">
          <div>
            <label for="examine">조사: </label>
            <input id="examine" type="text" :value="v.placeId" />
          </div>
          <!-- <div>
            <label for="place">장소: </label>
            <input id="place" type="text" />
          </div> -->
        </div>
      </div>

      <div id="move-editor" class="flex flex-col">
        <div v-for="(v, i) in state.moveEditorList" :key="i" class="flex gap-1">
          <div>
            <label for="place">장소: </label>
            <input id="place" type="text" />
          </div>
          <!-- <div>
            <label for="place">장소: </label>
            <input id="place" type="text" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
