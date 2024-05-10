<script setup lang="ts" scoped>
import { useGameDataStore } from '@/store/gameData'
import { useSceneStore } from '@/store/scene'
import { getPlaceData } from '@/util/common'
import { reactive } from 'vue'

const state = reactive({
  moveEditorList: [],
  showMoveEditorList: false,
  examineEditorList: [],
  showExamineEditorList: false
})

const showExamine = async () => {
  state.showExamineEditorList = true
  if (useSceneStore.editMode) {
    console.log('편집기능')
  } else {
    console.log('진행 기능')
  }
}
const showMove = async () => {
  state.showMoveEditorList = true
  if (useSceneStore.editMode) {
    console.log('편집기능')
  } else {
    console.log('진행 기능')
  }
}
const addExamine = async () => {
  if (!useSceneStore.editMode) return
  if (useGameDataStore.examine.length < 1) {
    useGameDataStore.examine.push({ id: -1, name: 'new data' })
  }
  state.examineEditorList.push({ id: -1, name: '' })
}
const addMove = async () => {
  if (!useSceneStore.editMode) return
  if (useGameDataStore.move.length < 1) {
    ;``
    useGameDataStore.move.push({ id: -1, name: 'new data' })
  }
  state.moveEditorList.push({ id: -1, name: 'new data' })
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

      <div
        v-if="state.showExamineEditorList"
        id="examine-editor"
        class="fixed top-0 left-0 flex flex-col gap-10 items-center justify-center border border-red-400 w-[1280px] h-[720px] bg-black bg-opacity-40 pointer-events-none"
      >
        <div v-for="(v, i) in state.examineEditorList" :key="i" class="flex gap-10">
          <div class="bg-white p-5 rounded pointer-events-auto">
            <label :for="`${v.id}-examine`">조사: </label>
            <input :id="`${v.id}-examine`" type="text" :value="v.name" />
          </div>
        </div>

        <button
          class="bg-white p-5 rounded pointer-events-auto"
          @click="() => (state.showExamineEditorList = false)"
        >
          취소
        </button>
      </div>

      <div
        v-if="state.showMoveEditorList"
        id="move-editor"
        class="fixed top-0 left-0 flex flex-col gap-10 items-center justify-center border border-red-400 w-[1280px] h-[720px] bg-black bg-opacity-40 pointer-events-none"
      >
        <div v-for="(v, i) in state.moveEditorList" :key="i" class="flex gap-10">
          <div class="bg-white p-5 rounded pointer-events-auto">
            <label :for="`${i}-place-${v.name}`">장소: </label>
            <input :id="`${i}-place-${v.name}`" type="text" :value="v.name" />
          </div>
        </div>

        <button
          class="bg-white p-5 rounded pointer-events-auto"
          @click="() => (state.showMoveEditorList = false)"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>
