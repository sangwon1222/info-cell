<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import { useSceneStore } from '@/store/scene'
import dbManager from '@/util/dbManager'
import { filter } from 'lodash-es'
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const state = reactive({
  isEdit: true,
  saveData: {
    sceneIdx: 'NONE',
    place: '',
    img: [],
    contents: [],
    event: {label:'select',ary:[]}
  },
  editIdx: '',
  characterList: {}
})

const roleList = ['name', 'narration', 'event']
const roleLabel = { name: '이름', narration: '내래이션', event: '이벤트' }

onMounted(async () => {
  await updateMode()
})

const color = ['bg-red-100', 'bg-sky-100', 'bg-orange-100', 'bg-lime-100', 'bg-purple-100']

const addContent = () => {
  state.saveData.contents.push({
    role: 'name',
    name: '',
    content: '',
    event: {label:'select',ary:[]}
  })
}
const deleteContents = (index: number) => {
  state.saveData.contents.splice(index, 1)
}

const addCharacter = (e: FocusEvent, v) => {
  const nameValue = (e.currentTarget as HTMLInputElement).value
  v.name = nameValue
  const names = filter(state.saveData.contents, (e) => !!e.name)

  for (let i = 0; i < names.length; i++) {
    const { name } = names[i]
    if (state.characterList[name]) continue
    state.characterList[name] = color[i % color.length]
  }
}

const setAutoHeight = (e: Event, v) => {
  const role = v.role
  const target = e.currentTarget as HTMLInputElement
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
  switch (role) {
    case 'name':
      v.content = target.value
      break
    case 'narration':
      v.name = ''
      v.content = target.value
      break
  }
}

const changeRole = (e, v) => {
  const role = e.target.value
  v.role = role
  v.name = ''
  v.content = ''
  v.event =  {label:'select',ary:[]}
}

const save = async () => {
  useLayoutStore.isLoading = true
  const data: any = { ...state.saveData }
  data.contents = JSON.stringify(state.saveData.contents)
  try {
    console.log({isEdit: state.isEdit})
    console.log({params: data})
    const { ok, msg } = state.isEdit ? await dbManager.update(data) : await dbManager.insert(data)
    console.log(ok, msg)
    if (ok) {
      const getData = await dbManager.getData()
      console.log(getData)
      useSceneStore.scene = getData.data
      toast.success('저장 성공')
    } else {
      toast.error(`저장실패 / ${msg}`)
    }
  } catch (e) {
    console.log(e)
  } finally {
    useLayoutStore.isLoading = false
  }
}

const chageMode = async () => {
  state.isEdit = !state.isEdit
  if (state.isEdit) await updateMode()
  else {
    state.saveData = {
      sceneIdx: '',
      place: '',
      img: [],
      contents: []
    }
    state.editIdx = ''
    state.characterList = {}
  }
}

const updateMode = async () => {
  if (!state.isEdit) return
  useLayoutStore.isLoading = true
  const sceneIdx = state.saveData.sceneIdx
  const { ok, data } = await dbManager.searchData({ sceneIdx })
  if (ok) {
    const saveData: any = { ...data }
    console.error(saveData)
    saveData.contents = JSON.parse(data.contents)
    state.saveData = saveData
    setTimeout(() => {
      const textarea = document.getElementsByTagName('textarea')
      for (let i = 0; i < textarea.length; i++) {
        const target = textarea[i]
        target.style.height = 'auto'
        target.style.height = `${target.scrollHeight}px`
      }
      useLayoutStore.isLoading = false
    }, 1000)
  } else {
    useLayoutStore.isLoading = false
  }
}

const setSceneIdx = async (e) => {
  state.saveData.sceneIdx = e.target.value
  state.characterList = {}
  if (state.saveData.sceneIdx == 'NONE') {
    state.saveData = { sceneIdx: 'NONE', place: '', img: [], contents: [] }
  } else {
    await updateMode()
  }
}

const setEvent = (e, v, index) => {
  v.event.label = 'select'
  if (!v.event.ary) v.event.ary = []
  v.event.ary[index] = (e.currentTarget as HTMLInputElement).value
}

const setEventNextScene = (e, v, index) => {
  const target = e.currentTarget as HTMLInputElement
  if (!v.event.nextScene) v.event.nextScene = []
  v.event.nextScene[index] = target.value
}
</script>

<template>
  <div
    class="relative flex flex-col gap-[10px] w-full h-full bg-gray-600 text-gray-100 overflow-y-auto bg-"
  >
    <button class="absolute flex text-gray-700 rounded left-1/2 bg-sky-200" @click="chageMode">
      <p :class="state.isEdit ? 'bg-gray-600 text-gray-500' : 'shadow-2xl'" class="px-2">추가</p>
      <p :class="state.isEdit ? 'shadow-2xl' : 'bg-gray-600 text-gray-500'" class="px-2">편집</p>
    </button>

    <div class="flex gap-2 border-2 border-gray-600">
      <div class="flex gap-2">
        <label for="scene-idx" class="text-xl">scene_<span class="text-xs">ex)#2</span></label>
        <input
          v-if="!state.isEdit"
          id="scene-idx"
          type="text"
          :value="state.saveData.sceneIdx"
          tabindex="1"
          @input="e=>state.saveData.sceneIdx=(e.currentTarget as HTMLInputElement).value"
        />
      </div>
      <select v-if="state.isEdit" class="text-black" @change="setSceneIdx">
        <option value="NONE" selected>NONE</option>
        <option
          v-for="(v, i) in useSceneStore.scene"
          :key="i"
          :value="v.sceneIdx"
          class="max-w-screen"
        >
          {{ v.sceneIdx }}
        </option>
      </select>
      <button class="px-4 text-gray-400 rounded bg-sky-100" @click="save">
        {{ state.isEdit ? '편집 저장' : '신규 저장' }}
      </button>
    </div>

    <div class="flex items-center gap-2 border-2 border-gray-400">
      <label for="scene-place">장소:</label>
      <input
        id="scene-place"
        type="text"
        tabindex="2"
        :value="state.saveData.place"
        @input="e=>state.saveData.place=(e.currentTarget as HTMLInputElement).value"
      />
    </div>
    <div class="flex gap-2 border-2 border-gray-400">
      <label for="scene-img">img:</label>
      <div class="flex gap-4">
        <p>배경</p>
      <input
        id="scene-img"
        type="text"
        tabindex="3"
        :value="state.saveData.img"
        @input="e=>state.saveData.img=(e.currentTarget as HTMLInputElement).value"
      />
    </div>
    
    </div>

    <div class="flex flex-col gap-2 border-2 border-gray-400">
      <div class="flex items-center gap-4">
        <label for="scene-contents">컨텐츠:</label>
        <button class="w-20 text-gray-500 bg-blue-100 rounded-xl" @click="addContent">+</button>
      </div>

      <div
        v-for="(v, i) in state.saveData.contents"
        :key="i"
        class="flex flex-col w-full bg-gray-400 border border-black"
      >
        <div class="flex gap-1 w-fit">
          <button
            class="flex items-center justify-center text-black bg-red-200 border-2 border-black rounded w-9 h-9"
            @click="deleteContents(i)"
          >
            X
          </button>
          <select :id="`${i}-role`" name="role" class="text-black" @change="changeRole($event, v)">
            <option v-for="(role, j) in roleList" :key="`${i}-${role}-${j}`" :value="role" :selected="role==v.role">
              {{ roleLabel[role] }}
            </option>
          </select>
          <input
            v-if="v.role == 'name'"
            :id="`${i}-name`"
            type="text"
            :value="v.name"
            tabindex="4"
            :class="state.characterList[v.name] ?? ''"
            @blur="addCharacter($event, v)"
          />
        </div>

        <div v-if="v.role == 'name'" class="flex flex-col w-full gap-1">
          <textarea
            :id="`${i}-content`"
            type="text"
            :value="v.content"
            spellcheck="false"
            rows="1"
            cols="20"
            tabindex="5"
            @input="setAutoHeight($event, v)"
          />
        </div>
        <div v-if="v.role == 'narration'" class="flex flex-col w-full gap-1">
          <textarea
            :id="`${i}-narration`"
            type="text"
            :value="v.content"
            spellcheck="false"
            rows="1"
            cols="20"
            tabindex="4"
            @input="setAutoHeight($event, v)"
          />
        </div>
        <div v-if="v.role == 'event'" class="flex flex-col w-full gap-1">
          <p>선택지</p>
          <ul class="flex flex-col w-full">
            <li class="w-full">
              <p class="w-full border-2">1.</p>
              <input class="w-full" type="text" @input="setEvent($event, v, 0)" />
              <div class="flex gap-2">
                <label class="w-24 text-white">다음 장면:</label>
                <input class="w-full" @input="setEventNextScene($event, v, 0)" />
              </div>
            </li>
          </ul>
          <ul class="flex flex-col w-full">
            <li class="flex flex-col w-full">
              <p class="w-full border-2">2.</p>
              <input class="w-full" type="text" @input="setEvent($event, v, 1)" />
              <div class="flex gap-2">
                <label class="w-24 text-white">다음 장면:</label>
                <input class="w-full" @input="setEventNextScene($event, v, 1)" />
              </div>
            </li>
          </ul>
          <!-- <select :id="`${i}-role`" name="role" class="text-black">
            <option value="select">선택지</option>
            <option value="etc">서술</option>
          </select> -->
        </div>
      </div>

      <!-- <div class="flex flex-col gap-2 border-2 border-gray-400" :class="">
        <label for="scene-event">이벤트:</label>
        <input id="scene-event" type="text" />
      </div> -->
    </div>
  </div>
</template>
