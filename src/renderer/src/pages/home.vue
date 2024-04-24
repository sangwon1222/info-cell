<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'
import { computed, onMounted, reactive } from 'vue'

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
onMounted(() => (useSceneStore.editMode = false))

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
  //
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="relative flex flex-col justify-end w-[1280px] h-[720px] border-2 bg-black">
      <p class="absolute top-0 left-0 z-10 p-2 text-white bg-black">
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
        <p class="z-10 h-10 realative">{{ state.chat.actor ? `${state.chat.actor}:` : ' ' }}</p>
        <p class="z-10 flex-1 px-10 realative">
          {{ state.lineani }}<span class="ml-2 animate-pulse">_</span>
        </p>
        <span
          v-if="state.endChatAni"
          class="absolute text-4xl text-white right-6 bottom-6 animate-pulse"
          >▶</span
        >
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      </div>
    </div>
  </div>
</template>
