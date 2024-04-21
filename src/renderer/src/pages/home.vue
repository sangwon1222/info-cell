<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'
import dbManager from '@/util/dbManager'
import { ok } from 'assert'
import { map } from 'lodash-es'
import { computed, reactive } from 'vue'
import { onMounted } from 'vue'

const state = reactive({
  endChatAni: computed(() => state.lineani == state.chat.line[state.chatIndex]),
  contentIndex: 0,
  chatIndex: 0,
  img: { left: '', right: '', center: '' },
  actor: '',
  line: [],
  lineani: '',
  chat: {
    actor: '',
    img: '',
    line: ''
  },
  imgSrc: ''
})
onMounted(async () => await nextChat())

const skipChat = () => {
  const endChat = state.chatIndex + 1 >= state.chat.line.length
  if (state.endChatAni && endChat) {
    state.contentIndex += 1
    state.chatIndex = 0
    nextChat()
  }
  if (state.endChatAni && !endChat) {
    state.chatIndex += 1
    nextChat()
  }
}

const nextChat = async () => {
  if (!useSceneStore.scene.content[state.contentIndex]) {
    console.log(useSceneStore.scene.content[state.contentIndex - 1])
    const { ok, data } = await dbManager.getScene(
      useSceneStore.scene.content[state.contentIndex - 1].next
    )
    state.contentIndex = 0
    console.log({ ok, data })
    useSceneStore.scene = JSON.parse(data)
  }
  state.lineani = ''
  state.chat = useSceneStore.scene.content[state.contentIndex]
  state.img = { left: '', right: '', center: '' }
  state.line = state.chat.line[state.chatIndex].split('')
  map(state.line, (e, i) =>
    setTimeout(() => {
      state.lineani += e
    }, 50 * +i)
  )
  if (useSceneStore.img[state.chat.placeImg]) state.imgSrc = useSceneStore.img[state.chat.placeImg]
  else {
    const { data } = await dbManager.readFile(state.chat.placeImg)
    useSceneStore.img[state.chat.placeImg] = data
    state.imgSrc = data
  }

  const left = useSceneStore.img[state.chat.img.left]
  if (state.chat.img.left && left) state.img.left = left
  if (state.chat.img.left && !left) {
    const { data } = await dbManager.readFile(state.chat.img.left)
    useSceneStore.img[state.chat.img.left] = data
    state.img.left = data
  }

  const right = useSceneStore.img[state.chat.img.right]
  if (state.chat.img.right && right) state.img.right = right
  if (state.chat.img.right && !right) {
    const { data } = await dbManager.readFile(state.chat.img.right)
    useSceneStore.img[state.chat.img.right] = data
    state.img.right = data
  }

  const center = useSceneStore.img[state.chat.img.center]
  if (state.chat.img.center && center) state.img.center = center
  if (state.chat.img.center && !center) {
    const { data } = await dbManager.readFile(state.chat.img.center)
    useSceneStore.img[state.chat.img.center] = data
    state.img.center = data
  }
}
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="relative flex flex-col justify-end w-[1280px] h-[720px] border-2 bg-black">
      <p class="absolute z-10 p-2 bg-black text-white top-0 left-0">
        {{ state.chat.place }}
      </p>
      <img :src="state.imgSrc" alt="배경이미지" class="absolute top-0 left-0 w-auto h-full" />
      <img
        v-if="state.chat.img.left"
        :src="state.img.left"
        alt="왼쪽캐릭터"
        class="absolute top-0 left-0 w-auto h-full"
      />
      <img
        v-if="state.chat.img.right"
        :src="state.img.right"
        alt="오른쪽캐릭터"
        class="absolute top-0 right-0 w-auto h-full"
      />
      <img
        v-if="state.chat.img.center"
        :src="state.img.center"
        alt="가운데캐릭터"
        class="absolute top-0 left-0 ml-[640px] w-auto h-full"
      />

      <div
        class="relative w-full h-[200px] text-white flex flex-col text-xl"
        @click.prevent="skipChat"
      >
        <p class="realative z-10 h-10">{{ state.chat.actor ? `${state.chat.actor}:` : ' ' }}</p>
        <p class="realative z-10 flex-1 px-10">
          {{ state.lineani }}<span class="ml-2 animate-pulse">_</span>
        </p>
        <span
          v-if="state.endChatAni"
          class="absolute right-6 bottom-6 text-white animate-pulse text-4xl"
          >▶</span
        >
        <div class="absolute w-full h-full bg-black opacity-60 left-0 top-0" />
      </div>
    </div>
  </div>
</template>
