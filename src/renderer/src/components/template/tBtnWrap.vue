<script setup lang="ts" scoped>
import ABtn from '@/components/atoms/aBtn.vue'
import { useSceneStore } from '@/store/scene'
import { onMounted, reactive } from 'vue'

const state = reactive({
  examineData: [] as TypeInterActive[],
  moveData: [] as TypeInterActive[],
  talkData: [] as TypeInterActive[],
  useData: [] as TypeInterActive[],

  showExamine: false,
  showMove: false,
  showTalk: false,
  showUse: false,

  examineAble: false,
  moveAble: false,
  talkAble: false,
  useAble: false
})

onMounted(() => {
  const data = useSceneStore.data
  state.examineData = data?.examine ?? []
  state.moveData = data?.move ?? []
  state.talkData = data?.talk ?? []
  state.useData = data?.use ?? []

  const { examineData, moveData, talkData, useData } = state
  state.examineAble = examineData.length > 0
  state.moveAble = moveData.length > 0
  state.talkAble = talkData.length > 0
  state.useAble = useData.length > 0
})

const addExamine = async () => {
  state.examineData.push({
    label: '',
    isShow: true,
    isComplete: false,
    place: '',
    placeName: '',
    script: [],
    condition: false,
    next: false
  })
}
const addMove = async () => {
  state.moveData.push({
    isShow: true,
    isComplete: false,
    place: '',
    placeName: '',
    script: [],
    condition: false,
    next: false
  })
}

const addTalk = async () => {
  state.talkData.push({
    isShow: true,
    isComplete: false,
    place: '',
    placeName: '',
    script: [],
    condition: false,
    next: false
  })
}

const addUse = async () => {
  state.useData.push({
    isShow: true,
    isComplete: false,
    place: '',
    placeName: '',
    script: [],
    condition: false,
    next: false
  })
}

const btnStyle =
  'pointer-events-auto absolute w-[100px] h-[40px] right-[200px] rounded bg-sky-200 bg-opacity-80 hover:bg-opacity-100 font-bold'
</script>

<template>
  <div class="absolute w-[1280px] h-[720px] z-40 pointer-events-none">
    <button
      class="pointer-events-auto absolute w-[100px] h-[40px] rounded top-[100px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 font-bold"
      :class="state.examineAble ? 'right-[20px]' : '-right-[200px]'"
      @click="state.showExamine = true"
    >
      조사하기
    </button>
    <button
      class="pointer-events-auto absolute w-[100px] h-[60px] rounded top-[180px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 font-bold"
      :class="state.moveAble ? 'right-[20px]' : '-right-[200px]'"
      @click="state.showMove = true"
    >
      이동하기
    </button>

    <button
      class="pointer-events-auto absolute w-[100px] h-[60px] rounded top-[180px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 font-bold"
      :class="state.talkAble ? 'right-[20px]' : '-right-[200px]'"
      @click="state.showTalk = true"
    >
      대화하기
    </button>
    <button
      class="pointer-events-auto absolute w-[100px] h-[60px] rounded top-[180px] bg-sky-200 bg-opacity-80 hover:bg-opacity-100 font-bold"
      :class="state.useAble ? 'right-[20px]' : '-right-[200px]'"
      @click="state.showUse = true"
    >
      사용하기
    </button>

    <a-btn
      v-if="state.showExamine"
      :data="state.examineData"
      @add="addExamine"
      @close="state.showExamine = false"
    />

    <a-btn
      v-if="state.showMove"
      :data="state.moveData"
      @add="addMove"
      @close="state.showMove = false"
    />

    <a-btn
      v-if="state.showTalk"
      :data="state.talkData"
      @add="addTalk"
      @close="state.showTalk = false"
    />
    <a-btn
      v-if="state.showUse"
      :data="state.useData"
      @add="addUse"
      @close="state.showUse = false"
    />

    <div v-if="useSceneStore.editMode">
      <button
        :class="btnStyle"
        class="top-[100px]"
        @click="() => (state.examineAble = !state.examineAble)"
      >
        조사 {{ state.examineAble ? '비활성' : '활성' }}
      </button>
      <button
        :class="btnStyle"
        class="top-[160px]"
        @click="() => (state.moveAble = !state.moveAble)"
      >
        이동 {{ state.moveAble ? '비활성' : '활성' }}
      </button>
      <button
        :class="btnStyle"
        class="top-[210px]"
        @click="() => (state.talkAble = !state.talkAble)"
      >
        대화 {{ state.moveAble ? '비활성' : '활성' }}
      </button>
      <button :class="btnStyle" class="top-[270px]" @click="() => (state.useAble = !state.useAble)">
        사용 {{ state.moveAble ? '비활성' : '활성' }}
      </button>
    </div>
  </div>
</template>
